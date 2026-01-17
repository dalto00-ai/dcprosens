import Link from 'next/link';
import { posts } from '@/lib/posts';
import styles from '@/components/Converter.module.css';

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

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {posts.map(post => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} style={{ display: 'block', height: '100%' }}>
                        <div style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s, border-color 0.2s',
                        }}
                            className="hover-card"
                        >
                            <div style={{
                                display: 'inline-block',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: 'var(--primary)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                marginBottom: '1rem',
                                width: 'fit-content'
                            }}>
                                {post.category ? post.category.toUpperCase() : 'GUIDE'}
                            </div>
                            <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                {post.readTime} • {post.date}
                            </div>
                            <h2 style={{
                                fontSize: '1.5rem',
                                marginBottom: '1rem',
                                lineHeight: 1.3,
                                color: 'var(--text-primary)'
                            }}>
                                {post.title}
                            </h2>
                            <p style={{
                                color: 'var(--text-muted)',
                                lineHeight: 1.6,
                                flex: 1,
                                marginBottom: '1.5rem'
                            }}>
                                {post.excerpt}
                            </p>
                            <div style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
                                Read Article →
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <style>{`
        .hover-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary) !important;
        }
      `}</style>
        </div>
    );
}
