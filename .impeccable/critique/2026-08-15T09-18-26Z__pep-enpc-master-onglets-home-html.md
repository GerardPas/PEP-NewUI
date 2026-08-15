---
target: page d'accueil FR (Onglets/home.html)
total_score: 20
max_score: 32
na_heuristics: 7,9
p0_count: 2
p1_count: 2
timestamp: 2026-08-15T09-18-26Z
slug: pep-enpc-master-onglets-home-html
---
Method: dual-agent (A: revue de design isolée · B: preuves déterministes isolées) — aucune des deux n'a vu la sortie de l'autre avant la synthèse.

Cible : `pep.enpc-master/Onglets/home.html` — page d'accueil FR de Ponts Études Projets, Junior-Entreprise de l'École des Ponts. Mode **Persuade**. Rendu vérifié en 1440×900 et 390×844 sur le build frais de `_site/`.

## Design Health Score

| # | Heuristique | Score | Problème clé |
|---|---|---|---|
| 1 | Visibilité de l'état système | 3 | `pep-current` marque la page active, mais aucun repère de section sur 5523 px ; le carrousel clients ne donne ni position ni progression |
| 2 | Adéquation au monde réel | 3 | « L30 » non explicité dans un titre d'actualité ; « 100k de chiffre d'affaires » sans symbole € ni période |
| 3 | Contrôle et liberté | 2 | `.customer-logos.slider` en autoplay sans commande de pause (échec WCAG 2.2.2) ; zoom `pep-drift` 18 s non sollicité |
| 4 | Cohérence et standards | 2 | `<main>` totalement absent ; `.pep-step-title` (`<h3>`) à 13 px sous son `<p>` à 13,5 px ; `.pep-partners` en `padding: 0` face à 92–104 px sur ses sept voisines |
| 5 | Prévention des erreurs | 3 | « Voir notre plaquette » ouvre un PDF sans indication de format ni de poids ; `mailto:` sans repli |
| 6 | Reconnaissance plutôt que rappel | 2 | Les cartes services cachent six prestations derrière un survol sans aucune affordance |
| 7 | Flexibilité et efficacité | n/a | Landing Persuade à parcours unique : aucune tâche répétée à accélérer |
| 8 | Esthétique et minimalisme | 3 | Propre, mais génériquement propre — 5523 px desktop / 8257 px mobile pour quatre noms de services, cinq étapes et trois billets périmés |
| 9 | Récupération d'erreur | n/a | Aucun formulaire, aucune saisie, aucun état d'échec propre à cette page |
| 10 | Aide et documentation | 2 | La page ne répond à aucune des trois questions d'un acheteur : prix, délai, responsabilité juridique |
| | **Total** | **20 / 32** | **Acceptable (62,5 %)** |

Heuristiques en `n/a` : **#7** (aucune tâche d'efficacité sur une page marketing linéaire) et **#9** (aucun état d'erreur propre à la surface). **#10 n'est délibérément pas en `n/a`** : une page Persuade pour une Junior-Entreprise a un vrai devoir documentaire (prix, délai, encadrement, garantie) et ne s'en acquitte quasiment pas.

