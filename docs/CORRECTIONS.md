# Journal des corrections & améliorations — Site RACP-IMSP

Ce fichier recense **toutes les modifications** apportées au site après sa livraison
initiale : corrections de bugs, retours de relecture, améliorations. À compléter au fil
de l'eau (entrée la plus récente en haut).

**Format d'une entrée :** date · type · fichier(s) · description.
Types : 🐞 Bug · ✍️ Contenu/relecture · ✨ Amélioration · 🔧 Technique · 📄 Config.

---

## 2026-07-28

### 🔧 Structure — Réorganisation du dépôt (bon repo)
- **Racine allégée** : les fichiers du site restent à la racine (déploiement « tel quel »
  sur GitHub Pages), mais toute la **documentation interne** est déplacée dans **`docs/`** :
  `CHECKLIST.md`, `MENTORAT-SETUP.md`, `SECURITE.md`, `CORRECTIONS.md`, `Matières.txt`,
  `supabase-schema.sql`.
- **Ajouts** : **`.gitignore`** (OS/éditeurs/logs/secrets/webp) et **`LICENSE`** (copyright
  RACP-IMSP, tous droits réservés — cohérent avec les mentions légales).
- **`robots.txt`** : ajout de `Disallow: /docs/` (docs non indexés par Google).
- **Supprimé** : `observation.txt` (retours déjà appliqués).
- **README allégé** (~190 → ~65 lignes) : retrait de l'arborescence manuelle et des how-to
  détaillés (qui faisaient doublon avec `docs/CHECKLIST.md` et `docs/MENTORAT-SETUP.md`).
  Le README garde l'essentiel (projet · lancer · déployer · organisation) + une **table
  d'index vers `docs/`**. Ajouts : **capture d'écran de l'accueil** (`docs/apercu-accueil.jpg`),
  ligne **« Sections du site »**, et **emplacement du lien « Site en ligne »** (à remplir au déploiement).
- **Mémoire** : le pointeur du journal passe à `docs/CORRECTIONS.md`.

### ✨ Page 404 refondue + typographie des guillemets (lot C)
- **Fichiers :** `404.html`, `index.html`, `parcours.html`, `devenir-parrain.html`
- **404 :** ajout de l'**en-tête (menu)** et du **pied de page** complets (cohérence + navigation
  pour un visiteur égaré), **`meta description`**, **`robots: noindex, follow`**, et **4 boutons**
  de rebond (Accueil · Bibliothèque · Mentorat · Contact). Images dimensionnées.
- **Typographie :** les **12 guillemets** des citations passés en **espace insécable**
  (`«&nbsp;…&nbsp;»`) — 0 restant. Aucune double-espace trouvée dans le texte.

### 🔬 Performance — Test WebP non concluant (abandonné)
- **Test :** conversion des 14 photos du campus en WebP (Pillow, qualité 82).
- **Résultat :** JPG déjà bien compressés → **seulement -15 %** au total, et **plusieurs images
  plus lourdes** en WebP (batiment-principal 544→572 Ko, flamboyant, campus-parking). Le gain ne
  justifie pas la complexité (double format / réécriture des références).
- **Décision :** WebP **abandonné**, fichiers `.webp` supprimés, on garde les JPG.

### ✨ SEO & mobile (lot A) + performance/CLS (lot B)
- **Fichiers :** les 18 pages `*.html`, nouveau `manifest.json`
- **A — SEO & mobile :** ajout sur chaque page de l'**URL canonique** et de **`og:url`** (par page),
  **`theme-color` `#27436F`**, **`apple-touch-icon`** (logo-icon 512²) et **lien `manifest.json`**.
  Nouveau **`manifest.json`** (nom, icônes 256/512, couleurs, `display:standalone`) → belle icône si
  « ajouter à l'écran d'accueil » sur mobile, barre de navigateur colorée, meilleur partage/SEO.
