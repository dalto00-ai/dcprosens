import type { Metadata } from 'next';
import AdsCalculator from './AdsCalculator';
import TrialGate from '@/components/TrialGate';

export const metadata: Metadata = {
    title: "1:1 ADS Sensitivity Calculator — Apex Legends, R6 Siege, Valorant & PUBG | DCPROSENS",
    description: "Calculate true 1:1 ADS & scope sensitivity multipliers for Apex Legends, Rainbow Six Siege, Valorant, CS2, PUBG, and Warzone using focal-length Monitor Distance Matching (0% MDH).",
    keywords: [
        'ads sensitivity calculator', 'apex legends ads sensitivity 1 to 1', '1 to 1 ads sensitivity rainbow six siege',
        'pubg scopes sensitivity calculator', 'scope sensitivity calculator', 'zoom sensitivity calculator',
        'ads sensitivity converter', '1:1 ads sensitivity', 'scope multiplier calculator',
        'aim down sights sensitivity', 'scope sensitivity multiplier', 'zoom sensitivity multiplier',
        'monitor distance match', 'focal length match sensitivity', 'ads sensitivity guide',
        'valorant zoom sensitivity multiplier', 'valorant operator sensitivity', 'valorant marshal scope sens',
        'cs2 zoom sensitivity ratio', 'cs2 awp sensitivity', 'cs2 scope sensitivity command',
        'zoom_sensitivity_ratio cs2', 'zoom_sensitivity_ratio_mouse_pitch',
        'apex legends per zoom sensitivity', 'apex scope sensitivity', 'apex ads multiplier',
        'cod warzone ads sensitivity', 'warzone multiplier sensitivity', 'fortnite scope sensitivity',
        'rainbow six siege ads sensitivity', 'overwatch 2 scope sensitivity',
        'hipfire vs ads sensitivity', 'hipfire sensitivity', 'ads vs hipfire feel',
        '1:1 scope sensitivity formula', 'what is 1:1 scope sensitivity', 'monitor distance sensitivity',
        '0% monitor distance match', '100% monitor distance match', 'relative aim sensitivity',
        'scope sensitivity pro settings', 'best ads multiplier valorant', 'best awp sens cs2',
    ],
    alternates: {
        canonical: "https://dcprosens.com/ads/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "1:1 ADS Scope Sensitivity Calculator — Valorant, CS2, Apex, R6 | DCPROSENS",
        description: "Calculate the perfect 1:1 zoom sensitivity for Valorant, CS2, Apex Legends, R6 Siege, and CoD Warzone.",
        url: "https://dcprosens.com/ads/",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AdsPage() {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dcprosens.com/" },
            { "@type": "ListItem", "position": 2, "name": "ADS Sensitivity Calculator", "item": "https://dcprosens.com/ads/" },
        ],
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is 1:1 ADS sensitivity?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "1:1 ADS sensitivity means your mouse movement produces the same physical rotation speed while aiming down sights as it does while hip-firing. This is achieved by applying a zoom multiplier that compensates for the FOV change when scoping in. Most pro players prefer 1:1 for consistent muscle memory.",
                },
            },
            {
                "@type": "Question",
                "name": "What is the best zoom sensitivity multiplier for Valorant?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For 1:1 scope sensitivity in Valorant (0% Monitor Distance Match), set your Zoom Sensitivity Multiplier to 1.0. For the Operator's 2.5x scope at 0% MDM, use approximately 1.150. For a true focal length match, use 0.847. Most pro Operator players use 1.0 as a starting point.",
                },
            },
            {
                "@type": "Question",
                "name": "What is zoom_sensitivity_ratio in CS2?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "zoom_sensitivity_ratio is a CS2/CS:GO console command that adjusts your scoped sensitivity. A value of 0.818933 gives a perfect 1:1 focal length match for the AWP and Scout. Most CS2 pros use values between 0.80 and 1.0 depending on preference. Set it via the developer console: zoom_sensitivity_ratio 0.818933.",
                },
            },
            {
                "@type": "Question",
                "name": "Should I use the same sensitivity for ADS and hipfire?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most competitive players prefer a 1:1 match so muscle memory stays consistent between hipfire and scoped shots. However, some players prefer a slightly higher scoped multiplier (above 1.0) to allow faster scanning and micro-corrections while zoomed. Try 1:1 first, then adjust if you feel the scoped movement is too slow.",
                },
            },
            {
                "@type": "Question",
                "name": "What ADS sensitivity do pro players use in Apex Legends?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most Apex Legends pro players configure per-zoom sensitivity to achieve near 1:1 feel. Common settings are: 1x scope at 1.0, 2x scope at 1.2, 3x scope at 1.3, 4x-10x scopes at 1.4–1.5. ImperialHal and other ALGS pros adjust these individually to maintain tracking consistency at each zoom level.",
                },
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '3rem 1rem', maxWidth: '1000px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <h1 className="hero-title" style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
                1:1 ADS Scope <span className="text-gradient">Sensitivity</span>
            </h1>
            <p className="hero-subtitle" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
                Calculate the perfect Aim Down Sights (ADS) multiplier for scopes (AWP, Operator, optical sights) and match your hipfire muscle memory.
            </p>

            <TrialGate toolId="ads-calculator" previewTitle="ADS Sensitivity Calculator">
                <AdsCalculator />
            </TrialGate>

            {/* HIGH-INTENT EEAT WIKI SECTION */}
            <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>How Does 1:1 Scoped Sensitivity Work?</h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>
                        When you aim down sights (ADS) or zoom in through a precision scope, your Field of View (FOV) decreases significantly. This change makes your physical mouse movement feel much faster on screen unless scaled properly.
                    </p>
                    <p>
                        To maintain a consistent physical aim feel between hipfire and zoomed scopes, games use a zoom sensitivity multiplier. For perfect micro-flick muscle memory, we employ a 0% Monitor Distance Match (MDM) formula, matching the raw focal length transition.
                    </p>
                    
                    <h3 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>Standard Pro-Player Scoped Multipliers:</h3>
                    <ul>
                        <li><strong>Valorant (Operator & Marshal)</strong>: Setting your <em>Zoom Sensitivity Multiplier</em> to <strong>0.847</strong> gives a perfect 1:1 focal length match for 1x zoom. For the 2.5x double-zoom Operator scope, the physical equivalent is <strong>1.150</strong>.</li>
                        <li><strong>CS2 / CS:GO (AWP & Scout)</strong>: The console command <code>zoom_sensitivity_ratio 0.818933</code> (or rounded to <code>0.82</code>) provides the mathematically perfect 1:1 focal length ratio for rapid scoped adjustments.</li>
                        <li><strong>Apex Legends</strong>: Apex allows per-zoom level sensitivity. Set <strong>1.0</strong> for 1x optics, <strong>1.2</strong> for 2x optics, and <strong>1.3</strong> for 3x optics to maintain a steady physical tracking speed.</li>
                    </ul>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>The Three Ways a Game Can Scale Zoomed Aim</h3>
                    <p>
                        Almost every argument about &ldquo;the correct ADS sensitivity&rdquo; is really an argument about which
                        of three things you want held constant. They are mutually exclusive: you cannot have all three at once,
                        which is why no single multiplier is universally right.
                    </p>
                    <ul>
                        <li>
                            <strong>0% Monitor Distance Match (focal length)</strong> keeps the rotation-per-count identical at the
                            very centre of the screen. A tiny correction on a target sitting on your crosshair moves the camera by the
                            same number of degrees hipfire or scoped. This is what the calculator above defaults to, and it is why
                            CS2&apos;s <code>0.818933</code> is the value most AWPers converge on: the small adjustments that decide a
                            duel happen near the centre, not at the screen edge.
                        </li>
                        <li>
                            <strong>100% Monitor Distance Match</strong> keeps travel across the <em>full width</em> of the monitor
                            constant instead. A target at the edge of your hipfire screen stays at the edge of the mouse sweep when
                            scoped. It feels more natural for wide tracking, and worse for micro-correction, which is the opposite
                            trade-off.
                        </li>
                        <li>
                            <strong>Viewspeed / hybrid</strong> methods split the difference by weighting vertical and horizontal
                            movement separately. Some players prefer them on very high zoom levels, where 0% MDM can feel sluggish
                            when swinging onto a target that was never on the crosshair to begin with.
                        </li>
                    </ul>
                    <p>
                        If you only take one thing from this page: pick one method and apply it to every scope in every game. The
                        cost of switching methods per weapon is that your hands never build a single, transferable reflex.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>Why FOV Changes the Answer</h3>
                    <p>
                        Zoom multipliers are computed against your hipfire field of view, so two players running the same
                        <code>zoom_sensitivity_ratio</code> at different FOVs do <em>not</em> get the same scoped feel. Raising FOV
                        widens the hipfire image without changing the scope, which effectively increases the jump between the two
                        states — so a wide-FOV player has more work for the multiplier to do.
                    </p>
                    <p>
                        Two practical consequences. First, changing your FOV means re-deriving your ADS multiplier, not just your
                        hipfire sensitivity. Second, in games that expose separate FOV values for hipfire and ADS, the two have to be
                        set before any multiplier is calculated, or the number you land on is answering the wrong question.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>The Mistakes That Cost the Most Duels</h3>
                    <ul>
                        <li>
                            <strong>Tuning the scope by feel after every bad round.</strong> Scoped aim is the part of aiming you use
                            least often per match, so it takes the longest to build a reflex for. Changing it weekly guarantees you
                            never do. Set it mathematically, then leave it alone for at least a month of play.
                        </li>
                        <li>
                            <strong>Copying a pro&apos;s multiplier without their DPI and FOV.</strong> The multiplier is a ratio
                            applied on top of a hipfire sensitivity. Lifting the ratio alone, onto a different cm/360, produces a
                            scoped speed that player has never used.
                        </li>
                        <li>
                            <strong>Leaving Windows pointer speed off 6/11.</strong> Any other step makes the operating system scale
                            counts before the game receives them, so every multiplier you compute downstream is applied to an input
                            that has already been altered.
                        </li>
                        <li>
                            <strong>Forgetting that some games apply the multiplier per zoom stage.</strong> Apex and Overwatch 2
                            expose separate values per optic or per hero; a single global number silently leaves the other stages
                            mismatched.
                        </li>
                    </ul>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>Checking Your Own Number Without Trusting Anyone</h3>
                    <p>
                        The multiplier is only correct if it survives a test. Put your crosshair on a fixed reference point on a wall,
                        make a small deliberate movement — a couple of centimetres, no more — and note where the crosshair lands.
                        Scope in and repeat the identical physical movement. Under a 0% monitor-distance match the crosshair should
                        finish on the same feature of the wall in both cases. If the scoped attempt overshoots, the multiplier is too
                        high; if it falls short, too low. That test takes under a minute and is worth more than any settings list,
                        including this one.
                    </p>
                </div>
            </div>
        </div>
    );
}
