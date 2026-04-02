/* ═══════════════════════════════════════════════════════════════
   FANANTENANA — ESPACE PASTEUR
   Panneau d'administration en temps réel
═══════════════════════════════════════════════════════════════ */

/* ── Firebase config ── */
const firebaseConfig = {
  apiKey:            "AIzaSyAIet6GftRvcyJMCyUDERSCVmmZq0d-A-Q",
  authDomain:        "fanantenana-cf5ea.firebaseapp.com",
  projectId:         "fanantenana-cf5ea",
  storageBucket:     "fanantenana-cf5ea.firebasestorage.app",
  messagingSenderId: "746464673923",
  appId:             "1:746464673923:web:e6bd1564141d5a081ddbb6"   // ← même valeur que index.html
};

if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db   = firebase.firestore();
const auth = firebase.auth();

db.enablePersistence({synchronizeTabs:true}).catch(()=>{});

/* ── VAPID Public Key (pour Web Push) ── */
const VAPID_PUBLIC_KEY = 'BEhel__mjEVZp907Or-9kvpIlsaEZDCGEaiwkNFOC2U7_pl0OdiX_UsBJUnN60ecKHj6k0I_R4Q6gHnaJltE_z0';

/* ── État ── */
let currentPastor  = null;
let currentRoom    = null;
let msgsUnsub      = null;
let convsUnsub     = null;
let allConvs       = [];
let pushSubscription = null;
let swReg          = null;

/* ══════════════════ UTILITAIRES ══════════════════ */
const _  = id => document.getElementById(id);
function showT(msg, dur=2800){
  const t=_('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), dur);
}
function timeAgo(ts){
  if(!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now()-d)/1000);
  if(diff<60)   return 'À l\'instant';
  if(diff<3600) return Math.floor(diff/60)+'min';
  if(diff<86400)return Math.floor(diff/3600)+'h';
  return d.toLocaleDateString('fr');
}
function autoResize(el){
  el.style.height='auto';
  el.style.height=Math.min(el.scrollHeight,120)+'px';
}

/* ══════════════════ AUTHENTIFICATION ══════════════════ */
function toggleSignup() {
  const f = _('signup-form');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

async function doSignup() {
  const email = (_('s-email').value||'').trim();
  const pass  = (_('s-pass').value||'');
  const pass2 = (_('s-pass2').value||'');
  const err   = _('s-err');
  err.textContent = '';
  if (!email || !pass) { err.textContent = '⚠️ Remplissez tous les champs.'; return; }
  if (pass.length < 6) { err.textContent = '⚠️ Mot de passe trop court (6 min).'; return; }
  if (pass !== pass2)  { err.textContent = '⚠️ Les mots de passe ne correspondent pas.'; return; }
  try {
    await auth.createUserWithEmailAndPassword(email, pass);
    err.style.color = '#4CAF7D';
    err.textContent = '✅ Compte créé ! Vous êtes connecté.';
  } catch(e) {
    const msgs = {
      'auth/email-already-in-use': '❌ Email déjà utilisé.',
      'auth/invalid-email': '❌ Email invalide.',
      'auth/weak-password': '❌ Mot de passe trop faible.',
    };
    err.style.color = '#e05c5c';
    err.textContent = msgs[e.code] || ('❌ ' + e.message);
  }
}

async function doLogin(){
  const email = _('l-email').value.trim();
  const pass  = _('l-pass').value;
  _('l-err').textContent = '';

  if(!email||!pass){
    _('l-err').textContent = '⚠️ Veuillez remplir les deux champs.'; return;
  }
  try {
    await auth.signInWithEmailAndPassword(email, pass);
  } catch(e){
    const msgs = {
      'auth/user-not-found':  '❌ Email non reconnu.',
      'auth/wrong-password':  '❌ Mot de passe incorrect.',
      'auth/invalid-email':   '❌ Email invalide.',
      'auth/too-many-requests':'⚠️ Trop de tentatives. Réessayez plus tard.'
    };
    _('l-err').textContent = msgs[e.code] || '❌ Erreur : '+e.message;
  }
}

function doLogout(){
  if(convsUnsub) convsUnsub();
  if(msgsUnsub)  msgsUnsub();
  auth.signOut();
}

auth.onAuthStateChanged(u => {
  if(u && !u.isAnonymous){
    currentPastor = u;
    _('login-screen').style.display = 'none';
    _('main-screen').style.display  = 'flex';
    _('pastor-name').textContent = u.displayName || u.email?.split('@')[0] || 'Pasteur';
    _('pastor-badge').style.display = 'flex';
    _('logout-btn').style.display   = 'block';
    _('notif-btn').style.display    = 'block';
    chargerConversations();
    chargerDemandes();
    chargerCommandes();
    chargerDons();
    chargerLivresAdmin();
    initSW();
    verifierPushSub();
  } else {
    _('login-screen').style.display = 'flex';
    _('main-screen').style.display  = 'none';
    currentPastor = null;
  }
});

/* ══════════════════ SERVICE WORKER ══════════════════ */
async function initSW(){
  if(!('serviceWorker' in navigator)) return;
  try {
    swReg = await navigator.serviceWorker.register('/sw.js');
    console.log('✅ SW enregistré pour admin');
  } catch(e){
    console.warn('SW admin:', e.message);
  }
}

/* ══════════════════ WEB PUSH NOTIFICATIONS ══════════════════ */
function urlB64ToUint8Array(b64){
  const p = (b64+'='.repeat((4-b64.length%4)%4)).replace(/-/g,'+').replace(/_/g,'/');
  const raw = atob(p);
  return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));
}

