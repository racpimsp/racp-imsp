# Checklist de mise en route — Site RACP-IMSP

Guide pour débutant·e. Cochez au fur et à mesure (remplacez `[ ]` par `[x]`).
<<<<<<< HEAD
Les cases déjà cochées ont été **vérifiées dans le code** lors de l'audit du
**31 juillet 2026** — vous n'avez rien à y faire, elles sont là pour la traçabilité.
=======
Faites les sections dans l'ordre : la 1 et la 2 suffisent pour un site en ligne
qui reçoit déjà les candidatures. Le reste s'enrichit avec le temps.
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

**Comment éditer un fichier ?** Ouvrez-le avec un éditeur de texte simple
(VS Code recommandé, gratuit). Utilisez `Ctrl + F` pour chercher le mot indiqué,
remplacez, enregistrez. Ne renommez jamais les fichiers.

<<<<<<< HEAD
> 📓 L'historique détaillé des modifications est dans [`CORRECTIONS.md`](CORRECTIONS.md).

---

## 0. Où en est-on ? (audit du 2026-07-31)

**Ce qui est déjà bon** — vérifié fichier par fichier :

| Point                  | État                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 18 pages HTML          | ✅ toutes se chargent, page 404 opérationnelle                                                                                                |
| Liens internes         | ✅ 17 pages liées,**aucun lien cassé**                                                                                                 |
| Liens externes         | ✅**54 URL testées, toutes valides** (Feynman 403 et LinkedIn 999 = simples anti-robots)                                                |
| Images, PDF, logos     | ✅ tous les fichiers référencés existent ;**toutes les images ont un texte alternatif**                                               |
| E-mail officiel        | ✅`racp-imsp@racp-imsp.org` sur les 17 pages + LICENSE + newsletter                                                                          |
| Réseaux sociaux       | ✅ LinkedIn / Facebook / Instagram renseignés partout (à confirmer par vous, section 1)                                                      |
| Formulaire d'adhésion | ✅ lien Google Form réel, actif                                                                                                               |
| Nom de domaine         | ✅`racp-imsp.org` dans `sitemap.xml`, `robots.txt`, newsletter, canoniques                                                               |
| Aperçu de partage     | ✅`og:image` en **URL absolue** sur les 17 pages                                                                                       |
| Mobile / SEO           | ✅ canonique,`og:url`, `theme-color`, `apple-touch-icon`, `manifest.json` valide                                                       |
| Sécurité             | ✅ CSP**identique sur les 18 pages**, `_headers` + `vercel.json`, honeypot anti-spam                                                 |
| Espace coordinateur    | ✅ lien retiré des pieds de page,`noindex` + `Disallow: /admin/`                                                                          |
| Bibliothèque          | ✅ 54 ressources,**0 doublon**, catégorie et année renseignées partout ; compteurs justes (54 · 5 catégories · 39 en accès libre) |
| Copyright              | ✅ année injectée automatiquement (plus jamais périmée)                                                                                    |

**Ce qui bloque encore la mise en ligne** — le détail est dans les sections suivantes :

1. 🔴 **Formspree non branché** — 4 adresses `VOTRE_ID_…` → aucun formulaire ne part (section 2).
2. 🔴 **Mentions légales incomplètes** — responsable de publication + hébergeur (section 1).
3. 🟠 **Contenus d'exemple encore en ligne** — chiffres inventés, « Amina K. », 4 articles de
   démonstration, PDF d'annales factice (section 3).
4. 🟠 **Site pas encore hébergé** (section 5).

**Petites anomalies relevées à l'audit** (aucune n'empêche la mise en ligne) — section 9.

=======
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7
---

## 1. Indispensable avant la première mise en ligne

<<<<<<< HEAD
- [X] **Confirmer les liens réseaux sociaux**

  - Où : pied de page de toutes les pages.
  - État : les 3 adresses sont **renseignées et actives** —
    `linkedin.com/in/racp-imsp-41597937b/`, `facebook.com/profile.php?id=61579263734893`,
    `instagram.com/racp_imsp/`.
  - Quoi : cliquez chacune et confirmez que ce sont bien VOS comptes.
