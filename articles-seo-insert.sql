-- ============================================
-- INSERTION DE 5 ARTICLES SEO OPTIMISÉS
-- Pour RPLB Électricité
-- ============================================
-- 
-- Exécutez ce script dans Supabase → SQL Editor
-- Les articles seront automatiquement publiés

-- Article 1 : Normes NF C 15-100
INSERT INTO articles (slug, title, excerpt, content, category, tags, author, published_at, seo_title, seo_description, is_published) VALUES (
  'installation-electrique-normes-nf-c-15-100',
  'Installation Électrique : Les Normes NF C 15-100 à Connaître en 2024',
  'Guide complet sur les normes électriques NF C 15-100. Obligations légales, points de contrôle et certification pour votre installation électrique à Longueil-Sainte-Marie et dans l''Oise.',
  '# Installation Électrique : Les Normes NF C 15-100 à Connaître en 2024

En tant qu''électricien professionnel à Longueil-Sainte-Marie, nous intervenons régulièrement pour des installations électriques neuves ou des rénovations. La norme NF C 15-100 est la référence incontournable en France pour toutes les installations électriques basse tension. Voici ce que vous devez savoir.

## Qu''est-ce que la Norme NF C 15-100 ?

La norme NF C 15-100 définit les règles de conception, de réalisation et de contrôle des installations électriques basse tension (jusqu''à 1000 V en courant alternatif). Elle s''applique à tous les bâtiments résidentiels et tertiaires.

## Les Points Clés de la Norme

### 1. Le Tableau Électrique

Votre tableau électrique doit être installé dans un endroit facilement accessible, à l''abri de l''humidité. Il doit contenir :
- Un disjoncteur de branchement (généralement fourni par Enedis)
- Des disjoncteurs différentiels (30 mA) pour la protection des personnes
- Des disjoncteurs divisionnaires pour chaque circuit

### 2. Les Prises de Courant

La norme impose un nombre minimum de prises par pièce :
- Salon : minimum 5 prises (dont 4 prises 16A)
- Chambre : minimum 3 prises (dont 3 prises 16A)
- Cuisine : minimum 6 prises (dont 4 prises 16A ou 20A)
- Salle de bain : prises spéciales avec transformateur d''isolement

### 3. L''Éclairage

Chaque pièce doit avoir au moins un point d''éclairage, commandé par un interrupteur situé à l''entrée.

### 4. La Mise à la Terre

Toute installation doit être reliée à la terre. La résistance de la prise de terre doit être inférieure à 100 ohms pour les habitations.

## Quand Faire Contrôler son Installation ?

La norme NF C 15-100 impose un contrôle de conformité dans plusieurs cas :
- Installation neuve ou rénovation complète
- Ajout d''un circuit de plus de 8 points
- Modification du tableau électrique

Ce contrôle est effectué par un organisme certifié (Consuel) qui délivre une attestation de conformité.

## Pourquoi Faire Appel à un Professionnel Certifié ?

En tant qu''électricien Qualifelec à Longueil-Sainte-Marie, nous garantissons :
- Le respect strict de la norme NF C 15-100
- La sécurité de votre installation
- La conformité pour l''obtention de l''attestation Consuel
- L''assurance décennale pour vos travaux

## Notre Zone d''Intervention

Nous intervenons dans toute l''Oise :
- Longueil-Sainte-Marie
- Compiègne
- Verberie
- Pont-Sainte-Maxence
- Crépy-en-Valois
- Et dans un rayon de 30 km

## Conclusion

Une installation électrique conforme à la norme NF C 15-100 est essentielle pour votre sécurité et celle de votre famille. N''hésitez pas à nous contacter pour un devis gratuit et sans engagement.',
  'Réglementation',
  ARRAY['normes', 'installation électrique', 'NF C 15-100', 'sécurité', 'conformité'],
  'RPLB Électricité',
  NOW() - INTERVAL '30 days',
  'Normes Électriques NF C 15-100 | Électricien Longueil-Sainte-Marie',
  'Guide complet sur les normes électriques NF C 15-100. Installation conforme, sécurité garantie. Électricien certifié dans l''Oise. Devis gratuit.',
  true
) ON CONFLICT (slug) DO NOTHING;

