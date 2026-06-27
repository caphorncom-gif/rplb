#!/bin/bash

# Script pour déployer la fonction Supabase
# Exécutez avec: bash deploy-function.sh

echo "🚀 Déploiement de la fonction Supabase..."

# 1. Aller dans le dossier du projet
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"

# 2. Se connecter à Supabase
echo "📝 Connexion à Supabase..."
supabase login

# 3. Lier le projet
echo "🔗 Liaison du projet..."
supabase link --project-ref hgcpddzpqzfxrvfipsii

# 4. Déployer la fonction
echo "📦 Déploiement de la fonction send-contact-email..."
supabase functions deploy send-contact-email

echo "✅ Déploiement terminé !"

