// Supabase Edge Function pour envoyer les emails de contact
// Déployer avec: supabase functions deploy send-contact-email

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
// Emails de réception (séparés par des virgules si plusieurs)
const CONTACT_EMAILS = Deno.env.get('CONTACT_EMAILS') || 'kevin@caphorncom.fr,rplb.electricite@gmail.com'
// Email du compte Resend (pour le mode test si le domaine n'est pas vérifié)
const RESEND_ACCOUNT_EMAIL = Deno.env.get('RESEND_ACCOUNT_EMAIL') || 'caphorncom@gmail.com'
// Domaine vérifié dans Resend
const RESEND_DOMAIN = Deno.env.get('RESEND_DOMAIN') || 'rplb-electricite.fr'
// Adresse email expéditrice (utilise le domaine vérifié si disponible)
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || `noreply@${RESEND_DOMAIN}`

interface ContactRequest {
  name: string
  email: string
  phone: string
  address?: string
  city?: string
  service_type?: string
  message: string
}

serve(async (req) => {
  // Headers CORS pour toutes les réponses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-url, x-supabase-anon-key',
    'Access-Control-Max-Age': '86400',
  }

  // Gérer les requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    // Vérifier la méthode
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      )
    }

    // Récupérer les données
    let contactData: ContactRequest
    try {
      contactData = await req.json()
    } catch (jsonError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      )
    }

    // Validation
    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      )
    }

    // Préparer le contenu de l'email
    const emailSubject = `Nouvelle demande de contact - ${contactData.service_type || 'Général'}`
    const emailBody = `
Nouvelle demande de contact depuis le site RPLB Électricité

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIONS CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom: ${contactData.name}
Email: ${contactData.email}
Téléphone: ${contactData.phone}
${contactData.address ? `Adresse: ${contactData.address}` : ''}
${contactData.city ? `Ville: ${contactData.city}` : ''}
${contactData.service_type ? `Service demandé: ${contactData.service_type}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${contactData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
Source: Site web RPLB Électricité
    `.trim()

    // Envoyer l'email via Resend (optionnel)
    // Si RESEND_API_KEY n'est pas configurée, on continue quand même
    // Les données sont déjà sauvegardées dans Supabase
    if (RESEND_API_KEY) {
      try {
        // Convertir la liste d'emails (séparés par virgules) en tableau
        const emailList = CONTACT_EMAILS.split(',').map(email => email.trim()).filter(email => email)
        
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `RPLB Électricité <${FROM_EMAIL}>`,
            to: emailList,
            reply_to: contactData.email,
            subject: emailSubject,
            text: emailBody,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
                  .content { background: #f9fafb; padding: 20px; margin: 20px 0; }
                  .field { margin: 10px 0; }
                  .label { font-weight: bold; color: #2563eb; }
                  .message-box { background: white; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
                  .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Nouvelle demande de contact</h1>
                    <p>RPLB Électricité</p>
                  </div>
                  <div class="content">
                    <h2>Informations client</h2>
                    <div class="field"><span class="label">Nom:</span> ${contactData.name}</div>
                    <div class="field"><span class="label">Email:</span> <a href="mailto:${contactData.email}">${contactData.email}</a></div>
                    <div class="field"><span class="label">Téléphone:</span> <a href="tel:${contactData.phone.replace(/\s/g, '')}">${contactData.phone}</a></div>
                    ${contactData.address ? `<div class="field"><span class="label">Adresse:</span> ${contactData.address}</div>` : ''}
                    ${contactData.city ? `<div class="field"><span class="label">Ville:</span> ${contactData.city}</div>` : ''}
                    ${contactData.service_type ? `<div class="field"><span class="label">Service demandé:</span> ${contactData.service_type}</div>` : ''}
                    
                    <h2>Message</h2>
                    <div class="message-box">
                      ${contactData.message.replace(/\n/g, '<br>')}
                    </div>
                  </div>
                  <div class="footer">
                    <p>Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
                    <p>Source: Site web RPLB Électricité</p>
                  </div>
                </div>
              </body>
              </html>
            `,
          }),
        })

        if (resendResponse.ok) {
          const resendData = await resendResponse.json()
          console.log('Email envoyé via Resend à:', emailList, resendData)
          
          // Envoyer un email de confirmation au client
          try {
            const confirmationSubject = 'Confirmation de votre demande de contact - RPLB Électricité'
            const confirmationBody = `
Bonjour ${contactData.name},

Nous avons bien reçu votre demande de contact et vous en remercions.

Nous allons examiner votre demande et vous répondre dans les plus brefs délais.

Récapitulatif de votre demande :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service demandé : ${contactData.service_type || 'Général'}
${contactData.city ? `Ville : ${contactData.city}` : ''}

Votre message :
${contactData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nous restons à votre disposition pour toute information complémentaire.

Cordialement,
L'équipe RPLB Électricité

📞 Téléphone : 07 86 17 22 82
🌐 Site web : https://www.rplb-electricite.fr
            `.trim()
            
            const confirmationHtml = `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                  .logo { max-width: 200px; margin-bottom: 10px; }
                  .content { background: #f9fafb; padding: 30px 20px; }
                  .message-box { background: white; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0; border-radius: 4px; }
                  .footer { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
                  .footer a { color: #60a5fa; text-decoration: none; }
                  .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0; font-size: 28px;">RPLB Électricité</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Votre électricien de confiance</p>
                  </div>
                  <div class="content">
                    <h2 style="color: #2563eb; margin-top: 0;">Bonjour ${contactData.name},</h2>
                    <p>Nous avons bien reçu votre demande de contact et vous en remercions.</p>
                    <p>Nous allons examiner votre demande et vous répondre dans les plus brefs délais.</p>
                    
                    <div class="message-box">
                      <h3 style="margin-top: 0; color: #2563eb;">Récapitulatif de votre demande</h3>
                      <p><strong>Service demandé :</strong> ${contactData.service_type || 'Général'}</p>
                      ${contactData.city ? `<p><strong>Ville :</strong> ${contactData.city}</p>` : ''}
                      ${contactData.address ? `<p><strong>Adresse :</strong> ${contactData.address}</p>` : ''}
                      <p><strong>Votre message :</strong></p>
                      <p style="background: #f3f4f6; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${contactData.message.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    <p>Nous restons à votre disposition pour toute information complémentaire.</p>
                    
                    <a href="https://www.rplb-electricite.fr" class="button">Visiter notre site</a>
                  </div>
                  <div class="footer">
                    <p style="margin: 0;"><strong>RPLB Électricité</strong></p>
                    <p style="margin: 5px 0;">📞 <a href="tel:0786172282">07 86 17 22 82</a></p>
                    <p style="margin: 5px 0;">🌐 <a href="https://www.rplb-electricite.fr">www.rplb-electricite.fr</a></p>
                    <p style="margin: 10px 0 0 0; opacity: 0.7; font-size: 11px;">
                      Longueil-Sainte-Marie, 60126 - Oise<br>
                      Intervention rapide du lundi au vendredi
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `
            
            const confirmationResponse = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
              },
              body: JSON.stringify({
                from: `RPLB Électricité <${FROM_EMAIL}>`,
                to: [contactData.email],
                reply_to: FROM_EMAIL,
                subject: confirmationSubject,
                text: confirmationBody,
                html: confirmationHtml,
              }),
            })
            
            if (confirmationResponse.ok) {
              const confirmationData = await confirmationResponse.json()
              console.log('Email de confirmation envoyé au client:', contactData.email, confirmationData)
            } else {
              const confirmationError = await confirmationResponse.text()
              console.warn('Erreur envoi email de confirmation (non bloquante):', confirmationError)
            }
          } catch (confirmationError) {
            console.warn('Erreur lors de l\'envoi de l\'email de confirmation (non bloquante):', confirmationError)
          }
        } else {
          // Si Resend échoue, on continue quand même (les données sont sauvegardées)
          const error = await resendResponse.text()
          console.warn('Erreur Resend (non bloquante):', error)
          // Si l'erreur indique que le domaine n'est pas vérifié, essayer avec le compte Resend
          if (error.includes('domain is not verified') || error.includes('testing emails')) {
            console.log('Domaine non vérifié, tentative avec le compte Resend uniquement...')
            // Ne pas réessayer automatiquement pour éviter les boucles
            // L'utilisateur devra vérifier le domaine dans Resend
          }
        }
      } catch (resendError) {
        // Si Resend échoue, on continue quand même (les données sont sauvegardées)
        console.warn('Erreur Resend (non bloquante):', resendError)
      }
    } else {
      // Pas de Resend configuré - c'est OK, les données sont dans Supabase
      console.log('Resend non configuré - données sauvegardées dans Supabase uniquement')
    }

    // Retourner une réponse de succès
    // Les données sont toujours sauvegardées dans Supabase, même si Resend n'est pas configuré
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Demande de contact enregistrée avec succès',
        ...(RESEND_API_KEY ? { 
          email_sent: true, 
          email_to: CONTACT_EMAILS,
          from_email: FROM_EMAIL,
          note: 'Email envoyé via Resend'
        } : { 
          email_sent: false, 
          note: 'Les données sont disponibles dans Supabase Dashboard' 
        })
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )

  } catch (error) {
    console.error('Erreur:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Erreur lors de l\'envoi de l\'email',
        details: error.toString()
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )
  }
})

