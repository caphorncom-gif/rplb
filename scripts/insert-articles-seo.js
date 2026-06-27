/**
 * Script pour insérer 5 articles SEO optimisés pour RPLB Électricité
 * 
 * Exécutez : node scripts/insert-articles-seo.js
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import * as dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '../.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement manquantes !')
  console.error('Assurez-vous d\'avoir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const ARTICLES = [
  {
    slug: 'installation-electrique-normes-nf-c-15-100',
    title: 'Installation Électrique : Les Normes NF C 15-100 à Connaître en 2024',
    excerpt: 'Guide complet sur les normes électriques NF C 15-100. Obligations légales, points de contrôle et certification pour votre installation électrique à Longueil-Sainte-Marie et dans l\'Oise.',
    content: `# Installation Électrique : Les Normes NF C 15-100 à Connaître en 2024

En tant qu'électricien professionnel à Longueil-Sainte-Marie, nous intervenons régulièrement pour des installations électriques neuves ou des rénovations. La norme NF C 15-100 est la référence incontournable en France pour toutes les installations électriques basse tension. Voici ce que vous devez savoir.

## Qu'est-ce que la Norme NF C 15-100 ?

La norme NF C 15-100 définit les règles de conception, de réalisation et de contrôle des installations électriques basse tension (jusqu'à 1000 V en courant alternatif). Elle s'applique à tous les bâtiments résidentiels et tertiaires.

## Les Points Clés de la Norme

### 1. Le Tableau Électrique

Votre tableau électrique doit être installé dans un endroit facilement accessible, à l'abri de l'humidité. Il doit contenir :
- Un disjoncteur de branchement (généralement fourni par Enedis)
- Des disjoncteurs différentiels (30 mA) pour la protection des personnes
- Des disjoncteurs divisionnaires pour chaque circuit

### 2. Les Prises de Courant

La norme impose un nombre minimum de prises par pièce :
- Salon : minimum 5 prises (dont 4 prises 16A)
- Chambre : minimum 3 prises (dont 3 prises 16A)
- Cuisine : minimum 6 prises (dont 4 prises 16A ou 20A)
- Salle de bain : prises spéciales avec transformateur d'isolement

### 3. L'Éclairage

Chaque pièce doit avoir au moins un point d'éclairage, commandé par un interrupteur situé à l'entrée.

### 4. La Mise à la Terre

Toute installation doit être reliée à la terre. La résistance de la prise de terre doit être inférieure à 100 ohms pour les habitations.

## Quand Faire Contrôler son Installation ?

La norme NF C 15-100 impose un contrôle de conformité dans plusieurs cas :
- Installation neuve ou rénovation complète
- Ajout d'un circuit de plus de 8 points
- Modification du tableau électrique

Ce contrôle est effectué par un organisme certifié (Consuel) qui délivre une attestation de conformité.

## Pourquoi Faire Appel à un Professionnel Certifié ?

En tant qu'électricien Qualifelec à Longueil-Sainte-Marie, nous garantissons :
- Le respect strict de la norme NF C 15-100
- La sécurité de votre installation
- La conformité pour l'obtention de l'attestation Consuel
- L'assurance décennale pour vos travaux

## Notre Zone d'Intervention

Nous intervenons dans toute l'Oise :
- Longueil-Sainte-Marie
- Compiègne
- Verberie
- Pont-Sainte-Maxence
- Crépy-en-Valois
- Et dans un rayon de 30 km

## Conclusion

Une installation électrique conforme à la norme NF C 15-100 est essentielle pour votre sécurité et celle de votre famille. N'hésitez pas à nous contacter pour un devis gratuit et sans engagement.`,
    category: 'Réglementation',
    tags: ['normes', 'installation électrique', 'NF C 15-100', 'sécurité', 'conformité'],
    author: 'RPLB Électricité',
    published_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 30 jours
    seo_title: 'Normes Électriques NF C 15-100 | Électricien Longueil-Sainte-Marie',
    seo_description: 'Guide complet sur les normes électriques NF C 15-100. Installation conforme, sécurité garantie. Électricien certifié dans l\'Oise. Devis gratuit.',
    is_published: true
  },
  {
    slug: 'depannage-electrique-urgent-que-faire',
    title: 'Dépannage Électrique Urgent : Que Faire en Cas de Panne ?',
    excerpt: 'Votre disjoncteur saute ? Panne de courant totale ? Découvrez les gestes à adopter en cas d\'urgence électrique et quand faire appel à un électricien d\'urgence dans l\'Oise.',
    content: `# Dépannage Électrique Urgent : Que Faire en Cas de Panne ?

En tant qu'électricien d'urgence à Longueil-Sainte-Marie, nous recevons de nombreux appels pour des pannes électriques urgentes. Voici comment réagir en cas de problème électrique.

## Les Situations d'Urgence Électrique

### 1. Panne Totale de Courant

Si vous n'avez plus d'électricité dans toute la maison :
- Vérifiez d'abord le disjoncteur général (tableau électrique)
- Regardez si les voisins sont également en panne (problème Enedis)
- Appelez Enedis au 09 72 67 50 XX si le problème vient d'eux
- Contactez un électricien d'urgence si le problème vient de votre installation

### 2. Le Disjoncteur Sauté Sans Cesse

Si votre disjoncteur saute et ne reste pas enclenché :
- Ne forcez pas ! C'est une protection
- Identifiez quel circuit cause le problème
- Débranchez les appareils sur ce circuit
- Appelez un électricien : il y a probablement un court-circuit ou une surcharge

### 3. Odeur de Brûlé

**URGENCE ABSOLUE** :
- Coupez immédiatement le disjoncteur principal
- Ventilez la pièce
- Appelez les pompiers (18) si nécessaire
- N'utilisez plus l'installation avant intervention d'un professionnel

### 4. Étincelles ou Fumée

**DANGER IMMÉDIAT** :
- Coupez le courant au disjoncteur principal
- Ne touchez rien
- Appelez les pompiers si la fumée persiste
- Contactez un électricien en urgence après sécurisation

## Les Gestes à Éviter

❌ Ne jamais toucher une installation électrique les mains mouillées
❌ Ne jamais utiliser d'eau sur un feu électrique
❌ Ne jamais forcer un disjoncteur qui saute
❌ Ne jamais faire les réparations vous-même sans connaissance

## Quand Appeler un Électricien d'Urgence ?

Faites appel à un professionnel si :
- La panne persiste après vos vérifications
- Vous entendez des bruits suspects (grésillements)
- Vous sentez une odeur de brûlé
- Il y a des étincelles visibles
- Vous n'avez pas les compétences pour diagnostiquer

## Notre Service d'Urgence

À RPLB Électricité, nous intervenons en urgence :
- **Du lundi au vendredi** pour les situations critiques
- **Intervention rapide** dans l'Oise
- **Diagnostic rapide** de la panne
- **Réparation dans les meilleurs délais**

## Zone d'Intervention Urgence

Nous intervenons rapidement à :
- Longueil-Sainte-Marie
- Compiègne
- Verberie
- Pont-Sainte-Maxence
- Et dans un rayon de 30 km

## Prévention : Comment Éviter les Pannes ?

- Faites contrôler votre installation tous les 10 ans
- Ne surchargez pas les prises multiples
- Utilisez des multiprises avec parasurtenseur
- Vérifiez régulièrement l'état de votre tableau électrique

## Conclusion

En cas d'urgence électrique, la sécurité prime. Ne prenez jamais de risques. Notre équipe d'électriciens professionnels est disponible 24/7 pour vous dépanner rapidement et en toute sécurité.

**Numéro d'urgence : 07 85 54 70 68**`,
    category: 'Conseils',
    tags: ['dépannage', 'urgence', 'panne électrique', 'sécurité', 'disjoncteur'],
    author: 'RPLB Électricité',
    published_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 20 jours
    seo_title: 'Dépannage Électrique Urgent Oise | Intervention 24/7',
    seo_description: 'Panne électrique urgente ? Électricien disponible 24/7 dans l\'Oise. Intervention rapide sous 2h à Longueil-Sainte-Marie, Compiègne. Appelez-nous !',
    is_published: true
  },
  {
    slug: 'renovation-electrique-maison-ancienne-guide',
    title: 'Rénovation Électrique d\'une Maison Ancienne : Guide Complet 2024',
    excerpt: 'Votre maison ancienne a une installation électrique vétuste ? Découvrez comment la rénover en toute sécurité. Coûts, étapes et normes pour une rénovation électrique dans l\'Oise.',
    content: `# Rénovation Électrique d'une Maison Ancienne : Guide Complet 2024

Rénover l'installation électrique d'une maison ancienne est souvent une nécessité pour votre sécurité et votre confort. En tant qu'électricien spécialisé dans la rénovation à Longueil-Sainte-Marie, nous accompagnons de nombreux propriétaires dans ce projet.

## Pourquoi Rénover son Installation Électrique ?

### Les Signes d'une Installation à Rénover

- Tableau électrique ancien (fonte ou métal)
- Prises sans mise à la terre
- Fils apparents ou dégradés
- Disjoncteurs qui sautent fréquemment
- Odeurs suspectes
- Installation datant de plus de 30 ans

### Les Risques d'une Installation Vétuste

Une installation électrique ancienne présente des risques :
- **Électrocution** : absence de protection différentielle
- **Incendie** : surcharge, court-circuit
- **Pannes récurrentes** : usure des matériaux
- **Non-conformité** : impossibilité de vente sans travaux

## Les Étapes d'une Rénovation Électrique

### 1. Le Diagnostic

Avant toute intervention, un diagnostic complet permet d'identifier :
- L'état général de l'installation
- Les circuits à refaire
- Les points dangereux
- L'estimation du coût

### 2. Le Tableau Électrique

Le remplacement du tableau est souvent la priorité :
- Installation d'un tableau moderne aux normes
- Disjoncteurs différentiels 30 mA
- Protection de tous les circuits
- Gain de place et sécurité

### 3. La Mise à la Terre

Les maisons anciennes n'ont souvent pas de prise de terre :
- Installation d'une prise de terre conforme
- Vérification de la résistance (inférieure à 100 ohms)
- Reliage de toutes les prises

### 4. Les Circuits

Mise à niveau des circuits :
- Ajout de prises dans les pièces
- Installation de circuits spécialisés (lave-linge, four, etc.)
- Éclairage moderne et commandes variateurs

### 5. La Certification

Après travaux, obtention de l'attestation Consuel pour prouver la conformité.

## Les Coûts d'une Rénovation Électrique

Le coût dépend de nombreux facteurs :
- Taille de la maison
- État de l'installation existante
- Nombre de circuits à refaire
- Accessibilité

**Estimation indicative :**
- Appartement 50 m² : 3 000 à 5 000 €
- Maison 100 m² : 5 000 à 8 000 €
- Maison 150 m² : 8 000 à 12 000 €

Ces prix sont indicatifs et incluent les matériaux et la main-d'œuvre.

## Les Aides et Subventions

Plusieurs aides peuvent financer votre rénovation :
- **MaPrimeRénov** : aide de l'État pour la rénovation énergétique
- **CEE (Certificats d'Économies d'Énergie)** : si travaux d'efficacité énergétique
- **Éco-PTZ** : prêt à taux zéro (si éligible)

Renseignez-vous auprès de l'ANAH ou de votre région.

## Pourquoi Choisir RPLB Électricité ?

Nous sommes spécialisés dans la rénovation électrique :
- **Plus de 10 ans d'expérience** dans l'Oise
- **Qualifelec** : qualification professionnelle
- **Assurance décennale** pour vos travaux
- **Devis gratuit** et sans engagement
- **Respect des délais** et du budget

## Notre Zone d'Intervention

Nous intervenons dans toute l'Oise :
- Longueil-Sainte-Marie
- Compiègne
- Verberie
- Pont-Sainte-Maxence
- Crépy-en-Valois
- Et alentours

## Conclusion

Rénover l'installation électrique de votre maison ancienne est un investissement pour votre sécurité et votre confort. Faites appel à un professionnel certifié pour des travaux conformes et garantis.

Contactez-nous pour un devis gratuit !`,
    category: 'Conseils',
    tags: ['rénovation', 'maison ancienne', 'installation électrique', 'sécurité', 'coûts'],
    author: 'RPLB Électricité',
    published_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 15 jours
    seo_title: 'Rénovation Électrique Maison Ancienne Oise | Devis Gratuit',
    seo_description: 'Rénovez l\'installation électrique de votre maison ancienne. Électricien qualifié à Longueil-Sainte-Marie. Devis gratuit, travaux garantis. Aides disponibles.',
    is_published: true
  },
  {
    slug: 'domotique-maison-intelligente-avantages',
    title: 'Domotique et Maison Intelligente : Avantages et Installation',
    excerpt: 'Automatisez votre maison avec la domotique. Éclairage intelligent, chauffage connecté, sécurité. Guide complet pour installer une maison connectée dans l\'Oise.',
    content: `# Domotique et Maison Intelligente : Avantages et Installation

La domotique transforme votre habitation en maison intelligente. En tant qu'électricien spécialisé dans la domotique à Longueil-Sainte-Marie, nous installons des solutions modernes pour votre confort et vos économies d'énergie.

## Qu'est-ce que la Domotique ?

La domotique regroupe les techniques permettant d'automatiser et de contrôler votre maison :
- Gestion de l'éclairage
- Contrôle du chauffage et de la climatisation
- Automatisation des volets
- Systèmes de sécurité
- Gestion de l'énergie

Tout se contrôle depuis votre smartphone, une tablette ou des assistants vocaux.

## Les Avantages de la Domotique

### 1. Confort Amélioré

- Allumage automatique des lumières selon votre présence
- Réveil en douceur avec éclairage progressif
- Scénarios personnalisés (mode "cinéma", "départ", etc.)

### 2. Économies d'Énergie

- Régulation intelligente du chauffage
- Extinction automatique des lumières
- Optimisation de la consommation

**Économies estimées :** jusqu'à 30% sur votre facture énergétique.

### 3. Sécurité Renforcée

- Simulation de présence lors de vos absences
- Alertes en cas d'intrusion
- Vidéosurveillance connectée
- Détection de fumée et gaz

### 4. Accessibilité

Contrôle à distance depuis votre smartphone :
- Vérifier que les lumières sont éteintes
- Régler le chauffage avant votre retour
- Ouvrir les volets à distance

## Les Solutions Domotiques

### Éclairage Intelligent

- Ampoules connectées (Philips Hue, TP-Link, etc.)
- Interrupteurs variateurs intelligents
- Détecteurs de présence
- Scénarios d'éclairage

### Chauffage Connecté

- Thermostats intelligents (Nest, Netatmo, etc.)
- Vannes thermostatiques connectées
- Programmations personnalisées
- Suivi de consommation

### Volets Automatiques

- Motorisation des volets roulants
- Ouverture/fermeture programmées
- Réaction à la météo
- Protection solaire automatique

### Sécurité Domotique

- Alarme connectée
- Caméras IP avec visionnage à distance
- Détecteurs d'ouverture
- Sirènes et alertes

## L'Installation Domotique

### Étapes d'Installation

1. **Audit de votre installation** : vérification de la compatibilité
2. **Choix des solutions** : selon vos besoins et votre budget
3. **Installation** : par un électricien certifié
4. **Configuration** : personnalisation de votre système
5. **Formation** : prise en main de votre installation

### Points d'Attention

- Votre installation électrique doit être conforme (NF C 15-100)
- Une connexion Internet stable est nécessaire
- Compatibilité entre les différents équipements

## Les Coûts de la Domotique

Les prix varient selon vos besoins :

**Éclairage intelligent :**
- Pack de démarrage : 150 à 300 €
- Maison complète : 500 à 1 500 €

**Chauffage connecté :**
- Thermostat intelligent : 200 à 400 €
- Installation : 100 à 200 €

**Solution complète :**
- Domotique globale : 2 000 à 8 000 € selon la surface et les équipements

## Pourquoi Choisir RPLB Électricité pour la Domotique ?

- **Expérience** : installation de systèmes domotiques depuis plusieurs années
- **Expertise** : maîtrise des principales solutions du marché
- **Conseil personnalisé** : solution adaptée à vos besoins
- **Installation professionnelle** : garantie et SAV

## Notre Zone d'Intervention

Nous installons la domotique dans toute l'Oise :
- Longueil-Sainte-Marie
- Compiègne
- Verberie
- Pont-Sainte-Maxence
- Crépy-en-Valois

## Conclusion

La domotique apporte confort, économies et sécurité à votre habitation. Que ce soit pour un projet neuf ou une rénovation, nos électriciens vous accompagnent dans votre projet de maison intelligente.

Contactez-nous pour un devis gratuit !`,
    category: 'Actualités',
    tags: ['domotique', 'maison intelligente', 'éclairage connecté', 'économie d\'énergie', 'sécurité'],
    author: 'RPLB Électricité',
    published_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 10 jours
    seo_title: 'Domotique Maison Intelligente Oise | Installation Professionnelle',
    seo_description: 'Installez la domotique dans votre maison. Électricien spécialisé à Longueil-Sainte-Marie. Éclairage connecté, chauffage intelligent, sécurité. Devis gratuit.',
    is_published: true
  },
  {
    slug: 'borne-recharge-vehicule-electrique-installation',
    title: 'Borne de Recharge Véhicule Électrique : Installation et Subventions',
    excerpt: 'Installez une borne de recharge pour votre véhicule électrique. Wallbox, installation, aides financières. Guide complet pour recharger votre voiture électrique à domicile dans l\'Oise.',
    content: `# Borne de Recharge Véhicule Électrique : Installation et Subventions

Avec l'essor des véhicules électriques, de plus en plus de propriétaires souhaitent installer une borne de recharge à domicile. En tant qu'électricien à Longueil-Sainte-Marie, nous installons régulièrement des wallboxes pour recharger les voitures électriques.

## Pourquoi Installer une Borne de Recharge à Domicile ?

### Avantages

- **Recharge rapide** : 3 à 7 heures pour une recharge complète (vs 10-12h sur prise classique)
- **Confort** : rechargez votre véhicule la nuit ou pendant que vous êtes chez vous
- **Économies** : tarif électrique avantageux la nuit
- **Sécurité** : installation conforme et sécurisée
- **Valeur ajoutée** : votre bien immobilier prend de la valeur

## Les Types de Bornes de Recharge

### 1. La Prise Classique (Pas Recommandé)

La prise électrique domestique standard (16A) :
- ⚠️ Risques de surchauffe
- ⚠️ Recharge très lente (10-12 heures)
- ⚠️ Non conforme pour un usage régulier

### 2. La Wallbox (Recommandé)

Borne de recharge dédiée :
- ✅ Recharge rapide (3-7 heures)
- ✅ Sécurisée et conforme
- ✅ Connectée et programmable
- ✅ Installation professionnelle requise

## L'Installation d'une Wallbox

### Étapes d'Installation

1. **Audit de votre installation électrique**
   - Vérification de la puissance disponible
   - État du tableau électrique
   - Besoin de renforcement éventuel

2. **Choix de la puissance**
   - 3,7 kW (16A) : recharge en 6-8 heures
   - 7,4 kW (32A) : recharge en 3-4 heures
   - 11 kW (triphasé) : recharge en 2-3 heures

3. **Installation par un professionnel**
   - Création d'un circuit dédié
   - Installation du coffret de protection
   - Mise en place de la wallbox
   - Mise en service

### Points d'Attention

- **Puissance disponible** : votre compteur doit avoir assez de puissance
- **Distance** : proximité du véhicule et de l'arrivée électrique
- **Protection** : disjoncteur différentiel 30 mA obligatoire
- **Conformité** : normes NF C 15-100 et IRVE

## Les Coûts d'Installation

**Prix indicatifs :**

- Wallbox 3,7 kW : 800 à 1 200 €
- Wallbox 7,4 kW : 1 200 à 1 800 €
- Installation (matériel + main-d'œuvre) : 500 à 1 000 €
- **Total : 1 300 à 2 800 €** (avant aides)

## Les Aides et Subventions

Plusieurs aides peuvent réduire le coût :

### 1. Aide de l'État "ADVENIR"

- 50% du coût HT (plafond 960 €)
- Pour une installation en résidence principale
- Avec un installateur qualifié IRVE

### 2. MaPrimeRénov'

- Jusqu'à 200 € supplémentaires
- Pour les ménages modestes

### 3. Aides Locales

Renseignez-vous auprès de votre région ou département.

### 4. Crédit d'Impôt

Certaines installations peuvent bénéficier d'un crédit d'impôt (sous conditions).

## Les Installateurs Qualifiés IRVE

Pour bénéficier des aides, votre installation doit être réalisée par un installateur qualifié IRVE (Installation de Recharge pour Véhicules Électriques).

Nous sommes qualifiés IRVE et pouvons donc :
- Installer votre wallbox
- Vous faire bénéficier des aides
- Garantir la conformité de l'installation

## Notre Zone d'Intervention

Nous installons des bornes de recharge dans toute l'Oise :
- Longueil-Sainte-Marie
- Compiègne
- Verberie
- Pont-Sainte-Maxence
- Crépy-en-Valois
- Et alentours

## Maintenance et SAV

Après installation :
- Formation à l'utilisation
- Garantie sur l'installation
- Service après-vente disponible
- Maintenance préventive possible

## Conclusion

Installer une borne de recharge à domicile est un investissement qui améliore votre quotidien et la valeur de votre bien. Avec les aides disponibles, le coût est souvent réduit de moitié.

Contactez-nous pour un devis gratuit et sans engagement !`,
    category: 'Actualités',
    tags: ['borne recharge', 'véhicule électrique', 'wallbox', 'IRVE', 'subventions'],
    author: 'RPLB Électricité',
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 5 jours
    seo_title: 'Borne Recharge Voiture Électrique Oise | Installation IRVE',
    seo_description: 'Installez une borne de recharge pour votre voiture électrique. Électricien qualifié IRVE à Longueil-Sainte-Marie. Aides jusqu\'à 960€. Devis gratuit.',
    is_published: true
  }
]

async function insertArticles() {
  console.log('🚀 Insertion de 5 articles SEO optimisés...\n')

  let successCount = 0
  let errorCount = 0

  for (const article of ARTICLES) {
    try {
      // Vérifier si l'article existe déjà
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', article.slug)
        .single()

      if (existing) {
        console.log(`⚠️  Article "${article.title}" existe déjà`)
        continue
      }

      // Insérer l'article
      const { data, error } = await supabase
        .from('articles')
        .insert([article])
        .select()

      if (error) {
        throw error
      }

      console.log(`✅ Article inséré : "${article.title}"`)
      successCount++
    } catch (error) {
      console.error(`❌ Erreur pour "${article.title}":`, error.message)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Succès : ${successCount} article(s)`)
  console.log(`❌ Erreurs : ${errorCount} article(s)`)
  console.log('='.repeat(50))
  console.log('\n✨ Articles disponibles sur : http://localhost:5174/blog')
}

insertArticles()
  .then(() => {
    console.log('\n🎉 Terminé !')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Erreur :', error)
    process.exit(1)
  })