Charge cognitive : **5 échecs sur 8 → ÉLEVÉE.** Échecs : focus unique (huit sections de poids identique), découpage ≤4 (processus 5 étapes, menu déroulant 5 items, révélation 6 prestations, carrousel 18 logos), hiérarchie visuelle (tout le texte calcule à `rgb(42,56,71)`), choix minimaux (9 choix interactifs dans le premier écran, 73 liens sur la page), mémoire de travail (comparer deux domaines de service exige de retenir six prestations pendant qu'on en survole un autre). Réussites : groupement, une chose à la fois, divulgation progressive.

## Verdict de spécificité

**Interchangeable avec n'importe quel acteur de la catégorie, avec exactement deux moments auteurs et un système auteur.**

**Évaluation design.** Change le logo, les quatre photos de services et le texte français, et cette page sort demain pour un SaaS de taille moyenne, une régie publicitaire ou une ESN lyonnaise. La composition est le template Bootstrap-marketing de 2016 dans sa forme la plus pure : héros photo pleine largeur à dégradé sombre et texte centré empilé → bandeau de quatre compteurs → « qui sommes-nous » en deux colonnes → grille 2×2 de cartes-images avec révélation au survol → rail de processus numéroté → carrousel de logos en autoplay → grille d'actualités en trois → logos partenaires → CTA de clôture sur photo → pied de page mince. Huit sections, toutes bâties sur le même `.pep-section-head` (centré, majuscules, 36 px Montserrat 700, 52 px de marge basse), toutes en 92–104 px de padding, toutes en alternance blanc / `#f4f7fb`. Un zèbre parfait de huit bandes de poids égal, dont aucune n'a le droit d'être plus importante qu'une autre. La page ne hausse jamais la voix.

Rien dans la composition ne sait qu'il s'agit d'une Junior-Entreprise **étudiante**, et rien ne sait que l'école a 278 ans. Ce patrimoine — le seul actif qu'aucun concurrent ne peut copier — affleure sous la forme d'un logotype Times New Roman de 84 px et d'un sous-titre en Droid Serif italique. Times New Roman porte ici toute la charge d'« institution », et c'est la police qu'on obtient quand on n'en choisit pas. Les photos de services sont du stock : panneaux solaires, ordinateur portable avec du code, terminal de trading, viaduc de Millau. Le rail de processus est pire : l'étape 4 « Suivi » est illustrée par un check à deux mains de banque d'images, l'étape 5 « Livrable » par une poignée de main — sur une page dont tout l'enjeu persuasif est « confiez un contrat payant à des jeunes de vingt ans ». L'étape 3 est une vraie photo de vrais étudiants PEP, donc la rangée est visuellement incohérente en plus d'être générique.

Trois choses sont réellement auteurs : le système de couleur de `_data/template.yml` (une teinte 212°, une saturation, variation en luminance seule, chaque jeton annoté de son ratio mesuré) ; `home.css:632–695`, où la révélation au survol se dégrade pour le tactile avec justification écrite ; et le CTA de clôture sur la photo réelle de l'équipe. Le drame est arithmétique : ce seul moment spécifique se trouve à y≈5000 sur 5523 en desktop et y≈7588 sur 8257 en mobile — **91 % de profondeur de défilement**. Tout ce qu'un inconnu voit d'abord est interchangeable ; la seule chose qui ne l'est pas est placée là où seul un visiteur déjà convaincu arrivera.

**Analyse déterministe — avertissement méthodologique.** Le scan CLI du détecteur retourne 0 finding (code 0) sur l'arbre source comme sur la page buildée, et **ce résultat ne veut rien dire** : les sources sont des partiels Liquid sans balise `<link>` (aucune CSS chargée), et la page buildée référence ses styles en chemins absolus racine non résolvables depuis le disque. Test de contrôle sur un fichier synthétique : le détecteur déclenche bien `overused-font` et `bounce-easing` — l'outil fonctionne, il n'avait rien à voir. Le mode URL a échoué (`puppeteer is required for URL scanning`, non installé). Le moteur de règles a donc tourné **dans la page**, CSS entièrement résolue, par injection Playwright : **11 findings desktop, 17 mobile.**

| Règle | Occ. | Où |
|---|---|---|
| `all-caps-body` | 4 | `span.pep-service-title` ; `time.pep-news-date` ×3 |
| `body-text-viewport-edge` | 6 (mobile seul) | `div.pep-about-text > p` ×2 (408 et 409 car.), `p.pep-news-desc` ×3, `p.pep-cta-say` — gouttière 15 px |
| `monotonous-spacing` | 1 | `body` — ~4px utilisé 12/14 fois (86 %) |
| `low-contrast` | 3 | héros — **faux positifs** |
| `tiny-text` | 3 | `<title>`, `<script>`, `<style>`, tous `isHidden` — **bruit** |
| `overused-font` | 1 | Montserrat 95 % — jugement, pas défaut |

`monotonous-spacing` et `all-caps-body` corroborent mécaniquement ce que la revue a vu à l'œil.

**Ce que le navigateur a vu que la revue a manqué :** `<main>` totalement absent (0 occurrence) — seul vrai défaut de repères, le reste est propre (un seul `h1`, aucun niveau sauté, 17 titres, `<nav>`/`<header>`/`<footer>` présents, deux `<aside>` correctement `aria-label`és). `a.pep-link-arrow` n'a **aucun indicateur de focus** sur ses 4 instances (`outline: none`, pas de box-shadow, pas de bordure ; `:focus-visible` vérifié comme absent), quand les 23 autres arrêts ont bien un contour 2 px. La tabulation n°2 **perd le focus sur `document.body`** et il n'existe aucun lien d'évitement — le bandeau cookies prend le premier arrêt. **42 `<img>` sur 50 sans `width`/`height`** (risque de décalage de mise en page), alors que 0 `alt` manque et que 0 image sous la ligne de flottaison est sans `loading="lazy"`. Poids total 1,53 Mo / 57 requêtes, dont FontAwesome à 65,1 Ko — 58 % du poids des polices — en `font-display: auto`, et Glyphicons déclaré sans jamais charger.

**Faux positifs écartés.** Les 3 `low-contrast` à 1.0:1 sont du bruit : le moteur ne voit pas à travers un `background-image` et retombe sur blanc. Échantillonnage pixel réel du héros : 12,28:1 à 15,73:1. Sur les 24 paires à fond opaque, **les 24 passent AA**, pire valeur 5,73:1. Les 70 « débordements » à 390/320 px sont des internes de `slick-track` écrêtés par un ancêtre — `scrollWidth` égale `clientWidth` aux deux largeurs, aucun débordement réel. `prefers-reduced-motion` **est honoré** : trois blocs `@media` vérifiés à l'exécution, l'animation infinie `pep-cue` et le zoom `pep-drift` sont bien désactivés.

**Superpositions visuelles.** L'injection a réussi et le détecteur s'est exécuté dans la page, mais dans un navigateur headless d'agent désormais fermé : **aucune superposition n'est visible dans le navigateur de l'utilisateur**. Rendu archivé en capture. Tous les serveurs (statiques et live-server) sont arrêtés et vérifiés.

## Impression générale

Site compétent, sain et oubliable. Zéro erreur console, zéro requête en échec, contraste irréprochable, mouvement réduit respecté, plan de titres propre : la fondation technique est meilleure que celle de la plupart des sites de Junior-Entreprises. Le problème n'est pas l'exécution, c'est **l'architecture de la preuve, exactement inversée** : tout ce qui convaincrait un acheteur sceptique — missions nommées, grands clients, garantie 90 jours, visages de l'équipe — est enterré, dégradé, ou n'atteint jamais la page, tandis que les 90 premiers pour cent du défilement pourraient appartenir à n'importe qui. La plus grande opportunité : **remonter la preuve**. Les éléments existent déjà dans le dépôt, rangés au mauvais endroit.

## Ce qui fonctionne

**1. Le système de couleur de `_data/template.yml`.** Une teinte, une saturation, variation en luminance seule, deux accents non interchangeables, chaque jeton annoté de son ratio mesuré — quatre vérifiés indépendamment, exacts à 0,05. Le navigateur le confirme : 24 paires opaques, 24 passages AA. C'est pourquoi la page n'a jamais l'air bon marché, même là où elle a l'air générique.

**2. `home.css:632–695`.** La révélation au survol se dégrade correctement et le code explique pourquoi : repli en `grid-template-rows: 0fr` sous `(hover: hover) and (pointer: fine) and (min-width: 768px)`, ouverture au repos et retour dans le flux sous `(max-width: 767px), (hover: none)`, voile retuné pour tenir le contraste sur toute la carte. Trois décisions imbriquées, chacune motivée.

**3. Le bandeau CTA de clôture.** Le seul endroit où la page montre ses propres gens : photo réelle de l'équipe, titre interrogatif, une phrase qui nomme la suite, deux actions à deux niveaux d'engagement. Il convertit parce que la photo répond à la question tue — qui sont ces gens — que les 5000 px précédents évitaient.

## Problèmes prioritaires

### [P0] Le héros énonce une identité, pas une offre

**Pourquoi ça compte.** `_includes/home/hero.html:6` met « Ponts Études Projets » en `<h1>` à 84 px : le premier élément lu d'une surface Persuade se dépense sur un nom que seuls ceux qui connaissent déjà PEP décodent. La proposition arrive en quatrième position, à 16,5 px. Pire : `.pep-hero-kicker` (11 px, `.26em`, bleu secondaire) est entièrement stylé à `home.css:236` et n'est utilisé par aucun markup — l'emplacement de la ligne manquante a été dessiné puis laissé vide.

**Correction.** Ajouter le kicker au-dessus du `<h1>` avec la caution institutionnelle (« Junior-Entreprise de l'École des Ponts ParisTech · depuis 1979 »), réécrire le `<h1>` comme l'offre, rétrograder le nom en `.pep-hero-lead`. Zéro CSS nouvelle : les deux classes existent. Descendre `.pep-hero-title` de 84 à ~64 px pour qu'un `<h1>` long ne passe pas sur trois lignes à 390 px.

**Commande suggérée :** `/impeccable clarify`

### [P0] L'architecture de la preuve est inversée

**Pourquoi ça compte.** Trois défaillances se composent. (a) Le mur de logos est sur minuterie : `clients.html` contient 18 clients dont SNCF, Alstom, Safran, BNP, Sony, HSBC, Carrefour, Bureau Veritas ; le carrousel en montre ~6 non triés, en JPEG bruts à poids optique mélangé avec des boîtes blanches visibles — et sans commande de pause (WCAG 2.2.2). (b) Les études de cas existent et ne remontent jamais : `_data/services.yml` contient des missions nommées (extraction de données sur scans de pièces d'identité, transit de camions en mer du Nord, mapping de supply chain, modèle d'émission de CO₂) que l'accueil ne montre pas. (c) La garantie de 90 jours est la fin de `processus.html:46`, à 13,5 px, dans la cinquième de cinq étapes.

**Correction.** Remplacer le carrousel `slick` par une grille CSS statique de 12 logos, les plus forts en premier, normalisés (`filter: grayscale(1) opacity(.62)`, `height: 34px; width: auto; object-fit: contain`, `align-items: center`) — cela supprime aussi l'échec WCAG 2.2.2 et une dépendance jQuery/slick. Ajouter un bloc `pep-cases` entre `services.html` et `processus.html` alimenté par trois titres de `services.yml`. Sortir « Garantie 90 jours » de l'étape 5 pour en faire un cinquième chiffre dans `figures.html` ou un badge sous le rail.

**Commande suggérée :** `/impeccable layout`

### [P1] Hiérarchie typographique plate — `muted` défini, documenté, utilisé zéro fois

**Pourquoi ça compte.** Tout texte calcule à `rgb(42,56,71)` : h2, `.pep-stat-label`, `.pep-step-title`, `.pep-step-text`, `.pep-news-title`, `.pep-news-desc`, `.pep-news-date`, corps. `template.yml:17` définit `muted: 5d6e82` à 5,2:1 documenté (mesuré 5,23:1 sur blanc) et `grep -c "color.muted" home.css` retourne 0. Sans palier d'encre, la hiérarchie repose sur la taille — tassée dans une bande de 3,5 px (11 / 13 / 13,5 / 14 / 15,5 px) qui se lit comme une seule texture. Le détecteur le confirme : `monotonous-spacing`, ~4px utilisé 86 % du temps. Inversion franche : `.pep-step-title` est un `<h3>` à 13 px sous son propre `<p>` à 13,5 px.

**Correction.** Appliquer `muted` à `.pep-step-text`, `.pep-news-desc`, `.pep-stat-label`, `.pep-news-date` sur fonds blancs (sur `#f4f7fb` le ratio tombe à 4,86:1 — assombrir à `556a80` pour tenir 5,2:1 sur les deux fonds). Monter `.pep-step-title` à 16 px, descendre `.pep-step-text` à 13 px. Passer `.pep-news-date` à 11 px `muted` avec `letter-spacing: .08em`, ce qui règle aussi deux des quatre `all-caps-body`.

**Commande suggérée :** `/impeccable typeset`

### [P1] « Dernières actualités » dont la plus récente a dix-sept mois

**Pourquoi ça compte.** `actualites.html:19–23` affiche `post.date` en évidence sous un titre qui promet la fraîcheur. Les trois billets datent du 18 mars 2025, du 26 février 2024 et du 7 décembre 2023 ; nous sommes en août 2026. Pour un acheteur, un bloc « dernières actualités » dont la dernière actualité le précède d'un an et demi signale une structure peut-être en sommeil — exactement la peur qu'une organisation étudiante doit désamorcer. Le contenu est une excellente preuve (partenariat Bain, top 30, vraie photo d'équipe) ; c'est le cadrage qui le détruit.

**Correction.** Conditionner la section sur la fraîcheur : au-delà de ~12 mois, afficher les trois mêmes cartes sous un titre qui ne promet pas la récence (« Ils parlent de nous ») avec `<time>` supprimé. Les billets redeviennent des références intemporelles. Le markup ne devrait pas être ce qui casse quand les billets tardent.

**Commande suggérée :** `/impeccable harden`

### [P2] Le bandeau cookies s'approprie la première impression

**Pourquoi ça compte.** Sur le premier écran mobile, 830 des 1690 pixels physiques sont la carte de consentement, avec une grande illustration de cookie posée directement sur « PONTS ÉTUDES PROJETS ». Les deux CTA du héros sont entièrement masqués. Le texte de consentement est remarquablement honnête (il explique que refuser ne coûte rien et où revenir sur son choix) mais il est servi à l'échelle d'un héros : c'est le flux de consentement, non l'organisation, qui devient la première déclaration de la marque. Il prend aussi le premier arrêt de tabulation avant que le focus se perde sur `document.body`.

**Correction.** Dans `consent.css`, passer `#banniere-cookies` en barre ancrée en bas sous `(max-width: 767px)` (`position: fixed; bottom: 0; left: 0; right: 0; max-height: 45vh; overflow-y: auto`) et retirer le voile plein écran en mobile. Réduire l'illustration à ~64 px, en ligne à côté du titre. Garder Accepter/Refuser à poids visuel égal — cette partie est correcte.

**Commande suggérée :** `/impeccable quieter`

### [P2] Trous d'accessibilité que rien ne signale à l'écran

**Pourquoi ça compte.** `<main>` est absent : aucun moyen de sauter au contenu principal, et aucun lien d'évitement non plus. `a.pep-link-arrow` n'a aucun indicateur de focus sur ses 4 instances — un utilisateur clavier les traverse à l'aveugle. `button.navbar-toggle` fait 44×34 et les icônes sociales du pied de page 40×40, sous le minimum de 44×44 (les liens texte en ligne sous 44 px sont exemptés par WCAG 2.5.8 — ce n'est pas un défaut). 42 images sur 50 sans `width`/`height` font sauter la mise en page au chargement, précisément sur la rangée de logos censée rassurer.

**Correction.** Envelopper le contenu de `_layouts/default.html` dans `<main id="contenu">` et ajouter un lien d'évitement en premier enfant du `<body>`. Donner à `.pep-link-arrow` un `:focus-visible { outline: 2px solid; outline-offset: 3px }` avec le jeton `accent`. Monter `.navbar-toggle` à `min-height: 44px` et les icônes sociales à 44×44 par padding. Ajouter `width`/`height` aux 42 `<img>`.

**Commande suggérée :** `/impeccable audit`

## Signaux d'alarme par persona

**Jordan (première visite, venu d'une recherche « bureau d'études transition écologique »).** Referme le bandeau cookies, lit « PONTS ÉTUDES PROJETS » à 84 px sans savoir s'il s'agit d'une école, d'un laboratoire ou d'un cabinet — la réponse est en quatrième ligne à 16,5 px. Descend jusqu'à NOS SERVICES, voit quatre photos et quatre noms de catégories, ne survole rien (aucune affordance sur `.pep-service`), conclut que le site n'a pas de détail, repart. N'apprendra jamais que PEP a fait du mapping de supply chain ou de la modélisation CO₂ : ces titres vivent dans `_data/services.yml` et ne sont jamais rendus.

**Riley (teste les limites, tabule, lit les petites lignes).** Deuxième arrêt de tabulation : focus perdu sur `document.body`, aucun lien d'évitement, neuf arrêts avant le moindre contenu. Les quatre `.pep-link-arrow` n'ont aucun anneau de focus. Le carrousel tourne sur minuterie sans pause ni accès clavier aux logos passés. Cherche l'identité juridique : copyright, un « Mentions légales » qui pointe vers une ancre sur la page contact plutôt qu'une page, ni adresse postale, ni SIRET, ni déclaration d'association, ni téléphone. Découvre que `_includes/home/header.html` — code mort — pointe encore vers `plaquette_027.pdf` quand le héros sert `Plaquette_PEP_028.pdf`. Repère que `.pep-news-media` n'a aucun repli sans `post.thumbnail` : un billet sans vignette effondre la grille en trois.

**Casey (distrait, iPhone, deux minutes).** Premier écran à 49 % bandeau cookies. Puis 8257 px, soit 9,8 hauteurs d'écran, dont trois pour « Le déroulement d'une mission » : cinq étapes à ~530 px, une phrase de généralités chacune, illustrées par un check de banque d'images. Croise six paragraphes qui butent contre les bords (gouttière 15 px, relevé par le détecteur en mobile uniquement, dont deux blocs de plus de 400 caractères). Son pouce abandonne vers les logos clients : il n'atteint jamais la photo d'équipe, ni « Un projet en tête ? », ni l'adresse e-mail.

**Sylvie Marchand (responsable achats & innovation en ETI industrielle, compare PEP à deux bureaux d'études établis pour une étude à 40 k€ — persona spécifique au projet).** Cinq échecs nommables en réunion. (1) Capacité : « plus de 100k de chiffre d'affaires » sans devise ni période se lit, face à un brief à 40 k€, comme un risque de concentration, pas comme une référence. (2) Responsabilité : treize mots dans `processus.html:38` (« Un chef de projet accompagne les étudiants »), sans nom, sans rôle défini, sans voie d'escalade, sans aperçu de `/equipe/` sur l'accueil. (3) Certification : le logo CNJE en marque grise de 160 px, et les mots « label », « audit », « CNJE » nulle part dans le texte — un statut audité à vrai poids en achats, jamais revendiqué en mots citables dans un dossier. (4) Identité légale : son référencement fournisseur exige SIRET, adresse et signataire ; le pied de page offre une adresse e-mail. (5) Vitalité : « Dernières actualités » datées de mars 2025 à décembre 2023, en août 2026. Elle annote « structure possiblement en sommeil — à vérifier » et appelle les cabinets établis en premier. Ce qui l'aurait fait basculer — la garantie 90 jours — était les huit derniers mots de la cinquième étape, à 13,5 px.

## Observations mineures

- Trois surfaces mortes : `_includes/home/competences.html` (94 lignes), `home/header.html` (13), `home/documents.html` (9), incluses par rien (vérifié par grep). `header.html` porte en plus un `style="font-family: Times…"` en ligne et le lien obsolète `plaquette_027.pdf`.
- Deux classes stylées et inutilisées : `.pep-hero-kicker` (`home.css:236`), `.pep-section-sub` (`home.css:45`).
- Famille typographique fantôme : `body` résout en `"Roboto Slab", Helvetica…` depuis `agency.css`, mais tout élément visible surcharge en Montserrat ou Droid Serif. Quatre familles déclarées, trois rendues.
- FontAwesome 65,1 Ko (58 % du poids des polices) en `font-display: auto` ; Glyphicons déclaré sans jamais charger. Page totale 1,53 Mo / 57 requêtes, dont 939,7 Ko d'images.
- `100k` sans symbole € ni période (`figures.html:21`).
- `.pep-partners` en `padding: 0` quand ses sept sœurs portent 92–104 px.
- Le duo de boutons du CTA mélange les casses : `DEMANDER UN DEVIS` (majuscules, `.08em`) contre `contact@junior-pep.fr` (minuscules), dans des boutons de forme identique.
- Les libellés de chiffres passent sur 3 / 1 / 2 / 1 lignes : lignes de base en dents de scie, séparateurs 1 px centrés sur rien.
- La rangée de processus mélange photo réelle et stock au sein d'une même série de cinq.
- Aucun être humain nommé sur la page. `/equipe/` existe dans le menu et l'accueil ne l'aperçoit jamais. Aucun témoignage, aucune citation client.
- À ne pas casser : 0 erreur console, 0 requête en échec, 0 débordement horizontal à 390 et 320 px, 0 `alt` manquant, `prefers-reduced-motion` honoré et vérifié à l'exécution, un seul `h1`, aucun niveau de titre sauté.

## Questions à se poser

1. Les quatre cartes de services cachent six prestations chacune derrière un survol sans la moindre affordance. Quel pourcentage de visiteurs desktop découvre ce contenu — et ce chiffre justifie-t-il de l'avoir conçu, plutôt que d'imprimer les listes ?
2. `_data/services.yml` contient des missions passées nommées et précises, chacune plus persuasive que n'importe quelle phrase de l'accueil. Pourquoi ne vivent-elles que sur les pages internes ?
3. Le levier de réassurance le plus fort — une garantie de 90 jours — est les huit derniers mots de la cinquième étape sur cinq, à 13,5 px. Si un prospect ne lisait qu'une phrase, celle-là est-elle atteignable ?
4. « Plus de 100k de chiffre d'affaires » est présenté comme une fierté ; pour un acheteur qui pèse 40 k€, cela se lit comme un avertissement de concentration. Quel nombre préférerais-tu qu'il emporte ?
