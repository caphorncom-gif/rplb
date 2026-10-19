#!/usr/bin/env node
/**
 * Transforme un article markdown (avec en-tête YAML simple) en requête SQL
 * d'insertion dans public.articles, à coller dans le SQL Editor Supabase.
 *
 * Utilisation : node scripts/article-to-sql.mjs contenus/articles/<fichier>.md > article.sql
 *
 * En-tête attendu : slug, category, tags ([a, b]), seo_title, seo_description,
 * excerpt, published_at (ISO, facultatif : maintenant par défaut). Le titre est le premier « # » du contenu.
 * L'article n'apparaît sur le site qu'après le redéploiement suivant (pré-rendu au build).
 */
import { readFileSync } from 'node:fs'

const path = process.argv[2]
if (!path) {
  console.error('Usage : node scripts/article-to-sql.mjs <article.md>')
  process.exit(1)
}

const raw = readFileSync(path, 'utf8')
const match = raw.match(/^---\n([\s\S]*?)\n---\n+([\s\S]*)$/)
if (!match) {
  console.error('❌ En-tête --- … --- introuvable')
  process.exit(1)
}

const meta = {}
for (const line of match[1].split('\n')) {
  const i = line.indexOf(':')
  if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
}
const content = match[2].trimEnd() + '\n'
const title = content.match(/^# (.+)$/m)?.[1]?.trim()

for (const key of ['slug', 'category', 'seo_title', 'seo_description', 'excerpt']) {
  if (!meta[key]) {
    console.error(`❌ Champ manquant dans l'en-tête : ${key}`)
    process.exit(1)
  }
}
if (!title) {
  console.error('❌ Titre « # … » introuvable dans le contenu')
  process.exit(1)
}
if (meta.seo_title.length > 60) console.error(`⚠️  seo_title : ${meta.seo_title.length} caractères (> 60)`)
if (meta.seo_description.length > 160) console.error(`⚠️  seo_description : ${meta.seo_description.length} caractères (> 160)`)

const tags = (meta.tags || '')
  .replace(/^\[|\]$/g, '')
  .split(',')
  .map((t) => t.trim())
  .filter(Boolean)

const q = (s) => `'${String(s).replace(/'/g, "''")}'`
// Dollar-quoting pour le contenu : pas d'échappement à gérer dans le markdown.
const tagDollar = '$article$'
if (content.includes(tagDollar)) {
  console.error('❌ Le contenu contient $article$')
  process.exit(1)
}

console.log(`-- Article : ${title}
insert into public.articles
  (slug, title, excerpt, content, author, category, tags, seo_title, seo_description, is_published, published_at)
values (
  ${q(meta.slug)},
  ${q(title)},
  ${q(meta.excerpt)},
  ${tagDollar}${content}${tagDollar},
  'RPLB Électricité',
  ${q(meta.category)},
  array[${tags.map(q).join(', ')}]::text[],
  ${q(meta.seo_title)},
  ${q(meta.seo_description)},
  true,
  ${meta.published_at ? q(meta.published_at) : 'now()'}
)
on conflict (slug) do nothing
returning slug, title, published_at;`)