- [X] **Adresse e-mail de contact** — `racp-imsp@racp-imsp.org` est utilisée partout
  (17 pages, `LICENSE`, gabarit newsletter). L'ancienne `racp.imsp@gmail.com` n'apparaît plus.
  *Rien à faire, sauf si vous changez d'adresse.*
- [X] **Lien d'adhésion (Google Form)** — le bouton « Adhérer » (en-tête de toutes les
  pages + `adhesion.html` + accueil) pointe vers un formulaire Google **réel et accessible**.
  *Vérifiez simplement une fois qu'il s'agit du bon formulaire.*
- [ ] **Compléter les mentions légales** ⚠️ *obligatoire*

  - Où : `mentions-legales.html`. Cherchez « à compléter ».
  - Déjà renseignés : nom officiel de l'association, siège (IMSP, Dangbo, Bénin), contact.
  - **Restent 2 champs** :
    - `Responsable de la publication : à compléter` → nom de la personne ;
    - bloc **Hébergement** → « GitHub Pages (ou tout autre hébergeur retenu) … À compléter » :
      mettez le nom **et l'adresse postale** de l'hébergeur réellement choisi (section 5).
  - Fini quand : la mention « à compléter » a disparu, ainsi que le petit paragraphe gris
    en bas de page qui la rappelle.

---

## 2. Recevoir les candidatures et les messages 🔴

> **Aucun formulaire n'est branché aujourd'hui** : tant que les `VOTRE_ID_…` sont là, le
> site n'envoie rien (le script bloque volontairement l'envoi vers une fausse adresse).
> Tout est détaillé dans [`MENTORAT-SETUP.md`](MENTORAT-SETUP.md). Choisissez **Formspree**
> (le plus simple) **ou** **Supabase** (pipeline complet).
=======
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
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

### Option simple — Formspree (recommandée pour démarrer)

Suivez ces points **dans l'ordre**. Un formulaire Formspree = une « boîte de
réception » ; vous pouvez en créer un par usage, ou en réutiliser un seul.

- [ ] **1. Créer le compte** sur https://formspree.io (gratuit, 50 envois/mois).
<<<<<<< HEAD
- [ ] **2. Créer un formulaire et noter son adresse e-mail cible**

  - Dans Formspree : « + New form », donnez-lui un nom (ex. « Candidatures
    parrain ») et indiquez l'e-mail qui doit **recevoir** les envois
    (ex. `racp-imsp@racp-imsp.org`).
  - Formspree fournit une URL du type `https://formspree.io/f/abcdwxyz`.
  - Où la retrouver plus tard : section **Integration** du formulaire, sous
    « Your form's endpoint is: ».
- [ ] **3. Coller l'URL dans le bon fichier** — 4 emplacements, tous vérifiés présents :

  | Formulaire                   | Fichier · ligne                                                   | Texte à chercher       |
  | ---------------------------- | ------------------------------------------------------------------ | ----------------------- |
  | Candidature parrain/marraine | `devenir-parrain.html` (~l. 102)                                 | `VOTRE_ID_FORMSPREE`  |
  | Candidature filleul·e       | `devenir-filleul.html` (~l. 82)                                  | `VOTRE_ID_FORMSPREE`  |
  | Newsletter                   | `index.html` (~l. 214) **ET** `actualites.html` (~l. 87) | `VOTRE_ID_NEWSLETTER` |
  | Contact                      | `contact.html` (~l. 71)                                          | `VOTRE_ID_CONTACT`    |


  - Remplacez toute l'adresse `https://formspree.io/f/VOTRE_…` par la vôtre, enregistrez.
  - Les deux champs newsletter pointent vers la **même** boîte.
  - Important : laissez `assets/supabase-config.js` **vide** (c'est le cas aujourd'hui),
    sinon Supabase passe devant Formspree.
- [ ] **4. Tester en servant le site en `http://` (pas en `file://`)**

