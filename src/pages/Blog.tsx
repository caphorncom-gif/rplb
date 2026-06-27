import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { OptimizedImage } from '../components/OptimizedImage'
import { ContactCTA } from '../components/ContactCTA'
import { supabase } from '../lib/supabase'
import { Calendar, Tag } from 'lucide-react'

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string | null
  featured_image: string | null
  category: string | null
  published_at: string | null
  tags: string[] | null
}

export const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      if (!supabase) return
      
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })

        if (error) throw error

        if (data) {
          setArticles(data as Article[])
        }
      } catch (error) {
        console.error('Erreur chargement articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const categories = Array.from(new Set(articles.map(a => a.category).filter((cat): cat is string => cat !== null)))

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <>
      <SEO
        title="Blog & Conseils Électricité - RPLB"
        description="Conseils, astuces et actualités sur l'électricité, la domotique et la sécurité électrique. Articles pratiques pour particuliers."
        keywords="blog électricité, conseils électricité, astuces électriques, actualités électricité"
      />

      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog & Conseils
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Conseils, astuces et actualités sur l'électricité et la domotique
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filtres */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {categories.length > 0 && (
              <select
                value={selectedCategory ?? ''}
                onChange={(e) => setSelectedCategory(e.target.value ? e.target.value : null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">Chargement...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun article trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {article.featured_image && (
                    <div className="h-48 overflow-hidden">
                      <OptimizedImage
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-full hover:scale-110 transition-transform duration-300"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {article.category && (
                      <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-3">
                        {article.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      {article.published_at && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(article.published_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{article.tags.length} tag(s)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

