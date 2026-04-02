/* ──────────────────────────────────────────────────────────────
   3. AUTHENTIFICATION ANONYME
────────────────────────────────────────────────────────────────*/
// auth init moved to initFirebase()

/* ──────────────────────────────────────────────────────────────
   4. DONNÉES STATIQUES
────────────────────────────────────────────────────────────────*/
const DAYS = {
  mg: ['Alahady','Alatsinainy','Talata','Alarobia','Alakamisy','Zoma','Sabotsy'],
  fr: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
};
const MONTHS = {
  mg: ['Janoary','Febroary','Martsa','Aprily','Mey','Jona','Jolay','Aogositra','Septambra','Oktobra','Novambra','Desambra'],
  fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December']
};

/* Livres Bible */
const AT = [
  {id:1, mg:'Genesisy',              fr:'Genèse',                en:'Genesis',              ch:50},
  {id:2, mg:'Eksodosy',              fr:'Exode',                 en:'Exodus',               ch:40},
  {id:3, mg:'Levitikosa',            fr:'Lévitique',             en:'Leviticus',            ch:27},
  {id:4, mg:'Nomery',                fr:'Nombres',               en:'Numbers',              ch:36},
  {id:5, mg:'Deoteronomy',           fr:'Deutéronome',           en:'Deuteronomy',          ch:34},
  {id:6, mg:'Josoa',                 fr:'Josué',                 en:'Joshua',               ch:24},
  {id:7, mg:'Mpitsara',              fr:'Juges',                 en:'Judges',               ch:21},
  {id:8, mg:'Rota',                  fr:'Ruth',                  en:'Ruth',                 ch:4},
  {id:9, mg:'1 Samoela',             fr:'1 Samuel',              en:'1 Samuel',             ch:31},
  {id:10,mg:'2 Samoela',             fr:'2 Samuel',              en:'2 Samuel',             ch:24},
  {id:11,mg:'1 Mpanjaka',            fr:'1 Rois',                en:'1 Kings',              ch:22},
  {id:12,mg:'2 Mpanjaka',            fr:'2 Rois',                en:'2 Kings',              ch:25},
  {id:13,mg:'1 Tantara',             fr:'1 Chroniques',          en:'1 Chronicles',         ch:29},
  {id:14,mg:'2 Tantara',             fr:'2 Chroniques',          en:'2 Chronicles',         ch:36},
  {id:15,mg:'Ezra',                  fr:'Esdras',                en:'Ezra',                 ch:10},
  {id:16,mg:'Nehemia',               fr:'Néhémie',               en:'Nehemiah',             ch:13},
  {id:17,mg:'Estera',                fr:'Esther',                en:'Esther',               ch:10},
  {id:18,mg:'Joba',                  fr:'Job',                   en:'Job',                  ch:42},
  {id:19,mg:'Salamo',                fr:'Psaumes',               en:'Psalms',               ch:150},
  {id:20,mg:'Ohabolana',             fr:'Proverbes',             en:'Proverbs',             ch:31},
  {id:21,mg:'Mpitoriteny',           fr:'Ecclésiaste',           en:'Ecclesiastes',         ch:12},
  {id:22,mg:"Tononkiran'i Solomona", fr:'Cantique des cantiques',en:'Song of Solomon',      ch:8},
  {id:23,mg:'Isaia',                 fr:'Ésaïe',                 en:'Isaiah',               ch:66},
  {id:24,mg:'Jeremia',               fr:'Jérémie',               en:'Jeremiah',             ch:52},
  {id:25,mg:'Fitomaniana',           fr:'Lamentations',          en:'Lamentations',         ch:5},
  {id:26,mg:'Ezekiela',              fr:'Ézéchiel',              en:'Ezekiel',              ch:48},
  {id:27,mg:'Daniela',               fr:'Daniel',                en:'Daniel',               ch:12},
  {id:28,mg:'Hosea',                 fr:'Osée',                  en:'Hosea',                ch:14},
  {id:29,mg:'Joela',                 fr:'Joël',                  en:'Joel',                 ch:3},
  {id:30,mg:'Amosa',                 fr:'Amos',                  en:'Amos',                 ch:9},
  {id:31,mg:'Obadia',                fr:'Abdias',                en:'Obadiah',              ch:1},
  {id:32,mg:'Jona',                  fr:'Jonas',                 en:'Jonah',                ch:4},
  {id:33,mg:'Mika',                  fr:'Michée',                en:'Micah',                ch:7},
  {id:34,mg:'Nahoma',                fr:'Nahum',                 en:'Nahum',                ch:3},
  {id:35,mg:'Habakoka',              fr:'Habacuc',               en:'Habakkuk',             ch:3},
  {id:36,mg:'Zefania',               fr:'Sophonie',              en:'Zephaniah',            ch:3},
  {id:37,mg:'Hagaia',                fr:'Aggée',                 en:'Haggai',               ch:2},
  {id:38,mg:'Zakaria',               fr:'Zacharie',              en:'Zechariah',            ch:14},
  {id:39,mg:'Malakia',               fr:'Malachie',              en:'Malachi',              ch:4}
];
const NT = [
  {id:40,mg:'Matio',               fr:'Matthieu',          en:'Matthew',          ch:28},
  {id:41,mg:'Marka',               fr:'Marc',              en:'Mark',             ch:16},
  {id:42,mg:'Lioka',               fr:'Luc',               en:'Luke',             ch:24},
  {id:43,mg:'Jaona',               fr:'Jean',              en:'John',             ch:21},
  {id:44,mg:"Asan'ny Apostoly",    fr:'Actes',             en:'Acts',             ch:28},
  {id:45,mg:'Romanina',            fr:'Romains',           en:'Romans',           ch:16},
  {id:46,mg:'1 Korintiana',        fr:'1 Corinthiens',     en:'1 Corinthians',    ch:16},
  {id:47,mg:'2 Korintiana',        fr:'2 Corinthiens',     en:'2 Corinthians',    ch:13},
  {id:48,mg:'Galatiana',           fr:'Galates',           en:'Galatians',        ch:6},
  {id:49,mg:'Efesiana',            fr:'Éphésiens',         en:'Ephesians',        ch:6},
  {id:50,mg:'Filipiana',           fr:'Philippiens',       en:'Philippians',      ch:4},
  {id:51,mg:'Kolosiana',           fr:'Colossiens',        en:'Colossians',       ch:4},
  {id:52,mg:'1 Tesaloniana',       fr:'1 Thessaloniciens', en:'1 Thessalonians',  ch:5},
  {id:53,mg:'2 Tesaloniana',       fr:'2 Thessaloniciens', en:'2 Thessalonians',  ch:3},
  {id:54,mg:'1 Timoty',            fr:'1 Timothée',        en:'1 Timothy',        ch:6},
  {id:55,mg:'2 Timoty',            fr:'2 Timothée',        en:'2 Timothy',        ch:4},
  {id:56,mg:'Titosy',              fr:'Tite',              en:'Titus',            ch:3},
  {id:57,mg:'Filemona',            fr:'Philémon',          en:'Philemon',         ch:1},
  {id:58,mg:'Hebreo',              fr:'Hébreux',           en:'Hebrews',          ch:13},
  {id:59,mg:'Jakoba',              fr:'Jacques',           en:'James',            ch:5},
  {id:60,mg:'1 Petera',            fr:'1 Pierre',          en:'1 Peter',          ch:5},
  {id:61,mg:'2 Petera',            fr:'2 Pierre',          en:'2 Peter',          ch:3},
  {id:62,mg:'1 Jaona',             fr:'1 Jean',            en:'1 John',           ch:5},
  {id:63,mg:'2 Jaona',             fr:'2 Jean',            en:'2 John',           ch:1},
  {id:64,mg:'3 Jaona',             fr:'3 Jean',            en:'3 John',           ch:1},
  {id:65,mg:'Joda',                fr:'Jude',              en:'Jude',             ch:1},
  {id:66,mg:'Apokalypsy',          fr:'Apocalypse',        en:'Revelation',       ch:22}
];