=======

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
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7
  - Ne double-cliquez pas le fichier `.html` : ouvert ainsi, l'envoi est bloqué
    par le navigateur.
  - VS Code : extension « Live Server » → clic droit sur la page → « Open with
    Live Server ». Ou en terminal, dans le dossier du site :
<<<<<<< HEAD
    `python -m http.server 8000` puis `http://localhost:8000/devenir-parrain.html`.
  - (Une fois le site mis en ligne, ça marche directement, sans rien de tout ça.)
- [ ] **5. Confirmer le tout premier envoi**

  - Au 1er envoi, Formspree envoie un e-mail « Confirm your email » à l'adresse
    cible. **Cliquez le lien dedans** : tant que ce n'est pas fait, les
    candidatures ne sont pas livrées. À faire une seule fois par formulaire.
- [ ] **6. Vérifier la réception**

=======
    `python3 -m http.server` puis `http://localhost:8000/devenir-parrain.html`.
  - (Une fois le site mis en ligne, ça marche directement, sans rien de tout ça.)

- [ ] **5. Confirmer le tout premier envoi**
  - Au 1er envoi, Formspree envoie un e-mail « Confirm your email » à l'adresse
    cible. **Cliquez le lien dedans** : tant que ce n'est pas fait, les
    candidatures ne sont pas livrées. À faire une seule fois par formulaire.

- [ ] **6. Vérifier la réception**
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7
  - Connectez-vous sur https://formspree.io → cliquez votre formulaire →
    onglet **Submissions** : chaque envoi y apparaît (une ligne par candidature).
  - Fini quand : un test arrive **à la fois** dans l'e-mail cible **et** dans
    l'onglet Submissions.
<<<<<<< HEAD
- [ ] **7. Envoyer une confirmation automatique au candidat**

=======

- [ ] **7. Envoyer une confirmation automatique au candidat**
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7
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
<<<<<<< HEAD
- [ ] **8. (Une fois le site en ligne) limiter aux envois légitimes**

  - Dans les réglages du formulaire, restreignez le domaine autorisé à votre
    vraie adresse de site, et activez la protection anti-spam proposée.
  - Bon à savoir : un **piège à robots** (champ caché `_gotcha`) est déjà en place
    sur tous les formulaires du site — vérifié à l'audit.
=======

- [ ] **8. (Une fois le site en ligne) limiter aux envois légitimes**
  - Dans les réglages du formulaire, restreignez le domaine autorisé à votre
    vraie adresse de site, et activez la protection anti-spam proposée.
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

> Rappels offre gratuite : 50 envois/mois et **30 jours d'archive** — pensez à
> exporter (CSV/JSON depuis Submissions) avant l'expiration. Au besoin, l'envoi
> peut aussi être routé vers Google Sheets via les intégrations Formspree.

### Option complète — Supabase (quand vous voulez le suivi des binômes)

<<<<<<< HEAD
- [ ] **Créer le projet et exécuter `docs/supabase-schema.sql`** (voir `MENTORAT-SETUP.md`).
- [ ] **Renseigner `assets/supabase-config.js`** (URL + clé `anon`) — le fichier est
  aujourd'hui **vide**, ce qui est correct tant que vous restez sur Formspree.
=======
- [ ] **Créer le projet et exécuter `supabase-schema.sql`** (voir `MENTORAT-SETUP.md`).
- [ ] **Renseigner `assets/supabase-config.js`** (URL + clé `anon`).
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7
- [ ] **Créer le compte coordinateur** et son profil (voir le guide).
- [ ] **Tester** : une candidature apparaît dans l'espace coordinateur (`admin/`).
- [ ] **Anti-veille** : mettre un « ping » gratuit (UptimeRobot) sinon le projet
  se met en pause après 7 jours d'inactivité.

### L'espace coordinateur (`admin/`) — accès & sécurité

<<<<<<< HEAD
- [X] **Lien public retiré du pied de page** — vérifié : aucune page ne pointe vers
  `admin/`. Communiquez l'adresse `…/admin/` à l'équipe (en favori).
