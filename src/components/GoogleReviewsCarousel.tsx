import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

interface GoogleReview {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date?: string
  visitDate?: string
}

interface GoogleReviewsCarouselProps {
  googleReviewsUrl?: string
  averageRating?: number
  totalReviews?: number
}

const googleReviews: GoogleReview[] = [
  {
    id: '1',
    reviewerName: 'Severine Leclercq',
    rating: 5,
    comment: 'Merci romain et ludo. Travail très professionnel pour ma cuisine et mon tableau électrique refait à neuf. Je recommande fortement travail très bien, propre et professionnel. Vous pouvez y aller les yeux fermés',
    date: 'il y a un an',
    visitDate: 'Visité en juillet 2024'
  },
  {
    id: '2',
    reviewerName: 'Marie-Christelle Chagot',
    rating: 5,
    comment: 'Entreprise sérieuse et très réactive à laquelle je fais appel sans hésiter régulièrement depuis l\'achat de mon appartement en 2020.',
    date: 'il y a 10 mois',
    visitDate: 'Visité en novembre 2024'
  },
  {
    id: '3',
    reviewerName: 'Pierre AUBERT',
    rating: 5,
    comment: 'Merci Romain et Ludovic pour votre réactivité et votre professionnalisme. Intervention de qualité. Vous pouvez y aller les yeux fermés.',
    date: 'il y a un an',
    visitDate: 'Visité en janvier 2024'
  },
  {
    id: '4',
    reviewerName: 'ANGELE POCTHIER',
    rating: 5,
    comment: 'Rénovation totale de l\'électricité. Travail très professionnel et donne de très bons conseils, nettoyage du chantier au fur et à mesure. Information chaque jour de l\'avancement des travaux. Rien à redire. Personnes très consciencieuses.',
    date: 'il y a 2 ans',
    visitDate: 'Visité en février 2024'
  },
  {
    id: '5',
    reviewerName: 'Constance BARBIER',
    rating: 5,
    comment: 'Beaucoup de sérieux. De très bon conseils, très polis :) je les recommande à 100%',
    date: 'il y a 4 ans',
    visitDate: 'Visité en avril 2021'
  },
  {
    id: '6',
    reviewerName: 'Sandra Elisange',
    rating: 5,
    comment: 'Société sérieuse, de très bons conseils. Je recommande à 100%. Service au top !',
    date: 'il y a 4 ans',
    visitDate: 'Visité en janvier 2021'
  },
  {
    id: '7',
    reviewerName: 'Daniel Boivent',
    rating: 5,
    comment: 'Artisans sérieux et compétents, je les recommande très vivement.',
    date: 'il y a 4 ans',
    visitDate: 'Visité en juin 2021'
  },
  {
    id: '8',
    reviewerName: 'Ingrid 23',
    rating: 5,
    comment: 'Beaucoup de sérieux, très réactif, de bons conseils, je recommande vivement.',
    date: 'il y a 4 ans',
    visitDate: 'Visité en février 2021'
  }
]

export const GoogleReviewsCarousel = ({
  googleReviewsUrl = 'https://www.google.com/search?sa=X&sca_esv=7a941e0d451f7f12&hl=fr-FR&tbm=lcl&q=RPLB+Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDS2NDE2NrE0sjQwNTYyszQwMtvAyPiKkTMowMdJwbEss3gRK4INAOA0f1QzAAAA&rldimm=11394334929053269026&ved=2ahUKEwiLyurDgdeQAxV2VqQEHRigAucQ9fQKegQIQxAF&biw=1722&bih=913&dpr=2#lkt=LocalPoiReviews',
  averageRating = 5.0,
  totalReviews = googleReviews.length
}: GoogleReviewsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % googleReviews.length)
    }, 5000) // Change toutes les 5 secondes

    return () => clearInterval(interval)
  }, [isAutoPlaying, googleReviews.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev === 0 ? googleReviews.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % googleReviews.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const currentReview = googleReviews[currentIndex]

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary-dark/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* En-tête avec note moyenne */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <h2 className="text-3xl font-bold text-gray-900">
                Nos Avis Google
              </h2>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating)
                        ? 'fill-accent text-accent'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                <p className="text-sm text-gray-600">{totalReviews} avis</p>
              </div>
            </div>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-medium"
            >
              <span>Voir tous nos avis sur Google</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Carrousel d'avis */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 min-h-[400px] flex flex-col">
              {/* Avis actuel */}
              <div className="flex-grow flex flex-col justify-center">
                {/* Étoiles */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < currentReview.rating
                          ? 'fill-accent text-accent'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Commentaire */}
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic leading-relaxed">
                  "{currentReview.comment}"
                </blockquote>

                {/* Informations client */}
                <div className="border-t pt-6 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {currentReview.reviewerName}
                      </div>
                      {currentReview.date && (
                        <div className="text-sm text-gray-500 mt-1">
                          {currentReview.date}
                        </div>
                      )}
                      {currentReview.visitDate && (
                        <div className="text-xs text-gray-400 mt-1">
                          {currentReview.visitDate}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {currentIndex + 1} / {googleReviews.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Avis suivant"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {googleReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller à l'avis ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Lien pour laisser un avis */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Vous avez fait appel à nos services ? Laissez-nous un avis !
            </p>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <span>Laisser un avis sur Google</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