/* Versets clés (cache local) */
/* 30 versets — rotation sur le jour de l'année */
const DV = [
  {ref:'Jaona 3:16',     mg:"Fa toy izany no nitiavan'Andriamanitra izao tontolo izao.", fr:"Car Dieu a tant aimé le monde qu'il a donné son Fils unique.", en:"For God so loved the world that he gave his one and only Son."},
  {ref:'Salamo 23:1',    mg:"Jehovah no Mpiandry ahy; tsy hanan-java-mahory aho.", fr:"L'Éternel est mon berger, je ne manquerai de rien.", en:"The Lord is my shepherd, I lack nothing."},
  {ref:'Filipiana 4:13', mg:"Haiko ny miatrika zava-drehetra amin'ny alalan'i Kristy.", fr:"Je puis tout par celui qui me fortifie.", en:"I can do all things through Christ who strengthens me."},
  {ref:'Jeremia 29:11',  mg:"Fa Izaho mahalala ny hevitra izay mihevitra Ahy, hoy Jehovah.", fr:"Je connais les projets que j'ai formés sur vous.", en:"For I know the plans I have for you, declares the Lord."},
  {ref:'Filipiana 4:6',  mg:"Aza manahy na amin'inona na amin'inona.", fr:"Ne vous inquiétez de rien; faites connaître vos besoins à Dieu.", en:"Do not be anxious about anything."},
  {ref:'Josoa 1:9',      mg:"Aza matahotra, fa Jehovah Andriamanitrao momba anao.", fr:"Ne t'effraie point, car l'Éternel ton Dieu est avec toi partout.", en:"Do not be afraid, for the Lord your God is with you."},
  {ref:'Matio 6:33',     mg:"Katsaho aloha ny fanjakany sy ny fahamarinany.", fr:"Cherchez premièrement le royaume et la justice de Dieu.", en:"Seek first his kingdom and his righteousness."},
  {ref:'Romana 8:28',    mg:"Ny zavatra rehetra dia miara-miasa hahasoa izay tia an'Andriamanitra.", fr:"Toutes choses concourent au bien de ceux qui aiment Dieu.", en:"In all things God works for the good of those who love him."},
  {ref:'Isaia 40:31',    mg:"Izay matoky an'i Jehovah kosa dia mahazo hery vaovao.", fr:"Ceux qui se confient en l'Éternel renouvellent leurs forces.", en:"Those who hope in the Lord will renew their strength."},
  {ref:'Salamo 46:1',    mg:"Andriamanitra no fialofantsika sy hery; fanampiana aina Izy.", fr:"Dieu est notre refuge et notre force, un secours dans la détresse.", en:"God is our refuge and strength, an ever-present help in trouble."},
  {ref:'Matio 11:28',    mg:"Avia hanatỳ Ahy, ianareo rehetra izay miasa fatratra.", fr:"Venez à moi, vous tous qui êtes fatigués et chargés.", en:"Come to me, all you who are weary and burdened."},
  {ref:'Jaona 14:6',     mg:"Izaho no lalana sy fahamarinana ary fiainana.", fr:"Je suis le chemin, la vérité, et la vie.", en:"I am the way, the truth, and the life."},
  {ref:'Salamo 118:24',  mg:"Ity no andro nataon'i Jehovah; hifaly sy ho ravoravo isika.", fr:"C'est ici la journée que l'Éternel a faite; soyons dans l'allégresse.", en:"This is the day the Lord has made; we will rejoice."},
  {ref:'Ohabolana 3:5',  mg:"Matokia an'i Jehovah amin'ny fonao rehetra.", fr:"Confie-toi en l'Éternel de tout ton coeur.", en:"Trust in the Lord with all your heart."},
  {ref:'1 Jaona 4:4',    mg:"Lehibe Ilay ao anatinareo noho izay ao amin'izao tontolo izao.", fr:"Celui qui est en vous est plus grand que celui qui est dans le monde.", en:"Greater is he who is in you than he who is in the world."},
  {ref:'Efesiana 6:10',  mg:"Mahereza ao amin'ny Tompo sy amin'ny herin'ny fahalehiazany.", fr:"Fortifiez-vous dans le Seigneur et dans sa toute-puissante force.", en:"Be strong in the Lord and in his mighty power."},
  {ref:'Jaona 15:5',     mg:"Izaho no voaloboka, ianareo no sampany.", fr:"Je suis le cep, vous êtes les sarments.", en:"I am the vine; you are the branches."},
  {ref:'2 Timoty 1:7',   mg:"Fa tsy fanahy fahatahorana no nomen'Andriamanitra antsika.", fr:"Dieu ne nous a pas donné un esprit de crainte.", en:"God has not given us a spirit of fear."},
  {ref:'Romana 8:39',    mg:"Tsy misy afaka hampisaraka antsika amin'ny fitiavan'Andriamanitra.", fr:"Rien ne pourra nous séparer de l'amour de Dieu.", en:"Nothing will separate us from the love of God."},
  {ref:'Salamo 34:18',   mg:"Jehovah manakaiky ny torotoro fo.", fr:"L'Éternel est proche de ceux qui ont le coeur brisé.", en:"The Lord is close to the brokenhearted."},
  {ref:'Matio 5:16',     mg:"Avelao hahiratra eo imason'ny olona ny fahazavanareo.", fr:"Que votre lumière brille devant les hommes.", en:"Let your light shine before others."},
  {ref:'Isaia 41:10',    mg:"Aza matahotra, fa Izaho momba anao.", fr:"Ne crains pas, car je suis avec toi.", en:"Do not fear, for I am with you."},
  {ref:'Salamo 27:1',    mg:"Jehovah no fahazavako sy famonjena ahy.", fr:"L'Éternel est ma lumière et mon salut.", en:"The Lord is my light and my salvation."},
  {ref:'Matio 28:20',    mg:"Indro, Izaho momba anareo lalandava.", fr:"Je suis avec vous tous les jours.", en:"I am with you always."},
  {ref:'Efesiana 2:8',   mg:"Fa fahasoavana no namonjena anareo.", fr:"C'est par la grâce que vous êtes sauvés.", en:"For it is by grace you have been saved."},
  {ref:'Filipiana 4:19', mg:"Andriamanitra hameno ny filànareo rehetra.", fr:"Mon Dieu pourvoira à tous vos besoins.", en:"God will meet all your needs."},
  {ref:'Jaona 10:10',    mg:"Tonga Aho mba hanana fiainana sy hanana azy be dia be.", fr:"Je suis venu pour qu'ils aient la vie en abondance.", en:"I have come that they may have life in abundance."},
  {ref:'Salamo 91:2',    mg:"Andriamanitra no fialofako sy fiarovako.", fr:"Mon Dieu est mon refuge et ma forteresse.", en:"My God, in whom I trust."},
  {ref:'Galatiana 2:20', mg:"Kristy velona ao anatiko.", fr:"Christ vit en moi.", en:"Christ lives in me."},
  {ref:'Apok 21:4',      mg:"Hofafan'Andriamanitra ny ranomason'ny masony rehetra.", fr:"Dieu essuiera toute larme de leurs yeux.", en:"God will wipe away every tear from their eyes."}
];

/* Poèmes matinaux (7 — un par jour de la semaine) */
const POEMES = {
  mg:[
    "Ny maraina vaovao dia famindram-po vaovao,\nAndriamanitra no hanome hery anao androany.\nMitsangàna amin-kaherezana, fa ianao tsy irery —\nIzy no miaraka aminao amin'ny làlana rehetra.",
    "Misaorana ny andro vaovao omena anao,\nFahasoavan'ny Tompo no manome anao afo.\nDia andeha amin-finoana ianao androany,\nAndriamanitra no miaro ny dianao.",
    "Rehefa mifoha ianao maraina,\nIzy efa miandry anao sy vonona.\nTanteraho izay asainy hataonao,\nFa Izy mahatoky amin'ny teniny.",
    "Aza matahotra ny andro hiaviana,\nFa Andriamanitra efa any aloha.\nManana fanantenana tsara ho anao Izy,\nNa dia mafy aza ny eritreritrao.",
    "Mazava be ny fitahian'Andriamanitra,\nManentana ny fonao hanasa am-pinoana.\nDia tongava aminy amin'ny fonao manontolo,\nFa Izy no loharanon'ny fifaliananao.",
    "Misy drafitra eo am-pelatanan'Andriamanitra,\nMankanesa aminy am-bavaka ny marainana.\nFa ny fitiavany tsy mety ritra,\nIzy hiaraka aminao mandritra ny andro.",
    "Maraina tsara! Andro vaovao no manomboka,\nAndriamanitra efa namboatra izany ho anao.\nKatsaho aloha ny fanjakany sy ny fahamarinany,\nDia hanampy anao izany rehetra."
  ],
  fr:[
    "Chaque matin est une grâce nouvelle,\nDieu donne Sa force pour ta journée.\nLève-toi avec courage, tu n'es pas seul —\nIl marche avec toi sur chaque chemin.",
    "Ce jour t'est offert par les mains de Dieu,\nAvec amour Il te guide en tous lieux.\nMets-Lui ta confiance sans crainte ni peur,\nIl tient dans Ses mains tout ton avenir.",
    "Quand tu ouvres les yeux sur ce nouveau matin,\nSache que Dieu veille sur ton chemin.\nIl a préparé ce jour pour toi,\nMarche dans Sa paix et Sa joie.",
    "Ne regarde pas avec peur vers demain,\nDieu est déjà là sur tous tes chemins.\nIl a un beau plan pour ta vie,\nFais-Lui confiance, Il ne t'abandonne jamais.",
    "Que la lumière de ce matin nouveau\nRéchauffe ton âme et guide tes pas.\nDieu t'accompagne dans tout ce que tu feras,\nSa présence est ton plus grand trésor.",
    "La bonté de Dieu est nouvelle chaque matin,\nSa fidélité est grande, sans fin.\nChaque aurore annonce Sa grâce profonde,\nIl t'aime d'un amour qui surabonde.",
    "Bonjour, enfant de Dieu ! Ce jour est à toi,\nL'Éternel t'a choisi et Il est ta foi.\nAvance avec joie dans Sa douce lumière,\nIl transforme en victoire chaque prière."
  ],
  en:[
    "Every morning is a new grace,\nGod gives His strength for your day.\nRise with courage, you are not alone —\nHe walks with you on every path.",
    "This day is a gift from God above,\nFilled with His mercy, grace, and love.\nTrust Him with every step you take,\nHe makes all things new for His sake.",
    "When you open your eyes this morning,\nKnow that God is already there.\nHe has prepared this day just for you,\nWalk in His peace beyond compare.",
    "Do not fear what tomorrow may bring,\nGod goes before you in everything.\nHe has wonderful plans for your life,\nTrust Him through both joy and strife.",
    "Let the light of this brand new day\nWarm your soul and guide your way.\nGod walks with you through all you do,\nHis presence is the best gift true.",
    "Great is His faithfulness every morning,\nNew mercies arrive with the dawn.\nHold on to His promises, never let go,\nHis love is the light that leads on.",
    "Good morning, child of God! This day is yours,\nHe opens for you the brightest doors.\nWalk joyfully in His gentle light,\nHe turns every prayer to delight."
  ]
};

const MOTIVATIONS = {
  mg:["Andriamanitra manana drafitra tsara ho anao. Tsarovy fa Izy no mifehy ny ho avinao.",
      "Ny finoanao lehibe noho ny tahotrao. Matokia an'Andriamanitra amin'ny fonao rehetra.",
      "Na dia lavareny aza ny alina, avy ny maraina. Andriamanitra tsy mety mandao anao.",
      "Tsy maintsy hisy ny fiadian-tsaina, fa ny fandresena koa tsy maintsy hisy. Mahereza!",
      "Andriamanitra tsy nanao anao ho mpiofo, fa mpiambina. Mitsangàna amin-kasahiana.",
      "Ny vavaka mafy dia mitondra valin-teny lehibe. Mitoky sy mivavaha lalandava.",
      "Ianao dia zanak'Andriamanitra, ary Izy tsy mba manadino anao."],
  fr:["Dieu a un plan merveilleux pour vous. Même dans les moments difficiles, il tient votre avenir.",
      "Votre foi est plus grande que vos peurs. Confiez votre chemin à Dieu de tout votre cœur.",
      "Même si la nuit est longue, le matin vient. Dieu ne vous abandonne jamais.",
      "Les épreuves sont temporaires, la victoire est certaine. Soyez courageux !",
      "Dieu ne vous a pas fait pour être vaincu, mais pour vaincre. Levez-vous avec bravoure.",
      "Une prière sincère apporte une grande réponse. Confiez-vous et priez sans cesse.",
      "Vous êtes l'enfant de Dieu, et Il ne vous oublie jamais."],
  en:["God has a wonderful plan for you. Even in hard times, He holds your future.",
      "Your faith is greater than your fears. Trust God with all your heart.",
      "Even if the night is long, morning comes. God never abandons you.",
      "Trials are temporary, victory is certain. Be courageous!",
      "God did not make you to be defeated, but to overcome. Rise with bravery.",
      "Sincere prayer brings great answers. Trust and pray without ceasing.",
      "You are a child of God, and He never forgets you."]
};

function setVerset() {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(),0,0)) / 86400000);
  const dv = DV[dayOfYear % DV.length];
  t_('vt', '"' + dv[lang] + '"');
  t_('vr', '— ' + dv.ref);
  const dow = now.getDay();
  h_('pt', (POEMES[lang]||POEMES.mg)[dow % 7].replace(/\n/g,'<br>'));
  t_('motiv-txt', (MOTIVATIONS[lang]||MOTIVATIONS.mg)[dow % 7]);
}
/* Catalogue livres */
const LIVRES = []; /* Livres gérés depuis l'admin → Firestore */