-- Article 2 : Dépannage Urgent
INSERT INTO articles (slug, title, excerpt, content, category, tags, author, published_at, seo_title, seo_description, is_published) VALUES (
  'depannage-electrique-urgent-que-faire',
  'Dépannage Électrique Urgent : Que Faire en Cas de Panne ?',
  'Votre disjoncteur saute ? Panne de courant totale ? Découvrez les gestes à adopter en cas d''urgence électrique et quand faire appel à un électricien d''urgence dans l''Oise.',
  '# Dépannage Électrique Urgent : Que Faire en Cas de Panne ?

En tant qu''électricien d''urgence à Longueil-Sainte-Marie, nous recevons de nombreux appels pour des pannes électriques urgentes. Voici comment réagir en cas de problème électrique.

## Les Situations d''Urgence Électrique

### 1. Panne Totale de Courant

Si vous n''avez plus d''électricité dans toute la maison :
- Vérifiez d''abord le disjoncteur général (tableau électrique)
- Regardez si les voisins sont également en panne (problème Enedis)
- Appelez Enedis au 09 72 67 50 XX si le problème vient d''eux
- Contactez un électricien d''urgence si le problème vient de votre installation

### 2. Le Disjoncteur Sauté Sans Cesse

Si votre disjoncteur saute et ne reste pas enclenché :
- Ne forcez pas ! C''est une protection
- Identifiez quel circuit cause le problème
- Débranchez les appareils sur ce circuit
- Appelez un électricien : il y a probablement un court-circuit ou une surcharge

### 3. Odeur de Brûlé

**URGENCE ABSOLUE** :
- Coupez immédiatement le disjoncteur principal
- Ventilez la pièce
- Appelez les pompiers (18) si nécessaire
- N''utilisez plus l''installation avant intervention d''un professionnel

## Notre Service d''Urgence

À RPLB Électricité, nous intervenons en urgence :
- **Du lundi au vendredi** pour les situations critiques
- **Intervention rapide** dans l''Oise
- **Diagnostic rapide** de la panne
- **Réparation dans les meilleurs délais**

## Zone d''Intervention Urgence

Nous intervenons rapidement à :
- Longueil-Sainte-Marie
- Compiègne
- Verberie
- Pont-Sainte-Maxence
- Et dans un rayon de 30 km

## Conclusion

En cas d''urgence électrique, la sécurité prime. Ne prenez jamais de risques. Notre équipe d''électriciens professionnels est disponible 24/7 pour vous dépanner rapidement et en toute sécurité.

**Numéro d''urgence : 07 85 54 70 68**',
  'Conseils',
  ARRAY['dépannage', 'urgence', 'panne électrique', 'sécurité', 'disjoncteur'],
  'RPLB Électricité',
  NOW() - INTERVAL '20 days',
  'Dépannage Électrique Urgent Oise | Intervention Rapide',
  'Panne électrique urgente ? Électricien disponible du lundi au vendredi dans l''Oise. Intervention rapide à Longueil-Sainte-Marie, Compiègne. Appelez-nous !',
  true
) ON CONFLICT (slug) DO NOTHING;

