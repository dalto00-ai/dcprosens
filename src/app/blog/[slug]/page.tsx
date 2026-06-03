import { posts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import SEOImage from '@/components/SEOImage';
import { mouseProducts, keyboardProduct } from '@/lib/affiliates';
import '../prose.css';

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

    return {
        title: post.title,
        description: post.excerpt,
        keywords,
        authors: [{ name: 'DCPROSENS', url: 'https://dcprosens.com' }],
        alternates: {
            canonical: `https://dcprosens.com/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            modifiedTime: new Date(post.date).toISOString(),
            url: `https://dcprosens.com/blog/${post.slug}`,
            siteName: 'DCPROSENS',
            locale: 'en_US',
            authors: ['https://dcprosens.com'],
            tags: keywords,
            images: [
                {
                    url: `https://dcprosens.com${post.image}`,
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
            images: [`https://dcprosens.com${post.image}`],
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

    // JSON-LD Structured Data — NewsArticle + ImageObject + BreadcrumbList
    const canonicalUrl = `https://dcprosens.com/blog/${post.slug}`;
    const imageUrl = `https://dcprosens.com${post.image}`;
    const publishDate = new Date(post.date).toISOString();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                // ✅ NewsArticle — required for Google News indexing
                '@type': 'NewsArticle',
                '@id': `${canonicalUrl}#article`,
                headline: post.title,
                description: post.excerpt,
                articleBody: post.excerpt,
                url: canonicalUrl,
                datePublished: publishDate,
                dateModified: publishDate,
                inLanguage: 'en-US',
                isAccessibleForFree: true,
                author: {
                    '@type': 'Person',
                    name: 'Dalto Outlier',
                    url: 'https://dcprosens.com/about',
                    jobTitle: 'Lead Aim Coach & Hardware Analyst',
                    sameAs: ['https://dcoutlier.com'],
                },
                publisher: {
                    '@type': 'Organization',
                    '@id': 'https://dcprosens.com#organization',
                    name: 'DCPROSENS',
                    url: 'https://dcprosens.com',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://dcprosens.com/logo.png',
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
                    license: 'https://dcprosens.com/terms',
                    acquireLicensePage: 'https://dcprosens.com/contact',
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
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dcprosens.com/blog' },
                    { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
                ],
            },
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

            <Link href="/blog" style={{
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

            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    fontSize: '1.1rem'
                }}
            />

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
                            Equipamentos de Elite Recomendados
                        </h3>
                    </div>
                    <p style={{ margin: '0 0 2rem 0', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Mouses ultra-leves topo de linha recomendados pelo Treinador Dalto para máxima precisão de sensor e consistência física no seu mousepad:
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
                                    rel="noopener noreferrer"
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
                                    Ver Preço na Amazon 🛒
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
                            Teclado Analógico Recomendado
                        </h3>
                    </div>
                    <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Para atirar com precisão milimétrica e parar de andar instantaneamente (Counter-Strafe), o recurso de **Rapid Trigger** magnético é indispensável no cenário competitivo:
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
                            rel="noopener noreferrer"
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
                            Ver Teclado na Amazon 🛒
                        </a>
                    </div>
                </div>
            )}

            {/* Dynamic Interactive Conversion CTA Box (Drive Tool Traffic) */}
            <div style={{
                marginTop: '3.5rem',
                background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.05) 0%, rgba(0, 242, 254, 0.02) 100%)',
                border: '1px solid var(--primary)',
                borderRadius: 'var(--radius-lg, 12px)',
                padding: '2.25rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px var(--primary-glow)'
            }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)', fontSize: '1.35rem', fontWeight: 800 }}>
                    🎯 Lock In Perfect 1:1 Aim & Pro Consistency
                </h4>
                <p style={{ margin: '0 0 1.75rem 0', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    Tired of daily aim inconsistency? Calibrate your physical cm/360, scope matching, and sensor latency. Get the complete <strong>Precision Aim System (4-Part Technical Manifestos)</strong> today for only <strong>$9.00 USD</strong>!
                </p>
                <Link href="/ebook" style={{
                    display: 'inline-block',
                    padding: '0.85rem 2.25rem',
                    background: 'var(--primary)',
                    color: '#000',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-full, 50px)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 14px var(--primary-glow)',
                    transition: 'transform 0.2s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Unlock Elite Precision ($9) ⚡
                </Link>
            </div>


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
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Dalto Outlier</h3>
                        <span style={{
                            background: 'rgba(0, 242, 254, 0.1)',
                            color: 'var(--primary, #00f2fe)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px',
                            border: '1px solid rgba(0, 242, 254, 0.2)'
                        }}>Lead Aim Coach &amp; Hardware Expert</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        Dalto is a veteran FPS aim coach and hardware analyst. Having trained hundreds of competitive players in Valorant and CS2, he specializes in mouse sensor technology, perfect sensitivity calibrations, and cognitive muscle memory optimization.
                    </p>
                </div>
            </div>

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
                        <Link href={`/blog/${rPost.slug}`} key={rPost.slug} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
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
        </article>
    );
}
