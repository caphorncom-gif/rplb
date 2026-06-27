import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { OptimizedImage } from '../components/OptimizedImage'
import { ContactCTA } from '../components/ContactCTA'
import { supabase } from '../lib/supabase'
import { Calendar, User, ArrowLeft } from 'lucide-react'

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  featured_image: string | null
  author: string
  category: string | null
  published_at: string | null
  tags: string[] | null
}

export const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug || !supabase) return

      try {
        // Charger l'article
        const { data: articleData, error: articleError } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single()

        if (articleError) throw articleError

        if (articleData) {
          const article = articleData as Article
          setArticle(article)

          // Charger articles similaires
          if (article.category) {
            const { data: relatedData } = await supabase
              .from('articles')
              .select('*')
              .eq('is_published', true)
              .eq('category', article.category)
              .neq('id', article.id)
              .limit(3)

            if (relatedData) {
              setRelatedArticles(relatedData as Article[])
            }
          }
        }
      } catch (error) {
        console.error('Erreur chargement article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Chargement...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt || article.content.substring(0, 160)}
        keywords={article.tags?.join(', ')}
        type="article"
        publishedTime={article.published_at || undefined}
        author={article.author}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://www.rplb-electricite.fr/' },
          { name: 'Blog', url: 'https://www.rplb-electricite.fr/blog' },
          { name: article.title, url: `https://www.rplb-electricite.fr/blog/${article.slug}` }
        ]}
      />

      {/* Hero */}
      {article.featured_image && (
        <div className="h-96 overflow-hidden">
          <OptimizedImage
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full"
            objectFit="cover"
            loading="eager"
          />
        </div>
      )}

      {/* Contenu */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navigation retour */}
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au blog</span>
          </Link>

          {/* En-tête */}
          <header className="mb-8">
            {article.category && (
              <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-4">
                {article.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {article.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{article.author}</span>
              </div>
              {article.published_at && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(article.published_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
          </header>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Contenu */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <div className="whitespace-pre-line">
              {article.content}
            </div>
          </div>

          {/* Articles similaires */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-16 border-t">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Articles Similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {related.featured_image && (
                      <div className="h-32 overflow-hidden">
                        <OptimizedImage
                          src={related.featured_image}
                          alt={related.title}
                          className="w-full h-full"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {related.title}
                      </h3>
                      {related.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {related.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <ContactCTA />
    </>
  )
}