-- Article 3 : Rénovation Maison Ancienne
INSERT INTO articles (slug, title, excerpt, content, category, tags, author, published_at, seo_title, seo_description, is_published) VALUES (
  'renovation-electrique-maison-ancienne-guide',
  'Rénovation Électrique d''une Maison Ancienne : Guide Complet 2024',
  'Votre maison ancienne a une installation électrique vétuste ? Découvrez comment la rénover en toute sécurité. Coûts, étapes et normes pour une rénovation électrique dans l''Oise.',
  '# Rénovation Électrique d''une Maison Ancienne : Guide Complet 2024

Rénover l''installation électrique d''une maison ancienne est souvent une nécessité pour votre sécurité et votre confort. En tant qu''électricien spécialisé dans la rénovation à Longueil-Sainte-Marie, nous accompagnons de nombreux propriétaires dans ce projet.

## Pourquoi Rénover son Installation Électrique ?

### Les Signes d''une Installation à Rénover

- Tableau électrique ancien (fonte ou métal)
- Prises sans mise à la terre
- Fils apparents ou dégradés
- Disjoncteurs qui sautent fréquemment
- Installation datant de plus de 30 ans

### Les Risques d''une Installation Vétuste

Une installation électrique ancienne présente des risques :
- **Électrocution** : absence de protection différentielle
- **Incendie** : surcharge, court-circuit
- **Pannes récurrentes** : usure des matériaux
- **Non-conformité** : impossibilité de vente sans travaux

## Les Étapes d''une Rénovation Électrique

### 1. Le Diagnostic

Avant toute intervention, un diagnostic complet permet d''identifier l''état général de l''installation et les circuits à refaire.

### 2. Le Tableau Électrique

Le remplacement du tableau est souvent la priorité avec installation d''un tableau moderne aux normes.

### 3. La Mise à la Terre

Les maisons anciennes n''ont souvent pas de prise de terre : installation d''une prise de terre conforme.

## Les Coûts d''une Rénovation Électrique

**Estimation indicative :**
- Appartement 50 m² : 3 000 à 5 000 €
- Maison 100 m² : 5 000 à 8 000 €
- Maison 150 m² : 8 000 à 12 000 €

## Conclusion

Rénover l''installation électrique de votre maison ancienne est un investissement pour votre sécurité et votre confort. Faites appel à un professionnel certifié pour des travaux conformes et garantis.',
  'Conseils',
  ARRAY['rénovation', 'maison ancienne', 'installation électrique', 'sécurité', 'coûts'],
  'RPLB Électricité',
  NOW() - INTERVAL '15 days',
  'Rénovation Électrique Maison Ancienne Oise | Devis Gratuit',
  'Rénovez l''installation électrique de votre maison ancienne. Électricien qualifié à Longueil-Sainte-Marie. Devis gratuit, travaux garantis. Aides disponibles.',
  true
) ON CONFLICT (slug) DO NOTHING;

-- Article 4 : Domotique
INSERT INTO articles (slug, title, excerpt, content, category, tags, author, published_at, seo_title, seo_description, is_published) VALUES (
  'domotique-maison-intelligente-avantages',
  'Domotique et Maison Intelligente : Avantages et Installation',
  'Automatisez votre maison avec la domotique. Éclairage intelligent, chauffage connecté, sécurité. Guide complet pour installer une maison connectée dans l''Oise.',
  '# Domotique et Maison Intelligente : Avantages et Installation

La domotique transforme votre habitation en maison intelligente. En tant qu''électricien spécialisé dans la domotique à Longueil-Sainte-Marie, nous installons des solutions modernes pour votre confort et vos économies d''énergie.

## Qu''est-ce que la Domotique ?

La domotique regroupe les techniques permettant d''automatiser et de contrôler votre maison :
- Gestion de l''éclairage
- Contrôle du chauffage et de la climatisation
- Automatisation des volets
- Systèmes de sécurité
- Gestion de l''énergie

Tout se contrôle depuis votre smartphone, une tablette ou des assistants vocaux.

## Les Avantages de la Domotique

### 1. Confort Amélioré

- Allumage automatique des lumières selon votre présence
- Réveil en douceur avec éclairage progressif
- Scénarios personnalisés

### 2. Économies d''Énergie

- Régulation intelligente du chauffage
- Extinction automatique des lumières
- **Économies estimées : jusqu''à 30% sur votre facture énergétique**

### 3. Sécurité Renforcée

- Simulation de présence lors de vos absences
- Alertes en cas d''intrusion
- Vidéosurveillance connectée

## Les Coûts de la Domotique

- Éclairage intelligent : 150 à 1 500 €
- Chauffage connecté : 200 à 400 €
- Solution complète : 2 000 à 8 000 €

## Conclusion

La domotique apporte confort, économies et sécurité à votre habitation. Nos électriciens vous accompagnent dans votre projet de maison intelligente.',
  'Actualités',
  ARRAY['domotique', 'maison intelligente', 'éclairage connecté', 'économie d''énergie', 'sécurité'],
  'RPLB Électricité',
  NOW() - INTERVAL '10 days',
  'Domotique Maison Intelligente Oise | Installation Professionnelle',
  'Installez la domotique dans votre maison. Électricien spécialisé à Longueil-Sainte-Marie. Éclairage connecté, chauffage intelligent, sécurité. Devis gratuit.',
  true
) ON CONFLICT (slug) DO NOTHING;