- [X] **Non référencé par Google** — triple protection en place : balise `noindex` dans
  `admin/index.html`, `Disallow: /admin/` dans `robots.txt`, en-tête `X-Robots-Tag: noindex`
  dans `_headers` et `vercel.json`.
=======
> Le lien « Espace coordinateur » est présent dans le **pied de page de toutes
> les pages**, et l'espace propose un bouton « Entrer en mode démonstration »
> **ouvert à tous**. À régler avant la mise en ligne.

>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7
- [ ] **Comprendre la protection réelle** : seules les vraies candidatures sont
  protégées (par Supabase + le rôle coordinateur). Sans Supabase, `admin/` n'est
  qu'une **démonstration** avec des données fictives — rien de confidentiel,
  mais l'interface est visible par quiconque trouve l'adresse.
<<<<<<< HEAD
- [ ] **Mode démo** : le bouton « Entrer en mode démonstration » est **toujours présent**
  (`admin/index.html`, ~l. 119). En production avec Supabase branché, retirez-le pour ne
  laisser que la connexion par e-mail.

---

## 3. Remplacer les contenus d'exemple par les vrais 🟠

> Tous ces éléments sont **encore en place** aujourd'hui (vérifié à l'audit).

- [ ] **Les chiffres de la page d'accueil**

  - Où : `index.html`, aux lignes ~73-75 et ~138-140. Cherchez `data-count`.
  - Valeurs actuelles (fictives) : `200` alumni, `15` promotions, `3` continents,
    `12` mois d'accompagnement. Chaque chiffre apparaît **à deux endroits** :
    pensez à modifier les deux.
  - Le « 0 » à côté est normal (point de départ de l'animation), ne le touchez pas.
- [ ] **Le portrait d'alumni sur l'accueil**

  - Où : `index.html` (~l. 184). Cherchez « Exemple de portrait ».
  - Quoi : remplacez la citation, le nom (« Amina K. ») et les initiales
    (« AK ») par un vrai témoignage, ou retirez le bloc.
- [ ] **La page Parcours**

  - Où : `parcours.html` (~l. 58-70). Cherchez « gabarit à dupliquer ».
  - Quoi : remplacez le portrait d'« Amina K. » par un vrai, dupliquez le bloc pour
    en ajouter d'autres.
- [ ] **Les témoignages du mentorat**

  - Où : `devenir-parrain.html` (~l. 91). Cherchez « promotion à compléter ».
  - Quoi : remplacez par un vrai témoignage quand vous en aurez, ou retirez le bloc.
- [ ] **Les articles d'actualité d'exemple — il y en a 4**

  - Où : `article-jcpge.html`, `article-mentorat-2026.html`, `article-annales.html`
    et **`article-annuaire.html`** (oublié dans la version précédente de cette liste).
    Cherchez « Article de démonstration » (ligne 57 dans chacun).
  - Quoi : remplacez par vos vrais textes ; retirez la bannière
    « 📝 Article de démonstration ».
  - Note : ces 4 pages ne sont **volontairement pas** dans `sitemap.xml`. Ajoutez-les
    quand les vrais articles seront écrits (voir section 4).
- [ ] **Le PDF d'annales factice**

  - Où : `assets/docs/annales-blanches-2025.pdf` — fichier **placeholder de 3,7 Ko**.
  - Quoi : remplacez-le par le vrai sujet (gardez exactement le même nom de fichier),
    et corrigez sa description dans `ressources.js` (~l. 45-46) qui dit encore
    « Exemple fictif à remplacer par vos vrais sujets ».
- [ ] **Les 4 ressources « Bientôt »**

  - Où : **`ressources.js`** (et non `ressources.html`). Cherchez `soon:true` —
    lignes 128, 130, 138, 140 : *Fiches écoles*, *Calendrier des concours*,
    *Kit Parrain / Marraine*, *Kit Filleul·e*.
  - Quoi : quand un document est prêt, déposez-le dans `assets/docs/`, mettez son
    chemin dans `url:""` et **supprimez** `soon:true`.
=======
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
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

---

## 4. Référencement (SEO) et nom de domaine

<<<<<<< HEAD
- [X] **Domaine dans le plan du site** — `racp-imsp.org` est en place dans `sitemap.xml`
  (13 URL) et `robots.txt` (avec `Disallow: /admin/` et `/docs/`). Plus aucun
  `VOTRE-DOMAINE` nulle part.
- [X] **Gabarit d'e-mail newsletter** — domaine déjà renseigné dans
  `newsletter/template-newsletter.html`.
- [X] **Aperçu de partage (`og:image`)** — l'adresse est bien **absolue**
  (`https://racp-imsp.org/assets/og-image.jpg`) sur les 17 pages publiques :
  l'image s'affichera sur Facebook, LinkedIn et WhatsApp.
- [X] **Base technique SEO** — chaque page a son URL canonique, son `og:url`, sa
  `meta description`, `theme-color`, `apple-touch-icon` et le lien vers `manifest.json`.

Restent à faire :

- [ ] **Si votre domaine final n'est pas `racp-imsp.org`** — remplacez-le partout :
  `sitemap.xml`, `robots.txt`, `newsletter/template-newsletter.html`, et les balises
  `canonical` / `og:url` / `og:image` des 17 pages. *(À ne faire que si le domaine change.)*
- [ ] **Ajouter les articles au plan du site** quand les vrais textes remplaceront les
  démos : une ligne `<url><loc>https://racp-imsp.org/article-….html</loc></url>` par article
  dans `sitemap.xml`.
- [ ] **L'image de partage** — `assets/og-image.jpg` est déjà présente ; remplacez le
  fichier par un meilleur visuel si vous en avez un (gardez exactement le même nom).
- [ ] **Après la mise en ligne** : déclarer le site dans
  [Google Search Console](https://search.google.com/search-console) et y soumettre
  `https://racp-imsp.org/sitemap.xml`.

---

## 5. Mettre le site en ligne (hébergement gratuit) 🟠

> Le site est 100 % statique : aucun serveur à gérer. Choisissez UNE option.
> Les fichiers de configuration des deux principaux hébergeurs sont **déjà prêts**.

- [ ] **GitHub Pages** (gratuit) — Settings → Pages → branche `main`, dossier `/ (root)`.
  Le fichier `.nojekyll` est déjà présent.
  *À savoir : GitHub Pages ne lit pas `_headers` ni `vercel.json` — les en-têtes de
  sécurité serveur ne s'appliqueront pas (les balises CSP des pages, elles, restent actives).*
- [ ] **OU Netlify / Cloudflare Pages** (gratuit) — glissez-déposez le dossier :
  le fichier **`_headers`** (déjà écrit) applique automatiquement les en-têtes de sécurité.
- [ ] **OU Vercel** (gratuit) — le fichier **`vercel.json`** (déjà écrit) fait la même chose.
- [ ] **Brancher votre nom de domaine** via l'hébergeur (le fichier `CNAME` a été retiré
  du dépôt : ajoutez-le seulement si vous passez par GitHub Pages avec un domaine perso).
- [ ] **Reporter le nom de l'hébergeur** dans `mentions-legales.html` (section 1).
- [ ] **Renseigner l'adresse du site en ligne** dans `README.md` (ligne « Site en ligne »).
- [ ] **Tester sur téléphone** : menu, formulaires, galerie, et « Ajouter à l'écran
  d'accueil » (l'icône et les couleurs sont prévues par `manifest.json`).
