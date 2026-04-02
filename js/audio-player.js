   EXPLORATEUR AUDIO MÉDITATION
   Sources: Mixkit (builtin) · Jamendo (gratuit) · Pixabay · Freesound
   Cache hors-ligne: IndexedDB
══════════════════════════════════════════════════════════════ */
var AUDIO_APIS={freesound:'YOUR_FREESOUND_API_KEY',pixabay:'YOUR_PIXABAY_API_KEY'};
var audioPlayers=[],audioCurrent=null,audioFavs=[],audioCat='all',audioResults=[],audioOffline={},audioElements={};
var AUDIO_BUILTIN=[
  {id:'b1',name:'Pluie douce',ic:'🌧',cat:'nature',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-rain-and-thunder-storm-2390.mp3'},
  {id:'b2',name:'Vagues océan',ic:'🌊',cat:'nature',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-1194.mp3'},
  {id:'b3',name:'Oiseaux matin',ic:'🌿',cat:'nature',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-morning-birds-2330.mp3'},
  {id:'b4',name:'Feu de camp',ic:'🔥',cat:'nature',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-campfire-crackles-1330.mp3'},
  {id:'b5',name:'Vent forêt',ic:'💨',cat:'nature',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-forest-wind-ambience-2420.mp3'},
  {id:'b6',name:'Ruisseau',ic:'💧',cat:'nature',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-stream-and-water-ambiance-1186.mp3'},
  {id:'b7',name:'Bol tibétain',ic:'🔔',cat:'instruments',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-meditation-bell-493.mp3'},
  {id:'b8',name:'Cloche zen',ic:'🎵',cat:'instruments',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-clear-announce-tones-2861.mp3'},
  {id:'b9',name:'Piano sérénité',ic:'🎹',cat:'instruments',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3'},
  {id:'b10',name:'Guitare douce',ic:'🎸',cat:'instruments',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3'},
  {id:'b11',name:'Flûte zen',ic:'🎵',cat:'instruments',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-zen-life-392.mp3'},
  {id:'b12',name:'Harpe céleste',ic:'🎶',cat:'instruments',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-harp-fantasy-340.mp3'},
  {id:'b13',name:'Chant spirituel',ic:'🙏',cat:'spiritual',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-spirit-in-the-sky-116.mp3'},
  {id:'b14',name:'Piano inspirant',ic:'⛪',cat:'spiritual',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-inspiring-piano-loops-114.mp3'},
  {id:'b15',name:'Rêve céleste',ic:'✨',cat:'spiritual',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-life-is-a-dream-837.mp3'},
  {id:'b16',name:'Espace cosmos',ic:'🌌',cat:'ambient',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-space-wave-367.mp3'},
  {id:'b17',name:'Café matinal',ic:'☕',cat:'ambient',src:'MIXKIT',url:'https://assets.mixkit.co/sfx/preview/mixkit-coffee-shop-ambience-2544.mp3'},
  {id:'b18',name:'Nuit étoilée',ic:'🌙',cat:'ambient',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-sleepy-cat-135.mp3'},
  {id:'b19',name:'Sérénité',ic:'⛰️',cat:'ambient',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-zen-life-392.mp3'},
  {id:'b20',name:'Forêt magique',ic:'🌲',cat:'ambient',src:'MIXKIT',url:'https://assets.mixkit.co/music/preview/mixkit-harp-fantasy-340.mp3'},
];
function ouvrirAudioDB(){return new Promise(function(resolve){var req=indexedDB.open('zivor_audio',1);req.onupgradeneeded=function(e){var db=e.target.result;if(!db.objectStoreNames.contains('sounds'))db.createObjectStore('sounds');};req.onsuccess=function(e){resolve(e.target.result);};req.onerror=function(){resolve(null);};}); }
async function audioSauvegarderOffline(sound){try{var resp=await fetch(sound.url);if(!resp.ok)return;var blob=await resp.blob();var db=await ouvrirAudioDB();if(!db)return;db.transaction('sounds','readwrite').objectStore('sounds').put({name:sound.name,ic:sound.ic,cat:sound.cat,blob:blob},sound.id);audioOffline[sound.id]={name:sound.name,ic:sound.ic,cat:sound.cat,blob:blob};var saved=JSON.parse(localStorage.getItem('fn_audio_offline')||'[]');if(!saved.find(function(s){return s.id===sound.id;})){saved.push({id:sound.id,name:sound.name,ic:sound.ic,cat:sound.cat});localStorage.setItem('fn_audio_offline',JSON.stringify(saved));}showT('📥 "'+sound.name+'" hors-ligne');audioRenderOffline();}catch(e){showT('❌ Échec téléchargement');}}
async function audioChargerOffline(){var saved=JSON.parse(localStorage.getItem('fn_audio_offline')||'[]');if(!saved.length)return;var db=await ouvrirAudioDB();if(!db)return;for(var i=0;i<saved.length;i++){try{var item=saved[i];await new Promise(function(resolve){var tx=db.transaction('sounds','readonly');var req=tx.objectStore('sounds').get(item.id);req.onsuccess=function(){if(req.result)audioOffline[item.id]=req.result;resolve();};req.onerror=resolve;});}catch(e){}}}
async function initAudio(){await audioChargerOffline();audioFavs=JSON.parse(localStorage.getItem('fn_audio_favs')||'[]');audioResults=[...AUDIO_BUILTIN];audioRenderGrid(AUDIO_BUILTIN);audioRenderOffline();var dot=_('audio-status-dot'),lbl=_('audio-status-lbl');if(navigator.onLine){if(dot)dot.className='audio-online-dot';if(lbl)lbl.textContent='En ligne';audioChargerAPIsSons();}else{if(dot)dot.className='audio-online-dot offline';if(lbl)lbl.textContent='Hors ligne';}}
async function audioChargerAPIsSons(){try{var jUrl='https://api.jamendo.com/v3.0/tracks/?client_id=b6747d04&format=json&limit=100&tags=meditation+ambient+spiritual+nature&audioformat=mp32';var jResp=await fetchT(jUrl,8000);if(jResp.ok){var jData=await jResp.json();if(jData.results)jData.results.forEach(function(t){if(!t.audio)return;audioResults.push({id:'jm_'+t.id,name:(t.name||'Son').substring(0,28),ic:'🎵',cat:'ambient',src:'JAMENDO',url:t.audio,artist:t.artist_name});});}}catch(e){}if(AUDIO_APIS.pixabay!=='YOUR_PIXABAY_API_KEY'){try{var queries=['meditation','spiritual','nature','ambient'];for(var qi=0;qi<queries.length;qi++){var pResp=await fetchT('https://pixabay.com/api/music/?key='+AUDIO_APIS.pixabay+'&q='+queries[qi]+'&per_page=20',6000);if(pResp.ok){var pData=await pResp.json();if(pData.hits)pData.hits.forEach(function(h){if(!h.audio)return;var cat=queries[qi]==='nature'?'nature':queries[qi]==='meditation'?'ambient':'spiritual';audioResults.push({id:'px_'+h.id,name:(h.tags||h.title||'Son').split(',')[0].trim().substring(0,28),ic:audioGetIcon(cat),cat:cat,src:'PIXABAY',url:h.audio});});}}}catch(e){}}if(AUDIO_APIS.freesound!=='YOUR_FREESOUND_API_KEY'){try{var fsResp=await fetchT('https://freesound.org/apiv2/search/text/?query=meditation+spiritual+nature&filter=license:"Creative Commons 0"&fields=id,name,previews,tags,duration&page_size=50&token='+AUDIO_APIS.freesound,8000);if(fsResp.ok){var fsData=await fsResp.json();if(fsData.results)fsData.results.forEach(function(s){var url=s.previews&&s.previews['preview-lq-mp3']?s.previews['preview-lq-mp3']:'';if(!url)return;var cat=audioGuessCat(s.tags||[]);audioResults.push({id:'fs_'+s.id,name:s.name.replace(/\.[^.]+$/,'').substring(0,28),ic:audioGetIcon(cat),cat:cat,src:'FREESOUND',url:url,dur:Math.round(s.duration)});});}}catch(e){}}audioRenderGrid(audioFilterSounds(audioResults,audioCat,''));var lbl=_('audio-status-lbl');if(lbl)lbl.textContent=audioResults.length+' sons';}
function audioGetIcon(cat){return {nature:'🌿',instruments:'🎵',spiritual:'🙏',ambient:'🌌'}[cat]||'🎵';}
function audioGuessCat(tags){var t=(Array.isArray(tags)?tags.join(' '):tags).toLowerCase();if(t.match(/rain|ocean|forest|bird|wind|fire|water|nature/))return 'nature';if(t.match(/gospel|prayer|hymn|church|spiritual|holy|sacred|om/))return 'spiritual';if(t.match(/bowl|bell|gong|flute|piano|guitar|harp/))return 'instruments';return 'ambient';}
function audioFilterSounds(sounds,cat,query){return sounds.filter(function(s){return(cat==='all'||s.cat===cat)&&(!query||s.name.toLowerCase().indexOf(query.toLowerCase())!==-1)&&s.url;});}
function audioRenderGrid(sounds){
  var grid=_('audio-grid');
  if(!grid)return;
  if(!sounds.length){
    grid.innerHTML='<div style="text-align:center;padding:30px;color:var(--mut)"><div style="font-size:32px;margin-bottom:8px">&#127925;</div><div style="font-size:13px">Aucun son</div></div>';
    return;
  }
  var html='<div class="audio-grid-inner">';
  sounds.slice(0,60).forEach(function(s){
    var playing=!!audioElements[s.id];
    var faved=audioFavs.indexOf(s.id)!==-1;
    var offline=!!audioOffline[s.id];
    var sid=s.id.replace(/'/g,'');
    html+='<div class="audio-card'+(playing?' playing':'')+(faved?' faved':'')+'" onclick="audioPlay(\'' +sid+ '\')" data-id="'+sid+'">';
    html+='<div class="audio-ic">'+s.ic+'</div>';
    html+='<div class="audio-name">'+s.name+'</div>';
    html+='<div class="audio-meta">'+s.src+(s.dur?' &middot; '+s.dur+'s':'')+(s.artist?' &middot; '+s.artist.substring(0,12):'')+'</div>';
    if(offline){
      html+='<div class="audio-dl-btn" title="Hors-ligne">&#10003;</div>';
    } else {
      html+='<div class="audio-dl-btn" onclick="event.stopPropagation();audioDownload(\'' +sid+ '\')" title="Sauvegarder">&#128229;</div>';
    }
    html+='<div class="audio-fav-ico">'+(faved?'&#11088;':'&#9734;')+'</div>';
    html+='</div>';
  });
  html+='</div>';
  grid.innerHTML=html;
}
function audioRenderOffline(){
  var keys=Object.keys(audioOffline);
  var sec=_('audio-offline-section');
  var list=_('audio-offline-list');
  if(!sec||!list)return;
  if(!keys.length){sec.style.display='none';return;}
  sec.style.display='';
  var html='';
  keys.forEach(function(id){
    var s=audioOffline[id];
    var sid=id.replace(/'/g,'');
    html+='<div class="audio-card" onclick="audioPlayOffline(\'' +sid+ '\')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;margin-bottom:6px">';
    html+='<div style="font-size:22px">'+(s.ic||'&#127925;')+'</div>';
    html+='<div style="flex:1"><div class="audio-name" style="font-size:13px">'+s.name+'</div><div class="audio-meta">HORS LIGNE &#10003;</div></div>';
    html+='<button onclick="event.stopPropagation();audioDeleteOffline(\'' +sid+ '\')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:16px">&#128465;</button>';
    html+='</div>';
  });
  list.innerHTML=html;
}
async function audioPlay(id){var sound=audioResults.find(function(s){return s.id===id;})||AUDIO_BUILTIN.find(function(s){return s.id===id;});if(!sound||!sound.url){showT('⚠️ Son indisponible');return;}if(audioElements[id]){audioElements[id].pause();audioElements[id].src='';delete audioElements[id];audioPlayers=audioPlayers.filter(function(p){return p.id!==id;});audioUpdateUI();return;}if(audioPlayers.length>=3){showT('🎚️ Maximum 3 sons simultanés');return;}try{var audio=new Audio(sound.url);audio.loop=true;audio.volume=0.7;audio.crossOrigin='anonymous';await audio.play();audioElements[id]=audio;audioPlayers.push({id:id,name:sound.name,audio:audio});audioCurrent=sound;audioUpdateUI();if(!audioOffline[id])audioSauvegarderOffline(sound).catch(function(){});}catch(e){showT('❌ Impossible de lire ce son');}}
async function audioPlayOffline(id){var data=audioOffline[id];if(!data||!data.blob)return;var url=URL.createObjectURL(data.blob);var audio=new Audio(url);audio.loop=true;audio.volume=0.7;await audio.play().catch(function(){});audioElements[id]=audio;audioPlayers.push({id:id,name:data.name,audio:audio});audioCurrent={id:id,name:data.name,ic:data.ic,src:'HORS LIGNE'};audioUpdateUI();}
function audioUpdateUI(){
  var bar=_('audio-player-bar');
  var nameEl=_('audio-now-name');
  var srcEl=_('audio-now-src');
  var mixBar=_('audio-mix-bar');
  var mixList=_('audio-mix-list');
  if(!audioPlayers.length){
    if(bar)bar.style.display='none';
    audioRenderGrid(audioFilterSounds(audioResults,audioCat,''));
    return;
  }
  if(bar)bar.style.display='';
  if(nameEl&&audioCurrent)nameEl.textContent=audioCurrent.name;
  if(srcEl&&audioCurrent)srcEl.textContent=audioCurrent.src||'';
  if(audioPlayers.length>1){
    if(mixBar)mixBar.style.display='';
    if(mixList){
      var html='';
      audioPlayers.forEach(function(p){
        var sid=p.id.replace(/'/g,'');
        html+='<div class="mix-track">';
        html+='<div class="mix-track-name">'+p.name+'</div>';
        html+='<input class="mix-vol" type="range" min="0" max="1" step="0.05" value="'+p.audio.volume+'" oninput="audioSetVol(\'' +sid+ '\',this.value)">';
        html+='<button class="mix-rm" onclick="audioStop(\'' +sid+ '\')">&#10005;</button>';
        html+='</div>';
      });
      mixList.innerHTML=html;
    }
  } else {
    if(mixBar)mixBar.style.display='none';
  }
  audioRenderGrid(audioFilterSounds(audioResults,audioCat,''));
}
function audioSetVol(id,val){if(audioElements[id])audioElements[id].volume=parseFloat(val);}
function audioToggle(){audioPlayers.forEach(function(p){if(p.audio.paused)p.audio.play().catch(function(){});else p.audio.pause();});var btn=_('audio-play-btn'),allPaused=audioPlayers.every(function(p){return p.audio.paused;});if(btn)btn.textContent=allPaused?'▶':'⏸';}
function audioStop(id){if(id){if(audioElements[id]){audioElements[id].pause();audioElements[id].src='';delete audioElements[id];}audioPlayers=audioPlayers.filter(function(p){return p.id!==id;});if(!audioPlayers.length)audioCurrent=null;}else{audioPlayers.forEach(function(p){p.audio.pause();p.audio.src='';});audioPlayers=[];audioElements={};audioCurrent=null;}audioUpdateUI();}
function audioFav(){if(!audioCurrent)return;var id=audioCurrent.id,idx=audioFavs.indexOf(id);if(idx===-1){audioFavs.push(id);showT('⭐ Ajouté aux favoris');}else{audioFavs.splice(idx,1);showT('Retiré des favoris');}localStorage.setItem('fn_audio_favs',JSON.stringify(audioFavs));audioRenderGrid(audioFilterSounds(audioResults,audioCat,''));}
function audioDownload(id){var sound=audioResults.find(function(s){return s.id===id;})||AUDIO_BUILTIN.find(function(s){return s.id===id;});if(sound)audioSauvegarderOffline(sound);}
function audioDeleteOffline(id){ouvrirAudioDB().then(function(db){if(!db)return;db.transaction('sounds','readwrite').objectStore('sounds').delete(id);delete audioOffline[id];var saved=JSON.parse(localStorage.getItem('fn_audio_offline')||'[]');localStorage.setItem('fn_audio_offline',JSON.stringify(saved.filter(function(s){return s.id!==id;})));audioRenderOffline();});}
function audioSelCat(cat,btn){audioCat=cat;document.querySelectorAll('.audio-cat').forEach(function(b){b.classList.remove('on');});if(btn)btn.classList.add('on');if(cat==='favorites'){audioRenderGrid(audioResults.filter(function(s){return audioFavs.indexOf(s.id)!==-1;}));return;}audioRenderGrid(audioFilterSounds(audioResults,cat,_('audio-search-inp')?_('audio-search-inp').value:''));}
function audioSearch(){var q=_('audio-search-inp')?_('audio-search-inp').value.trim():'';audioRenderGrid(audioFilterSounds(audioResults,audioCat,q));}
var _origTStopAudio=tStop;tStop=function(){_origTStopAudio();if(!audioPlayers.length)return;var ids=audioPlayers.map(function(p){return p.id;});ids.forEach(function(id){var el=audioElements[id];if(!el)return;var vol=el.volume;var fade=setInterval(function(){vol=Math.max(0,vol-0.04);el.volume=vol;if(vol<=0){clearInterval(fade);audioStop(id);}},200);});};
setTimeout(function(){try{initAudio();}catch(e){}},2000);

