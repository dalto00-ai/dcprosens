import { posts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import SEOImage from '@/components/SEOImage';
import { resolveBlogImage } from '@/utils/blogImageResolver';
import { seoTitle, seoDescription } from '@/utils/seoText';
import { mouseProducts, keyboardProduct } from '@/lib/affiliates';
import AdvertiseBanner from '@/components/AdvertiseBanner';
import PartnerBanner from '@/components/PartnerBanner';
import '../prose.css';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import ArticleEbookFunnel from '@/components/ArticleEbookFunnel';

interface TocEntry {
    id: string;
    text: string;
}

function slugifyHeading(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

/**
 * Extracts every <h2> in the post content for the table of contents, and
 * returns the same HTML with an id="" injected into each <h2> so the TOC
 * links actually land somewhere. Content is authored HTML (not markdown),
 * so this is a light regex pass rather than a full parser.
 */
function buildTocAndAnchoredContent(html: string): { toc: TocEntry[]; html: string } {
    const toc: TocEntry[] = [];
    const seen = new Set<string>();
    const anchored = html.replace(/<h2>(.*?)<\/h2>/g, (_match, inner: string) => {
        const text = inner.replace(/<[^>]+>/g, '');
        let id = slugifyHeading(text);
        if (seen.has(id)) {
            let i = 2;
            while (seen.has(`${id}-${i}`)) i++;
            id = `${id}-${i}`;
        }
        seen.add(id);
        toc.push({ id, text });
        return `<h2 id="${id}">${inner}</h2>`;
    });
    return { toc, html: anchored };
}

interface Props {
    params: Promise<{ slug: string }>;
}

// Prevent dynamic rendering for unknown slugs — return 404 immediately
export const dynamicParams = false;

// 1. Generate Static Params for SSG/Export
export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// 2. Generate Metadata (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const keywords = [
        'gaming sensitivity', 'fps settings', 'pro player settings',
        post.category?.toLowerCase() ?? 'gaming',
        ...post.slug.split('-').filter((w) => w.length > 3),
    ];

    // The <h1> keeps post.title in full; search results only ever render the
    // first ~60 characters, and on the longest headlines here the cut lands
    // before the part that identifies the article. Same for the excerpt.
    const metaTitle = seoTitle(post.title);
    const metaDescription = seoDescription(post.excerpt);

    return {
        title: metaTitle,
        description: metaDescription,
        keywords,
        authors: [{ name: 'Dalto Cardoso', url: 'https://dcprosens.com/about/' }],
        alternates: {
            canonical: `https://dcprosens.com/blog/${post.slug}/`,
        },
        openGraph: {
            // Social cards have more room than a SERP, so they keep the full headline.
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            modifiedTime: new Date(post.date).toISOString(),
            url: `https://dcprosens.com/blog/${post.slug}/`,
            siteName: 'DCPROSENS',
            locale: 'en_US',
            authors: ['https://dcprosens.com/about/'],
            tags: keywords,
            images: [
                {
                    url: `https://dcprosens.com${resolveBlogImage(post.image)}`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [`https://dcprosens.com${resolveBlogImage(post.image)}`],
            creator: '@dcprosens',
        },
    };
}

// 3. Page Component
export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // JSON-LD Structured Data — Article + ImageObject + BreadcrumbList
    // Trailing slash matters: `trailingSlash: true` means the served canonical
    // is /blog/<slug>/, so the schema @id and mainEntityOfPage have to carry it
    // too or they point at a URL that only 301s to the real one.
    const canonicalUrl = `https://dcprosens.com/blog/${post.slug}/`;
    const imageUrl = `https://dcprosens.com${resolveBlogImage(post.image)}`;
    const publishDate = new Date(post.date).toISOString();
    // Falls back to the publish date when a post has never been revised, but
    // reflects a real revision the moment `updated` is set on the post.
    const modifiedDate = post.updated ? new Date(post.updated).toISOString() : publishDate;
    const { toc, html: anchoredContent } = buildTocAndAnchoredContent(post.content);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                // Article, not NewsArticle — this blog is evergreen guides/reference
                // content, not news. Google's own guidance says NewsArticle is for
                // the news cycle only; using it on evergreen content "confuses the
                // parser" and can trigger a manual action for structured data misuse,
                // and evergreen content performs poorly in Discover under NewsArticle
                // regardless. Switched 2026-08-23 after confirming via Search Central docs.
                '@type': 'Article',
                '@id': `${canonicalUrl}#article`,
                headline: post.title,
                description: post.excerpt,
                url: canonicalUrl,
                datePublished: publishDate,
                dateModified: modifiedDate,
                inLanguage: 'en-US',
                isAccessibleForFree: true,
                author: {
                    '@type': 'Person',
                    '@id': 'https://dcprosens.com/about/#author',
                    name: 'Dalto Cardoso',
                    alternateName: 'Dalto Outlier',
                    url: 'https://dcprosens.com/about/',
                    jobTitle: 'Founder & Lead Engineer, DCPROSENS',
                    sameAs: [
                        'https://www.linkedin.com/in/dalto-cardoso-2a47ab122/',
                        'https://www.instagram.com/dcprosensofficial/',
                        'https://www.tiktok.com/@dcprosens',
                        'https://x.com/dcprosens',
                        'https://dcoutlier.com',
                    ],
                },
                publisher: {
                    '@type': 'Organization',
                    '@id': 'https://dcprosens.com#organization',
                    name: 'DCPROSENS',
                    url: 'https://dcprosens.com/',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://dcprosens.com/logo.webp',
                        width: 200,
                        height: 60,
                    },
                },
                // ✅ ImageObject — required for Google Images rich results
                image: {
                    '@type': 'ImageObject',
                    '@id': `${canonicalUrl}#primaryimage`,
                    url: imageUrl,
                    contentUrl: imageUrl,
                    width: 1200,
                    height: 630,
                    caption: post.title,
                    name: post.title,
                    description: post.excerpt,
                    inLanguage: 'en-US',
                    representativeOfPage: true,
                    license: 'https://dcprosens.com/terms/',
                    acquireLicensePage: 'https://dcprosens.com/contact/',
                    creator: {
                        '@type': 'Organization',
                        name: 'DCPROSENS',
                        url: 'https://dcprosens.com/',
                    },
                    creditText: 'DCPROSENS',
                    copyrightNotice: `© ${new Date(post.date).getFullYear()} DCPROSENS`,
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': canonicalUrl,
                },
                articleSection: post.category ?? 'Gaming',
                wordCount: post.content.replace(/<[^>]+>/g, '').split(/\s+/).length,
                keywords: [
                    'gaming sensitivity',
                    'fps settings',
                    'pro player settings',
                    post.category ?? 'gaming',
                    ...post.slug.split('-').filter((w) => w.length > 4),
                ].join(', '),
                speakable: {
                    '@type': 'SpeakableSpecification',
                    cssSelector: ['h1', 'h2', '.prose p:first-of-type'],
                },
            },
            {
                // ✅ BreadcrumbList — navigational schema
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dcprosens.com/blog/' },
                    { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
                ],
            },
            // ✅ FAQPage — only added when the post has structured FAQ data
            // (AEO: lets Google/AI assistants lift a direct answer out of the page)
            ...(post.faqs && post.faqs.length > 0
                ? [
                      {
                          '@type': 'FAQPage',
                          mainEntity: post.faqs.map((f) => ({
                              '@type': 'Question',
                              name: f.q,
                              acceptedAnswer: { '@type': 'Answer', text: f.a },
                          })),
                      },
                  ]
                : []),
        ],
    };

    // Filter 3 related articles (same category if possible, fallback to newest)
    const relatedPosts = posts
        .filter((p) => p.slug !== post.slug && p.category === post.category)
        .slice(0, 3);

    if (relatedPosts.length < 3) {
        const extraPosts = posts
            .filter((p) => p.slug !== post.slug && !relatedPosts.some((r) => r.slug === p.slug))
            .slice(0, 3 - relatedPosts.length);
        relatedPosts.push(...extraPosts);
    }

    return (
        <article className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link href="/blog/" style={{
                display: 'inline-block',
                marginBottom: '2rem',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                ← Back to Blog
            </Link>

            <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    lineHeight: 1.1,
                    marginBottom: '1.5rem',
                    fontWeight: 800
                }}>
                    {post.title}
                </h1>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>

                <SEOImage
                    src={post.image}
                    alt={post.title}
                    priority={true}
                    caption="Featured Image"
                />
            </header>

            {post.summary && (
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--primary)',
                    borderRadius: 'var(--radius-md, 8px)',
                    padding: '1.25rem 1.5rem',
                    marginBottom: '2.5rem',
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--primary)',
                        marginBottom: '0.5rem',
                    }}>
                        TL;DR
                    </p>
                    <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1.02rem' }}>
                        {post.summary}
                    </p>
                </div>
            )}

            {toc.length >= 3 && (
                <nav
                    aria-label="Table of contents"
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md, 8px)',
                        padding: '1.25rem 1.5rem',
                        marginBottom: '2.5rem',
                    }}
                >
                    <p style={{
                        margin: '0 0 0.75rem',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-muted)',
                    }}>
                        In This Article
                    </p>
                    <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {toc.map((entry) => (
                            <li key={entry.id} style={{ fontSize: '0.95rem' }}>
                                <a href={`#${entry.id}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                                    {entry.text}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            )}

            <PartnerBanner slot="inContent" />

            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: anchoredContent }}
                style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    fontSize: '1.1rem'
                }}
            />

            {post.faqs && post.faqs.length > 0 && (
                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                        Frequently Asked Questions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {post.faqs.map((item) => (
                            <details
                                key={item.q}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md, 8px)',
                                    padding: '1.1rem 1.35rem',
                                }}
                            >
                                <summary style={{ color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                                    {item.q}
                                </summary>
                                <p style={{ marginTop: '0.65rem', marginBottom: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    {item.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            )}

            {/* Programmatic Amazon Affiliate Products Integration */}
            {(post.slug.includes('mouse') || post.slug.includes('weight') || post.slug.includes('setup')) && (
                <div style={{
                    marginTop: '3.5rem',
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg, 12px)',
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>🔥</span>
                        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            Pro-Recommended Esports Gear
                        </h3>
                    </div>
                    <p style={{ margin: '0 0 2rem 0', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Top-tier ultralight mice recommended for tournament sensor precision and mousepad tracking consistency:
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {mouseProducts.map((prod) => (
                            <div key={prod.id} style={{
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                padding: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '1rem'
                            }}>
                                <div>
                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                                        {prod.badge}
                                    </span>
                                    <h4 style={{ margin: '0.25rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                                        {prod.title}
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                        {prod.description}
                                    </p>
                                </div>
                                <a 
                                    href={prod.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer sponsored"
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '0.6rem 1rem',
                                        background: 'var(--primary)',
                                        color: '#000',
                                        fontWeight: 700,
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '0.85rem',
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    Check Price on Amazon 🛒
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Keyboard Rapid Trigger Affiliate Integration */}
            {(post.slug.includes('keyboard') || post.slug.includes('keybind')) && (
                <div style={{
                    marginTop: '3.5rem',
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg, 12px)',
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>⌨️</span>
                        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            Pro-Recommended Magnetic Keyboard
                        </h3>
                    </div>
                    <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        For pixel-perfect counter-strafing and instant movement reset, analog magnetic <strong>Rapid Trigger</strong> switches are essential in competitive FPS:
                    </p>

                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                                {keyboardProduct.badge}
                            </span>
                            <h4 style={{ margin: '0.25rem 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                                {keyboardProduct.title}
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                {keyboardProduct.description}
                            </p>
                        </div>
                        <a 
                            href={keyboardProduct.link} 
                            target="_blank" 
                            rel="noopener noreferrer sponsored"
                            style={{
                                display: 'inline-block',
                                alignSelf: 'flex-start',
                                padding: '0.75rem 2rem',
                                background: 'var(--primary)',
                                color: '#000',
                                fontWeight: 700,
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                transition: 'transform 0.2s'
                            }}
                        >
                            Check Keyboard on Amazon 🛒
                        </a>
                    </div>
                </div>
            )}

            {/* Dynamic Contextual eBook Conversion Funnel */}
            <ArticleEbookFunnel slug={post.slug} category={post.category} />


            {/* Author Bio Section (E-E-A-T) */}
            <hr style={{ border: '0', borderTop: '1px solid var(--border-color)', margin: '4rem 0 3rem 0' }} />


            <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                background: 'var(--bg-card, #121214)',
                border: '1px solid var(--border-color, #232326)',
                borderRadius: 'var(--radius-md, 8px)',
                padding: '2rem',
                marginBottom: '4rem',
                flexWrap: 'wrap'
            }}>
                <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary, #00f2fe) 0%, #4facfe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#000',
                    flexShrink: 0
                }}>
                    DO
                </div>
                <div style={{ flex: '1', minWidth: '250px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            <Link href="/about/" style={{ color: 'inherit', textDecoration: 'none' }}>
                                Dalto Cardoso (Dalto Outlier)
                            </Link>
                        </h3>
                        <span style={{
                            background: 'rgba(0, 242, 254, 0.1)',
                            color: 'var(--primary, #00f2fe)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px',
                            border: '1px solid rgba(0, 242, 254, 0.2)'
                        }}>✓ Verified Founder, DCPROSENS</span>
                    </div>
                    <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        Software developer and founder of DCPROSENS (DCOUTLIER). Dalto engineers precision sensitivity calculators, yaw telemetry databases, and hardware calibration guides for competitive FPS players.
                    </p>
                    <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', fontSize: '0.82rem', fontWeight: 700 }}>
                        <a href="https://www.linkedin.com/in/dalto-cardoso-2a47ab122/" target="_blank" rel="me noopener noreferrer" style={{ color: '#00ff9d', textDecoration: 'none' }}>
                            💼 LinkedIn ↗
                        </a>
                        <a href="https://www.instagram.com/dcprosensofficial/" target="_blank" rel="me noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                            📸 Instagram ↗
                        </a>
                        <a href="https://www.tiktok.com/@dcprosens" target="_blank" rel="me noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                            🎵 TikTok ↗
                        </a>
                        <Link href="/about/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                            📖 Editorial Methodology →
                        </Link>
                    </div>
                </div>
            </div>

            <AdvertiseBanner />

            {/* Related Articles Section */}
            <div style={{ marginTop: '4rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-primary)' }}>
                    Related Guides &amp; Articles
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    {relatedPosts.map((rPost) => (
                        <Link href={`/blog/${rPost.slug}/`} key={rPost.slug} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                            <div style={{
                                background: 'var(--bg-card, #121214)',
                                border: '1px solid var(--border-color, #232326)',
                                borderRadius: 'var(--radius-md, 8px)',
                                padding: '1.25rem',
                                transition: 'transform 0.2s ease, border-color 0.2s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    aspectRatio: '16/9',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    background: 'var(--bg-body, #0a0a0c)'
                                }}>
                                    <SEOImage src={rPost.image} alt={rPost.title} priority={false} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                                    <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        margin: '0 0 0.5rem 0',
                                        lineHeight: '1.4',
                                        color: 'var(--text-primary)',
                                    }}>
                                        {rPost.title}
                                    </h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #7c7c82)' }}>
                                        {rPost.date} • {rPost.readTime}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <AffiliateDisclosure />
        </article>
    );
}
