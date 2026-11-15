import Link from 'next/link';

/** "Advertise with your brand here" promo — links to /advertise. Placed in high-traffic content spots. */
export default function AdvertiseBanner() {
    return (
        <Link
            href="/advertise/"
            style={{
                textDecoration: 'none',
                margin: '2.5rem 0',
                padding: '1.5rem 1.75rem',
                borderRadius: 'var(--radius-lg, 12px)',
                border: '1px dashed var(--primary)',
                background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.05) 0%, rgba(112, 0, 255, 0.04) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
            }}
        >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📢</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem' }}>
                    Appear with your brand here
                </span>
            </span>
            <span
                style={{
                    color: 'var(--primary)',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                }}
            >
                Why advertise with us →
            </span>
        </Link>
    );
}
