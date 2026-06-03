import type { Metadata } from "next";
import Link from 'next/link';
import { posts } from '@/lib/posts';
import blogStyles from './blog.module.css';

export const metadata: Metadata = {
    title: "Gaming Sensitivity & Aim Guides — Blog | DCPROSENS",
    description: "Step-by-step guides on mouse sensitivity conversion, eDPI, cm/360, DPI settings, and top gaming gear reviews for Valorant, CS2, Apex & more.",
    alternates: {
        canonical: "https://dcprosens.com/blog",
    },
    openGraph: {
        title: "Gaming Sensitivity & Aim Guides — Blog | DCPROSENS",
        description: "Step-by-step guides on sensitivity conversion, eDPI, and gaming gear for Valorant, CS2 and Apex.",
        type: "website",
        url: "https://dcprosens.com/blog",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gaming Sensitivity Guides — Blog | DCPROSENS",
        description: "Sensitivity conversion guides, eDPI calculator tips, and gear reviews.",
    },
};

// Sort posts by date (most recent first)
const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function BlogIndex() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "DCPROSENS Gaming Blog",
        "url": "https://dcprosens.com/blog",
        "description": "Expert guides on mouse sensitivity conversion, eDPI, cm/360, DPI and gaming gear.",
        "publisher": {
            "@type": "Organization",
            "name": "DCPROSENS",
            "url": "https://dcprosens.com",
        },
        "blogPost": sortedPosts.slice(0, 5).map((post) => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": `https://dcprosens.com/blog/${post.slug}`,
            "datePublished": post.date,
            "image": `https://dcprosens.com${post.image}`,
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
                marginBottom: '4rem',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                Master sensitivity conversion, eDPI, cm/360 and gaming gear. Expert guides for Valorant, CS2, Apex Legends and more.
            </p>

            <div className={blogStyles.grid}>
                {sortedPosts.map(post => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} style={{ display: 'block', height: '100%' }}>
                        <div className={blogStyles.card}>
                            <div className={blogStyles.category}>
                                {post.category ? post.category.toUpperCase() : 'GUIDE'}
                            </div>
                            <div className={blogStyles.meta}>
                                {post.readTime} • {post.date}
                            </div>
                            <h2 className={blogStyles.title}>
                                {post.title}
                            </h2>
                            <p className={blogStyles.excerpt}>
                                {post.excerpt}
                            </p>
                            <div className={blogStyles.readMore}>
                                Read Article →
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
