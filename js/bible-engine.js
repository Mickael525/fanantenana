function lB(t, btn) {
  cT = t;
  cBooks = t === 'AT' ? AT : NT;
  _('ll').style.display = '';
  _('cv').style.display = 'none';
  _('vv').style.display = 'none';
  _('sr').style.display = 'none';
  if (btn) {
    document.querySelectorAll('.ttab').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  }
  _('ll').innerHTML = cBooks.map((b, i) =>
    `<div class="litem" onclick="lC(${i})">
       <span class="litn">${b[lang] || b.mg}</span>
       <span class="litc">${L[lang].bible_ch} 1–${b.ch}</span>
     </div>`
  ).join('');
}

function lC(i) {
  const b = cBooks[i];
  cLid = i;
  _('ll').style.display = 'none';
  _('cv').style.display = '';
  _('cv').innerHTML =
    `<button class="btn-back" onclick="lB(cT)">${L[lang].bk_books}</button>
     <div style="font-family:var(--f-serif);font-size:18px;color:var(--gold2);margin:9px 0 12px">${b[lang] || b.mg}</div>` +
    Array.from({length: b.ch}, (_, j) =>
      `<div class="litem" onclick="lV(${j+1})">
         <span class="litn">${L[lang].bible_ch} ${j+1}</span>
         <span class="litc">→</span>
       </div>`
    ).join('');
}

/* ── BIBLE COMPLÈTE — Double API avec fallback ─────────────────
   1er essai : api.getbible.net/v2/{lsg|kjv|mal}/{bookNr}/{ch}.json
   2e essai  : bible-api.com/{name}+{ch}?translation={lsg|kjv}
   Structure getbible: { verses: [{verse:N, text:"..."}] }
──────────────────────────────────────────────────────────────*/
const bibleCache = {};

/* ── Bible JSON chargée en mémoire (priorité absolue) ── */
var BIBLE_DATA = { mg: null, fr: null, en: null };
var BIBLE_LOADING = { mg: false, fr: false, en: false };

async function chargerBibleEnMemoire(lg) {
  if (BIBLE_DATA[lg] || BIBLE_LOADING[lg]) return;
  BIBLE_LOADING[lg] = true;
  try {
    var base = window.location.href.replace(/index\.html.*$/, '').replace(/\/$/, '') + '/';
    var resp = await fetch(base + 'bible-' + lg + '.json', { cache: 'force-cache' });
    if (!resp.ok) return;
    var data = await resp.json();
    if (data && data.books) {
      BIBLE_DATA[lg] = data.books;
      console.log('✅ Bible ' + lg.toUpperCase() + ' chargée en mémoire');
    }
  } catch(e) {
    console.warn('Bible JSON ' + lg + ':', e.message);
  }
}

/* Charger les 3 langues dès le démarrage */
function prechargerBibles() {
  chargerBibleEnMemoire('mg');
  chargerBibleEnMemoire('fr');
  chargerBibleEnMemoire('en');
}

/* Lire un chapitre depuis la mémoire */
function lireChapitreMemoire(lg, bookId, ch) {
  var books = BIBLE_DATA[lg];
  if (!books) return null;
  var book = books[String(bookId)];
  if (!book || !book.chapters) return null;
  var verses = book.chapters[String(ch)];
  if (!verses || Object.keys(verses).length === 0) return null;
  return verses;
}