/* Posts et témoignages par défaut (affichés hors-ligne) */
const DEF_POSTS = [
  {id:'dp1',auteur_avatar:'🌍',auteur_nom:'Gospel For Africa',    auteur_pays:'Kenya',        categorie_label:'✦ Evanjely', likes:1247,nb_commentaires:89, cree_le:new Date(Date.now()-3600000).toISOString(),  texte:"Revival lehibe tany Kenya! Olona an'alina no nandray an'i Jesosy.",   verset:"Fa ny fanjakan'Andriamanitra dia tsy vavaka fotsiny, fa hery.", verset_ref:'1 Korintiana 4:20'},
  {id:'dp2',auteur_avatar:'🇲🇬',auteur_nom:'ZivOr Madagascar',auteur_pays:'Antananarivo', categorie_label:'✦ Hafatra',  likes:678, nb_commentaires:47, cree_le:new Date(Date.now()-7200000).toISOString(),  texte:"Misaorana an'Andriamanitra amin'ny andro vaovao! Izy tsy mba mandao anao.", verset:"Fa Izaho mahalala ny hevitra izay mihevitra Ahy, hoy Jehovah.",  verset_ref:'Jeremia 29:11'}
];
const DEF_TEMO = [
  {id:'dt1',categorie:'sitrana',auteur_avatar:'🙏',auteur_nom:'Voahangy R.',titre:'Sitrana tanteraka!',      texte:"Nisy aretina mafy izay nanjo ahy, fa nony nivavaka ny pastora dia sitrana tanteraka aho.",               verset_ref:'Salamo 34:18', likes:89},
  {id:'dt2',categorie:'asa',    auteur_avatar:'💼',auteur_nom:'Rakoto M.',  titre:'Nahazo ny asa nangataiko!',texte:"Nangata asa maro aho saingy tsy nahazo. Nivavaka mafy aho, ary ny Tompo dia nanome ahy asa tsara.", verset_ref:'Jeremia 29:11',likes:156}
];

/* ──────────────────────────────────────────────────────────────
   5. TRADUCTIONS (MG / FR / EN)
────────────────────────────────────────────────────────────────*/
const L = {
mg:{
  hello:'Salama, Kristianina malala! 🙏', verse_lbl:'Andininy androany',
  poem_lbl:'🌅 HAFATRY NY MARAINA', motiv_lbl:'💪 FAMPORISIHANA',
  poem_txt:"Ny maraina vaovao dia famindram-po vaovao,\nAndriamanitra no hanome hery anao androany.\nMitsangàna amin-kaherezana, fa ianao tsy irery —\nIzy no miaraka aminao amin'ny làlana rehetra.",
  motiv_txt:"Andriamanitra manana drafitra tsara ho anao. Na dia mafy aza ny andro, tsarovy fa Izy no mifehy ny ho avinao.",
  don_title:'Fanampiana ny ZivOr', don_txt:'Ny fampiasana ity rindranasa ity dia maimaim-poana. Ampio ny fivoarany.', don_btn:'💝 Manome fanampiana',
  bible_search:'Hitady andininy...', bible_at:'📜 Testamenta Taloha', bible_nt:'✝ Testamenta Vaovao', bible_ch:'Toko', bk_books:'← Boky', bk_ch:'← Toko',
  med_remain:'FOTOANA SISA', med_themes:'Hevitra fisaintsainana', med_start:'▶ Manomboka', med_done:'✅ Vita ny fisaintsainana!',
  past_title:'👨‍💼 Espace Pastora', past_sub:"Mifandraisa mivantana amin'ny pastora vonona hanampy anao.", past_badge:"✦ PASTORA AO ANATIN'NY FANANTENANA",
  p1_ch:'Fiangonana Kristianina', p1_sp:'Fanohanana ara-panahy', p2_ch:'Fiangonana Kristianina', p2_sp:'Vavaka sy fampianarana',
  past_jt:'Pastora hafa te-hiditra?', past_js:'Fenoy ny form-pisoratana mba ho voaray.', past_btn:'📝 Mametry anarana ho Pastora',
  chat_inp:'Soraty ny hafatrao...', chat_on:'🟢 En ligne', chat_off:'⚙️ Local',
  chat_welcome:"Salama! Tongasoa. Inona no azon'izahay natao ho anao? 🙏",
  chat_reps:["Misaotra ny hafatrao. Mivavaka ho anao izahay! 🙏","Andriamanitra hanampy anao. Mitoky!","Amen! Hitafiarana aminao izahay.","Ny fiadanan'Andriamanitra no miaro anao 🕊️"],
  actu_ttl:'🌍 Vaovao Evanjelike', np_txt:'Zarao ny hafatra evanjelike...', st_me:'Ny story',
  mp_title:'📢 Zarao ny Hafatra', mp_cat_lbl:'SOKAJY', mp_msg_lbl:'NY HAFATRAO', mp_vs_lbl:'ANDININY (optional)', mp_btn:'📤 Hamoaka',
  mcat_haf:'✦ Hafatra', mcat_ev:'✦ Evanjely', mcat_fid:'🙌 Fiderana', mcat_vao:'🌍 Vaovao',
  like:"J'aime", comment:'Hevitra', share:'Zarao', cph:'Fanamarihana...',
  temo_ttl:'✨ Vavolombelona', temo_btn:'+ Zarao', tc_all:'🌟 Rehetra', tc_sit:'🙌 Sitrana', tc_asa:'💼 Asa', tc_fam:'❤️ Fianakaviana',
  mt_title:'✍️ Zarao ny Vavolombelona', mt_nom_lbl:'ANARANAO', mt_tit_lbl:'LOHATENY', mt_msg_lbl:'NY VAVOLOMBELONAO', mt_vs_lbl:'ANDININY', mt_btn:'📤 Hamoaka', mt_cat_lbl:'SOKAJY',
  tcat_sit:'🙌 Sitrana', tcat_asa:'💼 Asa', tcat_fam:'❤️ Fianakaviana', tcat_haf:'✦ Hafa',
  mi_title:'📝 Mametry anarana ho Pastora', mi_nom_lbl:'ANARANA FENO', mi_email_lbl:'EMAIL', mi_tel_lbl:'FINDAY', mi_egl_lbl:'FIANGONANA', mi_spec_lbl:'FANOLORAN-TENA', mi_btn:'📤 Mandefa',
  nav_home:'Fandraisana', nav_bible:'Baiboly', nav_med:'Fisaintsainana', nav_past:'Pastora', nav_actu:'Vaovao', nav_temo:'Vavolombelona', nav_lib:'Boky',
  lib_ttl:'📚 Boky Kristianina', lc_all:'📚 Rehetra', lc_bib:'📖 Baiboly', lc_dev:'🌅 Fisaintsainana', lc_pri:'🙏 Vavaka', lc_enf:'👶 Ankizy',
  liv_order:'🛒 Mamatsy', liv_nostock:'❌ Tsy misy',
  cmd_tel_lbl:'NOMERAO FINDAY (Airtel Money)', mvola_txt:"Mandefa vola amin'ny <strong style='color:var(--gold)'>033 07 116 14</strong> (Airtel Money), ary ampidiro ny laharanao eto.",
  cmd_btn:'✅ Manatontosa ny baiko',
  t_ordered:'✅ Baiko voaray! Hifandray aminao izahay 🙏', t_posted:'✅ Namoaka!', t_sent:'🙏 Vita!', t_empty:'⚠️ Fenoy ny saha',
  install:'Apidino ity app ity amin\'ny sary', install_btn:'Apidino'
},
fr:{
  hello:'Bonjour, cher chrétien ! 🙏', verse_lbl:'Verset du jour',
  poem_lbl:'🌅 POÈME DU MATIN', motiv_lbl:'💪 MOTIVATION',
  poem_txt:"Chaque matin est une grâce nouvelle,\nDieu donne Sa force pour ta journée.\nLève-toi avec courage, tu n'es pas seul —\nIl marche avec toi sur chaque chemin.",
  motiv_txt:"Dieu a un beau plan pour toi. Même dans les moments difficiles, souviens-toi qu'Il tient ton avenir.",
  don_title:'Soutenir ZivOr', don_txt:'Cette application est gratuite. Soutenez son développement.', don_btn:'💝 Faire un don',
  bible_search:'Rechercher un verset...', bible_at:'📜 Ancien Testament', bible_nt:'✝ Nouveau Testament', bible_ch:'Chapitre', bk_books:'← Livres', bk_ch:'← Chapitres',
  med_remain:'TEMPS RESTANT', med_themes:'Thèmes de méditation', med_start:'▶ Commencer', med_done:'✅ Méditation terminée !',
  past_title:'👨‍💼 Espace Pasteurs', past_sub:"Contactez directement un pasteur prêt à vous aider.", past_badge:'✦ PASTEURS DE FANANTENANA',
  p1_ch:'Église Chrétienne', p1_sp:'Soutien spirituel', p2_ch:'Église Chrétienne', p2_sp:'Prière et enseignement',
  past_jt:'Un autre pasteur veut rejoindre ?', past_js:'Remplissez le formulaire pour rejoindre ZivOr.', past_btn:"📝 S'inscrire comme Pasteur",
  chat_inp:'Écrivez votre message...', chat_on:'🟢 En ligne', chat_off:'⚙️ Local',
  chat_welcome:'Bonjour ! Comment puis-je vous aider ? 🙏',
  chat_reps:['Merci pour votre message. Nous prions pour vous ! 🙏','Que Dieu vous bénisse et vous guide.','Amen ! Nous sommes là pour vous.','La paix de Dieu vous garde 🕊️'],
  actu_ttl:'🌍 Actualités Évangéliques', np_txt:'Partagez un message évangélique...', st_me:'Ma story',
  mp_title:'📢 Partager un Message', mp_cat_lbl:'CATÉGORIE', mp_msg_lbl:'VOTRE MESSAGE', mp_vs_lbl:'VERSET (optionnel)', mp_btn:'📤 Publier',
  mcat_haf:'✦ Message', mcat_ev:'✦ Évangile', mcat_fid:'🙌 Louange', mcat_vao:'🌍 Actualité',
  like:"J'aime", comment:'Commenter', share:'Partager', cph:'Commenter...',
  temo_ttl:'✨ Témoignages', temo_btn:'+ Partager', tc_all:'🌟 Tous', tc_sit:'🙌 Guérison', tc_asa:'💼 Travail', tc_fam:'❤️ Famille',
  mt_title:'✍️ Partager mon Témoignage', mt_nom_lbl:'VOTRE NOM', mt_tit_lbl:'TITRE', mt_msg_lbl:'VOTRE TÉMOIGNAGE', mt_vs_lbl:'VERSET', mt_btn:'📤 Publier', mt_cat_lbl:'CATÉGORIE',
  tcat_sit:'🙌 Guérison', tcat_asa:'💼 Travail', tcat_fam:'❤️ Famille', tcat_haf:'✦ Autre',
  mi_title:'📝 Inscription Pasteur', mi_nom_lbl:'NOM COMPLET', mi_email_lbl:'EMAIL', mi_tel_lbl:'TÉLÉPHONE', mi_egl_lbl:'ÉGLISE', mi_spec_lbl:'SPÉCIALITÉ', mi_btn:'📤 Envoyer',
  nav_home:'Accueil', nav_bible:'Bible', nav_med:'Méditation', nav_past:'Pasteurs', nav_actu:'Actualités', nav_temo:'Témoignages', nav_lib:'Librairie',
  lib_ttl:'📚 Librairie Chrétienne', lc_all:'📚 Tous', lc_bib:'📖 Bibles', lc_dev:'🌅 Dévotion', lc_pri:'🙏 Prière', lc_enf:'👶 Enfants',
  liv_order:'🛒 Commander', liv_nostock:'❌ Rupture',
  cmd_tel_lbl:'VOTRE NUMÉRO (Airtel Money)', mvola_txt:"Envoyez votre paiement au <strong style='color:var(--gold)'>033 07 116 14</strong> (Airtel Money) et entrez votre numéro ici.",
  cmd_btn:'✅ Confirmer la commande',
  t_ordered:'✅ Commande reçue ! Nous vous contacterons 🙏', t_posted:'✅ Publié !', t_sent:'🙏 Envoyé !', t_empty:'⚠️ Remplissez le champ',
  install:"Installer l'app", install_btn:'Installer'
},
en:{
  hello:'Good morning, dear Christian! 🙏', verse_lbl:'Verse of the Day',
  poem_lbl:'🌅 MORNING POEM', motiv_lbl:'💪 DAILY MOTIVATION',
  poem_txt:"Every morning is a new grace,\nGod gives His strength for your day.\nRise with courage, you are not alone —\nHe walks with you on every path.",
  motiv_txt:"God has a wonderful plan for you. Even in hard times, remember He holds your future.",
  don_title:'Support ZivOr', don_txt:'This app is free. Support its development with a donation.', don_btn:'💝 Donate',
  bible_search:'Search a verse...', bible_at:'📜 Old Testament', bible_nt:'✝ New Testament', bible_ch:'Chapter', bk_books:'← Books', bk_ch:'← Chapters',
  med_remain:'TIME LEFT', med_themes:'Meditation themes', med_start:'▶ Start', med_done:'✅ Meditation complete!',
  past_title:'👨‍💼 Pastor Space', past_sub:"Connect directly with a pastor ready to help you.", past_badge:'✦ FANANTENANA PASTORS',
  p1_ch:'Christian Church', p1_sp:'Spiritual support', p2_ch:'Christian Church', p2_sp:'Prayer and teaching',
  past_jt:'Another pastor wants to join?', past_js:'Fill the form to join ZivOr.', past_btn:'📝 Register as Pastor',
  chat_inp:'Write your message...', chat_on:'🟢 Online', chat_off:'⚙️ Local',
  chat_welcome:'Hello! How can I help you? 🙏',
  chat_reps:['Thank you for your message. We pray for you! 🙏','May God bless and guide you.','Amen! We are here for you.',"God's peace keeps you 🕊️"],
  actu_ttl:'🌍 Evangelical News', np_txt:'Share an evangelical message...', st_me:'My story',
  mp_title:'📢 Share a Message', mp_cat_lbl:'CATEGORY', mp_msg_lbl:'YOUR MESSAGE', mp_vs_lbl:'VERSE (optional)', mp_btn:'📤 Publish',
  mcat_haf:'✦ Message', mcat_ev:'✦ Gospel', mcat_fid:'🙌 Praise', mcat_vao:'🌍 News',
  like:'Like', comment:'Comment', share:'Share', cph:'Comment...',
  temo_ttl:'✨ Testimonies', temo_btn:'+ Share', tc_all:'🌟 All', tc_sit:'🙌 Healing', tc_asa:'💼 Work', tc_fam:'❤️ Family',
  mt_title:'✍️ Share my Testimony', mt_nom_lbl:'YOUR NAME', mt_tit_lbl:'TITLE', mt_msg_lbl:'YOUR TESTIMONY', mt_vs_lbl:'VERSE', mt_btn:'📤 Publish', mt_cat_lbl:'CATEGORY',
  tcat_sit:'🙌 Healing', tcat_asa:'💼 Work', tcat_fam:'❤️ Family', tcat_haf:'✦ Other',
  mi_title:'📝 Pastor Registration', mi_nom_lbl:'FULL NAME', mi_email_lbl:'EMAIL', mi_tel_lbl:'PHONE', mi_egl_lbl:'CHURCH', mi_spec_lbl:'SPECIALTY', mi_btn:'📤 Send',
  nav_home:'Home', nav_bible:'Bible', nav_med:'Meditation', nav_past:'Pastors', nav_actu:'News', nav_temo:'Testimonies', nav_lib:'Bookstore',
  lib_ttl:'📚 Christian Bookstore', lc_all:'📚 All', lc_bib:'📖 Bibles', lc_dev:'🌅 Devotion', lc_pri:'🙏 Prayer', lc_enf:'👶 Children',
  liv_order:'🛒 Order', liv_nostock:'❌ Out of stock',
  cmd_tel_lbl:'YOUR NUMBER (Airtel Money)', mvola_txt:"Send your payment to <strong style='color:var(--gold)'>033 07 116 14</strong> (Airtel Money) and enter your number here.",
  cmd_btn:'✅ Confirm order',
  t_ordered:'✅ Order received! We will contact you 🙏', t_posted:'✅ Published!', t_sent:'🙏 Sent!', t_empty:'⚠️ Fill in the field',
  install:'Install this application on your screen', install_btn:'Install'
}
};

