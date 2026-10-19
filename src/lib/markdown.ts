/**
 * Rendu markdown minimal pour le contenu des articles (table `articles`).
 *
 * Partagé par la page React (ArticleDetail.tsx) et le pré-rendu
 * (scripts/prerender.mjs) : le HTML brut servi aux crawlers et celui rendu
 * par le JS restent identiques.
 *
 * Syntaxe couverte (celle des articles du site) : titres #/##/###/####,
 * paragraphes, listes à puces (- ou *), listes numérotées (1.), **gras**,
 * *italique*, [liens](/chemin). Le texte est échappé avant tout balisage :
 * aucune balise HTML du contenu n'est interprétée.
 */

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Liens internes, http(s), tel: et mailto: uniquement.
const SAFE_HREF = /^(\/|#|https?:\/\/|tel:|mailto:)/i

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
      if (!SAFE_HREF.test(href)) return label
      const external = /^https?:\/\//i.test(href)
      return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
}

export interface RenderMarkdownOptions {
  /** Retire le titre « # … » d'ouverture (la page affiche déjà son propre H1). */
  dropLeadingH1?: boolean
}

export function renderMarkdown(md: string, options: RenderMarkdownOptions = {}): string {
  const lines = String(md || '').replace(/\r\n?/g, '\n').split('\n')
  const out: string[] = []
  let paragraph: string[] = []
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null
  let first = true

  const flushParagraph = () => {
    if (paragraph.length) out.push(`<p>${inline(paragraph.join(' '))}</p>`)
    paragraph = []
  }
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`)
    list = null
  }
  const flush = () => {
    flushParagraph()
    flushList()
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      flush()
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      flush()
      const isFirst = first
      first = false
      if (heading[1].length === 1 && isFirst && options.dropLeadingH1) continue
      // Un seul H1 par page (celui du gabarit) : « # » dans le corps devient H2.
      const level = Math.max(2, heading[1].length)
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`)
      continue
    }
    first = false

    const bullet = line.match(/^[-*]\s+(.+)$/)
    const numbered = line.match(/^\d+[.)]\s+(.+)$/)
    if (bullet || numbered) {
      flushParagraph()
      const tag = bullet ? 'ul' : 'ol'
      if (list && list.tag !== tag) flushList()
      if (!list) list = { tag, items: [] }
      list.items.push((bullet || numbered)![1])
      continue
    }

    flushList()
    paragraph.push(line)
  }
  flush()
  return out.join('\n')
}
