import { useEffect, useState } from 'react'
import { SEO } from '../components/SEO'
import { ContactCTA } from '../components/ContactCTA'
import { supabase } from '../lib/supabase'
import { MapPin, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Realisation {
  id: string
  title: string
  description: string | null
  service_id: string | null
  before_image: string | null
  after_image: string | null
  location: string | null
  date: string | null
  is_featured: boolean
}

export const Realisations = () => {
  const [realisations, setRealisations] = useState<Realisation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const fetchRealisations = async () => {
      if (!supabase) return
      
      try {
        const { data, error } = await supabase
          .from('realisations')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data) {
          setRealisations(data as Realisation[])
        }
      } catch (error) {
        console.error('Erreur chargement réalisations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRealisations()
  }, [])

  const getImages = (realisation: Realisation): string[] => {
    const images: string[] = []
    if (realisation.after_image) images.push(realisation.after_image)
    if (realisation.before_image) images.push(realisation.before_image)
    return images
  }

  const openLightbox = (image: string, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    const allImages = realisations
      .flatMap(r => getImages(r))
      .filter(Boolean) as string[]
    
    if (direction === 'next') {
      const nextIndex = (selectedIndex + 1) % allImages.length
      setSelectedImage(allImages[nextIndex])
      setSelectedIndex(nextIndex)
    } else {
      const prevIndex = selectedIndex === 0 ? allImages.length - 1 : selectedIndex - 1
      setSelectedImage(allImages[prevIndex])
      setSelectedIndex(prevIndex)
    }
  }

  const allImages = realisations.flatMap(r => getImages(r)).filter(Boolean) as string[]

  return (
    <>
      <SEO
        title="Nos Réalisations - RPLB Électricité Oise"
        description="Découvrez nos réalisations électriques : installations, rénovations, dépannages pour particuliers et professionnels. Galerie de photos de nos travaux dans l'Oise."
        keywords="réalisations électricien, travaux électriques, photos, galerie, Oise"
      />

      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Réalisations
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Découvrez quelques-uns de nos projets réalisés dans l'Oise pour particuliers et professionnels
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Chargement...</p>
            </div>
          ) : realisations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucune réalisation disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {realisations.map((realisation) => {
                const images = getImages(realisation)
                const mainImage = images[0] || null
                
                return (
                  <div
                    key={realisation.id}
                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                  >
                    {/* Image principale */}
                    {mainImage ? (
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={mainImage}
                          alt={realisation.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        
                        {/* Overlay au survol */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center px-4">
                            {images.length > 1 && (
                              <p className="text-sm mb-2">
                                {images.length} photo{images.length > 1 ? 's' : ''}
                              </p>
                            )}
                            <p className="font-semibold">{realisation.title}</p>
                            {realisation.location && (
                              <p className="text-xs mt-1 opacity-90">
                                📍 {realisation.location}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Badge nombre de photos */}
                        {images.length > 1 && (
                          <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                            {images.length}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400">Pas d'image</span>
                      </div>
                    )}

                    {/* Titre et infos */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                        {realisation.title}
                      </h3>
                      {realisation.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {realisation.description}
                        </p>
                      )}
                      
                      {/* Métadonnées */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t">
                        {realisation.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-[120px]">{realisation.location}</span>
                          </div>
                        )}
                        {realisation.date && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(realisation.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Clic pour ouvrir lightbox */}
                    {mainImage && (
                      <button
                        onClick={() => {
                          const allImages = realisations.flatMap(r => getImages(r)).filter(Boolean) as string[]
                          const index = allImages.indexOf(mainImage)
                          openLightbox(mainImage, index >= 0 ? index : 0)
                        }}
                        className="absolute inset-0"
                        aria-label="Voir l'image en grand"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal Amélioré */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImage(null)
          }}
        >
          {/* Bouton fermer */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('prev')
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('next')
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Indicateur */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {selectedIndex + 1} / {allImages.length}
              </div>
            </>
          )}

          {/* Image */}
          <div className="max-w-7xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Agrandissement"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <ContactCTA />
    </>
  )
}
