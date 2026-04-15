export interface StoryPage {
    id: string;
    image: string;
    title: string;
    description?: string;
}

export interface WebStory {
    slug: string;
    title: string;
    coverImage: string;
    pages: StoryPage[];
}

export const stories: WebStory[] = [
    {
        slug: 'top-5-mice-2026',
        title: 'Top 5 Gaming Mice of 2026',
        coverImage: '/blog/8khz-wireless-mouse.webp',
        pages: [
            {
                id: 'cover',
                image: '/blog/8khz-wireless-mouse.webp',
                title: 'The Best Mice of 2026',
                description: 'We tested the finalists. Here are the winners.'
            },
            {
                id: '1',
                image: '/blog/wireless-gaming-mouse-8khz.webp', // Fallback or reuse
                title: '1. Logitech G Pro X 3',
                description: '8KHz Wireless, 38g weight. The new king.'
            },
            {
                id: '2',
                image: '/blog/dpi-mouse-sensor-macro.webp', // Reuse tech image
                title: '2. Razer Viper V4 Pro',
                description: 'Optical switches Gen 5. Flawless tracking.'
            },
            {
                id: '3',
                image: '/blog/games-factory-sens.webp', // Reuse factory image
                title: '3. Finalmouse UltralightX 2',
                description: 'Carbon fiber body. Only 29g. Expensive but elite.'
            }
        ]
    },
    {
        slug: 'valorant-vs-cs2-differences',
        title: 'Valorant vs CS2: 3 Major Differences',
        coverImage: '/blog/valorant-to-cs2.webp',
        pages: [
            {
                id: 'cover',
                image: '/blog/valorant-to-cs2.webp',
                title: 'Valorant vs CS2',
                description: 'Which shooter fits your style?'
            },
            {
                id: '1',
                image: '/blog/deadlock-valve-sensitivity.webp', // Reuse valve/hero shooter art
                title: '1. Movement Speed',
                description: 'CS2 has momentum. Valorant is crisp and instant.'
            },
            {
                id: '2',
                image: '/blog/overwatch-to-apex.webp', // Reuse action art
                title: '2. Utility',
                description: 'CS2: Smoke & Flash. Valorant: Skills & Ultimates.'
            }
        ]
    },
    {
        slug: 'what-is-edpi',
        title: 'What is eDPI? Quick Guide',
        coverImage: '/blog/what-is-edpi.webp',
        pages: [
            {
                id: 'cover',
                image: '/blog/what-is-edpi.webp',
                title: 'Understanding eDPI',
                description: 'The universal number for aiming.'
            },
            {
                id: '1',
                image: '/blog/perfect-sensitivity.webp',
                title: 'The Formula',
                description: 'DPI x Sensitivity = eDPI. Simple.'
            },
            {
                id: '2',
                image: '/blog/dpi-vs-sensitivity.webp',
                title: 'Why it matters',
                description: 'Compare settings across different hardware instantly.'
            }
        ]
    }
];
