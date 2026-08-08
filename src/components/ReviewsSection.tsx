'use client';

import { useEffect, useState } from 'react';

interface Review {
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
}

function Stars({ rating, onChange }: { rating: number; onChange?: (n: number) => void }) {
    return (
        <div style={{ display: 'flex', gap: '0.15rem' }}>
            {[1, 2, 3, 4, 5].map((n) => (
                <span
                    key={n}
                    onClick={onChange ? () => onChange(n) : undefined}
                    style={{
                        cursor: onChange ? 'pointer' : 'default',
                        color: n <= rating ? '#00ff9d' : 'rgba(255,255,255,0.2)',
                        fontSize: '1.2rem',
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default function ReviewsSection({ page }: { page: string }) {
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetch(`https://dcprosens.com/api/get-reviews.php?page=${encodeURIComponent(page)}&limit=12`)
            .then((r) => r.json())
            .then((data) => setReviews(data.reviews || []))
            .catch(() => setReviews([]));
    }, [page]);

    useEffect(() => {
        if (!reviews || reviews.length === 0) return;
        const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'DCPROSENS Pro',
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: avg.toFixed(1),
                reviewCount: reviews.length,
            },
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(jsonLd);
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); };
    }, [reviews]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const response = await fetch('https://dcprosens.com/api/submit-review.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, rating, comment, page }),
            });
            if (!response.ok) throw new Error();
            setStatus('success');
            setName('');
            setComment('');
            setRating(5);
        } catch {
            setStatus('error');
        }
    };

    return (
        <section style={{ maxWidth: '700px', margin: '5rem auto 0', padding: '0 1.5rem' }}>
            <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>What Players Say</h2>

            {reviews === null && (
                <p style={{ textAlign: 'center', color: '#64748b' }}>Loading reviews...</p>
            )}
            {reviews && reviews.length === 0 && (
                <p style={{ textAlign: 'center', color: '#64748b' }}>Be the first to leave a review.</p>
            )}
            {reviews && reviews.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                    {reviews.map((r, i) => (
                        <div key={i} style={{
                            background: '#0b0b0f',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                            padding: '1.25rem 1.5rem',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <strong style={{ color: '#fff' }}>{r.name}</strong>
                                <Stars rating={r.rating} />
                            </div>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{r.comment}</p>
                        </div>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{
                background: '#0b0b0f',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
            }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '1rem' }}>Leave a Review</h3>
                <Stars rating={rating} onChange={setRating} />
                <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={60}
                    style={{ padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: '#050507', color: '#fff' }}
                />
                <textarea
                    required
                    placeholder="What did you think?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={1000}
                    rows={3}
                    style={{ padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: '#050507', color: '#fff', resize: 'vertical', fontFamily: 'inherit' }}
                />
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#00ff9d', color: '#000', fontWeight: 700, cursor: 'pointer' }}
                >
                    {status === 'sending' ? 'Submitting...' : 'Submit Review'}
                </button>
                {status === 'success' && (
                    <p style={{ color: '#00ff9d', fontSize: '0.85rem', margin: 0 }}>✓ Thanks! Your review will appear after a quick check.</p>
                )}
                {status === 'error' && (
                    <p style={{ color: '#ff7582', fontSize: '0.85rem', margin: 0 }}>⚠️ Something went wrong. Please try again.</p>
                )}
            </form>
        </section>
    );
}
