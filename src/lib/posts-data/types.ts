export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Guide' | 'Gear' | 'News' | 'Esports';
  image: string;
  content: string;
  /** Short TL;DR shown in a highlighted box before the table of contents. */
  summary?: string;
  /** Rendered as an FAQ accordion + FAQPage JSON-LD schema (AEO). */
  faqs?: { q: string; a: string }[];
}
