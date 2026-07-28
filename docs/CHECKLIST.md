# Checklist de mise en route — Site RACP-IMSP

Guide pour débutant·e. Cochez au fur et à mesure (remplacez `[ ]` par `[x]`).
Faites les sections dans l'ordre : la 1 et la 2 suffisent pour un site en ligne
qui reçoit déjà les candidatures. Le reste s'enrichit avec le temps.

**Comment éditer un fichier ?** Ouvrez-le avec un éditeur de texte simple
(VS Code recommandé, gratuit). Utilisez `Ctrl + F` pour chercher le mot indiqué,
remplacez, enregistrez. Ne renommez jamais les fichiers.

---

## 1. Indispensable avant la première mise en ligne

- [ ] **Vérifier les liens réseaux sociaux**
  - Où : en bas de chaque page (le pied de page). Cherchez `linkedin.com`,
    `facebook.com`, `instagram.com`.
  - Quoi : confirmez que ces 3 adresses sont bien VOS comptes.
  - Fini quand : un clic sur chaque icône ouvre la bonne page.

- [ ] **Vérifier l'adresse e-mail de contact**
  - Où : pied de page et page `contact.html`. Cherchez `racp.imsp@gmail.com`.
  - Quoi : remplacez partout si vous utilisez une autre adresse.
  - Fini quand : la même adresse apparaît partout.

- [ ] **Vérifier le lien d'adhésion (Google Form)**
  - Où : bouton « Adhérer » en haut, et page `adhesion.html`. Cherchez
    `docs.google.com/forms`.
  - Quoi : confirmez que c'est bien votre formulaire Google.
  - Fini quand : le bouton ouvre votre formulaire.

- [ ] **Compléter les mentions légales**
  - Où : `mentions-legales.html`. Cherchez « Bloc à compléter ».
  - Quoi : nom officiel de l'association, siège, responsable de publication,
    hébergeur. Demandez validation à un·e responsable.
  - Fini quand : la phrase « Bloc à compléter » a disparu.

---

## 2. Recevoir les candidatures et les messages

> Tout est expliqué en détail dans `MENTORAT-SETUP.md`. Choisissez **Formspree**
> (le plus simple pour débuter) **ou** **Supabase** (pipeline complet).

### Option simple — Formspree (recommandée pour démarrer)

Suivez ces points **dans l'ordre**. Un formulaire Formspree = une « boîte de
réception » ; vous pouvez en créer un par usage, ou en réutiliser un seul.

- [ ] **1. Créer le compte** sur https://formspree.io (gratuit, 50 envois/mois).

- [ ] **2. Créer un formulaire et noter son adresse e-mail cible**
  - Dans Formspree : « + New form », donnez-lui un nom (ex. « Candidatures
    parrain ») et indiquez l'e-mail qui doit **recevoir** les envois
    (ex. `racp.imsp@gmail.com`).
  - Formspree fournit une URL du type `https://formspree.io/f/abcdwxyz`.
  - Où la retrouver plus tard : section **Integration** du formulaire, sous
    « Your form's endpoint is: ».

- [ ] **3. Coller l'URL dans le bon fichier** (cherchez le mot, remplacez
  l'adresse `https://formspree.io/f/VOTRE_…` par la vôtre, enregistrez) :
  - Formulaire parrain → `devenir-parrain.html`, cherchez `VOTRE_ID_FORMSPREE`.
  - Formulaire filleul → `devenir-filleul.html`, cherchez `VOTRE_ID_FORMSPREE`.
  - Newsletter → `index.html` **ET** `actualites.html`, cherchez
    `VOTRE_ID_NEWSLETTER` (les deux pointent vers la même boîte).
  - Contact → `contact.html`, cherchez `VOTRE_ID_CONTACT`. Le formulaire est
    déjà branché sur Formspree (fini le `mailto:`) ; il ne reste qu'à coller
    l'URL de votre formulaire « Contact ».
  - Important : laissez `assets/supabase-config.js` **vide**, sinon Supabase
    passe devant Formspree.

- [ ] **4. Tester en servant le site en `http://` (pas en `file://`)**
  - Ne double-cliquez pas le fichier `.html` : ouvert ainsi, l'envoi est bloqué
    par le navigateur.
  - VS Code : extension « Live Server » → clic droit sur la page → « Open with
    Live Server ». Ou en terminal, dans le dossier du site :
    `python3 -m http.server` puis `http://localhost:8000/devenir-parrain.html`.
  - (Une fois le site mis en ligne, ça marche directement, sans rien de tout ça.)