const B_SLUG = {
  1:'genesis',2:'exodus',3:'leviticus',4:'numbers',5:'deuteronomy',
  6:'joshua',7:'judges',8:'ruth',9:'1-samuel',10:'2-samuel',
  11:'1-kings',12:'2-kings',13:'1-chronicles',14:'2-chronicles',
  15:'ezra',16:'nehemiah',17:'esther',18:'job',19:'psalms',
  20:'proverbs',21:'ecclesiastes',22:'song-of-solomon',23:'isaiah',
  24:'jeremiah',25:'lamentations',26:'ezekiel',27:'daniel',28:'hosea',
  29:'joel',30:'amos',31:'obadiah',32:'jonah',33:'micah',34:'nahum',
  35:'habakkuk',36:'zephaniah',37:'haggai',38:'zechariah',39:'malachi',
  40:'matthew',41:'mark',42:'luke',43:'john',44:'acts',45:'romans',
  46:'1-corinthians',47:'2-corinthians',48:'galatians',49:'ephesians',
  50:'philippians',51:'colossians',52:'1-thessalonians',53:'2-thessalonians',
  54:'1-timothy',55:'2-timothy',56:'titus',57:'philemon',58:'hebrews',
  59:'james',60:'1-peter',61:'2-peter',62:'1-john',63:'2-john',
  64:'3-john',65:'jude',66:'revelation'
};

function fetchT(url, ms) {
  ms = ms || 7000;
  const ctrl = new AbortController();
  const t = setTimeout(function() { ctrl.abort(); }, ms);
  return fetch(url, { signal: ctrl.signal })
    .then(function(r) { clearTimeout(t); return r; })
    .catch(function(e) { clearTimeout(t); throw e; });
}

function versetsToHtml(data) {
  let arr = [];
  if (Array.isArray(data)) arr = data;
  else if (data && data.verses) arr = Array.isArray(data.verses) ? data.verses : Object.values(data.verses);
  else if (data && data.data) arr = Array.isArray(data.data) ? data.data : Object.values(data.data);
  else if (data && typeof data === 'object') arr = Object.values(data);
  if (!arr.length) return null;
  return arr.map(function(v) {
    const num = v.verse || v.verse_nr || v.number || v.pk || '';
    const txt = (v.text || v.verse_text || v.t || '').replace(/\s+/g,' ').trim();
    if (!txt) return '';
    return '<div class="vitem"><span class="vnum">' + num + '</span>' + txt + '</div>';
  }).filter(Boolean).join('');
}

