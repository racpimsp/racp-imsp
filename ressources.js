/* === Bibliothèque RACP-IMSP (style étagères + couvertures) ===
   Pour ajouter une ressource, copiez une entrée ci-dessous.
   type:   "video" | "livre" | "doc"                      (= filtre Type)
   cat:    catégorie                                        (= filtre Catégorie)
   niveau: "1re année" | "2e année" | "3e année" | "Toutes années"  (= filtre Niveau, structure IMSP)
   cover:  URL d'une image de couverture (facultatif) -> affichée sur la vignette
   isbn:   ISBN-13 (facultatif, pour les livres)
   featured:true -> apparaît dans « Sélection de l'équipe »
   isNew:true    -> apparaît dans « Nouveautés »
   Vidéo: renseignez "yt" (id YouTube, 11 caractères) pour la lecture intégrée.
   NB : les livres commerciaux pointent vers la page de l'éditeur (aucun PDF hébergé) —
        respect du droit d'auteur. Couvertures = visuel produit fourni par l'éditeur. */
const DUNOD_COVER = isbn => `https://www.dunod.com/sites/default/files/styles/principal_desktop/public/thumbnails/image/${isbn}-001-X.jpeg`;

const LIB = [
  /* ---- Livres MPSI (1re année, maths-physique / MP2I) ---- */
  {type:"livre", cat:"Mathématiques", niveau:"Toutes années", title:"Maths MPSI-MP2I — Tout-en-un", author:"C. Deschamps · Dunod (J'intègre)", isbn:"9782100862016", featured:true, isNew:true,
   desc:"Cours complet et exercices corrigés couvrant tout le programme de mathématiques de 1re année (MPSI/MP2I). 7e édition.", url:"https://www.dunod.com/prepas-concours/maths-mpsi-mp2i-tout-en-un-1", cover:DUNOD_COVER("9782100862016")},
  {type:"livre", cat:"Mathématiques", niveau:"Toutes années", title:"Maths MPSI-MP2I — Méthodes et exercices", author:"J.-M. Monier · Dunod", isbn:"9782100864621", isNew:true,
   desc:"Les méthodes types et de nombreux exercices corrigés, en complément du cours (MPSI/MP2I). 6e édition.", url:"https://www.dunod.com/prepas-concours/maths-mpsi-mp2i-methodes-et-exercices-0", cover:DUNOD_COVER("9782100864621")},
  {type:"livre", cat:"Mathématiques", niveau:"Toutes années", title:"Maths — Exercices incontournables MPSI-MP2I", author:"M. Bages · Dunod", isbn:"9782100828845", isNew:true,
   desc:"Les exercices classiques des concours, résolus pas à pas, triés par thème et difficulté (MPSI/MP2I). 5e édition.", url:"https://www.dunod.com/prepas-concours/maths-exercices-incontournables-mpsi-mp2i", cover:DUNOD_COVER("9782100828845")},
  {type:"livre", cat:"Physique & sciences", niveau:"Toutes années", title:"Physique tout-en-un MPSI-MP2I", author:"B. Salamito, M.-N. Sanz · Dunod", isbn:"9782100879229", featured:true, isNew:true,
   desc:"Tout le cours de physique de 1re année, avec méthodes, exercices corrigés et programmes Python (MPSI/MP2I). 3e édition.", url:"https://www.dunod.com/prepas-concours/physique-tout-en-un-mpsi-mp2i", cover:DUNOD_COVER("9782100879229")},
  {type:"livre", cat:"Physique & sciences", niveau:"Toutes années", title:"Chimie tout-en-un MPSI", author:"B. Fosset · Dunod", isbn:"9782100864638", isNew:true,
   desc:"Tout le cours de chimie de MPSI, avec méthodes et exercices corrigés. 3e édition.", url:"https://www.dunod.com/prepas-concours/chimie-tout-en-un-mpsi-1", cover:DUNOD_COVER("9782100864638")},

  /* ---- Livres PCSI (1re année, physique-chimie) ---- */
  {type:"livre", cat:"Mathématiques", niveau:"Toutes années", title:"Maths PCSI — Tout-en-un", author:"C. Deschamps · Dunod (J'intègre)", isbn:"9782100863952", featured:true, isNew:true,
   desc:"Cours complet et exercices corrigés couvrant tout le programme de mathématiques de PCSI. 2e édition.", url:"https://www.dunod.com/prepas-concours/maths-pcsi-tout-en-un-0", cover:DUNOD_COVER("9782100863952")},
  {type:"livre", cat:"Mathématiques", niveau:"Toutes années", title:"Maths PCSI-PTSI — Méthodes et exercices", author:"J.-M. Monier · Dunod", isbn:"9782100862429", isNew:true,
   desc:"Méthodes et exercices corrigés de mathématiques pour les filières PCSI et PTSI. 7e édition.", url:"https://www.dunod.com/prepas-concours/maths-pcsi-ptsi-methodes-et-exercices-2", cover:DUNOD_COVER("9782100862429")},
  {type:"livre", cat:"Physique & sciences", niveau:"Toutes années", title:"Physique tout-en-un PCSI", author:"S. Cardini, B. Salamito · Dunod", isbn:"9782100864652", featured:true, isNew:true,
   desc:"Tout le cours de physique de PCSI, avec méthodes, exercices corrigés et programmes Python. 7e édition.", url:"https://www.dunod.com/prepas-concours/physique-tout-en-un-pcsi-0", cover:DUNOD_COVER("9782100864652")},
  {type:"livre", cat:"Physique & sciences", niveau:"Toutes années", title:"Chimie tout-en-un PCSI", author:"B. Fosset · Dunod", isbn:"9782100864645", isNew:true,
   desc:"Tout le cours de chimie de PCSI, avec méthodes et exercices corrigés (la chimie pèse davantage en PCSI).", url:"https://www.dunod.com/prepas-concours/chimie-tout-en-un-pcsi-3", cover:DUNOD_COVER("9782100864645")},

  /* ---- Livres communs (tronc commun, plusieurs filières) ---- */
  {type:"livre", cat:"Physique & sciences", niveau:"Toutes années", title:"Sciences industrielles pour l'ingénieur — Tout-en-un", author:"J.-D. Mosser · Dunod", isbn:"9782100828739", isNew:true,
   desc:"Tout le cours de sciences industrielles de l'ingénieur (SII) de 1re année, commun MPSI/MP2I/PCSI.", url:"https://www.dunod.com/prepas-concours/sciences-industrielles-pour-ingenieur-mpsi-mp2i-pcsi-tout-en-un", cover:DUNOD_COVER("9782100828739")},
  {type:"livre", cat:"Physique & sciences", niveau:"Toutes années", title:"Informatique avec Python — Méthodes et exercices", author:"J.-N. Beury · Dunod", isbn:"9782100879267", isNew:true,
   desc:"Méthodes et exercices corrigés d'informatique (Python) du tronc commun, communs à toutes les filières.", url:"https://www.dunod.com/prepas-concours/informatique-avec-python-methodes-et-exercices-mpsi-pcsi-ptsi-mp-pc-psi-pt-tsi-tpc-0", cover:DUNOD_COVER("9782100879267")},

  /* ---- Annales & ressources en ligne (gratuites) ---- */
  {type:"doc", cat:"Annales & concours", niveau:"Toutes années", title:"Annales blanches 2025 — Maths & Physique", author:"RACP-IMSP · PDF", featured:true, isNew:true,
   desc:"Sujet d'entraînement (4 h) en maths et physique, avec modalités. Exemple fictif à remplacer par vos vrais sujets.", url:"assets/docs/annales-blanches-2025.pdf"},
  {type:"doc", cat:"Annales & concours", niveau:"Toutes années", title:"Doc Solus — annales corrigées", author:"doc-solus.fr", featured:true, isNew:true,
   desc:"Énoncés et corrigés des concours CCINP, Centrale-Supélec, Mines-Ponts et Polytechnique.", url:"https://www.doc-solus.fr/"},
  {type:"doc", cat:"Annales & concours", niveau:"Toutes années", title:"Bibmath — cours & exercices CPGE", author:"bibmath.net", isNew:true,
   desc:"Cours, exercices et annales de math sup / math spé (MPSI, PCSI, MP, PC).", url:"https://www.bibmath.net/"},
  {type:"doc", cat:"Annales & concours", niveau:"Toutes années", title:"Maths-France", author:"maths-france.fr", isNew:true,
   desc:"Cours et exercices détaillés de MPSI et MP, librement accessibles (J.-L. Rouget).", url:"https://www.maths-france.fr/"},

  /* ---- Ressources universitaires en accès libre (gratuites & légales, PDF directs) ---- */
  {type:"doc", cat:"Mathématiques", niveau:"Toutes années", title:"Exo7 — cours & exercices de maths", author:"exo7.emath.fr", featured:true, isNew:true,
   desc:"Cours et exercices corrigés de mathématiques (niveau licence) : algèbre, analyse, topologie… En accès libre.", url:"http://exo7.emath.fr/"},
  {type:"livre", cat:"Mathématiques", niveau:"3e année", title:"Algebraic Topology — A. Hatcher", author:"Allen Hatcher · Cornell", isNew:true,
   desc:"Manuel de référence de topologie algébrique, en accès libre (PDF officiel de l'auteur). En anglais.", url:"https://pi.math.cornell.edu/~hatcher/AT/AT.pdf"},
  {type:"livre", cat:"Mathématiques", niveau:"3e année", title:"Introduction to Statistical Learning (ISLR)", author:"James, Witten, Hastie, Tibshirani", featured:true, isNew:true,
   desc:"La référence d'apprentissage statistique (data science), PDF gratuit officiel. En anglais.", url:"https://www.statlearning.com/", cover:"assets/img/livres/islr-cover.webp"},
  {type:"livre", cat:"Mathématiques", niveau:"3e année", title:"The Elements of Statistical Learning (ESL)", author:"Hastie, Tibshirani, Friedman", isNew:true,
   desc:"Référence avancée en machine learning et data mining, PDF gratuit officiel. En anglais.", url:"https://hastie.su.domains/ElemStatLearn/", cover:"assets/img/livres/esl-cover.jpg"},
  {type:"livre", cat:"Physique & sciences", niveau:"3e année", title:"Algorithms — J. Erickson", author:"Jeff Erickson · Illinois", isNew:true,
   desc:"Manuel complet d'algorithmique et de complexité, en accès libre (PDF officiel). En anglais.", url:"https://jeffe.cs.illinois.edu/teaching/algorithms/"},
  {type:"livre", cat:"Physique & sciences", niveau:"Toutes années", title:"Modern C — J. Gustedt", author:"Jens Gustedt · INRIA", isNew:true,
   desc:"Programmation en langage C moderne (norme récente), livre gratuit officiel. En anglais.", url:"https://gustedt.gitlabpages.inria.fr/modern-c/"},
  {type:"livre", cat:"Physique & sciences", niveau:"Toutes années", title:"The Feynman Lectures on Physics", author:"R. Feynman · Caltech", isNew:true,
   desc:"Les célèbres cours de physique de Feynman, en accès libre : mécanique, électromagnétisme, quantique. En anglais.", url:"https://www.feynmanlectures.caltech.edu/"},

  /* ---- Fondamentaux 1re & 2e année (accès libre) ---- */
  {type:"livre", cat:"Mathématiques", niveau:"1re année", title:"OpenStax — Calculus Vol. 1", author:"OpenStax · accès libre", featured:true, isNew:true,
   desc:"Calcul différentiel et intégral (limites, dérivées, intégrales), manuel en accès libre (PDF gratuit). En anglais.", url:"https://openstax.org/details/books/calculus-volume-1", cover:"assets/img/livres/calculus-volume-1.svg"},
  {type:"livre", cat:"Physique & sciences", niveau:"1re année", title:"OpenStax — University Physics Vol. 1", author:"OpenStax · accès libre", isNew:true,
   desc:"Mécanique, ondes et thermodynamique — manuel universitaire en accès libre (PDF gratuit). En anglais.", url:"https://openstax.org/details/books/university-physics-volume-1", cover:"assets/img/livres/university-physics-volume-1.svg"},
  {type:"video", cat:"Mathématiques", niveau:"1re année", title:"MIT OCW 18.06 — Algèbre linéaire", author:"Gilbert Strang · MIT OCW", isNew:true,
   desc:"Le cours d'algèbre linéaire de Gilbert Strang (MIT), vidéos et supports en accès libre. En anglais.", url:"https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", yt:""},
  {type:"video", cat:"Mathématiques", niveau:"1re année", title:"Khan Academy", author:"Khan Academy", featured:true, isNew:true,
   desc:"Cours et exercices de maths et de physique, du lycée au supérieur — disponible en français.", url:"https://fr.khanacademy.org/", yt:""},
  {type:"livre", cat:"Mathématiques", niveau:"2e année", title:"OpenStax — Calculus Vol. 2", author:"OpenStax · accès libre", isNew:true,
   desc:"Techniques d'intégration, suites et séries — manuel en accès libre (PDF gratuit). En anglais.", url:"https://openstax.org/details/books/calculus-volume-2", cover:"assets/img/livres/calculus-volume-2.svg"},
  {type:"livre", cat:"Mathématiques", niveau:"2e année", title:"OpenStax — Calculus Vol. 3", author:"OpenStax · accès libre", isNew:true,
   desc:"Calcul à plusieurs variables : fonctions de plusieurs variables, intégrales multiples (PDF gratuit). En anglais.", url:"https://openstax.org/details/books/calculus-volume-3", cover:"assets/img/livres/calculus-volume-3.svg"},
  {type:"livre", cat:"Physique & sciences", niveau:"2e année", title:"OpenStax — University Physics Vol. 2", author:"OpenStax · accès libre", isNew:true,
   desc:"Électricité, magnétisme et optique — manuel universitaire en accès libre (PDF gratuit). En anglais.", url:"https://openstax.org/details/books/university-physics-volume-2", cover:"assets/img/livres/university-physics-volume-2.svg"},
  {type:"video", cat:"Mathématiques", niveau:"2e année", title:"MIT OCW 18.03 — Équations différentielles", author:"MIT OCW", isNew:true,
   desc:"Cours d'équations différentielles (MIT), vidéos et supports en accès libre. En anglais.", url:"https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/", yt:""},
  {type:"video", cat:"Mathématiques", niveau:"2e année", title:"MIT OCW 18.05 — Probabilités & statistiques", author:"MIT OCW", isNew:true,
   desc:"Introduction aux probabilités et statistiques (MIT) : inférence bayésienne et fréquentiste. En anglais.", url:"https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"2e année", title:"MIT OCW 8.02 — Électromagnétisme", author:"Walter Lewin · MIT OCW", isNew:true,
   desc:"Cours d'électromagnétisme de Walter Lewin (MIT), vidéos de cours en accès libre. En anglais.", url:"https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/", yt:""},

  /* ---- Vidéos ---- */
  {type:"video", cat:"Mathématiques", niveau:"Toutes années", title:"Maths et tiques — Yvan Monka", author:"Chaîne YouTube", featured:true,
   desc:"Des centaines de cours et méthodes, du lycée à la prépa. Idéal pour réviser les bases.", url:"https://www.youtube.com/user/YMONKA", yt:""},
  {type:"video", cat:"Mathématiques", niveau:"Toutes années", title:"3Blue1Brown", author:"Chaîne YouTube (EN)", featured:true,
   desc:"Algèbre linéaire, analyse, séries de Fourier en visualisations devenues incontournables.", url:"https://www.youtube.com/@3blue1brown", yt:""},
  {type:"video", cat:"Mathématiques", niveau:"Toutes années", title:"Science4All", author:"Lê Nguyen Hoang",
   desc:"Probabilités, logique et informatique théorique, vulgarisation exigeante.", url:"https://www.youtube.com/channel/UC0NCbj8CxzeCGIF6sODJ-7A", yt:""},
  {type:"video", cat:"Mathématiques", niveau:"Toutes années", title:"El Jj — Deux minutes pour…", author:"Jérôme Cottanceau",
   desc:"Des sujets de maths surprenants et bien construits pour la culture mathématique.", url:"https://www.youtube.com/c/ElJj42", yt:""},
  {type:"video", cat:"Mathématiques", niveau:"Toutes années", title:"Micmaths — Mickaël Launay", author:"Chaîne YouTube",
   desc:"Jeux, énigmes et histoire des mathématiques pour garder le goût des maths.", url:"https://www.youtube.com/c/Micmaths", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"Toutes années", title:"Science étonnante", author:"David Louapre", featured:true,
   desc:"Physique, maths et sciences par un docteur en physique. Technique et limpide.", url:"https://www.youtube.com/@ScienceEtonnante", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"Toutes années", title:"ScienceClic", author:"Chaîne YouTube",
   desc:"La relativité générale et la physique moderne en animations remarquables.", url:"https://www.youtube.com/@ScienceClic", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"Toutes années", title:"Zeste de Science — CNRS", author:"Chaîne YouTube",
   desc:"La recherche scientifique française vulgarisée par le CNRS, en formats courts.", url:"https://www.youtube.com/@ZestedeScience", yt:""},
  {type:"video", cat:"Méthode & orientation", niveau:"Toutes années", title:"Hygiène Mentale", author:"Esprit critique & méthode",
   desc:"Raisonner, vérifier l'information et structurer sa pensée — utile au-delà des concours.", url:"https://www.youtube.com/@HygieneMentale", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"Toutes années", title:"Passe-science", author:"Chaîne YouTube", isNew:true,
   desc:"Physique, mathématiques et informatique en formats longs et rigoureux, proches du niveau prépa.", url:"https://www.youtube.com/@PasseScience", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"Toutes années", title:"e-penser", author:"Bruce Benamran", isNew:true,
   desc:"Concepts et histoire de la physique, expliqués avec clarté et pédagogie.", url:"https://www.youtube.com/@epenser1", yt:""},
  {type:"video", cat:"Méthode & orientation", niveau:"Toutes années", title:"La Tronche en Biais", author:"Thomas C. Durand · zététique", isNew:true,
   desc:"Esprit critique et zététique : raisonner juste et déjouer les biais cognitifs (prix Diderot).", url:"https://www.youtube.com/c/TroncheEnBiais-Zetetique", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"Toutes années", title:"Emmanuel Djegou (FR)", author:"IA · statistiques · data science", isNew:true,
   desc:"Intelligence artificielle, statistiques et data science rendues accessibles par des analogies concrètes.", url:"https://www.youtube.com/@EmmanuelDjegouFrench", yt:""},
  {type:"video", cat:"Mathématiques", niveau:"3e année", title:"StatQuest", author:"Josh Starmer", isNew:true,
   desc:"Statistiques et machine learning expliqués clairement, étape par étape. En anglais.", url:"https://www.youtube.com/@statquest", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"Toutes années", title:"MIT OpenCourseWare", author:"MIT", isNew:true,
   desc:"Cours magistraux du MIT en accès libre : maths, physique, informatique. En anglais.", url:"https://www.youtube.com/@mitocw", yt:""},
  {type:"video", cat:"Physique & sciences", niveau:"Toutes années", title:"CS50 — Harvard", author:"Harvard University", isNew:true,
   desc:"Le cours d'introduction à l'informatique de Harvard (CS50), gratuit et réputé. En anglais.", url:"https://www.youtube.com/@cs50", yt:""},

  /* ---- Méthode & orientation (à venir) ---- */
  {type:"doc", cat:"Méthode & orientation", niveau:"Toutes années", title:"Fiches écoles", author:"RACP-IMSP",
   desc:"Bénin, région, France et Maroc : voies, profils et logistique. En préparation.", url:"", soon:true},
  {type:"doc", cat:"Méthode & orientation", niveau:"Toutes années", title:"Calendrier des concours", author:"RACP-IMSP",
   desc:"Les dates clés (les concours locaux tombent souvent en août–septembre). En préparation.", url:"", soon:true},

  /* ---- Documents officiels ---- */
  {type:"doc", cat:"Documents officiels", niveau:"Toutes années", title:"Statuts du RACP-IMSP", author:"Document officiel · PDF",
   desc:"Objet, organes, ressources et dispositions finales de l'association.", url:"assets/docs/statuts-racp-imsp.pdf"},
  {type:"doc", cat:"Documents officiels", niveau:"Toutes années", title:"Règlement intérieur", author:"Document officiel · PDF",
   desc:"Adhésion, droits & devoirs, fonctionnement, finances, AG et médiation.", url:"assets/docs/reglement-interieur-racp-imsp.pdf"},
  {type:"livre", cat:"Documents officiels", niveau:"Toutes années", title:"Kit Parrain / Marraine", author:"Programme mentorat · PDF",
   desc:"Guide du mentor : posture, méthode GROW, cycle de session, orientation. En préparation.", url:"", soon:true},
  {type:"livre", cat:"Documents officiels", niveau:"Toutes années", title:"Kit Filleul·e", author:"Programme mentorat · PDF",
   desc:"Réussir sa prépa : état d'esprit, organisation, stratégie d'écoles, candidatures. En préparation.", url:"", soon:true},
];