-- Article 5 : Borne Recharge VE
INSERT INTO articles (slug, title, excerpt, content, category, tags, author, published_at, seo_title, seo_description, is_published) VALUES (
  'borne-recharge-vehicule-electrique-installation',
  'Borne de Recharge Véhicule Électrique : Installation et Subventions',
  'Installez une borne de recharge pour votre véhicule électrique. Wallbox, installation, aides financières. Guide complet pour recharger votre voiture électrique à domicile dans l''Oise.',
  '# Borne de Recharge Véhicule Électrique : Installation et Subventions

Avec l''essor des véhicules électriques, de plus en plus de propriétaires souhaitent installer une borne de recharge à domicile. En tant qu''électricien à Longueil-Sainte-Marie, nous installons régulièrement des wallboxes pour recharger les voitures électriques.

## Pourquoi Installer une Borne de Recharge à Domicile ?

### Avantages

- **Recharge rapide** : 3 à 7 heures pour une recharge complète (vs 10-12h sur prise classique)
- **Confort** : rechargez votre véhicule la nuit ou pendant que vous êtes chez vous
- **Économies** : tarif électrique avantageux la nuit
- **Sécurité** : installation conforme et sécurisée

## Les Types de Bornes de Recharge

### La Wallbox (Recommandé)

Borne de recharge dédiée :
- ✅ Recharge rapide (3-7 heures)
- ✅ Sécurisée et conforme
- ✅ Connectée et programmable
- ✅ Installation professionnelle requise

## Les Coûts d''Installation

**Prix indicatifs :**
- Wallbox 3,7 kW : 800 à 1 200 €
- Wallbox 7,4 kW : 1 200 à 1 800 €
- Installation : 500 à 1 000 €
- **Total : 1 300 à 2 800 €** (avant aides)

## Les Aides et Subventions

### Aide de l''État "ADVENIR"

- 50% du coût HT (plafond 960 €)
- Pour une installation en résidence principale
- Avec un installateur qualifié IRVE

Nous sommes qualifiés IRVE et pouvons donc installer votre wallbox et vous faire bénéficier des aides.

## Conclusion

Installer une borne de recharge à domicile est un investissement qui améliore votre quotidien. Avec les aides disponibles, le coût est souvent réduit de moitié.',
  'Actualités',
  ARRAY['borne recharge', 'véhicule électrique', 'wallbox', 'IRVE', 'subventions'],
  'RPLB Électricité',
  NOW() - INTERVAL '5 days',
  'Borne Recharge Voiture Électrique Oise | Installation IRVE',
  'Installez une borne de recharge pour votre voiture électrique. Électricien qualifié IRVE à Longueil-Sainte-Marie. Aides jusqu''à 960€. Devis gratuit.',
  true
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- VÉRIFICATION
-- ============================================
SELECT 
  slug,
  title,
  category,
  is_published,
  published_at
FROM articles
WHERE slug IN (
  'installation-electrique-normes-nf-c-15-100',
  'depannage-electrique-urgent-que-faire',
  'renovation-electrique-maison-ancienne-guide',
  'domotique-maison-intelligente-avantages',
  'borne-recharge-vehicule-electrique-installation'
)
ORDER BY published_at DESC;