- [ ] **5. Confirmer le tout premier envoi**
  - Au 1er envoi, Formspree envoie un e-mail « Confirm your email » à l'adresse
    cible. **Cliquez le lien dedans** : tant que ce n'est pas fait, les
    candidatures ne sont pas livrées. À faire une seule fois par formulaire.

- [ ] **6. Vérifier la réception**
  - Connectez-vous sur https://formspree.io → cliquez votre formulaire →
    onglet **Submissions** : chaque envoi y apparaît (une ligne par candidature).
  - Fini quand : un test arrive **à la fois** dans l'e-mail cible **et** dans
    l'onglet Submissions.

- [ ] **7. Envoyer une confirmation automatique au candidat**
  - But : que la personne reçoive aussitôt un e-mail « votre candidature est
    bien reçue ».
  - Où : dans Formspree, ouvrez le formulaire → onglet **Plugins** →
    **Autoresponses**. Renseignez l'expéditeur (ex. « RACP-IMSP »), l'objet
    (ex. « Votre candidature est bien reçue ») et le message.
  - Ça marche parce que tous les formulaires ont un champ `email` : Formspree
    sait à qui répondre. (À refaire pour chaque formulaire : parrain, filleul,
    contact.)
  - Note : reprendre les données saisies dans cet e-mail ou utiliser un gabarit
    personnalisé nécessite un domaine personnalisé / une offre payante ; un
    message de remerciement simple suffit et reste possible sans cela.

- [ ] **8. (Une fois le site en ligne) limiter aux envois légitimes**
  - Dans les réglages du formulaire, restreignez le domaine autorisé à votre
    vraie adresse de site, et activez la protection anti-spam proposée.

> Rappels offre gratuite : 50 envois/mois et **30 jours d'archive** — pensez à
> exporter (CSV/JSON depuis Submissions) avant l'expiration. Au besoin, l'envoi
> peut aussi être routé vers Google Sheets via les intégrations Formspree.

### Option complète — Supabase (quand vous voulez le suivi des binômes)

- [ ] **Créer le projet et exécuter `supabase-schema.sql`** (voir `MENTORAT-SETUP.md`).
- [ ] **Renseigner `assets/supabase-config.js`** (URL + clé `anon`).
- [ ] **Créer le compte coordinateur** et son profil (voir le guide).
- [ ] **Tester** : une candidature apparaît dans l'espace coordinateur (`admin/`).
- [ ] **Anti-veille** : mettre un « ping » gratuit (UptimeRobot) sinon le projet
  se met en pause après 7 jours d'inactivité.

### L'espace coordinateur (`admin/`) — accès & sécurité

> Le lien « Espace coordinateur » est présent dans le **pied de page de toutes
> les pages**, et l'espace propose un bouton « Entrer en mode démonstration »
> **ouvert à tous**. À régler avant la mise en ligne.

- [ ] **Comprendre la protection réelle** : seules les vraies candidatures sont
  protégées (par Supabase + le rôle coordinateur). Sans Supabase, `admin/` n'est
  qu'une **démonstration** avec des données fictives — rien de confidentiel,
  mais l'interface est visible par quiconque trouve l'adresse.
- [x] **Lien public retiré du pied de page** — déjà fait dans cette version : le
  pied de page n'affiche plus que « Confidentialité · Mentions légales ».
  Communiquez l'adresse `…/admin/` à l'équipe (en favori).
- [ ] **Mode démo** : en production avec Supabase branché, vous pouvez retirer le
  bouton « Entrer en mode démonstration » (dans `admin/index.html`) pour ne
  laisser que la connexion par e-mail.
- [ ] Déjà en place : la page `admin/` est en `noindex` — elle n'apparaîtra pas
  dans les résultats Google.

---

## 3. Remplacer les contenus d'exemple par les vrais

