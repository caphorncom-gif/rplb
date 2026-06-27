# 🔍 Vérifier les logs pour identifier l'erreur

## ⚠️ L'erreur 500 persiste

Il faut vérifier les **nouveaux logs** dans Supabase pour voir quelle est l'erreur exacte maintenant.

## 📋 Étapes pour vérifier

### 1. Allez dans Supabase Dashboard

1. Connectez-vous à https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Edge Functions**
4. Cliquez sur **send-contact-email**
5. Cliquez sur **Logs** (onglet en haut)

### 2. Regardez les logs les plus récents

Les logs les plus récents (en haut de la liste) montreront l'erreur exacte.

### 3. Partagez l'erreur

Copiez-collez l'erreur complète des logs pour que je puisse identifier le problème.

## 🔄 Avez-vous redéployé la fonction ?

**Important :** Avez-vous exécuté cette commande après mes corrections ?

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
supabase functions deploy send-contact-email
```

Si non, **redéployez maintenant** puis testez à nouveau.

## 🎯 Erreurs possibles

### 1. Domaine Resend non vérifié (corrigé)
→ J'ai changé pour `onboarding@resend.dev`

### 2. Variable d'environnement manquante
→ Vérifiez que `RESEND_API_KEY` est configurée dans Supabase Dashboard > Edge Functions > Settings

### 3. Erreur de parsing JSON
→ J'ai ajouté une meilleure gestion d'erreur

### 4. Autre erreur
→ Les logs vous diront exactement quoi

## 📝 Prochaines étapes

1. **Vérifiez les logs** dans Supabase Dashboard
2. **Redéployez** si vous ne l'avez pas fait : `supabase functions deploy send-contact-email`
3. **Testez** le formulaire à nouveau
4. **Partagez les nouveaux logs** si l'erreur persiste