async function lV(ch, vnum) {
  _('cv').style.display = 'none';
  _('vv').style.display = '';
  const b = cBooks[cLid];
  const nom = b[lang] || b.mg;
  const slug = B_SLUG[b.id] || 'genesis';
  const tr = (lang === 'en') ? 'kjv' : (lang === 'mg') ? 'malagasy' : 'lsg';
  const lsLang = (lang === 'en') ? 'en-kjv' : 'fr-lsg';
  const bollsTr = (lang === 'en') ? 'KJV' : (lang === 'mg') ? 'MG' : 'LSG';
  const ck = tr + '_' + b.id + '_' + ch;
  const hdr = '<button class="btn-back" onclick="lC(' + cLid + ')">' +
    (L[lang] ? L[lang].bk_ch : 'Toko') + '</button>' +
    '<div style="font-family:var(--f-serif);font-size:18px;color:var(--gold2);margin:9px 0 14px">' +
    esc(nom) + ' - Chapitre ' + esc(String(ch)) + '</div>';

  setHtml('vv', hdr + '<div style="text-align:center;padding:50px 20px;color:var(--mut)"><span class="spin" style="display:inline-block;width:32px;height:32px;border-width:3px"></span><div style="margin-top:14px;font-size:14px">Chargement...</div></div>');

  try { if (lang === 'mg') await chargerBibleEnMemoire('mg'); } catch(e) {}

  const memVerses = lireChapitreMemoire(lang, b.id, ch);
  if (memVerses && Object.keys(memVerses).length) {
    setHtml('vv', hdr + renderVerseMap(memVerses));
    setTimeout(function(){ injecterActionsVersets(ch); }, 300);
    return;
  }

  try {
    const dbVerses = await lireChapitreDB(lang, b.id, ch);
    if (dbVerses && Object.keys(dbVerses).length > 0) {
      setHtml('vv', hdr + renderVerseMap(dbVerses));
      setTimeout(function(){ injecterActionsVersets(ch); }, 300);
      return;
    }
  } catch(e) {}

  if (bibleCache[ck]) { setHtml('vv', hdr + bibleCache[ck]); return; }

  try {
    const saved = localStorage.getItem('bib_' + ck);
    if (saved && lang !== 'mg') { bibleCache[ck] = saved; setHtml('vv', hdr + saved); return; }
  } catch(e) {}

  if (lang === 'mg') {
    return;
  }

  let html = null;
  const trySources = [
    async function(){ const r = await fetchT('https://api.getbible.net/v2/' + tr + '/' + b.id + '/' + ch + '.json', 7000); if(r.ok){ const d=await r.json(); const vv=d.verses?Object.values(d.verses):null; if(vv&&vv.length) return renderVerseArray(vv);} },
    async function(){ const r = await fetchT('https://bolls.life/get-text/' + bollsTr + '/' + b.id + '/' + ch + '/', 7000); if(r.ok){ const d=await r.json(); if(Array.isArray(d)&&d.length) return renderVerseArray(d);} },
    async function(){ const r = await fetchT('https://getbible.net/json?p=' + slug + ch + '&v=' + tr, 7000); if(r.ok){ let tx=await r.text(); tx=tx.replace(/^\(/,'').replace(/\);?$/,''); const d=JSON.parse(tx); const bk=d.book||(d[0]&&d[0].book)||[]; const vv=Array.isArray(bk)?bk:Object.values(bk); if(vv.length) return renderVerseArray(vv);} },
    async function(){ const r = await fetchT('https://cdn.jsdelivr.net/gh/wldeh/bible-api@main/bibles/' + lsLang + '/books/' + slug + '/chapters/' + ch + '.json', 8000); if(r.ok){ const d=await r.json(); const arr=Array.isArray(d)?d:(d.data?d.data:(d.verses?Object.values(d.verses):[])); if(arr.length) return renderVerseArray(arr);} },
    async function(){ const r = await fetchT('https://raw.githubusercontent.com/wldeh/bible-api/main/bibles/' + lsLang + '/books/' + slug + '/chapters/' + ch + '.json', 8000); if(r.ok){ const d=await r.json(); const arr=Array.isArray(d)?d:(d.data?d.data:(d.verses?Object.values(d.verses):[])); if(arr.length) return renderVerseArray(arr);} },
    async function(){ const r = await fetchT('https://bible-api.com/' + slug + '+' + ch + '?translation=' + (lang==='en'?'kjv':'lsg'), 8000); if(r.ok){ const d=await r.json(); if(d&&d.verses&&d.verses.length) return renderVerseArray(d.verses);} }
  ];
  for (var i=0;i<trySources.length && !html;i++) { try { html = await trySources[i](); } catch(e) { console.warn('Bible source', i+1, e && e.message); } }

  if (html && html.length > 30) {
    bibleCache[ck] = html;
    try { localStorage.setItem('bib_' + ck, html); } catch(e) {}
    setHtml('vv', hdr + html);
    setTimeout(function(){ injecterActionsVersets(ch); }, 300);
  } else {
    const lienExt = 'https://saintebible.com/lsg/' + slug + '/' + ch + '/';
    const lienExt2 = 'https://www.biblegateway.com/passage/?search=' + slug + '+' + ch + '&version=' + (lang==='en'?'NIV':'LSG');
    setHtml('vv', hdr + '<div style="text-align:center;padding:28px 20px"><div style="font-size:40px;margin-bottom:12px">📡</div><div style="font-size:15px;color:var(--cream);font-weight:600;margin-bottom:8px">' + esc(nom) + ' ' + esc(String(ch)) + '</div><div style="font-size:13px;color:var(--mut);line-height:1.9;margin-bottom:18px">Les sources sont inaccessibles.<br>Vérifiez votre connexion.</div><div style="display:flex;flex-direction:column;gap:10px;align-items:center"><button onclick="lV(' + ch + ')" style="padding:11px 28px;background:linear-gradient(135deg,var(--gold),#a07020);border:none;color:#070510;font-weight:700;border-radius:20px;cursor:pointer;font-family:var(--f-body);font-size:14px">🔄 Réessayer</button><a href="' + escAttr(lienExt) + '" target="_blank" rel="noopener" style="padding:10px 24px;background:rgba(201,150,58,.1);border:1px solid rgba(201,150,58,.3);color:var(--gold);border-radius:20px;font-size:13px;text-decoration:none">📖 saintebible.com</a><a href="' + escAttr(lienExt2) + '" target="_blank" rel="noopener" style="padding:10px 24px;background:rgba(74,144,217,.1);border:1px solid rgba(74,144,217,.3);color:#4A90D9;border-radius:20px;font-size:13px;text-decoration:none">📖 biblegateway.com</a></div></div>');
  }
}


  return (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}