=======
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
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

---

## 6. Entretien régulier (après la mise en ligne)

- [ ] **Publier les actualités** au fil de l'eau (`actualites.html` + un fichier
<<<<<<< HEAD
  `article-….html` par article, en copiant un existant) — et ajouter l'article
  au `sitemap.xml`.
- [ ] **Enrichir la bibliothèque** (`ressources.js`, liste `LIB`).
=======
  `article-….html` par article, en copiant un existant).
- [ ] **Enrichir la bibliothèque** (`ressources.html`, dans la liste `LIB`).
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7
- [ ] **Relever les candidatures** : boîte Formspree, ou espace coordinateur
  Supabase (`admin/`).
- [ ] **Exporter les candidatures Formspree** avant 30 jours (l'archive gratuite
  ne garde que 30 jours).
- [ ] **Surveiller le quota** (50 envois/mois sur Formspree gratuit).
<<<<<<< HEAD
- [ ] **Revérifier les liens externes** une à deux fois par an : un domaine qui expire
  peut être racheté par un site de spam (c'est déjà arrivé une fois — voir
  `CORRECTIONS.md`, entrée du 2026-07-27).
=======
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

---

## 7. Ajouter vos propres contenus (PDF, ressources, newsletter)

> Sur un site statique, **pas de bouton « téléverser »** : on dépose le fichier
> dans le dossier du site, puis on ajoute une ligne qui pointe dessus.
<<<<<<< HEAD
> ⚠️ La bibliothèque se modifie dans **`ressources.js`** (le fichier `.js`, pas le `.html`).
=======
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