- **B — Performance / stabilité d'affichage :** ajout de **`width`/`height` réels** (dimensions
  exactes des images) + **`decoding="async"`** sur **67 `<img>`** → supprime le « saut » de mise en
  page au chargement (CLS). Aucune distorsion (le CSS a `img{height:auto}` en global).
- Vérifs : 1 canonical/page, aucun double-tag, `manifest.json` JSON valide, rendu galerie intact.
- *(WebP non fait — optionnel, à voir plus tard.)*

### 📄 Mentions légales — Nom officiel de l'éditeur renseigné
- **Fichier :** `mentions-legales.html`
- Bloc « Éditeur » complété avec le **nom officiel** : *RACP-IMSP — Réseau Alumni des Classes
  Préparatoires de l'Institut de Mathématiques et de Sciences Physiques du Bénin (association)*.
- Structuré avec les champs restants marqués « à compléter » : **siège**, **responsable de
  la publication**, **hébergeur**.

### 🔧 Bibliothèque — Manuels gratuits reclassés en « Livres »
- **Fichier :** `ressources.js`
- **Contexte :** plusieurs vrais manuels (OpenStax ×5, ISLR, ESL, Hatcher, Modern C, Feynman,
  Erickson) étaient typés « Documents » → le filtre « Livres » sous-estimait, et le croisement
  livres × année était vide.
- **Correction :** ces 11 manuels passent en `type:"livre"` (Exo7 reste « Document » : c'est un
  site de cours, pas un livre unique). Les Dunod tout-en-un restent en « Toutes années » (choix
  utilisateur : un tout-en-un couvre tout le cycle) ; les manuels ciblés gardent leur année.
- **Résultat :** **Livres = 24** (1re 2 · 2e 3 · 3e 4 · Toutes années 15) ; Documents = 9
  (annales, sites de référence, docs officiels) ; Vidéos = 21. Total inchangé : 54.

### 🐞 Lien — Site officiel IMSP inaccessible sans « www »
- **Fichier :** `reseau.html`
- **Problème :** le bouton « Visiter le site officiel de l'IMSP » pointait vers
  `https://imsp-uac.org/` (domaine apex) qui **ne répond pas** (HTTP 000), alors que
  `https://www.imsp-uac.org/` répond **200**.
- **Correction :** lien passé sur `https://www.imsp-uac.org/`.

### 🔎 Audit complet du site (liens, chiffres, textes, logique)
- **Liens externes :** ~55 URL cliquables vérifiées → toutes **HTTP 200** (ou anti-bot
  légitime : Feynman 403, LinkedIn 999). Un seul défaut trouvé et corrigé (IMSP, ci-dessus).
- **Chiffres :** LIB = **54** entrées ; types (13 livres / 21 vidéos / 20 docs), niveaux
  (1re 4 · 2e 6 · 3e 5 · Toutes 39) et catégories tous **cohérents** ; aucun doublon d'URL ;
  compteurs du bandeau corrects (correctif anti-figement en place).
- **Textes :** tous les retours appliqués sont bien présents (accueil « informaticiens » ;
  mentorat GROW/rythme de vie/état d'esprit/portefeuille équilibré ; réseau : 4 pôles, IMSP 1988,
  résultats attendus).
- **Cohérence :** CSP identique sur les 18 pages ; copyright auto, og:image absolue et
  e-mail sur les 17 pages publiques ; 7 couvertures locales présentes ; aucun lien interne cassé.
- **Résidus :** aucun (ni © 2025, ni VOTRE-DOMAINE, ni ancien e-mail, ni niveau MPSI/PCSI).
- **À noter :** les 4 pages `article-*.html` (contenu de démonstration) ne sont pas dans
  `sitemap.xml` — volontairement à ajouter quand les vrais articles seront écrits.

## 2026-07-27

### 🐞 Sécurité — Lien de ressource détourné vers un site de spam
- **Fichier :** `ressources.js`
- **Problème :** l'entrée pré-existante « Concours Maths CPGE (UPS) » pointait vers
  `concours-maths-cpge.fr`, un **domaine expiré** qui redirige désormais vers un site de
  spam (casino, `polaris-creations.fr`). Détecté en cliquant la ressource en local, confirmé
  via `curl` (redirection 200 vers le domaine de spam).