(function(){
  const grid=document.getElementById('lib-grid'), empty=document.getElementById('lib-empty');
  const shelves=document.getElementById('lib-shelves'), spot=document.getElementById('lib-spot'), q=document.getElementById('lib-q');
  const shelvesWrap=document.getElementById('lib-shelves-wrap');
  const TPLURAL={video:'Vidéos',livre:'Livres',doc:'Documents'};
  const modal=document.getElementById('lib-modal'), frame=modal.querySelector('.lib-modal-frame');
  const catTitle=document.getElementById('lib-cat-title'), count=document.getElementById('lib-count');
  const sortSel=document.getElementById('lib-sort-sel');
  let fType='all', fCat='all', fNiveau='all', fQ='', fSort='default';
  const TLABEL={video:'Vidéo',livre:'Livre',doc:'Document'};
  const CATCLASS={'Mathématiques':'c-math','Physique & sciences':'c-phys','Annales & concours':'c-ann','Méthode & orientation':'c-meth','Documents officiels':'c-off'};
  const esc=s=>String(s==null?'':s).replace(/"/g,'&quot;');

  /* --- Stats d'en-tête (accès libre = hors livres commerciaux) --- */
  (function stats(){
    const cats=new Set(LIB.map(r=>r.cat));
    const free=LIB.filter(r=>r.url && !r.soon && r.type!=='livre').length;
    const set=(id,n)=>{const el=document.getElementById(id);if(el)el.setAttribute('data-count',n);};
    set('stat-total',LIB.length); set('stat-cats',cats.size); set('stat-free',free);
  })();

  /* --- Compteurs sur les filtres --- */
  function decorateCounts(){
    const byType=t=>t==='all'?LIB.length:LIB.filter(r=>r.type===t).length;
    document.querySelectorAll('.lib-filters .chip').forEach(b=>{
      if(!b.querySelector('.n')) b.insertAdjacentHTML('beforeend',' <span class="n"></span>');
      b.querySelector('.n').textContent=byType(b.dataset.type);
    });
    const byCat=c=>c==='all'?LIB.length:LIB.filter(r=>r.cat===c).length;
    document.querySelectorAll('.lib-cats .catchip[data-cat]').forEach(b=>{
      const cat=b.dataset.cat.replace(/&amp;/g,'&');
      if(!b.querySelector('.n')) b.insertAdjacentHTML('beforeend',' <span class="n"></span>');
      b.querySelector('.n').textContent=byCat(cat);
    });
    const byNiveau=v=>v==='all'?LIB.length:LIB.filter(r=>r.niveau===v).length;
    document.querySelectorAll('.lib-cats .catchip[data-niveau]').forEach(b=>{
      if(!b.querySelector('.n')) b.insertAdjacentHTML('beforeend',' <span class="n"></span>');
      var cn=byNiveau(b.dataset.niveau);
      b.querySelector('.n').textContent = cn>0 ? cn : '';   /* année sans ressource : pas de « 0 » */
    });
  }

  function cover(r){
    const i=LIB.indexOf(r);
    const cls=CATCLASS[r.cat]||'c-off';
    const play=r.type==='video'?'<span class="cover-play" aria-hidden="true">▶</span>':'';
    const ribbon=r.soon?'<span class="cover-ribbon">Bientôt</span>':(r.isNew?'<span class="cover-ribbon new">Nouveau</span>':'');
    const photo=r.cover?`<img class="cover-photo" src="${esc(r.cover)}" alt="Couverture : ${esc(r.title)}" loading="lazy">`:'';
    const txt=r.cover?'':`<span class="cover-title">${r.title}</span><span class="cover-author">${r.author||''}</span><span class="cover-brand">RACP·IMSP</span>`;
    return `<article class="cover ${cls}${r.cover?' has-photo':''}" data-i="${i}" tabindex="0" role="button" aria-label="${esc(r.title)} — ${TLABEL[r.type]}">
      <div class="cover-art">
        ${photo}
        <span class="cover-type">${TLABEL[r.type]}</span>${ribbon}
        ${txt}
        ${play}
      </div>
      <div class="cover-cap"><p>${r.title}</p><span>${r.cat}</span></div>
    </article>`;
  }

  function open(r){
    if(r.soon) return;
    if(r.type==='video' && r.yt){ frame.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${r.yt}?autoplay=1" title="${esc(r.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`; modal.hidden=false; document.body.style.overflow='hidden'; }
    else if(r.url){ window.open(r.url,'_blank','noopener'); }
  }
  function close(){ modal.hidden=true; frame.innerHTML=''; document.body.style.overflow=''; }
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('lib-modal-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});

  function bind(scope){
    scope.querySelectorAll('.cover').forEach(c=>{
      const r=LIB[+c.dataset.i];
      c.addEventListener('click',()=>open(r));
      c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(r);}});
    });
  }

  /* --- Ressource à la une --- */
  function renderSpot(){
    const pick=LIB.find(r=>r.featured && (r.yt||r.url) && !r.soon) || LIB.find(r=>r.featured);
    if(!pick){ spot.innerHTML=''; return; }
    const cls=CATCLASS[pick.cat]||'c-off';
    const verb=pick.type==='video'?'Regarder':(pick.type==='livre'?'Voir chez l\'éditeur':'Ouvrir');
    const art=pick.cover?`<img class="cover-photo" src="${esc(pick.cover)}" alt="Couverture : ${esc(pick.title)}" loading="lazy">`:`<span class="cover-title">${pick.title}</span>`;
    spot.innerHTML=`<div class="lib-spot reveal in">
      <div class="spot-cover"><div class="cover ${cls}${pick.cover?' has-photo':''}"><div class="cover-art">${art}</div></div></div>
      <div class="lib-spot-body">
        <p class="eyebrow">À la une</p>
        <h3>${pick.title}</h3>
        <p>${pick.desc||''}</p>
        <p class="meta">${TLABEL[pick.type]} · ${pick.cat} · ${pick.author||''}</p>
      </div>
      <button class="btn btn-primary spot-go" type="button">${verb}</button>
    </div>`;
    spot.querySelector('.spot-go').addEventListener('click',()=>open(pick));
    spot.querySelector('.spot-cover .cover').addEventListener('click',()=>open(pick));
  }

  /* --- Étagères avec flèches de défilement --- */
  function shelf(title, items){
    if(!items.length) return '';
    return `<div class="shelf"><div class="shelf-head"><h3>${title}</h3>
      <div class="shelf-nav"><button type="button" data-dir="-1" aria-label="Précédent">‹</button><button type="button" data-dir="1" aria-label="Suivant">›</button></div></div>
      <div class="shelf-row">${items.map(cover).join('')}</div></div>`;
  }
  function renderShelves(){
    shelves.innerHTML = shelf("Sélection de l'équipe", LIB.filter(r=>r.featured)) + shelf("Nouveautés", LIB.filter(r=>r.isNew));
    bind(shelves);
    shelves.querySelectorAll('.shelf').forEach(s=>{
      const row=s.querySelector('.shelf-row');
      s.querySelectorAll('.shelf-nav button').forEach(b=>{
        b.addEventListener('click',()=>row.scrollBy({left:(+b.dataset.dir)*row.clientWidth*0.8,behavior:'smooth'}));
      });
    });
  }

  function sortItems(items){
    if(fSort==='az') return items.slice().sort((a,b)=>a.title.localeCompare(b.title,'fr'));
    if(fSort==='new') return items.slice().sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));
    return items;
  }

  function renderGrid(){
    let items=LIB.filter(r=>(fType==='all'||r.type===fType)&&(fCat==='all'||r.cat===fCat)&&(fNiveau==='all'||r.niveau===fNiveau)&&(fQ===''||(r.title+' '+r.desc+' '+(r.author||'')).toLowerCase().includes(fQ)));
    items=sortItems(items);
    grid.innerHTML=items.map(cover).join(''); empty.hidden=items.length>0; bind(grid);
    // Quand un filtre est actif (type, catégorie, niveau ou recherche), on masque les
    // étagères de mise en avant pour ne montrer que les résultats filtrés.
    const filtering = fType!=='all' || fCat!=='all' || fNiveau!=='all' || fQ!=='';
    if(shelvesWrap) shelvesWrap.style.display = filtering ? 'none' : '';
    catTitle.textContent = fCat!=='all' ? fCat : (fNiveau!=='all' ? fNiveau : (fType!=='all' ? TPLURAL[fType] : 'Tout le catalogue'));
    const n=items.length;
    count.innerHTML = n===0 ? '' : `<b>${n}</b> ressource${n>1?'s':''}` + (fType!=='all'?` · ${TLABEL[fType].toLowerCase()}s`:'') + (fNiveau!=='all'?` · ${fNiveau}`:'') + (fQ?` · « ${q.value.trim()} »`:'');
  }

  function resetFilters(){
    fType='all';fCat='all';fNiveau='all';fQ='';q.value='';
    document.querySelectorAll('.lib-filters .chip').forEach(x=>x.classList.toggle('active',x.dataset.type==='all'));
    document.querySelectorAll('.lib-cats .catchip[data-cat]').forEach(x=>x.classList.toggle('active',x.dataset.cat==='all'));
    document.querySelectorAll('.lib-cats .catchip[data-niveau]').forEach(x=>x.classList.toggle('active',x.dataset.niveau==='all'));
    renderGrid();
  }

  document.querySelectorAll('.lib-filters .chip').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.lib-filters .chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');fType=b.dataset.type;renderGrid();}));
  document.querySelectorAll('.lib-cats .catchip[data-cat]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.lib-cats .catchip[data-cat]').forEach(x=>x.classList.remove('active'));b.classList.add('active');fCat=b.dataset.cat.replace(/&amp;/g,'&');renderGrid();}));
  document.querySelectorAll('.lib-cats .catchip[data-niveau]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.lib-cats .catchip[data-niveau]').forEach(x=>x.classList.remove('active'));b.classList.add('active');fNiveau=b.dataset.niveau;renderGrid();}));
  q.addEventListener('input',()=>{fQ=q.value.trim().toLowerCase();renderGrid();});
  sortSel.addEventListener('change',()=>{fSort=sortSel.value;renderGrid();});
  const resetBtn=document.getElementById('lib-reset'); if(resetBtn) resetBtn.addEventListener('click',resetFilters);

  decorateCounts(); renderSpot(); renderShelves(); renderGrid();
})();