async function verifierPushSub(){
  if(!('PushManager' in window)) return;
  try {
    const reg = swReg || await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if(sub){
      pushSubscription = sub;
      _('notif-btn').textContent = '🔔 Notifs actives';
      _('notif-btn').className   = 'hbtn notif-on';
      _('notif-banner').classList.remove('show');
    } else {
      _('notif-banner').classList.add('show');
    }
  } catch(e){}
}

async function activerNotifPush(){
  if(!('PushManager' in window)){
    showT('❌ Notifications non supportées sur ce navigateur'); return;
  }
  const perm = await Notification.requestPermission();
  if(perm !== 'granted'){
    showT('⚠️ Permission refusée — activez les notifs dans les paramètres'); return;
  }
  try {
    const reg = swReg || await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY)
    });
    pushSubscription = sub;
    /* Sauvegarder la subscription dans Firestore */
    const pasteurDocId = getPasteurId();
    /* Sauvegarder sous pasteurDocId pour que index.html puisse trouver le token */
    await db.collection('pasteur_tokens').doc(pasteurDocId).set({
      subscription:   JSON.parse(JSON.stringify(sub)),
      email:          currentPastor.email,
      uid:            currentPastor.uid,
      updated_at:     firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
    _('notif-btn').textContent = '🔔 Notifs actives';
    _('notif-btn').className   = 'hbtn notif-on';
    _('notif-banner').classList.remove('show');
    showT('✅ Notifications activées ! 🙏');
  } catch(e){
    showT('❌ Erreur : '+e.message);
  }
}

async function togglePushNotif(){
  if(pushSubscription){
    /* Désactiver */
    await pushSubscription.unsubscribe();
    pushSubscription = null;
    _('notif-btn').textContent = '🔔 Activer les notifs';
    _('notif-btn').className   = 'hbtn notif-off';
    showT('🔕 Notifications désactivées');
  } else {
    await activerNotifPush();
  }
}

/* ══════════════════ CONVERSATIONS ══════════════════ */
/* Mapping email → pasteurId (doit correspondre aux IDs dans index.html) */
const PASTEUR_MAP = {
  'pasteur.fidisoa@fanantenana.com': 'pasteur_fidisoa',
  'pasteur.norolucie@fanantenana.com': 'pasteur_norolucie'
  /* Ajoutez d'autres pasteurs ici */
};
function getPasteurId() {
  return PASTEUR_MAP[currentPastor?.email] ||
         (currentPastor?.email || '').split('@')[0].replace(/\./g,'_');
}

function chargerConversations(){
  if(convsUnsub) convsUnsub();
  convsUnsub = db.collection('conversations')
    .orderBy('derniere_activite','desc')
    .onSnapshot(snap => {
      const pasteurId = getPasteurId();
      /* Chaque pasteur ne voit QUE ses propres conversations */
      allConvs = snap.docs
        .map(d => ({id:d.id, ...d.data()}))
        .filter(c => c.id.includes(pasteurId));
      renderConvs(allConvs);
      const total = allConvs.reduce((s,c)=>s+(c.non_lus||0),0);
      const badge = _('total-unread');
      if(total>0){ badge.textContent=total; badge.style.display='block'; }
      else badge.style.display='none';
    }, e => console.warn('Conversations:', e.message));
}

