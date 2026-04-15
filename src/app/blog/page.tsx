import type { Metadata } from "next";
import Link from 'next/link';
import { posts } from '@/lib/posts';
import blogStyles from './blog.module.css';

export const metadata: Metadata = {
    title: "Gaming Blog",
    description: "Expert guides on mouse sensitivity conversion, eDPI, cm/360, DPI settings, and the best gaming gear. Level up your aim with DCPROSENS.",
    alternates: {
        canonical: "https://dcprosens.com/blog",
    },
    openGraph: {
        title: "Gaming Blog | DCPROSENS — Sensitivity Guides & Gear Reviews",
        description: "Expert guides on sensitivity conversion, eDPI, and gaming gear.",
        type: "website",
        url: "https://dcprosens.com/blog",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gaming Blog | DCPROSENS",
        description: "Expert guides on sensitivity conversion, eDPI, and gaming gear.",
    },
};

// Sort posts by date (most recent first)
const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function BlogIndex() {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 style={{
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: '1rem',
                textAlign: 'center'
            }}>
                Gaming <span className="text-gradient">Insights</span>
            </h1>
            <p style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginBottom: '4rem',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                Master your hardware, optimize your settings, and learn the math behind the aim.
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
