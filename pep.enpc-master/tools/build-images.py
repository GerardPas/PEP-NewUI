#!/usr/bin/env python3
"""Génère les dérivés d'images servis par le site.

Les fichiers d'origine dans img/ ne sont jamais modifiés : ils restent la source
de référence. Les dérivés sont écrits dans img/opt/<même sous-chemin>/ avec un
suffixe de largeur, en JPEG (repli universel) et en WebP (~30 % plus léger).

Pourquoi un script commité plutôt qu'un plugin Jekyll : les plugins de
redimensionnement (jekyll_picture_tag, jekyll-resize) réclament libvips sur la
machine de build. Ici les dérivés sont versionnés, donc le déploiement n'a
besoin de rien d'autre que Jekyll.

    python3 tools/build-images.py            # ne régénère que ce qui manque
    python3 tools/build-images.py --force    # tout régénérer

Les largeurs sont choisies d'après la taille d'affichage réelle, relevée dans
les feuilles de style : une photo d'en-tête occupe la pleine largeur sur une
bande de 300 à 420 px de haut, une vignette d'article environ 380 px, un
portrait d'équipe un cercle de 220 px.
"""

import os
import sys
from PIL import Image

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SORTIE = "img/opt"
QUALITE_JPEG = 78
QUALITE_WEBP = 78

# (dossier source, largeurs générées, récursif)
CIBLES = [
    ("img/headers",            [1920, 960],       False),
    ("img/competences",        [1600, 1000, 600], False),
    ("img/posts",              [1000, 500],       False),
    ("img/posts/thumbnails",   [800, 400],        False),
    ("img/equipe",             [440],             False),
    ("img/logos/clients",      [240],             False),
    ("img/partenaires",        [428],             False),
    ("img/presentation",       [800],             False),
    ("img/rapports",           [500],             False),   # couvertures affichées en 250 px
    ("img/newsletter/images",  [1920, 960],       False),
    ("mission",                [340],             False),
    ("img",                    [424],             False),   # logo-header.png et logo.png
]

EXTENSIONS = (".jpg", ".jpeg", ".png")


def derives(chemin_source, largeurs, force=False):
    """Écrit les variantes JPEG et WebP d'une image. Rend la liste des sorties."""
    rel = os.path.relpath(chemin_source, RACINE)
    dossier, fichier = os.path.split(rel)
    base = os.path.splitext(fichier)[0]
    cible_dossier = os.path.join(RACINE, SORTIE, dossier)
    os.makedirs(cible_dossier, exist_ok=True)

    # Le repli garde l'extension de la source. Convertir un PNG opaque en JPEG
    # gagnerait quelques kilo-octets, mais le chemin du dérivé ne serait plus
    # déductible du chemin source — et _includes/responsive-image.html en a besoin
    # pour construire ses URL sans pouvoir tester l'existence d'un fichier.
    est_png = fichier.lower().endswith(".png")

    with Image.open(chemin_source) as im:
        largeur_source = im.width
        produits = []

        for l in largeurs:
            # On ne fabrique jamais plus grand que l'original : agrandir
            # n'ajoute pas d'information et alourdit le fichier.
            l_effective = min(l, largeur_source)
            suffixe = "%s-%d" % (base, l)
            jpg = os.path.join(cible_dossier, suffixe + (".png" if est_png else ".jpg"))
            webp = os.path.join(cible_dossier, suffixe + ".webp")

            if not force and os.path.exists(jpg) and os.path.exists(webp):
                produits += [jpg, webp]
                continue

            copie = im.copy()
            if l_effective < largeur_source:
                hauteur = round(copie.height * l_effective / largeur_source)
                copie = copie.resize((l_effective, hauteur), Image.LANCZOS)

            if est_png:
                # RGBA préservé : plusieurs logos sont posés sur les aplats bleus.
                copie.convert("RGBA").save(jpg, "PNG", optimize=True)
            else:
                copie.convert("RGB").save(
                    jpg, "JPEG", quality=QUALITE_JPEG, optimize=True, progressive=True
                )
            copie.save(webp, "WEBP", quality=QUALITE_WEBP, method=6)
            produits += [jpg, webp]

            # Les largeurs supérieures à l'original produiraient un doublon.
            if l_effective == largeur_source:
                break

        return produits


def main():
    force = "--force" in sys.argv
    avant = apres = 0
    nb_sources = nb_sorties = 0

    for dossier, largeurs, _ in CIBLES:
        chemin = os.path.join(RACINE, dossier)
        if not os.path.isdir(chemin):
            continue
        for fichier in sorted(os.listdir(chemin)):
            src = os.path.join(chemin, fichier)
            if not os.path.isfile(src) or not fichier.lower().endswith(EXTENSIONS):
                continue
            try:
                produits = derives(src, largeurs, force)
            except Exception as e:                      # image illisible, on continue
                print("  ignorée : %s (%s)" % (fichier, e))
                continue
            avant += os.path.getsize(src)
            nb_sources += 1
            nb_sorties += len(produits)
            # Le navigateur ne télécharge qu'une variante : on compte la plus
            # grande en WebP pour estimer le poids réellement servi.
            webps = [p for p in produits if p.endswith(".webp")]
            if webps:
                apres += max(os.path.getsize(p) for p in webps)

    print("%d sources -> %d dérivés" % (nb_sources, nb_sorties))
    print("sources : %.1f Mo" % (avant / 1048576))
    print("plus grande variante WebP de chaque image : %.1f Mo (-%.0f %%)"
          % (apres / 1048576, 100 * (1 - apres / avant) if avant else 0))


if __name__ == "__main__":
    main()
