/* ═══════════════════════════════════════════════════════════════
   ZivOr PWA — Core Logic (app.js)
   Firebase, Chat, Feed, FCM & Administration
════════════════════════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey:            "AIzaSyAIet6GftRvcyJMCyUDERSCVmmZq0d-A-Q",
  authDomain:        "fanantenana-cf5ea.firebaseapp.com",
  projectId:         "fanantenana-cf5ea",
  storageBucket:     "fanantenana-cf5ea.firebasestorage.app",
  messagingSenderId: "746464673923",
  appId:             "1:746464673923:web:e6bd1564141d5a081ddbb6"
};

let db = null, auth = null;
function initFirebase() {
  try {
    if (typeof firebase === 'undefined') return;
    if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db   = firebase.firestore();
    auth = firebase.auth();
    if (auth) {
      const trySignIn = (retries) => {
        auth.signInAnonymously()
          .then(r => {
            currentUser = r.user;
            const dot = document.getElementById('fbdot');
            if (dot) { dot.style.color = '#4CAF7D'; dot.title = 'Firebase ✅'; }
            if (r.user?.uid) localStorage.setItem('fn_uid', r.user.uid);
          })
          .catch(e => {
            console.warn('Auth attempt failed:', e.code);
            if (retries > 0 && e.code === 'auth/network-request-failed') {
              setTimeout(() => trySignIn(retries - 1), 3000);
            }
          });
      };
      trySignIn(3);
      auth.onAuthStateChanged(u => { currentUser = u; });
    }
  } catch(e) {
    console.warn('Firebase init error:', e.message);
  }
}

/* ──────────────────────────────────────────────────────────────
   ÉTAT GLOBAL
────────────────────────────────────────────────────────────────*/
let currentUser    = null;
let chatUnsub      = null;
let feedUnsub      = null;
let temoUnsub      = null;
let deferredInstall = null;

let lang = 'mg', isDark = true;
let cT, cBooks, cLid;
let timerInt, timerTotal = 300, timerLeft = 300, timerRunning = false;
let curRoom = null, curPasteurName = '';
let autoReply = null;
let allTemo = [], temoFilt = 'all';
let livFilt = 'all', currentLivre = null;
let feedPosts = [];

/* ──────────────────────────────────────────────────────────────
   CHAT PASTEUR — LOGIQUE STABILISÉE
────────────────────────────────────────────────────────────────*/
async function sMsg() {
  const inp = _('cinp');
  const txt = inp.value.trim();
  if (!txt) return;
  if (!db || !curRoom) { 
    addBub(txt, 'out', now()); 
    if (inp) inp.value = '';
    /* Fallback auto-reply if offline/no db */
    setTimeout(() => {
      const reps = L[lang].chat_reps;
      addBub(reps[Math.floor(Math.random() * reps.length)], 'in', now());
    }, 1500);
    return; 
  }
  
  const p = getProfil();
  const nomComplet = p.prenom ? (p.prenom + ' ' + (p.nom || '')).trim() : null;
  const uid = currentUser ? currentUser.uid : (localStorage.getItem('fn_uid') || 'anon');
  
  if (inp) inp.value = '';
  
  try {
    // 1. Ajouter le message
    await db.collection('chats').doc(curRoom).collection('messages').add({
      texte: txt, uid: uid,
      nom: nomComplet || ('Fidèle ' + uid.slice(-4)),
      avatar: '😊', lu: false,
      cree_le: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 2. Mettre à jour la conversation pour le pasteur
    const convData = {
      dernier_message:   txt,
      derniere_activite: firebase.firestore.FieldValue.serverTimestamp(),
      pasteur_nom:       curPasteurName,
      pasteur_id:        curRoom.split('_').slice(1,-1).join('_'),
      non_lus:           firebase.firestore.FieldValue.increment(1),
      nom_utilisateur:   nomComplet || ('Fidèle ' + uid.slice(-4))
    };
    if (p.adresse) convData.adresse = p.adresse;
    if (p.tel)     convData.telephone = p.tel;
    if (p.eglise)  convData.eglise = p.eglise;
    
    await db.collection('conversations').doc(curRoom).set(convData, { merge: true });

    // 3. Notification PUSH au pasteur
    try {
      const pasteurDocId = convData.pasteur_id;
      const tokDoc = await db.collection('pasteur_tokens').doc(pasteurDocId).get();
      if (tokDoc.exists && tokDoc.data().token) {
        // Envoi via Netlify function ou direct si configuré (ici on simule ou on garde la structure fetch)
        fetch('/.netlify/functions/notify', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            token: tokDoc.data().token,
            title: '💬 ZivOr : Nouveau message',
            body: nomComplet + ' : ' + (txt.length > 60 ? txt.substring(0, 60) + '...' : txt),
            url: '/admin.html'
          })
        }).catch(()=>{});
      }
    } catch(errPush) { console.warn('Push notify failed', errPush); }

  } catch (e) {
    console.error('Send error:', e);
    addBub(txt, 'out', now());
    showT('⚠️ Erreur d\'envoi, message stocké localement');
  }
}