function renderConvs(convs){
  const list = _('conv-list');
  if(!convs.length){
    list.innerHTML='<div class="empty-conv">📭 Aucune conversation pour le moment</div>';
    return;
  }
  list.innerHTML = convs.map(c => {
    const unread = c.non_lus || 0;
    const preview = esc(c.dernier_message || '');
    const time    = c.derniere_activite ? esc(timeAgo(c.derniere_activite)) : '';
    const roomId = escAttr(c.id || '');
    const roomName = escAttr(c.pasteur_nom || 'Fidèle');
    const displayName = esc(c.nom_utilisateur || c.pasteur_nom || 'Fidèle');
    return `<div class="conv-item${currentRoom===c.id?' active':''}" onclick="ouvrirConv('${roomId}','${roomName}')">
      <div class="conv-ava">👤</div>
      <div class="conv-info">
        <div class="conv-name">${displayName}</div>
        <div class="conv-preview">${preview.length>40?preview.substring(0,40)+'…':preview}</div>
      </div>
      <div class="conv-meta">
        <span class="conv-time">${time}</span>
        <span class="conv-unread${unread>0?' show':''}">${unread}</span>
      </div>
    </div>`;
  }).join('');
}

function filtrerConv(){
  const q = _('search-conv').value.toLowerCase();
  if (!q) { renderConvs(allConvs); return; }
  renderConvs(allConvs.filter(c =>
    (c.nom_utilisateur||'').toLowerCase().includes(q) ||
    (c.dernier_message||'').toLowerCase().includes(q) ||
    (c.id||'').toLowerCase().includes(q)
  ));
}

function switchTabBase(tab){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  _('tab-'+tab).classList.add('active');
  _('panel-'+tab).classList.add('active');
}

/* ══════════════════ MESSAGES ══════════════════ */
async function ouvrirConv(roomId, nom){
  currentRoom = roomId;
  _('cv-name').textContent = nom;
  _('cv-sub').textContent  = roomId;
  _('cv-ava').textContent  = '👤';
  _('chat-placeholder').style.display = 'none';
  const cv = _('chat-view');
  cv.style.display = 'flex';
  cv.style.flexDirection = 'column';

  /* Mobile: fermer sidebar */
  _('sidebar').classList.remove('open');

  /* Réinitialiser messages */
  _('messages').innerHTML = '<div style="text-align:center;color:var(--mut);font-size:13px;padding:20px">⏳ Chargement…</div>';

  if(msgsUnsub){ msgsUnsub(); msgsUnsub=null; }

  msgsUnsub = db.collection('chats').doc(roomId).collection('messages')
    .orderBy('cree_le','asc')
    .onSnapshot(snap => {
      renderMessages(snap.docs.map(d=>({id:d.id,...d.data()})));
      marquerMessagesLus(roomId, snap.docs);
    });

  /* Mettre en surbrillance la conv active */
  document.querySelectorAll('.conv-item').forEach(el=>{
    el.classList.toggle('active', el.getAttribute('onclick')?.includes(roomId));
  });
}

function renderMessages(msgs){
  const box = _('messages');
  if(!msgs.length){
    box.innerHTML='<div style="text-align:center;color:var(--mut);font-size:13px;padding:40px;line-height:1.8">📭 Aucun message pour le moment.<br>Le fidèle n\'a pas encore écrit.</div>';
    return;
  }
  box.innerHTML = msgs.map(m => {
    const isOut  = m.from === 'pasteur' || m.nom === 'Pasteur';
    const time   = m.cree_le ? timeAgo(m.cree_le) : '';
    const txt    = esc(m.texte || m.text || '');
    const lu     = isOut && m.lu ? '<span class="msg-lu">✓✓</span>' : '';
    return `<div class="msg-row ${isOut?'out':'in'}">
      <div class="msg-bubble">${txt}</div>
      <div style="display:flex;flex-direction:column;align-items:${isOut?'flex-end':'flex-start'}">
        <span class="msg-time">${time}</span>${lu}
      </div>
    </div>`;
  }).join('');
  box.scrollTop = box.scrollHeight;
}