/* ──────────────────────────────────────────────────────────────
   6. HELPERS
────────────────────────────────────────────────────────────────*/
const _ = id => document.getElementById(id);

function t_(id, v) { const e = _(id); if (e) e.textContent = v || ''; }
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];});}
function escHtml(s){ return esc(s); }
function escAttr(s){return esc(s).replace(/`/g,'&#96;');}
function safeHtmlBasic(s){return String(s==null?'':s).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,'').replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,'');}
function h_(id, v) { const e = _(id); if (e) e.innerHTML  = safeHtmlBasic(v || ''); }
function setHtml(id, v){ const e = _(id); if(e) e.innerHTML = v || ''; }
function normalizeWs(s){ return String(s==null?'':s).replace(/\s+/g,' ').trim(); }
function renderVerseMap(verses){ 
  if(!verses) return ''; 
  return Object.keys(verses).sort(function(a,b){return parseInt(a)-parseInt(b);}).map(function(n){ 
    return '<div class="vitem" id="v-' + n + '"><span class="vnum">'+esc(n)+'</span>'+esc(normalizeWs(verses[n]))+'</div>'; 
  }).join(''); 
}
function renderVerseArray(arr){ 
  if(!Array.isArray(arr)) return ''; 
  return arr.map(function(v){ 
    var num = v.verse || v.verse_nr || v.number || ''; 
    var txt = normalizeWs(v.text || v.verse_text || v.content || ''); 
    return txt ? '<div class="vitem" id="v-' + num + '"><span class="vnum">'+esc(String(num))+'</span>'+esc(txt)+'</div>' : ''; 
  }).filter(Boolean).join(''); 
}
function ph_(id,v) { const e = _(id); if (e) e.placeholder = v || ''; }

let _toastTmr;
function showT(msg) {
  const t = _('toast');
  if (!t) { console.log(msg); return; }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTmr);
  _toastTmr = setTimeout(() => t.classList.remove('show'), 2700);
}
window.addEventListener('error', function(e){ try{ console.error(e.error||e.message||e); showT('⚠️ Une erreur est survenue'); }catch(_){ } });
window.addEventListener('unhandledrejection', function(e){ try{ console.error(e.reason||e); showT('⚠️ Opération interrompue'); }catch(_){ } });

function oM(id) {
  /* Cacher install-bar quand on ouvre un modal */
  const bar = _('install-bar');
  if (bar) { bar.classList.remove('show'); sessionStorage.setItem('fn_install_skipped','1'); }
  _(id).classList.add('open');
}
function cM(id) { _(id).classList.remove('open'); }


/* ──────────────────────────────────────────────────────────────
   MOBILE MONEY — Configuration
   ⚠️  Change ces numéros par les vrais numéros du ministère
────────────────────────────────────────────────────────────────*/
const MM_NUMS = {
  mvola:  '033 07 116 14',   /* Airtel Money — numéro réel */
  orange: '033 07 116 14',   /* même numéro en fallback */
  airtel: '033 07 116 14'    /* Airtel Money */
};
const MM_LABELS = {
  mvola:  'MVola (Telma)',
  orange: 'Orange Money',
  airtel: 'Airtel Money'
};
let selectedMM  = 'mvola';
let selectedAmt = '2000';
let selectedMMCmd = 'mvola';

function selAmt(btn, amt) {
  document.querySelectorAll('.da').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  if (amt) selectedAmt = amt;
}

function selMM(btn, op) {
  document.querySelectorAll('.mmbtn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  selectedMM = op;
  const instr = _('mm-instr');
  const amt   = (parseInt(selectedAmt)||2000).toLocaleString('fr');
  const num   = MM_NUMS[op];
  const code  = '*181#'; /* Airtel Money uniquement */
  instr.classList.add('show');
  _('mm-step1').innerHTML = '1. Composez <strong>' + code + '</strong> sur votre téléphone';
  _('mm-step2').innerHTML = '2. Envoyez <strong>' + amt + ' Ar</strong> au : <span class="mm-num" onclick="copyNum(\'' + num + '\')">' + num + '</span>';
  _('mm-step3').innerHTML = '3. Appuyez sur <strong>"Confirmer mon don"</strong> ci-dessous';
}

function copyNum(num) {
  navigator.clipboard?.writeText(num).catch(()=>{});
  showT('📋 ' + num + ' copié !');
}

function ouvrirModalDon() {
  const amt = (parseInt(selectedAmt)||2000).toLocaleString('fr');
  const num = '033 07 116 14';
  t_('mdon-amt', amt + ' Ar');
  t_('mdon-op',  'Airtel Money');
  _('mdon-steps').innerHTML =
    '<div style="margin-bottom:6px">1️⃣  Compose <strong style="color:var(--gold2)">*181#</strong> sur ton téléphone Airtel</div>' +
    '<div style="margin-bottom:6px">2️⃣  Envoie <strong style="color:var(--gold2)">' + amt + ' Ar</strong> au :</div>' +
    '<div style="text-align:center;margin:12px 0;padding:12px;background:rgba(201,150,58,.08);border-radius:12px;border:1px solid rgba(201,150,58,.2)">' +
      '<div style="font-size:22px;font-weight:800;color:var(--gold);letter-spacing:2px;cursor:pointer;font-family:var(--f-serif)" onclick="copyNum(\'033 07 116 14\')">033 07 116 14</div>' +
      '<div style="font-size:11px;color:var(--mut);margin-top:4px">Airtel Money · ZivOr · 👆 appuyer pour copier</div>' +
    '</div>' +
    '<div>3️⃣  Entre ton numéro et le n° transaction ci-dessous</div>';
  oM('modal-don');
}

async function confirmerDon() {
  const tel = (_('don-tel').value||'').trim();
  const ref = (_('don-ref').value||'').trim();
  if (!tel || tel.replace(/\s/g,'').length < 9) { showT(L[lang].t_empty); return; }
  const btn = _('mdon-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spin"></span>';
  const uid = currentUser ? currentUser.uid : 'anon';
  try {
    await db.collection('dons').add({
      montant:    parseInt(selectedAmt)||2000,
      operateur:  selectedMM,
      telephone:  tel,
      reference:  ref || null,
      statut:     'en_attente',
      uid,
      cree_le:    firebase.firestore.FieldValue.serverTimestamp()
    });
    cM('modal-don');
    showT('🙏 Misaotra ! Don enregistré, merci !');
  } catch(e) {
    showT('🙏 Don noté ! Misaotra !');
    cM('modal-don');
  }
  btn.disabled = false;
  btn.textContent = '✅ Confirmer mon don';
}

function selMMCmd(btn, op) {
  document.querySelectorAll('#cmd-form .mmbtn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  selectedMMCmd = op;
  const instr = _('cmd-mm-instr');
  const txt   = _('mvola-txt');
  instr.style.display = '';
  const num   = MM_NUMS[op];
  if (txt) txt.innerHTML = `Envoyez le paiement au <strong style="color:var(--gold);font-size:15px;cursor:pointer" onclick="copyNum('${num}')">${num}</strong> (${MM_LABELS[op]}) puis entrez votre numéro ci-dessous.`;
}


function now() {
  return new Date().toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
}

function timeAgo(iso) {
  if (!iso) return '';
  const s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s <    60) return lang === 'mg' ? 'Vao haingana' : lang === 'fr' ? "À l'instant" : 'Just now';
  if (s <  3600) return Math.floor(s / 60) + ' min';
  if (s < 86400) return Math.floor(s / 3600) + ' h';
  return new Date(iso).toLocaleDateString();
}

function fmtTS(ts) {
  if (!ts) return '';
  if (ts.toDate) return ts.toDate().toISOString();
  return new Date(ts).toISOString();
}

/* ──────────────────────────────────────────────────────────────
   7. MODE JOUR / NUIT  (persisté en localStorage)
────────────────────────────────────────────────────────────────*/
function toggleMode() {
  isDark = !isDark;
  document.body.classList.toggle('day', !isDark);
  _('modebtn').textContent = isDark ? '🌙' : '☀️';
  const m = _('theme-meta');
  if (m) m.content = isDark ? '#C9963A' : '#F4F1EA';
  localStorage.setItem('fn_mode', isDark ? 'dark' : 'day');
}

function loadMode() {
  const s = localStorage.getItem('fn_mode');
  if (s === 'day') {
    isDark = false;
    document.body.classList.add('day');
    _('modebtn').textContent = '☀️';
    const m = _('theme-meta');
    if (m) m.content = '#F4F1EA';
  }
}

/* ──────────────────────────────────────────────────────────────
   8. LANGUE  (persistée en localStorage)
────────────────────────────────────────────────────────────────*/
function sL(l) {
  lang = l;
  const t = L[l];

  /* Boutons langue */
  document.querySelectorAll('.lp').forEach(b =>
    b.classList.toggle('on', b.textContent === l.toUpperCase())
  );

  /* Accueil — verset + poème + motivation changent selon la langue ET le jour */
  t_('gh', t.hello);
  t_('vb', t.verse_lbl);
  t_('pl', t.poem_lbl);
  /* Bento grid labels */
  var bentoLabels = {
    mg:{ bible:'Baiboly', med:'Fisaintsainana', past:'Pastora', news:'Vaovao', medsub:'Misao, mivavaka', pastsub:'Miresaka', newssub:'Fanamasinana' },
    fr:{ bible:'Bible', med:'Méditation', past:'Pasteurs', news:'Actualités', medsub:'Prier, méditer', pastsub:'Discuter', newssub:'Publications' },
    en:{ bible:'Bible', med:'Meditation', past:'Pastors', news:'News', medsub:'Pray, meditate', pastsub:'Connect', newssub:'Publications' }
  };
  var bl = bentoLabels[l] || bentoLabels.mg;
  t_('bento-bible-lbl', bl.bible);
  t_('bento-med-lbl',   bl.med);
  t_('bento-past-lbl',  bl.past);
  t_('bento-news-lbl',  bl.news);
  t_('bento-med-sub',   bl.medsub);
  t_('bento-past-sub',  bl.pastsub);
  t_('bento-news-sub',  bl.newssub);
  /* motiv_lbl retiré — élément ml supprimé de l'accueil compact */
  uDate();
  setVerset(); /* recalcule le verset, le poème ET la motivation dans la bonne langue */

  /* Bible */
  ph_('si', t.bible_search);
  t_('tab-at', t.bible_at);
  t_('tab-nt', t.bible_nt);
  if (cT) lB(cT);

  /* Méditation */
  t_('tlbl',    t.med_remain);
  t_('med-sec', t.med_themes);
  t_('btnStart',t.med_start);
  renderMedThemes();

  /* Pasteurs */
  t_('past-title', t.past_title);
  t_('past-sub',   t.past_sub);
  t_('past-badge', t.past_badge);
  t_('p1-ch', t.p1_ch); t_('p1-sp', t.p1_sp);
  t_('p2-ch', t.p2_ch); t_('p2-sp', t.p2_sp);
  t_('past-jt',  t.past_jt);
  t_('past-js',  t.past_js);
  t_('past-btn', t.past_btn);
  ph_('cinp', t.chat_inp);

  /* Nouveau modal publication */
  if (_('mp-title')) _('mp-title').textContent = t.mp_title || '✍️ Nouvelle publication';
  if (_('mp-btn'))   _('mp-btn').textContent   = t.mp_btn   || '📤 Publier';
  if (_('np-txt'))   _('np-txt').textContent   = t.np_txt   || 'Partagez votre message...';

  /* Actualités */
  t_('actu-ttl', t.actu_ttl);
  t_('np-txt',   t.np_txt);
  /* Don discret */
  if (_('don-btn-lbl')) _('don-btn-lbl').textContent = (t.don_btn || '💝 Soutenir').replace('💝 ','');
  if (_('mdon-title'))  _('mdon-title').textContent  = t.don_title || '💝 Faire un don';
  t_('mp-title', t.mp_title);
  document.querySelectorAll('.cinps').forEach(i => i.placeholder = t.cph);

  /* Témoignages */

  /* Pasteur inscription */
  t_('mi-title',    t.mi_title);
  t_('mi-nom-lbl',  t.mi_nom_lbl);
  t_('mi-email-lbl',t.mi_email_lbl);
  t_('mi-tel-lbl',  t.mi_tel_lbl);
  t_('mi-egl-lbl',  t.mi_egl_lbl);
  t_('mi-spec-lbl', t.mi_spec_lbl);
  t_('mi-btn',      t.mi_btn);

  /* Nav */
  t_('nav-home',  t.nav_home);
  t_('nav-bible', t.nav_bible);
  t_('nav-med',   t.nav_med);
  t_('nav-past',  t.nav_past);
  t_('nav-actu',  t.nav_actu);
  t_('nav-temo',  t.nav_temo);
  t_('nav-lib',   t.nav_lib);

  /* Librairie */
  t_('lib-ttl', t.lib_ttl);
  t_('lc-all', t.lc_all); t_('lc-bib', t.lc_bib);
  t_('lc-dev', t.lc_dev); t_('lc-pri', t.lc_pri);
  t_('lc-enf', t.lc_enf);

  /* Bannière install — texte géré directement dans le HTML */

  /* Re-render les listes dynamiques */
  if (feedPosts.length) renderFeed();
  if (allTemo.length)   renderTemo();
  renderLivres();

  localStorage.setItem('fn_lang', l);
}

/* ──────────────────────────────────────────────────────────────
   9. DATE / HORLOGE
────────────────────────────────────────────────────────────────*/
function uDate() {
  const n = new Date();
  t_('gd', DAYS[lang][n.getDay()] + ' ' + n.getDate() + ' ' + MONTHS[lang][n.getMonth()] + ' ' + n.getFullYear());
}

setInterval(() => {
  const n = new Date();
  t_('clk', n.getHours().toString().padStart(2,'0') + ':' + n.getMinutes().toString().padStart(2,'0'));
}, 1000);

/* ──────────────────────────────────────────────────────────────
   10. NAVIGATION PAGES
────────────────────────────────────────────────────────────────*/
function gP(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('on'));
  var pageEl = _('page-' + id);
  if (!pageEl) return;
  pageEl.style.display = ''; /* reset inline display:none */
  pageEl.classList.add('on');
  if (btn) {
    btn.classList.add('on');
    const badge = btn.querySelector('.new-badge');
    if (badge) badge.remove();
  }
  if (id === 'bible')      lB(cT || 'AT');
  if (id === 'actu')       chargerFeed();
  if (id === 'temo')       chargerTemo();
  if (id === 'librairie')  chargerLivres();
  if (id === 'past-space') {
    pastSwitchTab('msgs', _('ptab-msgs'));
    pastChargerConvs();
  }
}



/* ──────────────────────────────────────────────────────────────
   11. BIBLE
────────────────────────────────────────────────────────────────*/
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


/* ──────────────────────────────────────────────────────────────
   12. MÉDITATION — TIMER
────────────────────────────────────────────────────────────────*/

/* ── THÈMES MÉDITATION ──────────────────────────────────*/
const THEMES = {
  mg:[
    {ic:'❤️',n:'Fitiavana',   v:'Jaona 3:16',    t:"Saintsaino ny fitiavan\'Andriamanitra anao.",      c:'rgba(224,92,92,.07)',  b:'rgba(224,92,92,.16)'},
    {ic:'☮️',n:'Fiadanana',   v:'Filipiana 4:6',  t:"Alefaso ny ahiahinao rehetra amin\'Andriamanitra.", c:'rgba(74,144,217,.07)', b:'rgba(74,144,217,.16)'},
    {ic:'💪',n:'Hery',        v:'Josoa 1:9',      t:"Andriamanitra miaraka aminao na aiza na aiza.",      c:'rgba(107,63,160,.1)',  b:'rgba(107,63,160,.2)'},
    {ic:'🙏',n:'Fisaorana',   v:'1 Tes 5:18',     t:"Misaora an\'Andriamanitra amin\'ny zavatra rehetra.",c:'rgba(201,150,58,.07)',b:'rgba(201,150,58,.17)'},
    {ic:'🌱',n:'Fibeazana',   v:'Galatiana 2:20', t:"Ahoana ny fitombon\'ny finoanao androany?",          c:'rgba(76,175,125,.07)',b:'rgba(76,175,125,.17)'},
    {ic:'🌅',n:'ZivOr', v:'Jeremia 29:11',  t:"Andriamanitra manana drafitra tsara ho anao.",       c:'rgba(230,126,34,.07)',b:'rgba(230,126,34,.17)'}
  ],
  fr:[
    {ic:'❤️',n:'Amour',      v:'Jean 3:16',         t:"Méditez sur l\'amour personnel de Dieu pour vous.", c:'rgba(224,92,92,.07)',  b:'rgba(224,92,92,.16)'},
    {ic:'☮️',n:'Paix',       v:'Philippiens 4:6',   t:"Confiez toutes vos inquiétudes à Dieu.",            c:'rgba(74,144,217,.07)', b:'rgba(74,144,217,.16)'},
    {ic:'💪',n:'Force',      v:'Josué 1:9',          t:"Dieu est avec vous partout où vous allez.",         c:'rgba(107,63,160,.1)',  b:'rgba(107,63,160,.2)'},
    {ic:'🙏',n:'Gratitude',  v:'1 Thess 5:18',      t:"Notez 3 bénédictions de la semaine passée.",        c:'rgba(201,150,58,.07)',b:'rgba(201,150,58,.17)'},
    {ic:'🌱',n:'Croissance', v:'Galates 2:20',       t:"Comment a grandi votre foi cette semaine?",         c:'rgba(76,175,125,.07)',b:'rgba(76,175,125,.17)'},
    {ic:'🌅',n:'Espérance',  v:'Jérémie 29:11',     t:"Dieu a un beau plan pour vous.",                    c:'rgba(230,126,34,.07)',b:'rgba(230,126,34,.17)'}
  ],
  en:[
    {ic:'❤️',n:'Love',      v:'John 3:16',        t:"Meditate on God\'s personal love for you.",          c:'rgba(224,92,92,.07)',  b:'rgba(224,92,92,.16)'},
    {ic:'☮️',n:'Peace',     v:'Philippians 4:6',  t:"Release all your worries to God.",                   c:'rgba(74,144,217,.07)', b:'rgba(74,144,217,.16)'},
    {ic:'💪',n:'Strength',  v:'Joshua 1:9',        t:"God is with you wherever you go.",                   c:'rgba(107,63,160,.1)',  b:'rgba(107,63,160,.2)'},
    {ic:'🙏',n:'Gratitude', v:'1 Thess 5:18',     t:"List 3 blessings from the past week.",               c:'rgba(201,150,58,.07)',b:'rgba(201,150,58,.17)'},
    {ic:'🌱',n:'Growth',    v:'Galatians 2:20',   t:"How has your faith grown this week?",                c:'rgba(76,175,125,.07)',b:'rgba(76,175,125,.17)'},
    {ic:'🌅',n:'Hope',      v:'Jeremiah 29:11',   t:"God has a wonderful plan for you.",                  c:'rgba(230,126,34,.07)',b:'rgba(230,126,34,.17)'}
  ]
};

function renderMedThemes() {
  const th = THEMES[lang] || THEMES.mg;
  /* On utilise data-idx pour éviter les apostrophes dans onclick */
  _('med-themes').innerHTML = th.map((t, i) =>
    `<div class="tcard" style="background:${t.c};border:1px solid ${t.b}" data-idx="${i}" onclick="pThemeIdx(this)">
       <span class="tico">${t.ic}</span>
       <div class="tnm">${t.n}</div>
       <div class="tvs">${t.v}</div>
     </div>`
  ).join('');
}

function pThemeIdx(el) {
  const i  = parseInt(el.dataset.idx, 10);
  const th = (THEMES[lang] || THEMES.mg)[i];
  pTheme(th.ic + ' ' + th.n, th.v, th.t);
}

function pTheme(title, v, text) {
  const el = _('td2');
  if (!el) return;
  el.style.display = '';
  el.innerHTML = `<div class="card cgold">
    <div class="plbl">${title} — ${v}</div>
    <div class="ptxt" style="font-style:normal">${text}</div>
  </div>`;
}

function sDur(min, btn) {
  document.querySelectorAll('.dp').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  timerTotal = timerLeft = min * 60;
  timerRunning = false;
  clearInterval(timerInt);
  uTimer();
  _('tp').style.background = 'conic-gradient(var(--gold) 0deg, transparent 0deg)';
}

function tStart() {
  if (timerRunning) return;
  timerRunning = true;
  timerInt = setInterval(() => {
    timerLeft--;
    if (timerLeft <= 0) {
      clearInterval(timerInt);
      timerRunning = false;
      timerLeft = 0;
      showT(L[lang].med_done);
    }
    uTimer();
    _('tp').style.background =
      `conic-gradient(var(--gold) ${(1 - timerLeft/timerTotal) * 360}deg, transparent 0deg)`;
  }, 1000);
}

function tPause() { timerRunning = false; clearInterval(timerInt); }

function tStop() {
  tPause();
  timerLeft = timerTotal;
  uTimer();
  _('tp').style.background = 'conic-gradient(var(--gold) 0deg, transparent 0deg)';
}

function uTimer() {
  const m = Math.floor(timerLeft / 60);
  const s = timerLeft % 60;
  t_('tdis', m.toString().padStart(2,'0') + ':' + s.toString().padStart(2,'0'));
}

/* ──────────────────────────────────────────────────────────────
   13. CHAT PASTEUR — onSnapshot temps réel
────────────────────────────────────────────────────────────────*/
function openChat(av, name, tel, pasteurId) {
  curPasteurName = name;
  t_('cav2',  av);
  t_('cnam2', name);
  t_('ctel2', '📞 ' + tel);
  _('cmsgs').innerHTML = '';
  _('cpanel').classList.add('open');

  /* UID stable stocké en localStorage pour éviter des rooms dupliqués */
  let uid;
  if (currentUser && !currentUser.isAnonymous) {
    uid = currentUser.uid;
  } else if (currentUser) {
    uid = currentUser.uid; /* Firebase anonymous UID = stable par appareil */
  } else {
    uid = localStorage.getItem('fn_uid');
    if (!uid) { uid = 'anon_' + Math.random().toString(36).slice(2,10); localStorage.setItem('fn_uid', uid); }
  }
  curRoom    = 'chat_' + pasteurId + '_' + uid;
  const fb   = _('fbstat');

  if (chatUnsub) { chatUnsub(); chatUnsub = null; }

  const unsubFn = db.collection('chats').doc(curRoom).collection('messages')
    .orderBy('cree_le', 'asc').limit(50)
    .onSnapshot(
      snap => {
        fb.className  = 'fbstat fbon';
        fb.textContent = L[lang].chat_on;
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
        fb.className  = 'fbstat fboff';
        fb.textContent = L[lang].chat_off;
        if (_('cmsgs').children.length === 0) {
          setTimeout(() => addBub(L[lang].chat_welcome, 'in', now()), 400);
        }
      }
    );
  chatUnsub = unsubFn;
}

function xChat() {
  if (chatUnsub) { chatUnsub(); chatUnsub = null; }
  _('cpanel').classList.remove('open');
  curRoom = null;
}

function addBub(txt, dir, h, id) {
  const msgs = _('cmsgs');
  const d    = document.createElement('div');
  d.className = 'bub ' + dir;
  if (id) d.id = 'msg-' + id;
  d.innerHTML  = txt + (h ? `<div class="btime">${h}</div>` : '');
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

async function sMsg() {
  const inp = _('cinp');
  const txt = inp.value.trim();
  if (!txt) return;
  if (!db) { addBub(txt,'out',now()); return; }
  inp.value = '';
  const uid = currentUser ? currentUser.uid : 'anon';
  try {
    await db.collection('chats').doc(curRoom).collection('messages').add({
      texte: txt, uid, nom: 'Moi', avatar: '😊',
      lu: false, cree_le: firebase.firestore.FieldValue.serverTimestamp()
    });
    db.collection('conversations').doc(curRoom).set({
      dernier_message:    txt,
      derniere_activite:  firebase.firestore.FieldValue.serverTimestamp(),
      pasteur_nom:        curPasteurName,
      pasteur_id:         curRoom.split('_').slice(0, -1).join('_').replace('chat_',''),
      non_lus:            firebase.firestore.FieldValue.increment(1),
      nom_utilisateur:    'Fidèle ' + uid.slice(-4)
    }, { merge: true });
    /* ── Notification push au pasteur ── */
    /* Le pasteur sauvegarde son token sous son pasteurId dans admin.html */
    try {
      const pasteurDocId = curRoom.split('_').slice(1, -1).join('_'); /* ex: pasteur_fidisoa */
      const tok = await db.collection('pasteur_tokens').doc(pasteurDocId).get();
      if(tok.exists && tok.data().subscription){
        fetch('/.netlify/functions/notify', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            subscription: tok.data().subscription,
            title: '💬 Nouveau message — ZivOr',
            body: txt.length>80 ? txt.substring(0,80)+'…' : txt,
            url: '/admin.html'
          })
        }).catch(()=>{});
      }
    }catch(ne){/* silencieux si hors-ligne */}
  } catch (e) {
    /* Fallback hors-ligne */
    addBub(txt, 'out', now());
    const reps = L[lang].chat_reps;
    const ty   = _('typi');
    ty.textContent = '...';
    ty.classList.add('show');
    setTimeout(() => {
      ty.classList.remove('show');
      addBub(reps[Math.floor(Math.random() * reps.length)], 'in', now());
    }, 2100);
  }
}

/* ──────────────────────────────────────────────────────────────
   14. FEED ACTUALITÉS — onSnapshot temps réel
────────────────────────────────────────────────────────────────*/
function chargerFeed() {
  if (!feedPosts.length) { feedPosts = [...DEF_POSTS]; renderFeed(); renderHomeFeed(); }
  if (feedUnsub) return;
  if (!db) return;
  feedUnsub = db.collection('actualites')
    .orderBy('cree_le', 'desc').limit(30)
    .onSnapshot(
      snap => {
        const avant = feedPosts.length;
        const live = snap.docs.map(d => ({
          id: d.id, ...d.data(), cree_le: fmtTS(d.data().cree_le)
        }));
        feedPosts = live.length
          ? [...live, ...DEF_POSTS.filter(dp => !live.find(p => p.id === dp.id))]
          : [...DEF_POSTS];
        renderFeed(); renderHomeFeed();
        if (avant > 0 && live.length > avant) {
          const navBtn = document.querySelector('.nb[onclick*="actu"]');
          const page = _('page-actu');
          if (navBtn && page && !page.classList.contains('on') && !navBtn.querySelector('.new-badge')) {
            const b = document.createElement('span');
            b.className = 'new-badge';
            b.style.cssText = 'position:absolute;top:4px;right:8px;width:8px;height:8px;background:#E05C5C;border-radius:50%;pointer-events:none';
            navBtn.style.position = 'relative';
            navBtn.appendChild(b);
          }
        }
      },
      function(err) { console.warn('Feed:', err.message); feedUnsub = null; if (!feedPosts.length) { feedPosts = [...DEF_POSTS]; renderFeed(); renderHomeFeed(); } }
    );
}

function renderHomeFeed() {
  const c = _('home-feed');
  if (!c) return;
  const posts = feedPosts.slice(0, 3);
  if (!posts.length) { c.innerHTML = '<div style="text-align:center;padding:16px;color:var(--mut);font-size:13px">Aucune actualité pour le moment</div>'; return; }
  c.innerHTML = posts.map(p => `
    <div class="card" style="padding:12px 14px;margin-bottom:8px;cursor:pointer" onclick="gP('actu',document.querySelector('.nb[onclick*=actu]'))">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <span style="font-size:18px">${esc(p.auteur_avatar||'🌍')}</span>
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--cream)">${esc(p.auteur_nom||'')}</div>
          <div style="font-size:11px;color:var(--mut)">${esc(timeAgo(p.cree_le))}</div>
        </div>
        <span style="margin-left:auto;font-size:10px;background:rgba(201,150,58,.15);color:var(--gold);padding:2px 8px;border-radius:10px">${esc(p.categorie_label||'')}</span>
      </div>
      <div style="font-size:13px;color:var(--cream);line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(p.texte||'')}</div>
    </div>`).join('');
}

function renderFeed() {
  const c = _('feed-posts');
  if (!c) return;
  const filtered = feedFilt === 'all'
    ? feedPosts
    : feedPosts.filter(function(p) { return p.type === feedFilt; });
  c.innerHTML = filtered.map(function(p) { return renderPost(p); }).join('')
    || '<div style="text-align:center;padding:40px;color:var(--mut)">Aucune publication pour le moment</div>';
}

function renderPost(p) {
  var t     = L[lang];
  var txt   = typeof p.texte === 'string' ? p.texte : '';
  var vs    = typeof p.verset === 'string' ? p.verset : '';
  var txtEsc = esc(txt);
  var vsEsc = esc(vs);
  var titre = p.titre || '';
  var titreEsc = esc(titre);
  var likes = typeof p.likes === 'number' ? p.likes : 0;
  var coms  = typeof p.nb_commentaires === 'number' ? p.nb_commentaires : 0;
  var nom   = p.auteur_nom || 'Anonyme';
  var nomEsc = esc(nom);
  var paysEsc = esc(p.auteur_pays || '');
  var catEsc = esc(p.categorie_label || '');
  var avatarEsc = esc(p.auteur_avatar || '😊');
  var photoUrl = /^https?:\/\//i.test(p.photo_url || '') ? p.photo_url : '';
  var photoAttr = escAttr(photoUrl);
  var versetRefEsc = esc(p.verset_ref || '');
  var shareTxt = encodeURIComponent((titre ? titre + ' — ' : '') + txt.substring(0,180) + '\n\n✝️ ZivOr\n' + window.location.href);

  /* Badge type */
  var typeInfo = PUB_TYPES[p.type] || null;
  var badge = typeInfo
    ? '<span class="post-type-badge ' + typeInfo.badge + '">' + esc(typeInfo.ic + ' ' + typeInfo.label) + '</span>'
    : (p.categorie_label ? '<span class="ppbdg">' + catEsc + '</span>' : '');

  return (
    '<div class="pc" id="post-' + escAttr(p.id) + '">' +

    /* ── Header auteur ── */
    '<div class="ph">' +
      '<div class="ppa">' + avatarEsc + '</div>' +
      '<div style="flex:1;min-width:0">' +
        '<div class="ppauth">' + nomEsc + '</div>' +
        '<div class="pptime">' + esc(timeAgo(p.cree_le)) + (p.auteur_pays ? ' · ' + paysEsc : '') + '</div>' +
        (badge ? '<div style="margin-top:3px">' + badge + '</div>' : '') +
      '</div>' +
      /* Menu discret */
      '<button onclick="ouvrirSignalement(\'' + p.id + '\')" style="background:none;border:none;color:var(--mut);padding:6px;cursor:pointer;font-size:16px;line-height:1;border-radius:50%">⋯</button>' +
    '</div>' +

    /* ── Titre ── */
    (titre ? '<div style="padding:0 14px 6px;font-weight:700;font-family:var(--f-serif);font-size:17px;color:var(--gold2);line-height:1.4">' + titreEsc + '</div>' : '') +

    /* ── Texte ── */
    (txt ? '<div class="ptxtp" style="padding-top:' + (titre?'0':'8px') + '">' + txtEsc + '</div>' : '') +

    /* ── Photo PLEINE LARGEUR style Facebook ── */
    (photoUrl
      ? '<img src="' + photoAttr + '" class="post-photo" onclick="this.classList.toggle(\'expanded\')" loading="lazy">'
      : '') +

    /* ── Verset biblique ── */
    (vs ? '<div class="pverset"><div class="pvtxt">"' + vsEsc + '"</div><div class="pvref">— ' + versetRefEsc + '</div></div>' : '') +

    /* ── Compteur likes/comms ── */
    (likes > 0 || coms > 0
      ? '<div style="padding:4px 14px 2px;font-size:12px;color:var(--mut);display:flex;gap:10px">' +
          (likes > 0 ? '<span>❤️ ' + likes.toLocaleString() + '</span>' : '') +
          (coms > 0  ? '<span>💬 ' + coms + '</span>' : '') +
        '</div>'
      : '') +

    /* ── Réactions épurées style Facebook ── */
    '<div class="preact">' +
      '<button class="rbtn" id="lb-' + p.id + '" onclick="tLike(this,' + likes + ',\'' + p.id + '\')">' +
        '❤️ <span>' + (t.like || 'J\'aime') + '</span>' +
      '</button>' +
      '<div class="rsep"></div>' +
      '<button class="rbtn" onclick="document.getElementById(\'csec-' + p.id + '\').classList.toggle(\'open\')">' +
        '💬 <span>' + (t.comment || 'Commenter') + '</span>' +
      '</button>' +
      '<div class="rsep"></div>' +
      '<a href="https://wa.me/?text=' + shareTxt + '" target="_blank" rel="noopener" class="rbtn" style="text-decoration:none">' +
        '↗ <span>' + (t.share || 'Partager') + '</span>' +
      '</a>' +
    '</div>' +

    /* ── Zone commentaires ── */
    '<div class="csec" id="csec-' + p.id + '">' +
      '<div class="cir">' +
        '<input class="cinps" placeholder="' + (t.cph || 'Commenter...') + '" onkeydown="if(event.key===\'Enter\')doComment(this,\'cc-' + p.id + '\',\'' + p.id + '\')">' +
        '<button class="csend2" onclick="doComment(this.previousElementSibling,\'cc-' + p.id + '\',\'' + p.id + '\')">➤</button>' +
      '</div>' +
      '<div id="cc-' + p.id + '"></div>' +
    '</div>' +

    '</div>'
  );
}

async function tLike(btn, c, pid) {
  const on = btn.classList.toggle('liked');
  btn.querySelector('span').textContent = (on ? c + 1 : c).toLocaleString();
  if (pid.startsWith('dp')) return;
  const uid = currentUser ? currentUser.uid : null;
  if (!uid) return;
  try {
    const ref  = db.collection('actualites').doc(pid);
    const doc  = await ref.get();
    const uids = (doc.data()?.likes_uids || []).filter(u => typeof u === 'string');
    const idx  = uids.indexOf(uid);
    if (idx === -1) uids.push(uid); else uids.splice(idx, 1);
    await ref.update({ likes: uids.length, likes_uids: uids });
  } catch (e) { /* hors-ligne : UI déjà mise à jour */ }
}

function doShare(encodedTxt) {
  const txt = decodeURIComponent(encodedTxt);
  if (navigator.share) {
    navigator.share({ title: 'ZivOr', text: txt, url: window.location.href });
  } else {
    navigator.clipboard?.writeText(txt + '\n' + window.location.href).catch(() => {});
    showT('📋 Copié !');
  }
}

async function doComment(inp, ccid, pid) {
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  const c = _(ccid);
  if (c) c.innerHTML +=
    `<div class="citem">
       <div class="cav3">😊</div>
       <div class="cbub2"><div class="cnam2b">Moi</div><div class="ctxt2">${esc(txt)}</div></div>
     </div>`;
  if (pid.startsWith('dp')) return;
  const uid = currentUser ? currentUser.uid : 'anon';
  try {
    await db.collection('actualites').doc(pid).collection('commentaires').add({
      texte: txt, auteur_uid: uid, auteur_nom: 'Utilisateur', auteur_avatar: '😊',
      cree_le: firebase.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('actualites').doc(pid).update({
      nb_commentaires: firebase.firestore.FieldValue.increment(1)
    });
  } catch (e) { /* hors-ligne : commentaire local déjà affiché */ }
}

/* ──────────────────────────────────────────────────────────────
   SYSTÈME DE PUBLICATION UNIFIÉ (actu + temo + recit + photo + priere)
────────────────────────────────────────────────────────────────*/
let currentPubType = 'actu';
let pubPhotoB64 = null;
let feedFilt = 'all';

/* Icônes et labels par type */
const PUB_TYPES = {
  actu:       { ic:'🌍', label:'Actualité',   badge:'badge-actu'       },
  temoignage: { ic:'✨', label:'Témoignage',  badge:'badge-temoignage' },
  recit:      { ic:'📖', label:'Récit',       badge:'badge-recit'      },
  photo:      { ic:'📷', label:'Photo',       badge:'badge-photo'      },
  priere:     { ic:'🙏', label:'Prière',      badge:'badge-priere'     }
};

function selPubType(btn) {
  document.querySelectorAll('.pub-type').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
  currentPubType = btn.dataset.type;
  var row = _('mp-titre-row');
  if (row) row.style.display = (currentPubType === 'temoignage' || currentPubType === 'recit') ? '' : 'none';
}

/* Pré-remplir le nom et l'avatar depuis le profil quand on ouvre mp */
var _origOM = oM;
oM = function(id) {
  _origOM(id);
  if (id === 'mp') {
    var p = getProfil();
    if (p.prenom) {
      var auteurEl = _('mp-auteur');
      if (auteurEl && !auteurEl.value) auteurEl.value = p.prenom + ' ' + (p.nom || '');
      var nameEl = _('mp-user-name');
      if (nameEl) nameEl.textContent = p.prenom + ' ' + (p.nom || '');
    }
  }
};

function filtFeed(cat, btn) {
  document.querySelectorAll('.ttab2').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  feedFilt = cat;
  renderFeed();
}

function previewPubPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showT('⚠️ Image max 5MB'); return; }
  const reader = new FileReader();
  reader.onload = function(e) {
    pubPhotoB64 = e.target.result;
    _('mp-photo-img').src = pubPhotoB64;
    _('mp-photo-preview').style.display = '';
    _('mp-photo-lbl').textContent = file.name;
  };
  reader.readAsDataURL(file);
}

function clearPubPhoto() {
  pubPhotoB64 = null;
  _('mp-photo-file').value = '';
  _('mp-photo-preview').style.display = 'none';
  _('mp-photo-lbl').textContent = 'Choisir une image...';
}

async function pubPost() {
  const txt    = (_('ptxt').value     || '').trim();
  const titre  = (_('mp-titre').value || '').trim();
  const vs     = (_('pvs').value      || '').trim();
  const auteur = (_('mp-auteur').value|| '').trim() || 'Anonyme';

  if (!txt) { showT('⚠️ ' + (L[lang].t_empty || 'Écrivez un message')); return; }
  if ((currentPubType === 'temoignage' || currentPubType === 'recit') && !titre) {
    showT('⚠️ Ajoutez un titre'); return;
  }

  const btn = _('mp-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spin"></span>'; }

  const typeInfo = PUB_TYPES[currentPubType] || PUB_TYPES.actu;
  const uid = currentUser ? currentUser.uid : 'anon';

  const data = {
    type:            currentPubType,
    type_label:      typeInfo.ic + ' ' + typeInfo.label,
    titre:           titre || '',
    texte:           txt,
    verset:          vs,
    verset_ref:      vs,
    auteur_nom:      auteur,
    auteur_avatar:   '😊',
    auteur_uid:      uid,
    auteur_pays:     'Madagascar',
    /* rétrocompatibilité avec l'ancien champ categorie_label */
    categorie_label: typeInfo.ic + ' ' + typeInfo.label,
    likes:           0,
    likes_uids:      [],
    nb_commentaires: 0,
    cree_le:         firebase.firestore.FieldValue.serverTimestamp()
  };
  if (pubPhotoB64) data.photo_url = pubPhotoB64;

  /* Afficher localement d'abord */
  const localPost = Object.assign({}, data, {
    id: '_tmp_' + Date.now(),
    cree_le: new Date().toISOString()
  });
  feedPosts.unshift(localPost);
  renderFeed();

  /* Fermer le modal et vider */
  cM('mp');
  _('ptxt').value = '';
  if (_('mp-titre'))  _('mp-titre').value  = '';
  if (_('pvs'))       _('pvs').value       = '';
  if (_('mp-auteur')) _('mp-auteur').value = '';
  clearPubPhoto();
  showT('✅ ' + (L[lang].t_posted || 'Publié ! 🙏'));

  /* Sauvegarder Firestore */
  if (db) {
    try {
      const ref = await db.collection('actualites').add(data);
      /* Remplacer l'entrée locale par le vrai ID */
      const idx = feedPosts.findIndex(function(p) { return p.id === localPost.id; });
      if (idx !== -1) feedPosts[idx].id = ref.id;
    } catch(e) { console.warn('pubPost Firestore:', e.message); }
  }

  if (btn) { btn.disabled = false; btn.textContent = '📤 Publier'; }
}

/* Alias pour compatibilité — pubTemo n'existe plus */
function pubTemo() { pubPost(); }

/* chargerTemo — redirige vers chargerFeed (tout est fusionné) */
function chargerTemo() { chargerFeed(); }
function filtTemo() {}
function renderTemo() {}
function tLikeTemo(btn, c, tid) { tLike(btn, c, tid); }

/* ──────────────────────────────────────────────────────────────
   16. INSCRIPTION PASTEUR
────────────────────────────────────────────────────────────────*/
async function submitPasteur() {
  const nom   = (_('mi-nom').value   || '').trim();
  const email = (_('mi-email').value || '').trim();
  const tel   = (_('mi-tel').value   || '').trim();
  const egl   = (_('mi-egl').value   || '').trim();
  const spec  = (_('mi-spec').value  || '').trim();
  if (!nom || !email || !tel || !egl) { showT(L[lang].t_empty); return; }
  const btn = _('mi-btn');
  btn.disabled  = true;
  btn.innerHTML = '<span class="spin"></span>';
  try {
    await db.collection('demandes_pasteurs').add({
      nom, email, telephone: tel, eglise: egl, specialite: spec,
      statut: 'en_attente', soumis_le: firebase.firestore.FieldValue.serverTimestamp()
    });
    cM('mi');
    ['mi-nom','mi-email','mi-tel','mi-egl','mi-spec'].forEach(id => {
      const e = _(id); if (e) e.value = '';
    });
    showT(L[lang].t_sent);
  } catch (e) {
    showT('❌ ' + e.message);
  }
  btn.disabled  = false;
  btn.textContent = L[lang].mi_btn;
}

/* ──────────────────────────────────────────────────────────────
   17. LIBRAIRIE
────────────────────────────────────────────────────────────────*/
function filtLiv(cat, btn) {
  document.querySelectorAll('.libcat').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  livFilt = cat;
  renderLivres();
}

/* LIVRES : source Firestore (admin peut modifier) + fallback local */
let livresFirestore = [];

let livresUnsub = null;
function chargerLivres() {
  if (livresUnsub) return;
  if (!db) return;
  livresUnsub = db.collection('livres')
    .onSnapshot(snap => {
      if (snap && !snap.empty) {
        livresFirestore = snap.docs
          .map(d => ({id:d.id, ...d.data()}))
          .sort((a,b) => (a.ordre||99) - (b.ordre||99));
      }
      renderLivres();
    }, () => { livresUnsub = null; renderLivres(); });
}

function getLivresList() {
  /* Priorité Firestore, fallback données locales */
  const src = livresFirestore.length ? livresFirestore : LIVRES;
  return livFilt === 'all' ? src : src.filter(l => l.cat === livFilt);
}

function renderLivres() {
  const c = _('liv-grid');
  if (!c) return;
  const t        = L[lang];
  const filtered = getLivresList();
  c.innerHTML = filtered.map(l =>
    `<div class="livcard" onclick="openLivre('${l.id}')">
       <div class="livimg">${l.ic || '📖'}</div>
       <div class="livbody">
         <div class="livtit">${(l.tit && (l.tit[lang]||l.tit.mg)) || l.titre || l.id}</div>
         <div class="livaut">${l.aut || l.auteur || ''}</div>
         <div class="livprix">${l.prix}</div>
         ${l.stock
           ? `<button class="livbtn" onclick="event.stopPropagation();openLivre('${l.id}')">${t.liv_order}</button>`
           : `<div class="livnostock">${t.liv_nostock}</div>`}
       </div>
     </div>`
  ).join('') || `<div style="text-align:center;padding:40px 20px;grid-column:1/-1">
    <div style="font-size:40px;margin-bottom:12px">📚</div>
    <div style="font-size:15px;color:var(--cream);font-weight:600;margin-bottom:8px">Aucun livre disponible</div>
    <div style="font-size:13px;color:var(--mut);line-height:1.7">
      Les vrais livres seront ajoutés par le pasteur<br>
      via le panneau <strong style="color:var(--gold)">admin.html</strong><br>
      onglet 📚 Livres → ➕ Ajouter un livre
    </div>
  </div>`;
}

function openLivre(id) {
  const src = livresFirestore.length ? livresFirestore : LIVRES;
  const l = src.find(x => x.id === id) || LIVRES.find(x => x.id === id);
  if (!l) return;
  currentLivre = l;
  const t = L[lang];
  const getTit = () => { if (l.tit && typeof l.tit==='object') return l.tit[lang]||l.tit.mg||l.tit.fr||''; return l.titre||l.tit||l.id; };
  const getDesc = () => { if (l.desc && typeof l.desc==='object') return l.desc[lang]||l.desc.mg||l.desc.fr||''; return l.description||l.desc||''; };
  t_('lvd-tit',  getTit());
  h_('lvd-img',  l.ic || '📖');
  t_('lvd-nm',   getTit());
  t_('lvd-aut',  l.aut || l.auteur || '');
  t_('lvd-px',   l.prix || '');
  const st = _('lvd-stock');
  if (l.stock) { st.className = 'lvdstock instock'; st.textContent = '✅ En stock'; }
  else         { st.className = 'lvdstock nostock';  st.textContent = t.liv_nostock; }
  t_('lvd-desc', getDesc());
  const cf = _('cmd-form');
  if (l.stock) {
    cf.style.display = '';
    t_('cmd-tel-lbl', t.cmd_tel_lbl);
    t_('mvola-txt',   t.mvola_txt);
    t_('cmd-btn',     t.cmd_btn);
  } else {
    cf.style.display = 'none';
  }
  _('lvdpanel').classList.add('open');
}

function closeLivre() {
  _('lvdpanel').classList.remove('open');
  currentLivre = null;
}

async function commander() {
  const tel  = (_('cmd-tel').value  || '').trim();
  const ref  = (_('cmd-ref').value  || '').trim();
  const addr = (_('cmd-addr').value || '').trim();
  if (!tel || tel.replace(/\s/g,'').length < 9) { showT(L[lang].t_empty); return; }
  if (!currentLivre) return;
  const btn = _('cmd-btn');
  btn.disabled  = true;
  btn.innerHTML = '<span class="spin"></span>';
  const uid = currentUser ? currentUser.uid : 'anon';
  try {
    await db.collection('commandes_livres').add({
      livre_id:         currentLivre.id,
      titre:            (currentLivre.tit && typeof currentLivre.tit === 'object') ? (currentLivre.tit[lang] || currentLivre.tit.mg || '') : (currentLivre.titre || currentLivre.tit || currentLivre.id),
      prix:             currentLivre.prix,
      telephone_client: tel,
      reference_paiement: ref || null,
      adresse_livraison:  addr || null,
      operateur_paiement: selectedMMCmd || 'mvola',
      statut:           'en_attente',
      uid,
      cree_le: firebase.firestore.FieldValue.serverTimestamp()
    });
    _('cmd-tel').value  = '';
    _('cmd-ref').value  = '';
    _('cmd-addr').value = '';
    closeLivre();
    showT(L[lang].t_ordered);
  } catch (e) {
    showT('❌ ' + e.message);
  }
  btn.disabled  = false;
  btn.textContent = L[lang].cmd_btn;
}

/* ──────────────────────────────────────────────────────────────
   18. PWA — INSTALLATION (bouton bannière)
────────────────────────────────────────────────────────────────*/
/* ── PWA INSTALL — Écran de bienvenue immédiat ─────────────────
   Logique: afficher dès la 1ère visite si non installé
   Android Chrome : bouton natif si beforeinstallprompt disponible
   iOS Safari : guide manuel étape par étape
   Autres : guide "Ajouter à l&#39;&#233;cran d&#39;accueil"
──────────────────────────────────────────────────────────────*/

/* Afficher l&#39;&#233;cran install immédiatement si pas encore installé */
(function showInstallScreen() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                    || window.navigator.standalone === true;
  if (isStandalone) return;

  const skipped = sessionStorage.getItem('fn_install_skipped');
  if (skipped) return;

  setTimeout(() => {
    const bar = _('install-bar');
    if (!bar) return;

    /* Bouton TOUJOURS visible — même sans beforeinstallprompt */
    const btnMain = _('install-main-btn');
    if (btnMain) btnMain.style.display = 'block';

    bar.classList.add('show');
  }, 400);
})();

/* Quand Chrome est prêt → activer le bouton natif */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstall = e;
  const btnMain = _('install-main-btn');
  const androidGuide = _('install-android-guide');
  if (btnMain)      btnMain.style.display      = 'block';
  if (androidGuide) androidGuide.style.display = 'none';
  /* Si l&#39;&#233;cran n'est pas encore visible, le montrer */
  const bar = _('install-bar');
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
