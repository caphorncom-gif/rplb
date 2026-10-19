# Planning éditorial — Blog RPLB Électricité

*Établi le 19 octobre 2026. Volumes : DataForSEO / Google Ads, France entière, moyenne mensuelle sur 12 mois.*

## Principes

- **Rythme : 2 articles par mois**, publiés le lundi. Tenable, et suffisant pour montrer à Google un site vivant.
- **Calé sur la saison** : chaque sujet sort 1 à 2 mois **avant** son pic de recherche, le temps que Google l'indexe.
- **Chaque article sert un service** du site (lien vers la fiche service) et cite les communes indexées (Compiègne, Creil, Senlis…) avec un lien vers leur page `/electricien/<ville>`.
- **Pas de doublon** avec l'existant : NF C 15-100, dépannage urgent, rénovation maison ancienne, domotique, borne de recharge, et la page « mise aux normes ».
- Les volumes sont **nationaux** : la part locale (Oise) est faible. L'intérêt n'est pas le trafic brut, c'est de répondre aux questions que se posent les clients avant d'appeler, et de renforcer l'autorité du site sur l'électricité dans l'Oise.
- **Écarté** : volet roulant (22 200) et éclairage extérieur (14 800) — intention d'achat de produit, résultats Google trustés par les grandes surfaces, pas un service RPLB.

## Calendrier

| Date | Article (titre de travail) | Mot-clé principal | Vol./mois | Pic | Service lié |
|---|---|---|---|---|---|
| lun. 2 nov. 2026 | Disjoncteur qui saute : les causes et quand appeler un électricien | disjoncteur qui saute | 720 | déc.–janv. | Dépannage |
| lun. 16 nov. 2026 | Alarme maison : quel prix pour une installation professionnelle ? | alarme maison prix | 1 300 | nov. | Alarme / vidéosurveillance |
| lun. 7 déc. 2026 | Tableau à fusibles : faut-il le remplacer, et quand ? | tableau électrique fusible | 880 | janv. | Rénovation |
| lun. 21 déc. 2026 | Prix d'un tableau électrique neuf : ce qui fait varier le devis | prix tableau électrique / changer tableau électrique | 1 300 + 590 | févr.–mars | Rénovation |
| lun. 4 janv. 2027 | Diagnostic électrique avant une vente ou une location : ce qu'il faut savoir | diagnostic électrique | 1 900 (+ 210 vente, 210 location) | oct.–janv. | Page mise aux normes |
| lun. 18 janv. 2027 | Normes électriques de la cuisine : prises, circuits, plan de travail | cuisine norme électrique (+ nombre de prises par pièce) | 480 + 110 | janv. | Installation neuve |
| lun. 1er févr. 2027 | Électricité dans la salle de bain : les volumes et les règles à respecter | norme salle de bain électricité | 1 300 | mars | Installation neuve / rénovation |
| lun. 15 févr. 2027 | Prise de terre : comment savoir si votre maison est bien protégée | prise de terre | 3 600 | mars | Mise aux normes |
| lun. 1er mars 2027 | Rénovation électrique : quel prix au m² dans l'Oise ? | prix rénovation électrique m2 | 170 | printemps | Rénovation |
| lun. 15 mars 2027 | Attestation Consuel : quand elle est obligatoire et comment l'obtenir | attestation consuel | 590 | stable | Installation neuve |
| lun. 5 avr. 2027 | **Mise à jour** de l'article borne : prix 2027 et prime Advenir | prix borne de recharge / prime Advenir | 590 + 1 000 | avr. | Borne de recharge |
| lun. 19 avr. 2027 | Climatisation réversible : prix d'une installation par un pro | prix installation climatisation (+ PAC air-air prix) | 6 600 + 2 900 | juin | Climatisation |
| lun. 3 mai 2027 | Parafoudre : est-il obligatoire chez vous ? | parafoudre obligatoire | 170 | août (orages) | Mise aux normes |

## Réserve (si un créneau se libère ou pour l'automne 2027)

- Coupure de courant : que faire, qui appeler (170, pic l'été) → Dépannage
- Délestage et coupures d'hiver : comment s'y préparer (1 900, très lié à l'actualité) → Dépannage
- Chauffe-eau électrique : installation et remplacement (480) → Installation
- Borne de recharge en copropriété : droit à la prise (70) → Borne

## Fabrication et mise en ligne

1. Claude rédige l'article (1 200–1 800 mots, structure H2/H3, FAQ en fin d'article, ancrage local, lien vers le service et 2–3 pages villes).
2. Validation du client sur le fond technique (prix, règles).
3. Publication : requête SQL `insert into public.articles …` à coller dans le SQL Editor Supabase (le MCP n'a pas accès au projet), puis redéploiement Vercel (les articles sont pré-rendus au build).
4. Demander l'indexation de l'URL dans Search Console.
