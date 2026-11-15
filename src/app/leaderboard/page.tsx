import type { Metadata } from 'next';
import Leaderboard from '@/components/Leaderboard';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: 'Aim Trainer & Aim Lab Leaderboard',
    description:
        'See the top scores in DCPROSENS Aim Trainer (free) and Aim Lab (premium). Log in, play a round, and climb the ranking.',
    keywords: [
        'aim trainer leaderboard', 'aim lab leaderboard', 'aim ranking', 'fps aim scores',
        'gridshot leaderboard', 'aim training ranking', 'best aim scores',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/leaderboard/',
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: 'Aim Trainer & Aim Lab Leaderboard | DCPROSENS',
        description: 'See the top scores in Aim Trainer and Aim Lab. Log in and climb the ranking.',
        url: 'https://dcprosens.com/leaderboard/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Aim Trainer & Aim Lab Leaderboard | DCPROSENS',
        description: 'See the top scores in Aim Trainer and Aim Lab. Log in and climb the ranking.',
        creator: '@dcprosens',
        images: ["/og-image.png"],
    },
};


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "Why scores are grouped by DPI",
            body: [
                <>Two players at the same in-game sensitivity but different DPI have different cm/360, and therefore different physical tasks. A flick that is a wrist twitch for one is a forearm sweep for the other.</>,
                <>Grouping by DPI band puts you against players whose hands are doing roughly what yours are doing. That makes the ranking a measure of skill rather than a measure of who picked the settings that suit the test.</>,
                <>Only one entry per account is kept per board, so a leaderboard position reflects someone&apos;s best run rather than their willingness to keep resubmitting.</>,
            ],
        },
        {
            heading: "How to read your position honestly",
            body: [
                <>A high score in one mode and a low one in another is the useful signal, not the overall rank. The gap between your best and worst mode is where practice pays.</>,
                <>Scores rise fastest in the first two weeks of training and then flatten. A flat score with consistent practice usually means the mechanic is no longer your limiting factor and your losses are coming from positioning or decision-making instead.</>,
                <>Comparing yourself to the top of the board is rarely productive. Comparing yourself to your own score from a month ago is.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "Do I need an account to appear on the leaderboard?", a: "Yes. Scores are tied to a registered account so the board can keep one best run per player. Anonymous submissions would let the same person fill the board under new names." },
        { q: "Why is the leaderboard filtered by DPI?", a: "Because DPI changes the physical movement a score represents. A run at 400 DPI and a run at 3200 DPI are different tasks, and ranking them together would measure settings rather than skill." },
        { q: "Can I remove my score?", a: "Yes — contact support from the email address on the account and it will be removed. Only your best run per mode is stored, so removal is a single record." },
];

export default function LeaderboardPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Aim Trainer & Aim Lab Leaderboard',
        url: 'https://dcprosens.com/leaderboard/',
        description: 'Top scores across DCPROSENS aim training modes.',
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                { '@type': 'ListItem', position: 2, name: 'Leaderboard', item: 'https://dcprosens.com/leaderboard/' },
            ],
        },
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                marginBottom: '0.5rem',
                textAlign: 'center',
            }}>
                🏆 <span className="text-gradient">Leaderboard</span>
            </h1>
            <p style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
                maxWidth: '560px',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                Top scores across every Aim Trainer and Aim Lab mode. Play a round while logged in and your best run shows up here.
            </p>
            <Leaderboard />
            <ToolExplainer
                intro={<>The leaderboard ranks Aim Trainer and Aim Lab runs globally, and it can be filtered by DPI bucket — which matters more than it sounds. Comparing a score set at 400 DPI against one set at 3200 DPI tells you almost nothing, because the two players were performing physically different movements.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