- **Correction :** entrée supprimée. Les trois autres liens `.fr` de la biblio
  (doc-solus.fr, bibmath.net, maths-france.fr) ont été vérifiés **sains** (HTTP 200, domaine propre).

### 🐞 Compteurs — Chiffres du bandeau Ressources qui se figeaient
- **Fichier :** `script.js` (animation des compteurs `[data-count]`)
- **Problème :** le bandeau (« X ressources · Y catégories · Z en accès libre ») anime un compteur
  de 0 vers la valeur finale ; quand l'onglet passe en arrière-plan, `requestAnimationFrame` est
  ralenti et l'animation **se fige sur une valeur intermédiaire fausse** (ex. 33 au lieu de 54).
  Les données étaient correctes (vérifié : total=54, catégories=5, accès libre=39) — seul l'affichage bloquait.
- **Correction :** ajout d'un **filet de sécurité** (`setTimeout` à la fin de la durée) qui force
  toujours la **valeur finale exacte**, même si l'animation est interrompue. Vaut pour tous les
  compteurs du site (y compris l'accueil).

### ✨ Bibliothèque — Fondamentaux 1re/2e année + couvertures des livres libres
- **Fichiers :** `ressources.js`, `assets/img/livres/`
- **10 ressources gratuites & légales** pour la 1re et la 2e année (URL vérifiées HTTP 200) :
  - OpenStax **Calculus Vol. 1/2/3**, **University Physics Vol. 1/2** (PDF gratuits) ;
  - **MIT OCW** 18.06 (algèbre linéaire), 18.03 (équations diff.), 18.05 (probas/stats), 8.02 (électromag.) ;
  - **Khan Academy** (FR).
  - Rattachées **1re** (fondamentaux) ou **2e année** → le filtre par année couvre désormais 1re/2e/3e.
- **Couvertures réelles** ajoutées aux livres en accès libre, **téléchargées en local**
  (`assets/img/livres/`) pour la fiabilité : 5 SVG OpenStax (via l'API CMS OpenStax) + ISLR + ESL.
  Les autres ressources libres (Feynman, Modern C, Erickson, Hatcher, Exo7) et les vidéos gardent la vignette générée.
- **Chiffres de la page Ressources** : vérifié qu'**aucun total n'est codé en dur** ; les compteurs
  (ressources / catégories / accès libre) sont calculés dynamiquement depuis la liste.
- Total : **54 ressources**.

### ✨ Bibliothèque — Ressources universitaires (d'après `Matières.txt`) + 3e année alimentée
- **Fichier :** `ressources.js`
- **Contexte :** `Matières.txt` révèle un cursus **de haut niveau** (topologie, analyse fonctionnelle,
  mesure, calcul stochastique, apprentissage statistique, économétrie, physique quantique, C, algo).
- **10 ressources ajoutées, gratuites & légales** (7 PDF/ressources en accès libre + 3 vidéos),
  toutes **URL vérifiées** (HTTP 200 ; Feynman = 403 anti-bot mais site officiel Caltech) :
  - Maths : **Exo7**, **Hatcher — Algebraic Topology**, **ISLR**, **ESL**, **StatQuest** (vidéo).
  - Physique/Info : **Feynman Lectures**, **Modern C** (Gustedt/INRIA), **Algorithms** (Erickson),
    **MIT OpenCourseWare** (vidéo), **CS50 Harvard** (vidéo).
- **Rattachement année :** l'avancé (Hatcher, ISLR, ESL, Erickson, StatQuest) → **3e année**
  (le filtre par année a enfin du contenu) ; les bases (Exo7, Modern C, Feynman, MIT OCW, CS50) → Toutes années.
- Catégories inchangées (choix utilisateur) : stats/ML → Mathématiques ; info/physique → Physique & sciences.
- Rappel : **aucun PDF commercial piraté** — uniquement des ressources en accès libre officiel.
- Total : **44 ressources**.

### 🔧 Bibliothèque — Filtre « Niveau » aligné sur la structure IMSP (années)
- **Fichiers :** `ressources.html`, `ressources.js`
- **Contexte :** la prépa IMSP est un cycle de **3 ans** (1ʳᵉ/2ᵉ/3ᵉ), la 3ᵉ année s'orientant en
  Maths/Physique/Informatique — ce n'est pas le système français MPSI/PCSI.
- **Filtre Niveau** : puces **Toutes les années · 1re année · 2e année · 3e année**
  (l'orientation de 3ᵉ passe par le filtre Catégorie). Les années sans ressource n'affichent
  pas de « 0 » (badge masqué), en attendant du contenu par année.
- **Livres** : rattachés en **« Toutes années »** (références générales, choix utilisateur) —
  leur titre indique déjà MPSI/PCSI. Toutes les 34 ressources sont en « Toutes années » pour
  l'instant ; les puces 1re/2e/3e année se rempliront quand des ressources par année seront ajoutées.

### ✨ Bibliothèque — Ajout de chaînes YouTube (dont 3 🇫🇷 + Emmanuel Djegou)
- **Fichier :** `ressources.js`
- Ajout de 4 chaînes vidéo (toutes vérifiées HTTP 200 sur youtube.com, aucune redirection douteuse) :
  **Passe-science**, **e-penser**, **La Tronche en Biais** (🇫🇷), et **Emmanuel Djegou (FR)**
  (`@EmmanuelDjegouFrench` — IA / statistiques / data science).
- Catégories : Passe-science, e-penser, Emmanuel Djegou → Physique & sciences ;
  La Tronche en Biais → Méthode & orientation. Toutes en niveau « Multi-niveaux ».
- Total : **34 ressources** (Vidéos 13).

### ✨ Bibliothèque — Vraies fiches-livres (couvertures + pages produit exactes + ISBN)
- **Fichiers :** `ressources.js`, `ressources.html`
- Les 11 livres MPSI/PCSI pointent désormais vers leur **page produit Dunod exacte**
  (plus vers l'accueil de l'éditeur) et affichent leur **vraie couverture** + **ISBN** +
  édition à jour (programmes réformés MPSI-MP2I / 2021). Couvertures chargées depuis
  dunod.com via le motif `.../image/{ISBN}-001-X.jpeg` (autorisé par la CSP `img-src https:`).
  Données vérifiées par recherche web + `curl` (couverture HTTP 200, image/jpeg).
- Rendu : nouveau champ `cover`/`isbn` ; `cover()` et le « à la une » affichent l'image ;
  petit bloc `<style>` pour l'habillage des vignettes.
- **Ajustements du catalogue :** retrait de la 2e année (MP/PC) et de son filtre (hors périmètre
  MPSI/PCSI) ; les deux SII fusionnés en **un seul ouvrage commun** (MPSI-MP2I-PCSI) ;
  Informatique = ouvrage **Dunod (Python)** au lieu de l'ancien titre Eyrolles ; retrait des
  entrées « Cours Monier » et « H Prépa » au profit des éditions à jour.
- **Total : 30 ressources** (MPSI 5 · PCSI 4 · Multi-niveaux 21).
- Rappel légal : **aucun PDF de manuel commercial hébergé** — uniquement des liens vers l'éditeur.

### ✨ Bibliothèque — Filtre « Niveau » + livres MPSI/PCSI
- **Fichiers :** `ressources.html`, `ressources.js`
- **Idée reprise de la version React déployée :** ajout d'un **filtre « Niveau »**
  (Tous · MPSI · PCSI · MP/PC · Multi-niveaux), adapté au style « étagères » du site statique.
  Champ `niveau` ajouté à **toutes** les entrées ; logique de filtre, compteurs et
  réinitialisation mis à jour (sélecteurs séparés `[data-cat]` / `[data-niveau]`).
- **Livres MPSI et PCSI** ajoutés (liste validée) : maths, physique, chimie, informatique,
  SII — références Dunod / Hachette (H Prépa) / Eyrolles, liens vers la page éditeur (pas de
  PDF hébergé). Livres de cours **recatégorisés par discipline** (Mathématiques / Physique & sciences).
- Total après nettoyage : **34 ressources** (MPSI 8 · PCSI 5 · MP/PC 1 · Multi-niveaux 20).

### 📄 Config — E-mail officiel, nom de domaine et aperçu de partage
- **Origine :** valeurs confirmées à partir de la version React déployée + validation de l'utilisateur.
- **E-mail :** `racp.imsp@gmail.com` → **`racp-imsp@racp-imsp.org`** sur les 17 pages + le
  gabarit newsletter (pieds de page, contact, formulaires, JSON-LD, mentions légales).
- **Domaine :** `VOTRE-DOMAINE` → **`racp-imsp.org`** dans `sitemap.xml`, `robots.txt` et
  `newsletter/template-newsletter.html`.
- **Aperçu de partage :** balises `og:image` passées en **URL absolue**
  `https://racp-imsp.org/assets/og-image.jpg` (+ logo JSON-LD de l'accueil) → l'aperçu
  s'affichera correctement sur Facebook / LinkedIn / WhatsApp.
- **Réseaux sociaux :** vérifiés **identiques** entre les deux versions → inchangés.
- **Réserve :** les mentions légales restent incomplètes (nom officiel, siège, responsable
  de publication, hébergeur) — absentes aussi de la version déployée, donc à fournir.

### ✨ Contenu — Structure « 4 Pôles » récupérée de la version React + dé-doublonnage
- **Fichier :** `reseau.html`
- **Origine :** contenu réel de la version React (`src/data/poles.ts`, `src/pages/Association.tsx`),
  issu du document `Structuration de RACP.docx`.
- **Ajouts :**
  - Section **« Notre organisation — Les 4 pôles du réseau »** (Académique & Mentorat,
    Communication & Développement, Partenariats & Financement, Événements & Réseau) avec
    mission + responsabilités de chaque pôle.
  - Section **« Résultats attendus »** (4 objectifs).
  - Paragraphe **« Contexte & Justification »** dans la mission (défis nommés).
  - **Faits IMSP réels** (créé en 1988, UAC, CPGE 2 ans) + **lien officiel** https://imsp-uac.org/.
- **Dé-doublonnage (Option A) :** suppression des **3 cartes mission** de `reseau.html`
  (Solidarité / Orientation / Excellence) qui recopiaient les « 3 piliers » de l'accueil et
  faisaient écho aux pôles. L'accueil garde les piliers (le *pourquoi*) ; `reseau.html` garde
  les pôles (le *comment/qui*). Flux final : Mission → IMSP → Gouvernance → 4 Pôles →
  Résultats attendus → Valeurs → Histoire.
- **Non repris volontairement :** chiffres React (1000+/500+/50+/20+, contradictoires → en
  attente des vrais) ; 24 ressources factices ; fonctionnalité « Faire un don » (pas de paiement réel).

### 🐞 Bug — Cartes d'actualités mal formées

- **Fichier :** `actualites.html`
- **Problème :** deux cartes `<a class="card card-link">` contenaient une balise
  `</article>` orpheline (jamais ouverte), héritée d'une ancienne structure → HTML invalide.
- **Correction :** suppression des deux `</article>` orphelines ; les trois cartes ont
  désormais la même structure (`…<p class="art-meta">…</p><span class="card-arrow">…`).

### 🐞 Bug — Disponibilité mentor mal convertie pour Supabase

- **Fichier :** `script.js` (fonction `submitToSupabase`)
- **Problème :** l'option « Plus de 2 h / mois » du formulaire parrain était convertie via
  `parseInt("Plus de 2 h / mois")` → `NaN` → repli à **1 h**. La valeur envoyée à Supabase
  (`dispo_h`) était donc fausse.
- **Correction :** extraction du nombre où qu'il soit dans le libellé (`match(/\d+/)`) ;
  si le libellé contient « plus », on ajoute +1. Résultat : 1 → 1, 2 → 2, « Plus de 2 » → 3.
  Le libellé lisible reste envoyé tel quel à Formspree. Aucun impact sur le formulaire filleul.

### ✍️ Relecture — Page Mentorat (retours `observation.txt`)

- **Fichier :** `mentorat.html`
- **Méthode GROW, le « O » (Options) :** « qu'est-ce qui bloque, qu'as-tu déjà essayé ? »
  → **« quelles pistes s'offrent à toi, qu'as-tu déjà essayé ? »** (on interroge les
  possibilités d'action, pas seulement les blocages).
- **Phase 2 « Méthode & mental » :** « hygiène de vie » → **« rythme de vie »** ;
  « gestion du stress et des notes » → **« … et des résultats »** ; « le mindset » →
  **« l'état d'esprit »** (terme en français).
- **Phase 3 « Stratégie d'orientation » :** « portefeuille de concours équilibré » →
  **« portefeuille équilibré de concours »** (adjectif après le nom).

### ✍️ Relecture — Titre d'accueil (retour `observation.txt`)

- **Fichier :** `index.html`
- **Avant :** « Le réseau qui relie les *matheux et physiciens* formés à l'IMSP ».
- **Après :** « Le réseau qui relie les *matheux, physiciens et informaticiens* formés à l'IMSP ».

### 🔧 Amélioration — Année de copyright automatique (retour `observation.txt`)

- **Fichiers :** les 17 pages `*.html`, `script.js`, `newsletter/template-newsletter.html`
- **Problème :** copyright figé « © 2025 » (périmé en 2026).
- **Correction :** l'année dans le pied de page est désormais **injectée automatiquement
  en JS** — `© <span class="js-year">2026</span> RACP-IMSP…` + un script dans `script.js`
  qui remplit `.js-year` avec l'année courante (repli 2026 si JS désactivé). Plus jamais de
  copyright périmé.
- **Gabarit e-mail** (`newsletter/template-newsletter.html`) : passé en **2026 en dur**
  (le JS ne s'exécute pas dans les messageries).

---

## En attente (dépend d'infos ou de décisions)

> Éléments identifiés à l'audit mais qui **nécessitent tes informations** ou une décision.
> À cocher au fur et à mesure.

- [ ] **Mentions légales** (`mentions-legales.html`) — remplacer « Bloc à compléter » :
  nom officiel de l'association, siège, responsable de publication, hébergeur. *(obligatoire avant mise en ligne)*
- [ ] **Formulaires Formspree** — remplacer les `VOTRE_ID_…` dans `devenir-parrain.html`,
  `devenir-filleul.html`, `contact.html`, `index.html`, `actualites.html`.
- [x] **Nom de domaine** — `racp-imsp.org` renseigné dans `sitemap.xml`, `robots.txt`,
  `newsletter/template-newsletter.html`, et `og:image` passées en URL absolue. *(fait le 2026-07-27)*
- [x] **E-mail officiel** — `racp-imsp@racp-imsp.org` appliqué partout. *(fait le 2026-07-27)*
- [ ] **Supabase** (optionnel, phase 2) — renseigner `assets/supabase-config.js`.
- [ ] **PDF d'annales** — remplacer le placeholder `assets/docs/annales-blanches-2025.pdf` (3,7 Ko).
- [ ] **Contenus d'exemple** — chiffres d'accueil (`data-count`), portrait « Amina K. »
  (`index.html`, `parcours.html`), témoignages parrain, articles de démonstration.
- [ ] **Confidentialité** (`confidentialite.html`) — relire et adapter aux pratiques réelles (RGPD).

---

## Vérifications faites

- ✅ Aucun lien interne cassé (les 17 pages liées existent).
- ✅ Tous les assets présents (14 photos, 3 PDF, logos, favicon, og-image).
- ✅ Le site se lance et se rend correctement en local (`python -m http.server`).
