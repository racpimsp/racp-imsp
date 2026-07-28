# Site RACP-IMSP — Réseau Alumni des Classes Préparatoires de l'IMSP

Site web du réseau alumni de l'IMSP (Bénin) : vitrine, programme de mentorat
(présentation + formulaires de candidature parrain/marraine et filleul·e), bibliothèque
de ressources et pages légales.

**HTML / CSS / JavaScript statique** — aucun build, aucune dépendance à installer.
Déployable **tel quel** sur GitHub Pages, Netlify, Vercel ou tout hébergeur de fichiers.

> 🌐 **Site en ligne** — _à renseigner au déploiement_ (prévu : https://racp-imsp.org).

![Aperçu de la page d'accueil du site RACP-IMSP](docs/apercu-accueil.jpg)

**Sections du site :** Accueil · Le réseau · Activités · Parcours · Mentorat ·
Ressources (bibliothèque filtrable) · Actualités · Adhésion · Contact — plus un espace
coordinateur (`admin/`, phase 2).

## Lancer en local

Servez le dossier avec un petit serveur (l'ouverture directe du `.html` bloque certaines
fonctions comme l'envoi des formulaires) :

```bash
python -m http.server 8000
# puis ouvrez http://localhost:8000
```

## Déployer

Le site se déploie **tel quel** (les fichiers sont à la racine) :

- **GitHub Pages** — Settings → Pages → branche `main`, dossier `/ (root)`. Le fichier
  `.nojekyll` est déjà présent.
- **Netlify / Vercel / Cloudflare Pages** — glisser-déposer le dossier, ou connecter le dépôt.

Après déploiement, renseignez votre domaine et branchez les formulaires : voir
[`docs/CHECKLIST.md`](docs/CHECKLIST.md).

## Organisation

- **Le site** (racine) : les pages `*.html`, `styles.css`, `script.js`,
  `ressources.js` (la bibliothèque), et les dossiers `assets/` (images, logos, PDF),
  `admin/` (espace coordinateur — phase 2), `newsletter/` (gabarit e-mail).
- **Configuration** : `manifest.json`, `robots.txt`, `sitemap.xml`, `_headers`, `.nojekyll`, `vercel.json`.
- **`docs/`** : toute la documentation (voir ci-dessous).

## Documentation — dossier `docs/`

| Fichier | Contenu |
|---|---|
| [`CHECKLIST.md`](docs/CHECKLIST.md) | Mise en route pas à pas : liens, e-mail, Formspree, contenus, SEO, hébergement, ajout de ressources… |
| [`MENTORAT-SETUP.md`](docs/MENTORAT-SETUP.md) | Brancher les formulaires de candidature (Formspree ou Supabase) |
| [`SECURITE.md`](docs/SECURITE.md) | Durcissement de sécurité (CSP, honeypot anti-spam, en-têtes serveur) |
| [`CORRECTIONS.md`](docs/CORRECTIONS.md) | Journal des corrections et améliorations |
| `supabase-schema.sql` | Schéma de la base pour le back-office (phase 2) |
| `Matières.txt` | Liste des matières de l'IMSP (référence pour la bibliothèque) |

## Personnaliser (les points les plus courants)

- **Chiffres d'accueil** : attribut `data-count` dans `index.html` (alumni, promotions…).
- **Couleurs / polices** : variables CSS en haut de `styles.css` (`--navy`, `--cyan`, `--orange`).
- **Ajouter une ressource** : liste `LIB` en haut de `ressources.js` (procédure détaillée dans `docs/CHECKLIST.md`).
- **Actualités / portraits d'alumni** : dupliquer un bloc existant dans `actualites.html` / `parcours.html`.

> **Sécurité & droit à l'image.** Le durcissement est documenté dans
> [`docs/SECURITE.md`](docs/SECURITE.md). Les photos comportant des personnes sont utilisées
> floutées, en arrière-plan.
