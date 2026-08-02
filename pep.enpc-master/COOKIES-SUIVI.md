# Cookies et mesure d'audience — état et points restants

Ce fichier remplace `POLITIQUE-COOKIES-A-VALIDER.md`, dont le contenu est
désormais appliqué. Il est exclu du build (`exclude` dans `_config.yml`) : il
n'est pas publié.

---

## Appliqué dans le code

**Dispositif technique** — Google Tag Manager (`GTM-M2WV3273`) sous Consent Mode
v2, état par défaut tout en `denied` posé avant `gtm.js`, refus réellement
effectif, retrait qui efface les cookies `_ga*` déjà déposés, bandeau sur toutes
les pages FR et EN, « Gérer mes cookies » en pied de page, ancienne balise UA
supprimée.

Fichiers : `_includes/gtm.html`, `_includes/head.html`, `js/banniere-cookies.js`,
`_includes/cookies/text.html` + `text_en.html`, `_includes/css/consent.css`,
les quatre layouts, les deux pieds de page, `_config.yml`.

**Texte de la politique** — `_includes/politique_de_cookies/index.html` et
`_includes/politique_de_cookies_en/index.html` :

1. « Comment gérer les cookies ? » — le consentement par simple navigation est
   remplacé par la description du bandeau et du retrait.
2. « Refuser un cookie d'audience » — le renvoi vers le module complémentaire
   Google est remplacé par le contrôle offert sur le site.
3. « Cookies de fonctionnement » — scindé en « Cookies strictement
   nécessaires » et « Cookies de mesure d'audience », Google Tag Manager nommé,
   « anonymes » corrigé en « pseudonymes ».
4. « Cookies tiers » — précise que les vidéos passent par
   `youtube-nocookie.com` et ne déposent rien avant lecture.

**Vidéos YouTube** — `_includes/presentation/content.html` et
`_includes/faq/content.html` basculés sur `youtube-nocookie.com`. Vérifié en
navigateur : aucune requête vers `youtube.com`, aucun cookie tiers déposé, que
le visiteur ait accepté ou non.

**Fichiers internes** — `README.md` et les notes de travail étaient copiés à la
racine du site et servis en ligne. Ajoutés à `exclude`.

---

## Points restants, hors du code

Ceux-là se règlent dans la console GTM / GA4 ou en interne.

1. **Réglage du consentement sur chaque tag GTM.** Les tags GA4 et Google Ads
   respectent automatiquement `analytics_storage` / `ad_storage`. **Tout autre
   tag** — HTML personnalisé, pixel Meta, LinkedIn Insight — l'ignore par
   défaut. Pour chacun : Paramètres du tag → Paramètres de consentement →
   « Exiger un consentement supplémentaire ». Sans ça, le tag se déclenchera
   malgré un refus et tout le dispositif est contourné.

2. **Durée de conservation dans GA4.** La politique annonce 13 mois. Par défaut
   GA4 conserve les données d'utilisateur 2 mois et le cookie `_ga` 2 ans. À
   aligner : Admin → Conservation des données → 14 mois, et durée du cookie
   réglée côté tag. Sinon le texte est faux.

3. **Coordonnées.** La politique donne « 6-8 Avenue Blaise Pascal – 77420 Champs
   sur Marne », `_config.yml` donne « 6-8 boulevard Copernic – 77455
   Marne-la-Vallée ». Les deux ne peuvent pas être justes.

---

## Deux réserves connues, non bloquantes

**Le player nocookie contacte quand même Google.** `youtube-nocookie.com`,
`i.ytimg.com` et `www.google.com` reçoivent l'IP du visiteur au chargement de
`/presentation/` et `/faq/`, même sans lecture. Aucun cookie n'est déposé, ce qui
lève le grief au titre de l'article 82, mais le contact réseau subsiste. Seule la
variante stricte — vignette cliquable qui ne charge l'iframe qu'au clic — le
supprime.

**Les deux iframes se chargent toutes les deux.** Chaque page porte un iframe
`.tiny-screen` et un `.big-screen`, l'un masqué par CSS. Un iframe en
`display: none` charge malgré tout son `src` : chaque visiteur déclenche donc
deux chargements du player, dont un invisible. Sans conséquence sur les cookies,
mais c'est de la bande passante et un contact réseau doublé. Corriger demande de
remplacer la paire par un seul iframe dimensionné en CSS.

**Polices et jQuery en CDN.** `head.html` charge Font Awesome depuis
`use.fontawesome.com`, `js.html` charge jQuery depuis `code.jquery.com`. Pas de
cookie, mais l'IP de chaque visiteur y passe. Les héberger localement — comme le
reste des polices, déjà servies depuis `/css/fonts/` — supprimerait la
dépendance.
