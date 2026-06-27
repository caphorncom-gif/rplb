# ✅ Configuration DNS correcte pour Resend

## 📋 Enregistrements à avoir dans OVH

### 1. DKIM (Domain Verification) ✅

- **Sous-domaine** : `resend._domainkey`
- **Type** : TXT
- **Valeur** : `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBİQKBgQDKu5zt4EQa2CHsYSZjDMhMNJZ9IyovGzXAQmv4tU2a2gHZaW/21039zwWJgyNbdKfoLUvq48akbpm2VXtEELS6WvaC/GLKogvF56MUhr20paXZ96MB1AmJqFTa5SQnGA9cp7FWAudpql5ZltVxn3m9/CMR0M2i9ekZqN14qRJ67wIDAQAB`
- **Statut** : ✅ Verified

### 2. MX (Enable Sending) ❌ À CORRIGER

**Problème** : Le MX est configuré pour le domaine racine au lieu de `send`.

**Configuration correcte :**
- **Sous-domaine** : `send` (pas vide !)
- **Type** : MX
- **Priorité** : `10`
- **Cible** : `feedback-smtp.eu-west-1.amazonses.com.`

**Action** :
1. Supprimez le MX actuel pour `rplb-electricite.fr.`
2. Ajoutez un nouveau MX pour `send.rplb-electricite.fr.`

### 3. SPF (Enable Sending) ⚠️ À VÉRIFIER

**Configuration correcte :**
- **Sous-domaine** : `send`
- **Type** : TXT
- **Valeur** : `v=spf1 include:amazonses.com ~all`

**Vérification** :
- Si l'enregistrement existe déjà, attendez la propagation DNS
- Si l'enregistrement n'existe pas, ajoutez-le

### 4. DMARC (Optional) ✅

- **Sous-domaine** : `_dmarc`
- **Type** : TXT ou DMARC
- **Valeur** : `v=DMARC1; p=none;`
- **Statut** : ✅ Configuré

## 🔧 Corrections à faire maintenant

### Correction 1 : MX pour `send`

1. Dans OVH, **supprimez** l'enregistrement MX actuel pour `rplb-electricite.fr.`
2. **Ajoutez** un nouveau MX :
   - Sous-domaine : `send`
   - Type : MX
   - Priorité : `10`
   - Cible : `feedback-smtp.eu-west-1.amazonses.com.`

### Correction 2 : Vérifier SPF pour `send`

1. Vérifiez qu'il existe un enregistrement TXT pour `send.rplb-electricite.fr.`
2. Si oui, attendez la propagation DNS (5-15 minutes)
3. Si non, ajoutez-le :
   - Sous-domaine : `send`
   - Type : TXT
   - Valeur : `v=spf1 include:amazonses.com ~all`

## ✅ Résultat attendu

Après corrections :
- ✅ DKIM : Verified
- ✅ MX pour `send` : Verified
- ✅ SPF pour `send` : Verified
- ✅ DMARC : Verified

## ⏱️ Temps de propagation

Après avoir corrigé :
- **Attendez 5-15 minutes** pour la propagation DNS
- **Rafraîchissez** la page Resend Dashboard
- Les enregistrements devraient passer à **Verified**

## 🎯 Points importants

1. **Le MX doit être pour `send.rplb-electricite.fr.`**, pas pour `rplb-electricite.fr.`
2. **Le SPF doit être pour `send.rplb-electricite.fr.`**, pas pour le domaine racine
3. **Attendez la propagation DNS** avant de vérifier dans Resend

Corrigez le MX pour `send` et vérifiez le SPF, puis attendez la propagation DNS !

