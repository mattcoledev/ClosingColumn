import { defineQuery } from 'next-sanity'

// Article card fields — used on homepage and category listing
const articleCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  "readTime": round(length(pt::text(body)) / 5 / 200),
  "author": author->{ name, bio },
  "coverImage": coverImage{ alt, "url": asset->url },
  homepageFeatured,
  featuredExpiry
`

// ─── Homepage ────────────────────────────────────────────────────────────────

export const FEATURED_ARTICLES_QUERY = defineQuery(`
  *[_type == "guestPost" && reviewStatus == "approved" && defined(publishedAt)]
  | order(publishedAt desc)[0...6] {
    ${articleCardFields}
  }
`)

export const EDITORS_PICK_QUERY = defineQuery(`
  *[
    _type == "guestPost" &&
    reviewStatus == "approved" &&
    homepageFeatured == true &&
    defined(publishedAt) &&
    (featuredExpiry == null || featuredExpiry > now())
  ] | order(publishedAt desc)[0] {
    ${articleCardFields}
  }
`)

export const RECENT_ARTICLES_QUERY = defineQuery(`
  *[_type == "guestPost" && reviewStatus == "approved" && defined(publishedAt)]
  | order(publishedAt desc)[0...8] {
    ${articleCardFields}
  }
`)

// ─── Article page ─────────────────────────────────────────────────────────────

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "guestPost" && slug.current == $slug && reviewStatus == "approved"][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    "readTime": round(length(pt::text(body)) / 5 / 200),
    body,
    "coverImage": coverImage{ alt, "url": asset->url },
    "author": author->{ name, bio, "avatar": avatar.asset->url, website }
  }
`)

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "guestPost" && reviewStatus == "approved" && defined(slug.current)] {
    "slug": slug.current
  }
`)

export const RELATED_ARTICLES_QUERY = defineQuery(`
  *[
    _type == "guestPost" &&
    reviewStatus == "approved" &&
    category == $category &&
    slug.current != $slug &&
    defined(publishedAt)
  ] | order(publishedAt desc)[0...3] {
    ${articleCardFields}
  }
`)

// ─── Category pages ───────────────────────────────────────────────────────────

export const CATEGORY_ARTICLES_QUERY = defineQuery(`
  *[_type == "guestPost" && reviewStatus == "approved" && category == $category && defined(publishedAt)]
  | order(publishedAt desc) {
    ${articleCardFields}
  }
`)

export const ARTICLE_COUNT_QUERY = defineQuery(`
  count(*[_type == "guestPost" && reviewStatus == "approved" && defined(publishedAt)])
`)
