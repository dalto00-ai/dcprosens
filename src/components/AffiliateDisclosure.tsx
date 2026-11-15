/**
 * Amazon Associates / FTC disclosure.
 * Required on every page that renders affiliate links.
 */
export default function AffiliateDisclosure({ style }: { style?: React.CSSProperties }) {
    return (
        <p
            style={{
                fontSize: '0.7rem',
                lineHeight: 1.5,
                color: 'var(--text-muted)',
                textAlign: 'center',
                margin: '1.25rem auto 0',
                maxWidth: '46rem',
                padding: '0 1rem',
                ...style,
            }}
        >
            <strong>Disclosure:</strong> some links on this page are affiliate links. As an Amazon
            Associate, DCPROSENS earns from qualifying purchases at no extra cost to you.
        </p>
    );
}