- [ ] **Les chiffres de la page d'accueil**
  - Où : `index.html`. Cherchez `data-count`.
  - Quoi : `200` (alumni), `15` (promotions), `3` (continents), `12` (mois).
    Mettez vos vrais chiffres (le « 0 » à côté est normal, c'est le départ
    de l'animation, ne touchez pas).
  - Fini quand : les compteurs affichent vos valeurs réelles.

- [ ] **Le portrait d'alumni sur l'accueil**
  - Où : `index.html`. Cherchez « Exemple de portrait ».
  - Quoi : remplacez la citation, le nom (« Amina K. ») et les initiales
    (« AK ») par un vrai témoignage, ou retirez le bloc.

- [ ] **La page Parcours**
  - Où : `parcours.html`. Cherchez « gabarit à dupliquer ».
  - Quoi : remplacez le portrait d'exemple par un vrai, dupliquez le bloc pour
    en ajouter d'autres.

- [ ] **Les témoignages du mentorat**
  - Où : `devenir-parrain.html`. Cherchez « promotion à compléter ».
  - Quoi : remplacez par de vrais témoignages quand vous en aurez, ou laissez
    « Témoignages à venir ».

- [ ] **Les articles d'actualité d'exemple**
  - Où : `article-jcpge.html`, `article-mentorat-2026.html`,
    `article-annales.html`. Cherchez « Article de démonstration ».
  - Quoi : remplacez par vos vrais textes ; retirez la bannière jaune
    « Article de démonstration ».

- [ ] **Les ressources « Bientôt »**
  - Où : `ressources.html`. Cherchez `soon:true`.
  - Quoi : quand un document est prêt (kit parrain, fiches écoles, calendrier),
    mettez son lien dans `url:""` et retirez `soon:true`.

---

## 4. Référencement (SEO) et nom de domaine

- [ ] **Mettre votre vrai domaine dans le plan du site**
  - Où : `sitemap.xml` et `robots.txt`. Cherchez `VOTRE-DOMAINE`.
  - Quoi : remplacez par votre adresse réelle (ex. `racp-imsp.org`).
  - Fini quand : plus aucun `VOTRE-DOMAINE` dans ces deux fichiers.

- [ ] **Le gabarit d'e-mail newsletter (optionnel)**
  - Où : `newsletter/template-newsletter.html`. Cherchez `VOTRE-DOMAINE`.
  - Quoi : à faire seulement quand vous enverrez des newsletters.

- [ ] **L'image de partage (réseaux sociaux)**
  - Où : `assets/og-image.jpg` (déjà présente).
  - Quoi : remplacez le fichier par votre visuel si vous en avez un meilleur
    (gardez exactement le même nom de fichier).

- [ ] **Rendre l'aperçu de partage visible** (important)
  - Où : balise `og:image` dans l'en-tête de chaque page. Cherchez `og:image`.
  - Quoi : aujourd'hui l'adresse est relative (`assets/og-image.jpg`). Une fois
    le domaine connu, mettez l'**URL complète**
    (`https://votre-domaine/assets/og-image.jpg`), sinon l'aperçu (image +
    titre) ne s'affiche pas sur Facebook, LinkedIn ou WhatsApp.
  - Fini quand : un partage de l'adresse du site montre bien l'image.

---

## 5. Mettre le site en ligne (hébergement gratuit)

> Le site est 100 % statique : aucun serveur à gérer. Choisissez UNE option.

- [ ] **GitHub Pages** (gratuit) — créez un dépôt, déposez le dossier, activez
  Pages dans les réglages. Le fichier `.nojekyll` est déjà prévu.
- [ ] **OU Netlify / Vercel** (gratuit) — glissez-déposez le dossier du site,
  c'est en ligne en quelques secondes.
- [ ] **Brancher votre nom de domaine** (si vous en avez un) via l'hébergeur.
- [ ] **Tester sur téléphone** : ouvrez le site sur mobile, vérifiez le menu,
  les formulaires et la galerie.

---

## 6. Entretien régulier (après la mise en ligne)

- [ ] **Publier les actualités** au fil de l'eau (`actualites.html` + un fichier
  `article-….html` par article, en copiant un existant).
- [ ] **Enrichir la bibliothèque** (`ressources.html`, dans la liste `LIB`).
- [ ] **Relever les candidatures** : boîte Formspree, ou espace coordinateur
  Supabase (`admin/`).
- [ ] **Exporter les candidatures Formspree** avant 30 jours (l'archive gratuite
  ne garde que 30 jours).
- [ ] **Surveiller le quota** (50 envois/mois sur Formspree gratuit).

---

## 7. Ajouter vos propres contenus (PDF, ressources, newsletter)

> Sur un site statique, **pas de bouton « téléverser »** : on dépose le fichier
> dans le dossier du site, puis on ajoute une ligne qui pointe dessus.