async function marquerMessagesLus(roomId, docs){
  const nonLus = docs.filter(d=>!d.data().lu && d.data().from!=='pasteur');
  if(!nonLus.length) return;
  const batch = db.batch();
  nonLus.forEach(d=>batch.update(d.ref,{lu:true}));
  batch.update(db.collection('conversations').doc(roomId),{non_lus:0});
  try { await batch.commit(); } catch(e){}
}

async function envoyerReponse(){
  if(!currentRoom) return;
  const inp = _('reply-inp');
  const txt = inp.value.trim();
  if(!txt) return;
  inp.value = '';
  inp.style.height = 'auto';
  try {
    await db.collection('chats').doc(currentRoom).collection('messages').add({
      texte:    txt,
      from:     'pasteur',
      nom:      currentPastor.displayName || 'Pasteur',
      avatar:   '✝',
      lu:       false,
      cree_le:  firebase.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('conversations').doc(currentRoom).set({
      dernier_message:   txt,
      derniere_activite: firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});
  } catch(e){
    showT('❌ Erreur envoi : '+e.message);
    inp.value = txt;
  }
}

async function marquerToutLu(){
  if(!currentRoom) return;
  try {
    const snap = await db.collection('chats').doc(currentRoom).collection('messages')
      .where('lu','==',false).get();
    const batch = db.batch();
    snap.docs.forEach(d=>batch.update(d.ref,{lu:true}));
    batch.update(db.collection('conversations').doc(currentRoom),{non_lus:0});
    await batch.commit();
    showT('✓ Tout marqué comme lu');
  } catch(e){}
}

function closeChatView(){
  _('sidebar').classList.add('open');
  currentRoom = null;
  if(msgsUnsub){ msgsUnsub(); msgsUnsub=null; }
  _('chat-view').style.display  = 'none';
  _('chat-placeholder').style.display = 'flex';
}

/* ══════════════════ DEMANDES PASTEURS ══════════════════ */
function chargerDemandes(){
  db.collection('demandes_pasteurs')
    .orderBy('cree_le','desc')
    .onSnapshot(snap => {
      const list = _('req-list');
      if(!snap.docs.length){
        list.innerHTML='<div class="empty-conv">📭 Aucune demande pour le moment</div>';
        return;
      }
      list.innerHTML = snap.docs.map(d => {
        const data = d.data();
        return `<div class="req-item">
          <div class="req-name">✝ ${esc(data.nom||'—')}</div>
          <div class="req-detail">
            📧 ${esc(data.email||'—')}<br>
            📞 ${esc(data.telephone||'—')}<br>
            ⛪ ${esc(data.eglise||'—')}<br>
            📖 ${esc(data.specialite||'—')}
          </div>
          <span class="req-badge">${esc(d.id.substring(0,8))}</span>
        </div>`;
      }).join('');
    }, ()=>{});
}

/* ══════════════════ COMMANDES LIVRES ══════════════════ */
function chargerCommandes(){
  db.collection('commandes_livres').orderBy('cree_le','desc')
    .onSnapshot(snap => {
      const docs = snap.docs.map(d=>({id:d.id,...d.data()}));
      const wait = docs.filter(d=>d.statut==='en_attente').length;
      const ok   = docs.filter(d=>d.statut==='validee').length;
      _('cmd-cnt-wait').textContent = wait;
      _('cmd-cnt-ok').textContent   = ok;
      renderCommandes(docs);
    }, ()=>{});
}

function renderCommandes(docs){
  const el = _('cmd-list');
  if(!docs.length){ el.innerHTML='<div class="empty-conv">📭 Aucune commande</div>'; return; }
  el.innerHTML = docs.map(c=>{
    const badge = c.statut==='validee'
      ? '<span class="badge badge-ok">✅ Validée</span>'
      : c.statut==='annulee'
      ? '<span class="badge badge-cancel">❌ Annulée</span>'
      : '<span class="badge badge-wait">⏳ En attente</span>';
    const op = c.operateur_paiement ? `📱 ${esc(c.operateur_paiement)}` : '📱 MVola';
    return `<div class="item-card">
      <div class="item-title">📖 ${esc(c.titre||'Livre')}</div>
      <div class="item-sub">
        💰 ${c.prix||'—'} · ${op}<br>
        📞 ${c.telephone_client||'—'}
        ${c.reference_paiement?`<br>🔖 Réf: <strong style="color:var(--gold)">${c.reference_paiement}</strong>`:''}
        ${c.adresse_livraison?`<br>📍 ${c.adresse_livraison}`:''}
      </div>
      <div class="item-meta">${badge}<span class="badge badge-gold">${timeAgo(c.cree_le)}</span></div>
      ${c.statut==='en_attente'?`
      <div class="action-row">
        <button class="abtn abtn-ok"   onclick="validerCommande('${c.id}')">✅ Valider paiement</button>
        <button class="abtn abtn-del"  onclick="annulerCommande('${c.id}')">❌ Annuler</button>
      </div>`:''}
    </div>`;
  }).join('');
}

async function validerCommande(id){
  if(!confirm('Confirmer la validation de cette commande ?')) return;
  try {
    await db.collection('commandes_livres').doc(id).update({
      statut:'validee', validee_le: firebase.firestore.FieldValue.serverTimestamp(),
      validee_par: currentPastor?.email||'admin'
    });
    showT('✅ Commande validée !');
  } catch(e){ showT('❌ '+e.message); }
}

async function annulerCommande(id){
  if(!confirm('Annuler cette commande ?')) return;
  try {
    await db.collection('commandes_livres').doc(id).update({statut:'annulee'});
    showT('🗑️ Commande annulée');
  } catch(e){ showT('❌ '+e.message); }
}

/* ══════════════════ DONS ══════════════════ */
function chargerDons(){
  db.collection('dons').orderBy('cree_le','desc')
    .onSnapshot(snap => {
      const docs = snap.docs.map(d=>({id:d.id,...d.data()}));
      const wait  = docs.filter(d=>d.statut==='en_attente').length;
      const total = docs.filter(d=>d.statut==='confirme').reduce((s,d)=>s+(d.montant||0),0);
      _('don-cnt-wait').textContent = wait;
      _('don-total').textContent    = total.toLocaleString('fr')+' Ar';
      renderDons(docs);
    }, ()=>{});
}

function renderDons(docs){
  const el = _('don-list');
  if(!docs.length){ el.innerHTML='<div class="empty-conv">📭 Aucun don enregistré</div>'; return; }
  el.innerHTML = docs.map(d=>{
    const badge = d.statut==='confirme'
      ? '<span class="badge badge-ok">✅ Confirmé</span>'
      : '<span class="badge badge-wait">⏳ À confirmer</span>';
    return `<div class="item-card">
      <div class="item-title">💝 ${(d.montant||0).toLocaleString('fr')} Ar — ${d.operateur||'MVola'}</div>
      <div class="item-sub">
        📞 ${esc(d.telephone||'—')}
        ${d.reference?`<br>🔖 Réf: <strong style="color:var(--gold)">${d.reference}</strong>`:''}
      </div>
      <div class="item-meta">${badge}<span class="badge badge-gold">${timeAgo(d.cree_le)}</span></div>
      ${d.statut==='en_attente'?`
      <div class="action-row">
        <button class="abtn abtn-ok"  onclick="confirmerDon('${d.id}')">✅ Don reçu</button>
        <button class="abtn abtn-del" onclick="supprimerDon('${d.id}')">🗑️ Supprimer</button>
      </div>`:''}
    </div>`;
  }).join('');
}

async function confirmerDon(id){
  try {
    await db.collection('dons').doc(id).update({
      statut:'confirme', confirme_le: firebase.firestore.FieldValue.serverTimestamp()
    });
    showT('✅ Don confirmé ! Misaotra !');
  } catch(e){ showT('❌ '+e.message); }
}

async function supprimerDon(id){
  if(!confirm('Supprimer ce don ?')) return;
  try { await db.collection('dons').doc(id).delete(); showT('🗑️ Supprimé'); }
  catch(e){ showT('❌ '+e.message); }
}

/* ══════════════════ GESTION LIVRES ══════════════════ */
function chargerLivresAdmin(){
  db.collection('livres').orderBy('ordre','asc')
    .onSnapshot(snap => {
      const docs = snap.docs.map(d=>({id:d.id,...d.data()}));
      renderLivresAdmin(docs);
    }, ()=>{});
}

function renderLivresAdmin(docs){
  const el = _('liv-list');
  if(!docs.length){
    el.innerHTML='<div class="empty-conv">📭 Aucun livre.<br>Ajoutez-en via le bouton ci-dessus.</div>';
    return;
  }
  el.innerHTML = docs.map(l=>{
    const titre = (l.tit?.fr || l.tit?.mg || l.titre || l.id);
    const stock = l.stock
      ? '<span class="badge badge-ok">✅ En stock</span>'
      : '<span class="badge badge-cancel">❌ Rupture</span>';
    return `<div class="item-card">
      <div class="item-title">${l.ic||'📖'} ${titre}</div>
      <div class="item-sub">✍️ ${l.aut||l.auteur||'—'} · ${l.prix||'—'}</div>
      <div class="item-meta">${stock}</div>
      <div class="action-row">
        <button class="abtn abtn-edit" onclick="ouvrirModalLivre('${l.id}')">✏️ Modifier</button>
        <button class="abtn abtn-ok"   onclick="toggleStock('${l.id}',${!l.stock})">${l.stock?'❌ Rupture':'✅ En stock'}</button>
        <button class="abtn abtn-del"  onclick="supprimerLivre('${l.id}')">🗑️ Supprimer</button>
      </div>
    </div>`;
  }).join('');
}

let livreEditId = null;

function ouvrirModalLivre(id){
  livreEditId = id || null;
  _('mliv-id').value = id || '';
  _('mliv-title').textContent = id ? '✏️ Modifier le livre' : '📚 Ajouter un livre';
  if(id){
    db.collection('livres').doc(id).get().then(doc=>{
      if(!doc.exists) return;
      const d = doc.data();
      _('mliv-ic').value       = d.ic || '📖';
      _('mliv-cat').value      = d.cat || 'bible';
      _('mliv-tit-mg').value   = d.tit?.mg || d.titre || '';
      _('mliv-tit-fr').value   = d.tit?.fr || '';
      _('mliv-aut').value      = d.aut || d.auteur || '';
      _('mliv-prix').value     = d.prix || '';
      _('mliv-ordre').value    = d.ordre || 99;
      _('mliv-desc').value     = d.desc?.fr || d.description || '';
      _('mliv-stock').checked  = d.stock !== false;
    });
  } else {
    ['mliv-ic','mliv-tit-mg','mliv-tit-fr','mliv-aut','mliv-prix','mliv-desc'].forEach(i=>{
      const e = _(i); if(e) e.value='';
    });
    _('mliv-ordre').value = 99;
    _('mliv-stock').checked = true;
    _('mliv-cat').value = 'bible';
  }
  _('modal-livre').classList.add('open');
}

function fermerModalLivre(){
  _('modal-livre').classList.remove('open');
}

async function sauvegarderLivre(){
  const ic    = _('mliv-ic').value.trim()    || '📖';
  const cat   = _('mliv-cat').value          || 'bible';
  const titMg = _('mliv-tit-mg').value.trim();
  const titFr = _('mliv-tit-fr').value.trim();
  const aut   = _('mliv-aut').value.trim();
  const prix  = _('mliv-prix').value.trim();
  const ordre = parseInt(_('mliv-ordre').value)||99;
  const desc  = _('mliv-desc').value.trim();
  const stock = _('mliv-stock').checked;
  if(!titMg && !titFr){ showT('⚠️ Entrez au moins un titre'); return; }
  const data = {
    ic, cat, aut, prix, ordre, stock,
    tit:  { mg: titMg || titFr, fr: titFr || titMg, en: titFr || titMg },
    desc: { mg: desc, fr: desc, en: desc },
    mis_a_jour: firebase.firestore.FieldValue.serverTimestamp()
  };
  try {
    const id = _('mliv-id').value;
    if(id){
      await db.collection('livres').doc(id).update(data);
      showT('✅ Livre modifié !');
    } else {
      data.cree_le = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection('livres').add(data);
      showT('✅ Livre ajouté !');
    }
    fermerModalLivre();
  } catch(e){ showT('❌ '+e.message); }
}

async function toggleStock(id, newStock){
  try {
    await db.collection('livres').doc(id).update({stock: newStock});
    showT(newStock ? '✅ Livre remis en stock' : '❌ Marqué en rupture');
  } catch(e){ showT('❌ '+e.message); }
}

async function supprimerLivre(id){
  if(!confirm('Supprimer ce livre définitivement ?')) return;
  try {
    await db.collection('livres').doc(id).delete();
    showT('🗑️ Livre supprimé');
  } catch(e){ showT('❌ '+e.message); }
}

/* ══════════════════ PUBLICATION ACTUALITÉS ══════════════════ */
let adminPhotoB64 = null;
let pubUnsub = null;

function previewAdminPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) { showT('⚠️ Image trop lourde (max 3MB)'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    adminPhotoB64 = e.target.result;
    _('pub-img').src = adminPhotoB64;
    _('pub-img-preview').style.display = '';
    _('pub-img-lbl').textContent = file.name;
  };
  reader.readAsDataURL(file);
}

function clearAdminPhoto() {
  adminPhotoB64 = null;
  _('pub-img-file').value = '';
  _('pub-img-preview').style.display = 'none';
  _('pub-img-lbl').textContent = 'Choisir une image...';
}

async function publierActualite() {
  const txt = (_('pub-txt').value || '').trim();
  if (!txt) { showT('⚠️ Écrivez un message'); return; }
  const cat = _('pub-cat').value || 'hafatra';
  const vs  = (_('pub-vs').value || '').trim();
  const label = { evanjely:'✦ Evanjely', fiderana:'🙌 Fiderana', vaovao:'🌍 Vaovao', hafatra:'✦ Hafatra' }[cat] || '✦ Hafatra';
  const nom = currentPastor?.displayName || currentPastor?.email?.split('@')[0] || 'Pasteur';

  const data = {
    auteur_uid: currentPastor.uid,
    auteur_nom: nom,
    auteur_avatar: '✝',
    auteur_pays: 'Madagascar',
    texte: txt, verset: vs, verset_ref: '',
    categorie: cat, categorie_label: label,
    likes: 0, likes_uids: [], nb_commentaires: 0,
    par_pasteur: true,
    cree_le: firebase.firestore.FieldValue.serverTimestamp()
  };
  if (adminPhotoB64) data.photo_url = adminPhotoB64;

  try {
    await db.collection('actualites').add(data);
    _('pub-txt').value = '';
    _('pub-vs').value  = '';
    clearAdminPhoto();
    showT('✅ Publication envoyée à tous les fidèles !');
    chargerPubRecentes();
  } catch(e) { showT('❌ ' + e.message); }
}

function chargerPubRecentes() {
  if (pubUnsub) pubUnsub();
  pubUnsub = db.collection('actualites')
    .orderBy('cree_le', 'desc').limit(5)
    .onSnapshot(snap => {
      const el = _('pub-recent');
      if (!el) return;
      if (!snap.docs.length) { el.innerHTML = '📭 Aucune publication'; return; }
      el.innerHTML = snap.docs.map(d => {
        const data = d.data();
        const ago = data.cree_le ? timeAgo(data.cree_le) : '';
        const txt = (data.texte || '').slice(0, 60) + ((data.texte||'').length > 60 ? '…' : '');
        const isPasteur = data.par_pasteur ? ' <span style="color:var(--gold);font-size:10px">✝ Pasteur</span>' : '';
        return `<div style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);display:flex;gap:8px;align-items:flex-start">
          <span style="font-size:16px">${data.auteur_avatar||'😊'}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;color:var(--cream);line-height:1.5">${txt}</div>
            <div style="font-size:11px;color:var(--mut);margin-top:3px">${ago}${isPasteur}</div>
          </div>
          <button onclick="supprimerActu('${d.id}')" style="background:none;border:none;color:var(--mut);font-size:16px;cursor:pointer;flex-shrink:0;padding:0 2px" title="Supprimer">🗑</button>
        </div>`;
      }).join('');
    }, () => {});
}

async function supprimerActu(id) {
  if (!confirm('Supprimer cette publication ?')) return;
  try {
    await db.collection('actualites').doc(id).delete();
    showT('🗑️ Publication supprimée');
  } catch(e) { showT('❌ ' + e.message); }
}

/* ══════════════════ SWITCHTAB étendu ══════════════════ */
function switchTab(tab){
  switchTabBase(tab);
  if(tab==='cmd') chargerCommandes();
  if(tab==='don') chargerDons();
  if(tab==='liv') chargerLivresAdmin();
  if(tab==='pub') chargerPubRecentes();
}

/* ══════════════════ MOBILE SIDEBAR ══════════════════ */
/* Ouvrir sidebar sur mobile via header */
document.querySelector('.logo').addEventListener('click', ()=>{
  _('sidebar').classList.toggle('open');
});