function escapeRegExp(s) { return (s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function highlightBibleText(txt, q) {
  var safeTxt = escHtml(txt || '');
  var nq = normalizeBibleSearchText(q);
  if (!nq) return safeTxt;
  var tokens = nq.split(/\s+/).filter(function(t){ return t.length >= 2; });
  var out = safeTxt;
  tokens.forEach(function(tok){ out = out.replace(new RegExp('(' + escapeRegExp(tok) + ')', 'gi'), '<mark>$1</mark>'); });
  return out;
}
function verseMatchesQuery(txt, normalizedQuery) {
  var norm = normalizeBibleSearchText(txt);
  var tokens = (normalizedQuery || '').split(/\s+/).filter(Boolean);
  return !!tokens.length && tokens.every(function(tok){ return norm.indexOf(tok) !== -1; });
}
async function rechercherBibleFullText(query) {
  var rawQuery = (query || '').trim();
  query = normalizeBibleSearchText(rawQuery);
  if (query.length < 2) return [];
  var results = [];
  var seen = {};
  function pushResult(bookId, ch, vnum, txt, ref, dv) {
    var key = String(ref || '') + '|' + String(vnum || '');
    if (seen[key]) return;
    seen[key] = true;
    results.push({ bookId:bookId, ch:ch, vnum:vnum, txt:txt, ref:ref, dv:!!dv });
  }
  try {
    var db = await ouvrirBibleDB();
    var tx = db.transaction('chapitres','readonly');
    var store = tx.objectStore('chapitres');
    
    // Optimisation : Récupérer tout le contenu d'un coup pour la langue sélectionnée
    // si le volume est raisonnable, sinon on continue par clé mais plus intelligemment.
    // Ici on va utiliser cursor pour éviter de charger toutes les clés en mémoire si possible,
    // mais getAllKeys + filtered est déjà pas mal. Le goulot d'étranglement est store.get(key) dans la boucle.
    
    var allData = await new Promise(function(resolve){ 
      var req = store.getAll(); // On récupère tout pour filtrer en mémoire, c'est souvent plus rapide que des milliers de requêtes IDB
      req.onsuccess = function(){ resolve(req.result || []); };
      req.onerror = function(){ resolve([]); };
    });

    for (var i = 0; i < allData.length; i++) {
      var item = allData[i];
      // On suppose que l'objet stocké a une propriété pour sa propre clé ou qu'on peut filtrer par structure
      // En regardant l'init : store.put(verses, lang + '_' + b.id + '_' + c);
      // Malheureusement getAll ne donne pas la clé. On va devoir rester sur getAllKeys mais limiter les get().
    }
    
    // Retour à la méthode keys mais avec une limite de résultats pour la performance
    var keys = await new Promise(function(resolve){ var req=store.getAllKeys(); req.onsuccess=function(){resolve(req.result||[]);}; req.onerror=function(){resolve([]);}; });
    var filtered = keys.filter(function(k){ return String(k).startsWith(lang + '_'); });
    
    for (var i = 0; i < filtered.length; i++) {
       if (results.length > 200) break; // Limite raisonnable pour la performance
       var skey = filtered[i];
       var verses = await new Promise(function(resolve){ var r=store.get(skey); r.onsuccess=function(){resolve(r.result||null);}; r.onerror=function(){resolve(null);}; });
       if (!verses) continue;
       var parts = String(skey).split('_');
       var bookId = parseInt(parts[1]);
       var ch = parseInt(parts[2]);
       var bName = (BOOK_NAMES[lang]||BOOK_NAMES.mg)[bookId];
       
       Object.keys(verses).forEach(function(vnum){ 
         var txt = verses[vnum]; 
         if (verseMatchesQuery(txt, query)) {
           pushResult(bookId, ch, vnum, txt, bName + ' ' + ch + ':' + vnum, false); 
         }
       });
    }
  } catch(e) { console.error("Search error:", e); }
  
  DV.forEach(function(v){ 
    var txt = v[lang] || v.mg || ''; 
    if (verseMatchesQuery(txt, query)) pushResult(0, 0, '', txt, v.ref, true); 
  });
  
  results.sort(function(a,b){ 
    if (!!a.dv !== !!b.dv) return a.dv ? 1 : -1; 
    if ((a.bookId||0)!==(b.bookId||0)) return (a.bookId||0)-(b.bookId||0); 
    if ((a.ch||0)!==(b.ch||0)) return (a.ch||0)-(b.ch||0); 
    return parseInt(a.vnum||0)-parseInt(b.vnum||0); 
  });
  return results;
}
var bibleSearchTimeout = null;
function srchBible(q) {
  if (bibleSearchTimeout) clearTimeout(bibleSearchTimeout);
  var val = (q || '').trim();
  
  var btnClear = _('si-clear');
  if (btnClear) btnClear.style.display = val ? 'block' : 'none';

  if (!val) {
    clearSrchBible();
    return;
  }
  // Afficher un petit indicateur de chargement si c'est long
  var sr = _('sr');
  if (sr && sr.style.display === 'none') {
    ['ll','cv','vv'].forEach(function(id){ var e = _(id); if (e) e.style.display = 'none'; });
    sr.style.display = '';
    sr.innerHTML = '<div style="text-align:center;padding:40px;color:var(--mut)"><div class="spinner" style="margin:0 auto 10px"></div>Recherche en cours...</div>';
  }

  bibleSearchTimeout = setTimeout(function() {
    doSrchBible(val);
  }, 350);
}

function clearSrchBible() {
  var si = _('si'); if (si) si.value = '';
  var btnClear = _('si-clear'); if (btnClear) btnClear.style.display = 'none';
  ['cv','vv','sr'].forEach(function(id){ var e = _(id); if (e) e.style.display = 'none'; });
  var ll = _('ll'); if (ll) ll.style.display = '';
}

async function doSrchBible(q) {
  var sr = _('sr'); 
  if (!sr) return;
  
  var ql = normalizeBibleSearchText(q);
  var dvRes = DV.filter(function(v){ return verseMatchesQuery(v[lang]||v.mg, ql) || normalizeBibleSearchText(v.ref).indexOf(ql)!==-1; });
  var bkRes = [...AT,...NT].filter(function(b){ return normalizeBibleSearchText(b[lang]||b.mg).indexOf(ql)!==-1 || normalizeBibleSearchText(b.fr||'').indexOf(ql)!==-1 || normalizeBibleSearchText(b.en||'').indexOf(ql)!==-1; });
  
  var ftResults = await rechercherBibleFullText(q);
  var totalQ = dvRes.length + bkRes.length + ftResults.length;
  
  var html = '<div class="sr-count">🔍 &quot;' + esc(q) + '&quot; — ' + totalQ + ' résultat(s)</div>';
  
  if (ftResults.length > 0) {
    html += '<div style="font-size:11px;letter-spacing:1.5px;color:var(--gold);font-weight:700;margin-bottom:8px">📖 VERSETS (' + ftResults.length + ')</div>';
    ftResults.slice(0, 100).forEach(function(r) {
      if (r.dv) { 
        html += '<div class="search-result-item"><div class="sr-ref">'+esc(r.ref)+'</div><div class="sr-txt">'+highlightBibleText(r.txt,q)+'</div></div>'; 
        return; 
      }
      var isAT = r.bookId <= 39;
      var bList = isAT ? AT : NT;
      var idx = bList.findIndex(function(b){ return b.id === r.bookId; });
      if (idx < 0) idx = 0;
      
      var clickAttr = 'onclick="lB(\'' + (isAT?'AT':'NT') + '\'); setTimeout(function(){lC(' + idx + '); setTimeout(function(){lV(' + r.ch + ',' + r.vnum + ')},120)},80)"';
      html += '<div class="search-result-item" style="cursor:pointer" ' + clickAttr + '><div class="sr-ref">'+esc(r.ref)+'</div><div class="sr-txt">'+highlightBibleText(r.txt,q)+'</div></div>';
    });
  }
  
  if (bkRes.length > 0) {
    html += '<div style="font-size:11px;letter-spacing:1.5px;color:var(--gold);font-weight:700;margin:10px 0 8px">📚 LIVRES</div>';
    bkRes.forEach(function(b){ 
      var isAT = b.id <= 39;
      var idx = (isAT ? AT : NT).findIndex(function(x){ return x.id === b.id; }); 
      html += '<div class="litem" style="cursor:pointer" onclick="lB(\''+(isAT?'AT':'NT')+'\'); setTimeout(function(){lC('+idx+')},50)"><span class="litn">'+esc(b[lang]||b.mg)+'</span><span class="litc">'+esc(isAT?'Ancien Testament':'Nouveau Testament')+'</span></div>'; 
    });
  }
  
  if (dvRes.length > 0) {
    html += '<div style="font-size:11px;letter-spacing:1.5px;color:var(--gold);font-weight:700;margin:10px 0 8px">✨ VERSETS DU JOUR</div>';
    dvRes.forEach(function(v){ 
      html += '<div class="search-result-item"><div class="sr-ref">'+esc(v.ref)+'</div><div class="sr-txt">'+highlightBibleText(v[lang]||v.mg,q)+'</div></div>'; 
    });
  }
  
  if (totalQ === 0) {
    html += '<div style="text-align:center;padding:40px;color:var(--mut)">Aucun résultat pour &quot;'+esc(q)+'&quot;</div>';
  }
  
  sr.innerHTML = html;
}

/* Initialiser au lancement */
setTimeout(function() { initBibleOffline(); }, 2000);

/* ══════════════════════════════════════════════════════════════
   NOTIFICATIONS PUSH — Firebase Cloud Messaging (FCM)
══════════════════════════════════════════════════════════════ */

/* ⚠️ REMPLACE CETTE CLÉ par ta clé VAPID depuis Firebase Console
   → Project Settings → Cloud Messaging → Web Push certificates → Generate key pair */
var FCM_VAPID_KEY = 'REMPLACE_PAR_TA_CLE_VAPID_ICI';

var fcmMessaging = null;

/* ── Initialiser FCM ── */
async function initFCM() {
  /* Vérifier support navigateur */
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
  if (!firebase || !firebase.messaging) return;

  try {
    fcmMessaging = firebase.messaging();

    /* Notifications reçues quand l'app est ouverte */
    fcmMessaging.onMessage(function(payload) {
      var notif  = payload.notification || {};
      var title  = notif.title || '🙏 ZivOr';
      var body   = notif.body  || '';
      /* Afficher comme toast dans l'app */