### Ajouter un document PDF à la bibliothèque

- [ ] Déposez le PDF dans `assets/docs/` (nom court, **sans espaces ni
  accents**, ex. `annales-2024.pdf`).
- [ ] Ouvrez `ressources.html`, repérez la liste `LIB = [` (vers le milieu).
- [ ] Copiez une ligne existante de type `doc` et adaptez-la :
  ```js
  {type:"doc", cat:"Annales & concours", title:"Annales 2024 — Maths",
   author:"RACP-IMSP · PDF", isNew:true,
   desc:"Sujets et corrigés du concours 2024.", url:"assets/docs/annales-2024.pdf"},
  ```
- [ ] La `cat` doit être **exactement** l'une des catégories existantes :
  Mathématiques · Physique & sciences · Annales & concours · Méthode &
  orientation · Documents officiels (sinon le filtre ne la trouve pas).
- [ ] Options : `featured:true` (→ « Sélection de l'équipe »), `isNew:true`
  (→ badge « Nouveau » et « Nouveautés »).
- [ ] Fini quand : la carte apparaît dans le catalogue et le PDF s'ouvre au clic.

### Activer un document « Bientôt »

- [ ] Dans `ressources.html`, cherchez `soon:true` (ex. « Fiches écoles »,
  « Kit Parrain »). Quand le PDF est prêt : déposez-le dans `assets/docs/`,
  mettez son chemin dans `url:""`, puis **supprimez** `soon:true`.

### Ajouter une vidéo

- [ ] Même principe, ligne de type `video`. Pour une lecture **intégrée** au
  site, renseignez `yt:"IDENTIFIANT"` (les 11 caractères après `watch?v=` dans
  l'adresse YouTube). Sinon laissez `yt:""` et mettez l'adresse dans `url`.

### Conseils fichiers

- [ ] Gardez les PDF raisonnables (compressez au-delà de ~5–10 Mo) : les fichiers
  lourds ralentissent le site et pèsent sur l'hébergement.
- [ ] Ne renommez jamais un fichier déjà référencé sans corriger son `url`.

### Newsletter : collecter ≠ envoyer

> Le site **collecte** les abonnés ; il n'**envoie pas** les e-mails. L'envoi se
> fait avec un outil d'emailing séparé.

- [ ] **Collecte** : le champ d'inscription branché sur Formspree (section 2)
  range chaque adresse dans Submissions. Exportez la liste (CSV) au moment
  d'envoyer.
- [ ] **Envoi** : créez un compte sur un outil d'emailing gratuit (ex. Brevo),
  importez vos abonnés, envoyez le numéro.
- [ ] **Le visuel de l'e-mail** : utilisez `newsletter/template-newsletter.html`.
  Dupliquez-le par numéro, remplacez les `{{CHAMPS}}` (titre, intro, articles…)
  et `VOTRE-DOMAINE`, dupliquez le bloc « ARTICLE » autant de fois que voulu,
  puis collez le code dans votre outil d'emailing.
- [ ] Démarrage en douceur : pour une toute petite liste, un e-mail en **Cci**
  (copie cachée) depuis votre boîte dépanne — mais passez vite à un outil dédié
  (lien de désinscription, meilleure délivrabilité).

### Autres contenus (même logique : copier un bloc existant)

- [ ] **Actualité** : ajoutez la carte dans `actualites.html` et créez son
  article en copiant un fichier `article-….html` existant.
- [ ] **Portrait d'alumni** : dupliquez le bloc « gabarit à dupliquer » dans
  `parcours.html`.

---

## 8. Protection des données (à valider sereinement)

- [ ] **Relire la page Confidentialité** (`confidentialite.html`) et l'adapter à
  vos pratiques réelles.
- [ ] **Mineur·e·s** : le formulaire filleul prévoit l'autorisation parentale.
  Vérifiez votre procédure de recueil et de conservation.
- [ ] **Anti-spam** (si Supabase en production) : prévoir un captcha
  (Cloudflare Turnstile / hCaptcha) — voir la note dans `supabase-schema.sql`.

---

### Priorité minimale pour ouvrir le site
Sections **1** et **2 (Formspree)** + **5 (hébergement)**. Le reste peut suivre
au fil des semaines, sans bloquer la mise en ligne.

En cas de doute sur un point précis, notez le numéro de la ligne et demandez —
on le traite ensemble.
