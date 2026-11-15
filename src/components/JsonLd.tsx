// Server component — renders a JSON-LD block.
//
// The MIME type must be exactly "application/ld+json". The home page once
// carried "application/ld+json;type=schema", and that single suffix made
// every parser skip the whole graph (SoftwareApplication, FAQPage, WebSite,
// Organization) on the site's most important page. Routing every block
// through this component means the type is written in one place only.

export type JsonLdGraph = Record<string, unknown> | Record<string, unknown>[];

export default function JsonLd({ data }: { data: JsonLdGraph }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

const ORIGIN = "https://dcprosens.com";

/**
 * BreadcrumbList for a hub page. `trail` is everything after Home, in order.
 * URLs carry a trailing slash to match the served canonical — without it the
 * breadcrumb points at a URL that only 301s to the real one.
 */
export function breadcrumb(trail: { name: string; path: string }[]) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
            ...trail.map((t, i) => ({
                "@type": "ListItem",
                position: i + 2,
                name: t.name,
                item: `${ORIGIN}${t.path.endsWith("/") ? t.path : t.path + "/"}`,
            })),
        ],
    };
}

/** CollectionPage for an index/hub that lists other pages. */
export function collectionPage(name: string, description: string, path: string) {
    return {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}${path}#collection`,
        name,
        description,
        url: `${ORIGIN}${path}`,
        isPartOf: { "@id": `${ORIGIN}#website` },
        inLanguage: "en-US",
    };
}

/** WebPage for a plain informational page (about, contact, ...). */
export function webPage(name: string, description: string, path: string) {
    return {
        "@type": "WebPage",
        "@id": `${ORIGIN}${path}#webpage`,
        name,
        description,
        url: `${ORIGIN}${path}`,
        isPartOf: { "@id": `${ORIGIN}#website` },
        inLanguage: "en-US",
    };
}

export function howTo(
    name: string,
    description: string,
    path: string,
    steps: { name: string; text: string; url?: string; image?: string }[]
) {
    return {
        "@type": "HowTo",
        "@id": `${ORIGIN}${path}#howto`,
        name,
        description,
        url: `${ORIGIN}${path}`,
        inLanguage: "en-US",
        step: steps.map((s, idx) => ({
            "@type": "HowToStep",
            position: idx + 1,
            name: s.name,
            text: s.text,
            ...(s.url ? { url: s.url } : {}),
            ...(s.image ? { image: s.image } : {}),
        })),
    };
}

export function graph(...nodes: Record<string, unknown>[]) {
    return { "@context": "https://schema.org", "@graph": nodes };
}
