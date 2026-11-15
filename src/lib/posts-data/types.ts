export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  /**
   * Set this whenever you meaningfully revise a published post. It feeds
   * `dateModified` in the Article schema and `lastmod` in the sitemap, which
   * is how Google and AI retrieval judge whether a page is still current.
   * Without it `dateModified` just mirrors `date`, so a post revised months
   * later still looks untouched. Format: 'YYYY-MM-DD'.
   */
  updated?: string;
  readTime: string;
  category: 'Guide' | 'Gear' | 'News' | 'Esports';
  image: string;
  content: string;
  /** Short TL;DR shown in a highlighted box before the table of contents. */
  summary?: string;
  /** Rendered as an FAQ accordion + FAQPage JSON-LD schema (AEO). */
  faqs?: { q: string; a: string }[];
}
