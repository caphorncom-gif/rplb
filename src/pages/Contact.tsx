import { useState, useEffect } from 'react'
import { SEO } from '../components/SEO'
import { supabase } from '../lib/supabase'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { useConversionTracking } from '../hooks/useTracking'

interface Service {
  id: string
  slug: string
  title: string
}

export const Contact = () => {
  const { trackFormSubmission, trackPhoneCall, trackEmailClick } = useConversionTracking()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    service_type: '',
    message: ''
  })
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      if (!supabase) return
      
      const { data } = await supabase
        .from('services')
        .select('id, slug, title')
        .eq('is_active', true)
        .order('title')

      if (data) {
        setServices(data as Service[])
      }
    }

    fetchServices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Sauvegarder dans Supabase
      if (supabase) {
        const { data: insertData, error: submitError } = await supabase
          .from('contact_requests')
          .insert([{
            ...formData,
            urgency: 'Planifier', // Valeur par défaut pour compatibilité
            budget_range: '' // Valeur par défaut pour compatibilité
          }] as any)
          .select()

        if (submitError) {
          console.error('Erreur sauvegarde Supabase:', submitError)
          throw submitError
        } else {
          console.log('Données sauvegardées dans Supabase:', insertData)
        }
      }

      // Suivre la conversion
      trackFormSubmission('contact_form', {
        service_type: formData.service_type,
        city: formData.city
      })

      // Envoyer l'email via Supabase Edge Function
      if (supabase) {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
        
        if (supabaseUrl && supabaseAnonKey) {
          try {
            const { data: functionData, error: functionError } = await supabase.functions.invoke(
              'send-contact-email',
              {
                body: {
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  address: formData.address || '',
                  city: formData.city || '',
                  service_type: formData.service_type || '',
                  message: formData.message
                }
              }
            )

            if (functionError) {
              console.error('Erreur envoi email:', functionError)
              // Ne pas bloquer si l'email échoue, la donnée est déjà sauvegardée
            } else {
              console.log('Email envoyé avec succès:', functionData)
            }
          } catch (emailError) {
            console.error('Erreur lors de l\'appel de la fonction email:', emailError)
            // Ne pas bloquer si l'email échoue
          }
        }
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        service_type: '',
        message: ''
      })
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || '03 XX XX XX XX'
  const mobileNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'
  const email = 'rplb.electricite@gmail.com'
  const address = import.meta.env.VITE_BUSINESS_ADDRESS || 'Longueil-Sainte-Marie, 60126'

  return (
    <>
      <SEO
        title="Contact RPLB Électricité | Devis Gratuit Oise"
        description="Contactez RPLB Électricité pour un devis gratuit. Services pour particuliers et professionnels. Intervention rapide dans l'Oise. Téléphone, email, formulaire de contact."
        keywords="contact électricien, devis gratuit, électricien Oise, Longueil-Sainte-Marie"
      />

      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Demandez un devis gratuit ou prenez rendez-vous pour une intervention. Pour particuliers et professionnels.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Informations de contact */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Nos Coordonnées
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Téléphone</p>
                    <p className="text-gray-700">
                      <span className="font-medium">Romain Pagnier :</span>{' '}
                      <a 
                        href={`tel:${phoneNumber.replace(/\s/g, '')}`} 
                        className="text-gray-600 hover:text-primary"
                        onClick={() => trackPhoneCall(phoneNumber)}
                      >
                        {phoneNumber}
                      </a>
                    </p>
                    <p className="text-gray-700 mt-1">
                      <span className="font-medium">Ludovic Bozo :</span>{' '}
                      <a 
                        href={`tel:${mobileNumber.replace(/\s/g, '')}`} 
                        className="text-gray-600 hover:text-primary"
                        onClick={() => trackPhoneCall(mobileNumber)}
                      >
                        {mobileNumber}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a 
                      href={`mailto:${email}`} 
                      className="text-gray-600 hover:text-primary break-all"
                      onClick={() => trackEmailClick(email)}
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Adresse</p>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Horaires</p>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Lun-Ven: 8h - 18h</p>
                      <p>Samedi: Fermé</p>
                      <p>Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Google Maps */}
              <div className="mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49442.135987818096!2d2.6630131660486356!3d49.345192498371574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e7d2b849ee8c61%3A0x40af13e81643920!2s60126%20Longueil-Sainte-Marie!5e1!3m2!1sen!2sfr!4v1762208028188!5m2!1sen!2sfr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Localisation RPLB Électricité - Longueil-Sainte-Marie"
                />
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Envoyez-nous un message
              </h2>

              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-2">
                    Type de service
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Sélectionnez un service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Décrivez votre projet ou votre besoin..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

