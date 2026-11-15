import type { Metadata } from "next";
import Link from 'next/link';
import { resolveBlogImage } from '@/utils/blogImageResolver';
import { posts } from '@/lib/posts';
import BlogGridClient, { type BlogPostSummary } from './BlogGridClient';
import AdvertiseBanner from '@/components/AdvertiseBanner';

export const metadata: Metadata = {
    title: "Gaming Sensitivity & Aim Guides — Blog",
    description: "Step-by-step guides on mouse sensitivity conversion, eDPI, cm/360, DPI settings, and top gaming gear reviews for Valorant, CS2, Apex & more.",
    keywords: [
        // Blog / Content
        'gaming blog', 'gaming sensitivity blog', 'fps tips and guides', 'sensitivity guide',
        'gaming aim guide', 'aim improvement guide', 'how to improve aim fps', 'fps gaming tips 2026',
        'mouse sensitivity guide', 'gaming settings guide', 'competitive gaming guide',
        // Game specific articles
        'valorant tips 2026', 'valorant sensitivity guide', 'valorant aim guide', 'valorant settings guide',
        'cs2 guide', 'cs2 tips 2026', 'cs2 sensitivity settings', 'cs2 pro settings guide',
        'apex legends tips', 'apex legends settings guide', 'apex legends aim guide',
        'overwatch 2 sensitivity guide', 'fortnite settings guide', 'cod warzone settings',
        // Pro analysis
        'pro player analysis', 'pro gamer settings breakdown', 'tenz settings analysis',
        's1mple settings guide', 'zywoo cs2 settings breakdown', 'aspas valorant guide',
        'imperialhal settings', 'pro player gear review', 'esports settings database',
        // Topics
        'what is edpi guide', 'cm360 explained', 'mouse dpi guide', 'best gaming mouse guide',
        'mouse sensitivity explained', 'how to find perfect sensitivity', 'gaming monitor guide',
        'polling rate explained', 'raw input gaming', 'aim trainer tips', 'kovaaks guide',
        'aimlabs settings', 'crosshair guide valorant', 'best crosshair settings cs2',
    ],
    alternates: {
        canonical: "https://dcprosens.com/blog/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "Gaming Sensitivity & Aim Guides — Blog | DCPROSENS",
        description: "Step-by-step guides on sensitivity conversion, eDPI, and gaming gear for Valorant, CS2 and Apex.",
        type: "website",
        url: "https://dcprosens.com/blog/",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gaming Sensitivity Guides — Blog | DCPROSENS",
        description: "Sensitivity conversion guides, eDPI calculator tips, and gear reviews.",
        images: ["/og-image.png"],
    },
};

// Sort posts by date (most recent first) and extract only lightweight summary fields
const sortedPostSummaries: BlogPostSummary[] = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt && post.excerpt.length > 130 ? `${post.excerpt.slice(0, 130)}...` : (post.excerpt || ''),
        date: post.date,
        readTime: post.readTime,
        category: post.category,
        image: post.image,
    }));

export default function BlogIndex() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "DCPROSENS Gaming Blog",
        "url": "https://dcprosens.com/blog/",
        "description": "Expert guides on mouse sensitivity conversion, eDPI, cm/360, DPI and gaming gear.",
        "publisher": {
            "@type": "Organization",
            "name": "DCPROSENS",
            "url": "https://dcprosens.com/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://dcprosens.com/logo.webp"
            }
        },
        "blogPost": sortedPostSummaries.slice(0, 5).map((post) => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": `https://dcprosens.com/blog/${post.slug}/`,
            "datePublished": new Date(post.date).toISOString().split('T')[0],
            "image": `https://dcprosens.com${resolveBlogImage(post.image)}`,
        })),
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 style={{
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: '1rem',
                textAlign: 'center'
            }}>
                Gaming <span className="text-gradient">Sensitivity Guides</span>
            </h1>
            <p style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                Master sensitivity conversion, eDPI, cm/360 and gaming gear. Expert guides for Valorant, CS2, Apex Legends and more.
            </p>

            <BlogGridClient posts={sortedPostSummaries} initialCount={24} />

            {/* Fallback crawl index for search engines */}
            <noscript>
                <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Popular Sensitivity &amp; Aim Guides</h3>
                    <ul style={{ columns: '2 280px', listStyle: 'none', padding: 0 }}>
                        {sortedPostSummaries.slice(0, 36).map(post => (
                            <li key={post.slug} style={{ margin: '0.4rem 0' }}>
                                <Link href={`/blog/${post.slug}/`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </noscript>

            <AdvertiseBanner />
        </div>
    );
}