function openChat(av, name, tel, pasteurId) {
  curPasteurName = name;
  t_('cav2',  av);
  t_('cnam2', name);
  t_('ctel2', '📞 ' + tel);
  _('cmsgs').innerHTML = '';
  _('cpanel').classList.add('open');

  let uid;
  if (currentUser && !currentUser.isAnonymous) {
    uid = currentUser.uid;
  } else if (currentUser) {
    uid = currentUser.uid;
  } else {
    uid = localStorage.getItem('fn_uid');
    if (!uid) { uid = 'anon_' + Math.random().toString(36).slice(2,10); localStorage.setItem('fn_uid', uid); }
  }
  curRoom    = 'chat_' + pasteurId + '_' + uid;
  const fb   = _('fbstat');

  if (chatUnsub) { chatUnsub(); chatUnsub = null; }

  chatUnsub = db.collection('chats').doc(curRoom).collection('messages')
    .orderBy('cree_le', 'asc').limit(50)
    .onSnapshot(
      snap => {
        if (fb) {
          fb.className  = 'fbstat fbon';
          fb.textContent = L[lang].chat_on;
        }
        if (snap.empty && _('cmsgs').children.length === 0) {
          setTimeout(() => addBub(L[lang].chat_welcome, 'in', now()), 400);
        }
        snap.docChanges().forEach(change => {
          if (change.type === 'added') {
            const d   = change.doc.data();
            const dir = d.uid === uid ? 'out' : 'in';
            if (!document.getElementById('msg-' + change.doc.id)) {
              addBub(d.texte || '', dir, now(), change.doc.id);
            }
          }
        });
      },
      () => {
        if (fb) {
          fb.className  = 'fbstat fboff';
          fb.textContent = L[lang].chat_off;
        }
        if (_('cmsgs').children.length === 0) {
          setTimeout(() => addBub(L[lang].chat_welcome, 'in', now()), 400);
        }
      }
    );
}

