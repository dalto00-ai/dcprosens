import JsonLd from "@/components/JsonLd";

// Renders the written half of a tool page: an explanation of what the tool
// does and why, plus an FAQ that also emits FAQPage schema.
//
// Eighteen tool and hub pages shipped under 300 words of body text — a widget
// with a heading above it and nothing else. That is what Google's "Crawled –
// currently not indexed" bucket and AdSense's thin-content rejection were both
// describing, and it is why /sensitivity-test/ (30 words) and /aim-lab/ (39)
// never ranked despite being the site's most distinctive tools.
//
// This component only provides the container and the schema. The copy is
// written per page and passed in — a shared template would reproduce exactly
// the sameness the pages are being penalised for.

export interface ToolExplainerSection {
    heading: string;
    body: React.ReactNode[];
}

export interface ToolExplainerFaq {
    q: string;
    a: string;
}

export default function ToolExplainer({
    intro,
    sections = [],
    faqs = [],
}: {
    intro?: React.ReactNode;
    sections?: ToolExplainerSection[];
    faqs?: ToolExplainerFaq[];
}) {
    const faqJsonLd =
        faqs.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
              }
            : null;

    return (
        <section
            style={{
                marginTop: "4rem",
                borderTop: "1px solid var(--border-color)",
                paddingTop: "3rem",
                maxWidth: "760px",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            {faqJsonLd && <JsonLd data={faqJsonLd} />}

            {intro && (
                <p
                    style={{
                        color: "var(--text-primary)",
                        fontSize: "1.08rem",
                        lineHeight: 1.8,
                        margin: "0 0 2rem",
                    }}
                >
                    {intro}
                </p>
            )}

            {sections.map((section) => (
                <div key={section.heading} style={{ marginBottom: "2.25rem" }}>
                    <h2
                        style={{
                            fontSize: "1.3rem",
                            fontWeight: 800,
                            color: "var(--text-primary)",
                            margin: "0 0 0.85rem",
                        }}
                    >
                        {section.heading}
                    </h2>
                    <div
                        style={{
                            color: "var(--text-secondary)",
                            lineHeight: 1.85,
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        {section.body.map((paragraph, i) => (
                            <p key={i} style={{ margin: 0 }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            ))}

            {faqs.length > 0 && (
                <div>
                    <h2
                        style={{
                            fontSize: "1.3rem",
                            fontWeight: 800,
                            color: "var(--text-primary)",
                            margin: "0 0 1rem",
                        }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        {faqs.map((faq) => (
                            <div key={faq.q}>
                                <h3
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        color: "var(--text-primary)",
                                        margin: "0 0 0.4rem",
                                    }}
                                >
                                    {faq.q}
                                </h3>
                                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