### Ajouter un document PDF à la bibliothèque

- [ ] Déposez le PDF dans `assets/docs/` (nom court, **sans espaces ni
  accents**, ex. `annales-2024.pdf`).
<<<<<<< HEAD
- [ ] Ouvrez **`ressources.js`**, repérez la liste `LIB = [` (ligne 15).
- [ ] Copiez une entrée existante de type `doc` et adaptez-la :
  ```js
  {type:"doc", cat:"Annales & concours", niveau:"Toutes années",
   title:"Annales 2024 — Maths", author:"RACP-IMSP · PDF", isNew:true,
   desc:"Sujets et corrigés du concours 2024.", url:"assets/docs/annales-2024.pdf"},
  ```
- [ ] **3 champs obligatoires**, sinon les filtres ne trouvent pas la ressource :
  - `type` : `"livre"` · `"video"` · `"doc"` ;
  - `cat` : **exactement** l'une des 5 catégories — Mathématiques · Physique & sciences ·
    Annales & concours · Méthode & orientation · Documents officiels ;
  - `niveau` : **exactement** `"1re année"` · `"2e année"` · `"3e année"` ·
    `"Toutes années"` *(champ ajouté avec le filtre par année — ne l'oubliez pas)*.
- [ ] Options : `featured:true` (→ « Sélection de l'équipe »), `isNew:true`
  (→ badge « Nouveau » et étagère « Nouveautés »), `cover:"…"` (image de couverture),
  `isbn:"…"` (pour les livres).
- [ ] ⚠️ **En posant `isNew:true`, retirez-le des ressources du lot précédent** — sinon
  l'étagère « Nouveautés » finit par contenir tout le catalogue (c'est arrivé : 39 entrées
  sur 54 en portaient le badge, nettoyé le 31/07).
- [ ] 💡 Une ressource **gratuite** est comptée automatiquement dans « En accès libre » :
  le calcul écarte seulement les liens vers `dunod.com` et les entrées `soon:true`.
- [ ] Fini quand : la carte apparaît dans le catalogue et le PDF s'ouvre au clic.

### ⚖️ Héberger un document dont vous n'êtes pas l'auteur — à lire avant

> Un document **gratuit n'est pas forcément republiable**. « Téléchargeable
> librement » veut souvent dire « pour votre usage personnel », pas « vous pouvez
> en mettre une copie sur votre site ». Vérifiez toujours la licence à la source.

- [ ] **Licences qui autorisent la copie sur le site** : `CC BY`, `CC BY-SA`,
  `CC BY-NC`, `CC BY-NC-SA`, `CC BY-NC-ND` (le « NC » ne gêne pas : le site de
  l'association n'est pas commercial ; le « ND » impose juste de ne rien modifier).
- [ ] **Licences qui l'interdisent** : « tous droits réservés », « personal use
  only », et tout PDF d'éditeur commercial → **liez la page officielle**, ne copiez pas.
- [ ] **En cas de doute, ne copiez pas** : un lien fonctionne aussi bien et n'engage rien.
- [ ] **Si vous hébergez une œuvre sous Creative Commons, l'attribution est
  obligatoire.** Ajoutez le champ `credit` à l'entrée — il alimente
  automatiquement le bloc « Crédits & licences » en bas de la page Ressources :
  ```js
  credit:{auteur:"Prénom Nom (Université)", licence:"CC BY 4.0",
          licenceUrl:"https://creativecommons.org/licenses/by/4.0/deed.fr",
          source:"https://site-officiel-de-l-auteur/…",
          note:"Copie non modifiée, hébergée avec l'accord explicite de l'auteur."},
  ```
  Sans ce champ, l'attribution exigée par la licence manquerait.
- [ ] **Surveillez le poids.** Le site fait aujourd'hui **30 Mo** (dont 24 Mo pour le
  seul manuel d'Erickson). GitHub Pages tolère 1 Go et refuse tout fichier de plus
  de 100 Mo. Au-delà de ~30-40 Mo par document, **préférez le lien** : c'est aussi
  plus confortable pour un étudiant en connexion mobile.
- [ ] **Exemple déjà en place** : *Algorithms* de Jeff Erickson (CC BY 4.0, 24 Mo).
  Les 5 manuels OpenStax, eux, ont été **volontairement laissés en lien** (50 à 78 Mo
  pièce, soit 310 Mo au total) — voir `CORRECTIONS.md` du 31/07 pour le détail des
  licences vérifiées ressource par ressource.

### Activer un document « Bientôt »

- [ ] Dans `ressources.js`, cherchez `soon:true` (4 entrées, voir section 3).
  Quand le PDF est prêt : déposez-le dans `assets/docs/`, mettez son chemin
  dans `url:""`, puis **supprimez** `soon:true`.

### Ajouter une vidéo

- [ ] Même principe, entrée de type `video`. Pour une lecture **intégrée** au
  site, renseignez `yt:"IDENTIFIANT"` (les 11 caractères après `watch?v=` dans
  l'adresse YouTube). Sinon laissez `yt:""` et mettez l'adresse dans `url` —
  c'est le cas des 21 vidéos actuelles (ce sont des chaînes, pas des vidéos uniques).
=======
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
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

### Conseils fichiers

- [ ] Gardez les PDF raisonnables (compressez au-delà de ~5–10 Mo) : les fichiers
  lourds ralentissent le site et pèsent sur l'hébergement.
- [ ] Ne renommez jamais un fichier déjà référencé sans corriger son `url`.
<<<<<<< HEAD
- [ ] Photos : les images du campus sont volumineuses (jusqu'à 550 Ko). Si vous en
  ajoutez, visez ~200-300 Ko. *(La conversion en WebP a été testée puis abandonnée —
  gain insuffisant, voir `CORRECTIONS.md`.)*
=======
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

### Newsletter : collecter ≠ envoyer

> Le site **collecte** les abonnés ; il n'**envoie pas** les e-mails. L'envoi se
> fait avec un outil d'emailing séparé.

- [ ] **Collecte** : le champ d'inscription branché sur Formspree (section 2)
  range chaque adresse dans Submissions. Exportez la liste (CSV) au moment
  d'envoyer.
- [ ] **Envoi** : créez un compte sur un outil d'emailing gratuit (ex. Brevo),
  importez vos abonnés, envoyez le numéro.
- [ ] **Le visuel de l'e-mail** : utilisez `newsletter/template-newsletter.html`.
<<<<<<< HEAD
  Dupliquez-le par numéro, remplacez les `{{CHAMPS}}` (titre, intro, articles…),
  dupliquez le bloc « ARTICLE » autant de fois que voulu, puis collez le code dans
  votre outil d'emailing. *(Le domaine et l'e-mail y sont déjà à jour ; l'année du
  copyright y est écrite en dur — pensez-y en janvier.)*
=======
  Dupliquez-le par numéro, remplacez les `{{CHAMPS}}` (titre, intro, articles…)
  et `VOTRE-DOMAINE`, dupliquez le bloc « ARTICLE » autant de fois que voulu,
  puis collez le code dans votre outil d'emailing.
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7
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
<<<<<<< HEAD
  vos pratiques réelles : qui reçoit les données, où elles sont stockées
  (Formspree ? Supabase ?), combien de temps vous les gardez.
- [ ] **Mineur·e·s** : le formulaire filleul prévoit l'autorisation parentale.
  Vérifiez votre procédure de recueil et de conservation.
- [ ] **Anti-spam** (si Supabase en production) : prévoir un captcha
  (Cloudflare Turnstile / hCaptcha) — voir la note dans `docs/supabase-schema.sql`.

---

## 9. Petites anomalies relevées à l'audit du 2026-07-31

> Aucune n'empêche la mise en ligne. À traiter quand vous aurez le temps.

- [X] **Compteur « En accès libre » corrigé** *(fait le 2026-07-31)* — le bandeau affichait
  **28** au lieu de **39**. Le calcul excluait tout ce qui est `type:"livre"`, ce qui écartait
  à tort les 11 manuels **gratuits** (OpenStax, ISLR, ESL, Hatcher, Feynman, Modern C,
  Erickson…) reclassés en « livre » le 28/07. Le test porte désormais sur le **domaine de
  l'éditeur** (`dunod.com`) et non sur le type. Vérifié dans le navigateur : **54 · 5 · 39**.
- [X] **Étagère « Nouveautés » nettoyée** *(fait le 2026-07-31)* — `isNew:true` était sur
  **39 des 54** ressources : le badge ne distinguait plus rien. Il ne reste que le **dernier
  lot ajouté** (les 10 fondamentaux 1re/2e année : OpenStax ×5, MIT OCW ×4, Khan Academy).

  - **À faire à chaque nouvel ajout** : mettez `isNew:true` sur les nouvelles entrées **et
    retirez-le des précédentes**, sinon l'étagère se remplit à nouveau.
- [ ] **`docs/Matières.txt` a disparu du dossier** mais reste suivi par Git (suppression
  non enregistrée) ; il est encore listé dans `README.md` et `CORRECTIONS.md`.
  → Soit le restaurer (`git checkout -- "docs/Matières.txt"`), soit valider sa suppression
  et retirer les deux mentions.
- [ ] **Lien Exo7 en `http://`** (`ressources.js`, l. 56) — `exo7.emath.fr` n'a pas de
  version HTTPS (testé : aucune réponse). Le lien fonctionne, mais certains navigateurs
  affichent un avertissement. À surveiller ; rien à faire pour l'instant.
- [ ] **Livres Dunod : couvertures chargées depuis dunod.com** — elles s'affichent
  aujourd'hui (testé), mais dépendent d'un site tiers. Si un jour les vignettes
  disparaissent, c'est que Dunod a changé ses adresses d'images.
=======
  vos pratiques réelles.
- [ ] **Mineur·e·s** : le formulaire filleul prévoit l'autorisation parentale.
  Vérifiez votre procédure de recueil et de conservation.
- [ ] **Anti-spam** (si Supabase en production) : prévoir un captcha
  (Cloudflare Turnstile / hCaptcha) — voir la note dans `supabase-schema.sql`.
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

---

### Priorité minimale pour ouvrir le site
<<<<<<< HEAD

Section **1** (mentions légales) + **2 (Formspree)** + **5 (hébergement)**.
La section 3 (contenus d'exemple) est très recommandée avant de communiquer l'adresse.
Le reste peut suivre au fil des semaines.
=======
Sections **1** et **2 (Formspree)** + **5 (hébergement)**. Le reste peut suivre
au fil des semaines, sans bloquer la mise en ligne.
>>>>>>> 4deba6d7825e93572eb83fb1df5b276af63ab0d7

En cas de doute sur un point précis, notez le numéro de la ligne et demandez —
on le traite ensemble.
