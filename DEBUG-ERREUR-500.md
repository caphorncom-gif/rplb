# 🔍 Debug Erreur 500

## ❌ Problème

La fonction retourne une erreur 500 (Internal Server Error). Cela signifie qu'il y a une erreur dans le code de la fonction.

## ✅ Corrections apportées

1. **Gestion d'erreur améliorée** pour le parsing JSON
2. **Image Hager corrigée** avec un lien valide

## 🔍 Vérifier les logs

**IMPORTANT :** Allez dans Supabase Dashboard > Edge Functions > `send-contact-email` > **Logs** pour voir l'erreur exacte.

Les logs vous diront exactement ce qui ne va pas :
- Erreur de parsing JSON ?
- Erreur Resend ?
- Variable d'environnement manquante ?
- Autre erreur ?

## 🚀 Redéployer avec les corrections

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
supabase functions deploy send-contact-email
```

## 📋 Vérifications

### 1. Vérifier les variables d'environnement

Dans Supabase Dashboard > Edge Functions > Settings :
- `RESEND_API_KEY` doit être configurée (même si vous ne l'utilisez pas encore)
- `CONTACT_EMAILS` doit être configurée

### 2. Tester la fonction manuellement

Dans Supabase Dashboard > Edge Functions > `send-contact-email` > **Invoke**, testez avec :

```json
{
  "name": "Test",
  "email": "test@example.com",
  "phone": "0123456789",
  "message": "Test de la fonction"
}
```

Cela vous montrera l'erreur exacte.

### 3. Vérifier les logs

Les logs montreront :
- Les requêtes entrantes
- Les erreurs exactes
- Les stack traces

## 🆘 Solutions possibles

### Si l'erreur est "RESEND_API_KEY not found"
→ Ajoutez la variable dans Supabase Dashboard (même une valeur vide fonctionnera pour tester)

### Si l'erreur est liée à Resend
→ Vérifiez que votre clé Resend est valide

### Si l'erreur est liée au JSON
→ Les corrections que j'ai apportées devraient résoudre le problème

## 📝 Prochaines étapes

1. **Redéployez la fonction** avec les corrections
2. **Vérifiez les logs** dans Supabase Dashboard
3. **Testez la fonction** manuellement via Invoke
4. **Partagez l'erreur exacte** des logs si le problème persiste

