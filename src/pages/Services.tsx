import { useEffect, useState } from 'react'
import { ServiceCard } from '../components/ServiceCard'
import { SEO } from '../components/SEO'
import { ContactCTA } from '../components/ContactCTA'
import { supabase } from '../lib/supabase'
import * as LucideIcons from 'lucide-react'

interface Service {
  id: string
  slug: string
  title: string
  icon: string
  short_description: string
  price_info: string
  image: string | null
}

export const Services = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      if (!supabase) return
      
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true })

        if (error) throw error

        if (data) {
          setServices(data as Service[])
        }
      } catch (error) {
        console.error('Erreur chargement services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || LucideIcons.Zap
  }

  return (
    <>
      <SEO
        title="Nos Services Électricité - RPLB | Oise"
        description="Installation, dépannage, rénovation électrique, domotique, alarme. Services pour particuliers et professionnels. Électricien professionnel à Longueil-Sainte-Marie."
        keywords="services électricité, installation électrique, dépannage, rénovation, domotique, Oise"
      />

      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Services Électricité
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Solutions complètes pour tous vos besoins en électricité, de l'installation à la maintenance. Pour particuliers et professionnels.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">Chargement...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = getIcon(service.icon)
                return (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    slug={service.slug}
                    title={service.title}
                    icon={Icon}
                    shortDescription={service.short_description}
                    priceInfo={service.price_info}
                    image={service.image || undefined}
                  />
                )
              })}
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

