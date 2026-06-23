# Site RACP-IMSP — Réseau Alumni des Classes Préparatoires de l'IMSP

Site web complet du réseau alumni : vitrine, programme de mentorat (pages d'information +
formulaires de candidature parrain/marraine et filleul·e), ressources et pages légales.

Construit en **HTML / CSS / JavaScript statique** — aucun build, aucune dépendance à installer.
Déployable tel quel sur **GitHub Pages**, Netlify, Vercel ou tout hébergeur de fichiers.

---

## 1. Contenu du dossier

```
site/
├── index.html              Accueil
├── reseau.html             Mission & gouvernance
├── activites.html          Activités
├── mentorat.html           Le programme de mentorat (présentation)
├── devenir-parrain.html    Candidature mentor (formulaire multi-étapes)
├── devenir-filleul.html    Demande d'accompagnement (formulaire multi-étapes)
├── ressources.html         Bibliothèque en ligne (documents + vidéos, filtrable)
├── actualites.html         Actualités / événements + inscription newsletter
├── adhesion.html           Adhésion (vers le Google Form)
├── contact.html            Contact
├── confidentialite.html    Politique de confidentialité (RGPD)
├── mentions-legales.html   Mentions légales
├── styles.css              Identité visuelle (couleurs exactes du logo)
├── script.js               Navigation, animations, formulaires, newsletter
├── supabase-schema.sql     Schéma back-office (phase 2)
├── sitemap.xml             Plan du site (SEO) — remplacer VOTRE-DOMAINE
├── robots.txt              Indexation (SEO) — remplacer VOTRE-DOMAINE
├── .nojekyll               Pour GitHub Pages
├── 404.html
├── newsletter/
│   └── template-newsletter.html   Gabarit e-mail réutilisable
└── assets/
    ├── logo-racp.png       Logo couleur (transparent)
    ├── logo-racp-white.png Logo blanc (pied de page sombre, e-mail)
    ├── favicon.png         Icône (les deux silhouettes) — onglet + en-tête
    ├── og-image.jpg        Image de partage (réseaux sociaux)
    ├── logo-imsp.jpg       Logo de l'Institut (IMSP)
    ├── img/                Photos du campus (optimisées) + arrière-plans floutés
    └── docs/               Statuts & règlement (PDF)
```

> **Droit à l'image.** Les photos contenant des personnes (salle de cours, amphithéâtre)
> sont utilisées **floutées**, en arrière-plan derrière un voile bleu marine de la charte :
> aucun visage n'est identifiable. Les fichiers `salle-cours.jpg` et `amphi.jpg` sont déjà
> traités ainsi. N'utilisez pas les originaux non floutés sans l'accord des personnes.

## 2. Tester en local

Ouvrez simplement `index.html` dans un navigateur, ou lancez un petit serveur :

```bash
cd site
python3 -m http.server 8000
# puis http://localhost:8000
```

## 3. Déployer sur GitHub Pages

1. Copiez le contenu de `site/` à la racine de votre dépôt (ou dans `/docs`).
2. Dépôt → **Settings → Pages** → Source : branche `main`, dossier `/ (root)` ou `/docs`.
3. Le fichier `.nojekyll` est déjà présent pour servir correctement les sous-dossiers.

## 4. Brancher les formulaires de candidature (important)