function addBub(txt, dir, h, id) {
  const msgs = _('cmsgs');
  if (!msgs) return;
  const d    = document.createElement('div');
  d.className = 'bub ' + dir;
  if (id) d.id = 'msg-' + id;
  d.innerHTML  = esc(txt) + (h ? `<div class="btime">${h}</div>` : '');
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

/* ──────────────────────────────────────────────────────────────
   FEED ACTUALITÉS
────────────────────────────────────────────────────────────────*/
function chargerFeed() {
  if (!feedPosts.length) { feedPosts = [...DEF_POSTS]; renderFeed(); renderHomeFeed(); }
  if (feedUnsub || !db) return;
  feedUnsub = db.collection('actualites')
    .orderBy('cree_le', 'desc').limit(30)
    .onSnapshot(snap => {
      const live = snap.docs.map(d => ({ id: d.id, ...d.data(), cree_le: fmtTS(d.data().cree_le) }));
      feedPosts = live.length ? [...live, ...DEF_POSTS.filter(dp => !live.find(p => p.id === dp.id))] : [...DEF_POSTS];
      renderFeed(); 
      renderHomeFeed();
    });
}

function renderFeed() {
  const c = _('actu-feed'); if (!c) return;
  c.innerHTML = feedPosts.map(p => `
    <div class="card">
      <div style="display:flex;gap:12px;margin-bottom:10px">
        <div class="lmark" style="width:34px;height:34px;font-size:16px">${p.auteur_avatar||'🌍'}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:14px;color:var(--gold2)">${esc(p.auteur_nom)}</div>
          <div style="font-size:11px;color:var(--mut)">${esc(p.auteur_pays)} · ${timeAgo(p.cree_le)}</div>
        </div>
      </div>
      <div style="font-size:14px;line-height:1.6;margin-bottom:10px">${esc(p.texte)}</div>
      ${p.verset ? `<div style="background:rgba(212,175,55,.05);border-left:3px solid var(--gold);padding:8px 12px;margin-bottom:10px;font-family:var(--f-serif);font-size:13px;font-style:italic">"${esc(p.verset)}" <span style="font-size:11px;opacity:.6">— ${esc(p.verset_ref)}</span></div>` : ''}
      <div style="display:flex;gap:15px;border-top:1px solid var(--border);padding-top:10px;margin-top:10px">
         <button class="feed-btn">❤️ ${p.likes||0}</button>
         <button class="feed-btn">💬 ${p.nb_commentaires||0}</button>
      </div>
    </div>
  `).join('');
}

function renderHomeFeed() {
  const c = _('home-feed'); if (!c) return;
  c.innerHTML = feedPosts.slice(0, 3).map(p => `
    <div class="card" style="padding:14px;margin-bottom:10px">
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px">
         <div style="font-size:18px">${p.auteur_avatar||'🌍'}</div>
         <div style="font-weight:700;font-size:13px;color:var(--gold2)">${esc(p.auteur_nom)}</div>
      </div>
      <div style="font-size:13px;line-height:1.5">${esc(p.texte.substring(0, 100))}${p.texte.length>100?'...':''}</div>
    </div>
  `).join('');
}

/* ──────────────────────────────────────────────────────────────
   FCM / NOTIFICATIONS
────────────────────────────────────────────────────────────────*/
var FCM_VAPID_KEY = 'REMPLACE_PAR_TA_CLE_VAPID_ICI';
var fcmMessaging = null;

async function initFCM() {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
  if (!firebase || !firebase.messaging) return;
  try {
    fcmMessaging = firebase.messaging();
    fcmMessaging.onMessage(payload => {
      var notif  = payload.notification || {};
      showT('🔔 ' + (notif.title || 'ZivOr') + ' — ' + (notif.body || '').substring(0,60));
    });
    if (Notification.permission === 'granted') await fcmGetToken();
  } catch(e) {}
}

async function fcmDemanderPermission() {
  if (!('Notification' in window)) return;
  try {
    var perm = await Notification.requestPermission();
    if (perm === 'granted') {
      showT('✅ Notifications activées !');
      await fcmGetToken();
    }
  } catch(e) {}
}

async function fcmGetToken() {
  if (!fcmMessaging || FCM_VAPID_KEY === 'REMPLACE_PAR_TA_CLE_VAPID_ICI') return;
  try {
    var swReg = await navigator.serviceWorker.ready;
    var token = await fcmMessaging.getToken({ vapidKey: FCM_VAPID_KEY, serviceWorkerRegistration: swReg });
    if (!token) return;
    var uid = (currentUser ? currentUser.uid : localStorage.getItem('fn_uid')) || 'anon';
    await db.collection('fcm_tokens').doc(uid).set({
      token, uid, plateforme: 'web', mis_a_jour: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch(e) {}
}

/* ──────────────────────────────────────────────────────────────
   INITIALISATION Lifecycle
────────────────────────────────────────────────────────────────*/
(function init() {
  setTimeout(() => {
    try { loadMode(); } catch(e) {}
    try { sL(localStorage.getItem('fn_lang') || 'mg'); } catch(e) {}
    try { lB('AT'); } catch(e) {}
    try { renderMedThemes(); } catch(e) {}
    try { initFirebase(); } catch(e) {}
    
    var tries = 15;
    function waitFirebase() {
      if (db) {
        try { chargerFeed(); chargerTemo(); chargerLivres(); initFCM(); } catch(e) {}
        const splash = document.getElementById('splash');
        if (splash) { 
           splash.classList.add('hide'); 
           setTimeout(() => splash.classList.add('gone'), 500); 
        }
      } else if (tries-- > 0) {
        setTimeout(waitFirebase, 400);
      }
    }
    setTimeout(waitFirebase, 300);
    try { prechargerBibles(); } catch(e) {}
  }, 100);
})();
