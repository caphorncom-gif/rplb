import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Partner {
  name: string
  logo: string
  url: string
}

interface PartnersCarouselProps {
  partners?: Partner[]
}

const defaultPartners: Partner[] = [
  {
    name: 'Schneider Electric',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Schneider-Electric-Logo.png',
    url: 'https://www.schneider-electric.fr'
  },
  {
    name: 'Legrand',
    logo: 'https://www.legrand.fr/sites/default/files/styles/logo/public/logo_legrand.png',
    url: 'https://www.legrand.fr'
  },
  {
    name: 'Hager',
    logo: 'https://logos-world.net/wp-content/uploads/2021/03/Hager-Logo.png',
    url: 'https://www.hager.fr'
  },
  {
    name: 'Siemens',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Siemens-Logo.png',
    url: 'https://www.siemens.com'
  },
  {
    name: 'ABB',
    logo: 'https://logos-world.net/wp-content/uploads/2020/07/ABB-Logo.png',
    url: 'https://new.abb.com'
  },
  {
    name: 'Somfy',
    logo: 'https://www.somfy.fr/sites/default/files/media/brand/logo-somfy.png',
    url: 'https://www.somfy.fr'
  }
]

export const PartnersCarousel = ({ partners = defaultPartners }: PartnersCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  // Calculer le nombre de partenaires à afficher par slide
  const itemsPerSlide = 3 // 3 sur desktop, 2 sur tablet, 1 sur mobile
  const totalSlides = Math.ceil(partners.length / itemsPerSlide)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  if (partners.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Nos Partenaires
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
                >
                  {partners
                    .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                    .map((partner, index) => {
                      const partnerIndex = slideIndex * itemsPerSlide + index
                      return (
                        <div
                          key={partnerIndex}
                          className="bg-white rounded-lg shadow-md p-6 min-h-[180px] flex items-center justify-center hover:shadow-xl transition-shadow"
                        >
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full flex flex-col items-center justify-center group"
                          >
                            {!imageErrors[partnerIndex] ? (
                              <img
                                src={partner.logo}
                                alt={partner.name}
                                className="max-h-20 md:max-h-28 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                onError={() => handleImageError(partnerIndex)}
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center">
                                <div className="bg-primary/10 rounded-lg p-4 mb-3">
                                  <span className="text-3xl font-bold text-primary">
                                    {partner.name.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-base font-semibold text-gray-700 text-center">
                                  {partner.name}
                                </span>
                              </div>
                            )}
                          </a>
                        </div>
                      )
                    })}
                  {/* Remplir les cases vides pour garder la grille uniforme */}
                  {Array.from({ length: itemsPerSlide - (partners.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide).length) }).map((_, emptyIndex) => (
                    <div key={`empty-${emptyIndex}`} className="hidden lg:block" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Suivant"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller à la slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