Les formulaires « Devenir parrain/marraine » et « Être accompagné·e » fonctionnent en
**mode démo** par défaut (ils affichent une confirmation sans rien envoyer).
Pour recevoir réellement les candidatures **sans backend**, le plus simple est
[Formspree](https://formspree.io) (offre gratuite) :

1. Créez un compte, créez un formulaire, copiez son identifiant (ex. `xeoyabcd`).
2. Dans `devenir-parrain.html` **et** `devenir-filleul.html`, remplacez
   `https://formspree.io/f/VOTRE_ID_FORMSPREE` par `https://formspree.io/f/xeoyabcd`.
3. Les candidatures arriveront par email et dans le tableau de bord Formspree
   (exportables en CSV — utile en attendant le back-office de la phase 2).

Idem pour le formulaire de la page **Contact**.

> Alternative no-code : remplacer ces formulaires par des **Google Forms** dédiés
> (un « candidature mentor », un « candidature filleul ») et pointer les boutons dessus,
> exactement comme le formulaire d'adhésion actuel.

## 5. Personnaliser

- **Chiffres d'accueil** : attribut `data-count` dans `index.html` (alumni, promotions…).
- **Couleurs / polices** : variables CSS en haut de `styles.css` (`--navy`, `--cyan`, `--orange`).
- **Actualités** : dupliquez une carte `<article class="card …>` dans `actualites.html`.
- **Kits & fiches écoles** : compilez les `.tex` en PDF, déposez-les dans `assets/docs/`,
  puis ajoutez-les à la bibliothèque (voir ci-dessous).
- **Réseaux sociaux / email** : déjà renseignés (LinkedIn, Facebook, Instagram, email).

## 5 bis. La bibliothèque en ligne (page Ressources)

La page **Ressources** est une bibliothèque filtrable (recherche + type + catégorie),
alimentée par une simple liste dans `ressources.html`. Pour **ajouter une ressource**,
ouvrez `ressources.html`, trouvez `const LIB = [ … ]` et copiez une entrée :

```js
// Vidéo : si vous connaissez l'identifiant YouTube (11 caractères après v=),
// renseignez "yt" → la vidéo se lit dans une fenêtre, sans quitter le site.
{type:"video", cat:"Mathématiques", title:"Titre", author:"Chaîne",
 desc:"Description courte.", url:"https://youtu.be/XXXXXXXXXXX", yt:"XXXXXXXXXXX"},
// Document PDF : déposez le fichier dans assets/docs/ puis pointez "url" dessus.
{type:"doc", cat:"Documents officiels", title:"Mon guide", author:"PDF",
 desc:"Description.", url:"assets/docs/mon-guide.pdf"},
```

La page est présentée façon **bibliothèque** (étagères « Sélection » et « Nouveautés » +
catalogue de couvertures filtrable). Types : `video`, `livre`, `doc`. Catégories : `Mathématiques`, `Physique &amp; sciences`,
`Annales &amp; concours`, `Méthode &amp; orientation`, `Documents officiels`. Ajoutez `soon:true`
pour une ressource « à venir ». Les livres/annales pré-remplis pointent vers des ressources
reconnues (Dunod, Doc Solus, Bibmath, Maths-France, Concours Maths CPGE) — à compléter.
Les vidéos pré-remplies pointent vers des chaînes reconnues (Yvan Monka, Science étonnante,
Science4All, ScienceClic, El Jj, Micmaths, 3Blue1Brown, Zeste de Science) — à compléter.

## 5 ter. La newsletter

1. **Inscription** : bandeau « Restez dans la boucle » (accueil + Actualités). Branchez le
   formulaire à votre outil via `data-endpoint` (Formspree, ou l'URL d'inscription
   Brevo/Mailchimp) en remplaçant `VOTRE_ID_NEWSLETTER`.
2. **Gabarit e-mail** : `newsletter/template-newsletter.html`. Dupliquez-le pour chaque
   numéro, remplacez les `{{CHAMPS}}` et `VOTRE-DOMAINE`, puis envoyez-le via votre outil.
   Aux couleurs de la charte et compatible messageries.

## 5 quinquies. Parcours d'alumni

La page **Parcours** présente un portrait d'alumni à la fois (« un nouveau portrait,
régulièrement »). Un **portrait-exemple complet** est fourni comme gabarit dans
`parcours.html` : dupliquez le bloc `<div class="profile">…</div>` et remplacez le texte,
les initiales de l'`avatar`, le rôle, les étapes et les citations. Les vignettes
« à venir » (`pcard`) invitent les alumni à proposer leur histoire via la page Contact.

## 5 quater. SEO & partage

- `sitemap.xml` et `robots.txt` : **remplacez `VOTRE-DOMAINE`** par votre adresse réelle après
  déploiement, puis soumettez le sitemap dans Google Search Console.
- `assets/og-image.jpg` : image de partage sur les réseaux. Pour un rendu parfait, mettez
  l'URL **absolue** dans la balise `og:image` (https://VOTRE-DOMAINE/assets/og-image.jpg).
- Données structurées (`Organization`) déjà présentes sur l'accueil.

## 6. Accessibilité & performance

Navigation clavier, focus visibles, `aria-*`, lien d'évitement, `prefers-reduced-motion`
respecté, images optimisées et en `loading="lazy"`. Police via Google Fonts (chargée chez
le visiteur ; aucun build requis).

---


## 7 bis. Phase 2 — Espace coordinateur (back-office)

Un **tableau de bord coordinateur** est livré dans `admin/index.html` (lien discret en pied de
page du site, ou ouvrez directement `/admin/`). Il fonctionne immédiatement en **mode
démonstration** (données fictives) : tableau de bord, **pipeline des candidatures (kanban)** par
étape, **binômes**, **membres**, et un **assistant de mise en relation** (suggestion de mentor par
compatibilité).

Pour le passer en **réel** avec Supabase :
1. Créez un projet Supabase et importez `supabase-schema.sql`.
2. Dans `admin/index.html`, renseignez `SUPABASE_URL` et `SUPABASE_ANON` (clé anon publique).
3. La connexion se fait par lien e-mail (magic link) ; les vues lisent les tables
   `mentor_applications`, `mentee_applications`, `pairings`, `profiles`.
4. Ajoutez les politiques RLS d'écriture avant la mise en production (voir le schéma).

> Le mode démo n'écrit rien ; dès que Supabase est configuré, les changements d'étape et les
> binômes créés sont enregistrés en base.

## 7. Phase 2 — Le back-office (gestion des candidatures & binômes)

Le site livré couvre **tout le front public + les formulaires de candidature**. La gestion
dynamique (connexion, annuaire des membres, tableau de bord du coordinateur, suivi des
binômes) nécessite une base de données et de l'authentification. Le chemin recommandé :

- **Supabase** (Postgres + Auth + Storage + sécurité par rôles) — offre gratuite suffisante.
- Front identique ou migré vers **Next.js** quand le besoin grandit.

Le fichier **`supabase-schema.sql`** fournit le schéma de départ (tables, statuts du pipeline
de mentorat calqué sur le modèle Rura, et esquisse des politiques de sécurité). Importez-le
dans l'éditeur SQL de Supabase pour démarrer.

Workflow de candidature (= statuts en base) :
`soumise → en_revue → presentation_planifiee → engagement_valide → onboarde →
en_attente_binome → jumele → actif → cloture / refuse`.
