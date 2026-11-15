export interface AffiliateProduct {
    id: string;
    badge: string;
    title: string;
    description: string;
    link: string;
}

export const mouseProducts: AffiliateProduct[] = [
    {
        id: 'superlight2',
        badge: '🏆 #1 Pro Player Choice (60g)',
        title: 'Logitech G Pro X Superlight 2',
        description: 'The most winning wireless mouse in competitive esports. Iconic shape, HERO 2 sensor, and hybrid optical-mechanical switches.',
        link: 'https://www.amazon.com/s?k=Logitech+G+Pro+X+Superlight+2&crid=2W05ETDSY5A47&sprefix=logitech+g+pro+x+superlight+2%2Caps%2C283&linkCode=ll2&tag=dcoutlier-20&linkId=241a3b086376d576196fe5cb5965d762&language=en_US&ref_=as_li_ss_tl',
    },
    {
        id: 'viper-v3-pro',
        badge: '⚡ Ultralight FPS Champion (54g)',
        title: 'Razer Viper V3 Pro',
        description: 'Flawless sensor with native 8,000Hz wireless polling rate and a modern symmetrical shape built for elite tracking.',
        link: 'https://www.amazon.com/dp/B0D6PBTCGV?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl',
    },
    {
        id: 'deathadder-v3-pro',
        badge: '👑 Best Ergonomic FPS Mouse (63g)',
        title: 'Razer DeathAdder V3 Pro',
        description: 'Engineered for palm and claw grip players needing anatomical support. Flagship Focus Pro 30K optical sensor.',
        link: 'https://www.amazon.com/s?k=Razer+DeathAdder+V3+Pro&crid=2Z1ISXDJ31S3Q&sprefix=razer+deathadder+v3+pro%2Caps%2C306&linkCode=ll2&tag=dcoutlier-20&linkId=54c54461303a0b73ee33a986c2278f5a&language=en_US&ref_=as_li_ss_tl',
    },
    {
        id: 'lamzu-atlantis-thorn',
        badge: '🎯 Elite Aimers Favorite (55g)',
        title: 'Lamzu Atlantis OG V2 / Thorn',
        description: 'Boutique ultralight mouse with locked-in rear hump. Perfect for aggressive claw grip and micro-adjustments.',
        link: 'https://www.amazon.com/s?k=Lamzu+Atlantis+OG+V2+%2F+Thorn&crid=1P8GVMO3OJXGS&sprefix=lamzu+atlantis+og+v2+%2F+thorn%2Caps%2C316&linkCode=ll2&tag=dcoutlier-20&linkId=e6a607e03c8c2469e84ce990e868fc70&language=en_US&ref_=as_li_ss_tl',
    },
];

export const keyboardProduct: AffiliateProduct = {
    id: 'huntsman-v3-pro',
    badge: '⚡ Hall Effect Switches + Rapid Trigger',
    title: 'Razer Huntsman V3 Pro TKL / Wooting 60HE',
    description: 'Next-gen magnetic analog switches with instant actuation and rapid reset. The definitive pro choice for CS2 counter-strafing and Valorant movement.',
    link: 'https://www.amazon.com/s?k=Razer+Huntsman+V3+Pro+TKL+%2F+Wooting+60HE&crid=3JQDK10XU68KN&sprefix=razer+huntsman+v3+pro+tkl+%2F+wooting+60he%2Caps%2C275&linkCode=ll2&tag=dcoutlier-20&linkId=556778575e46f7e86ccb275a12efa92e&language=en_US&ref_=as_li_ss_tl',
};
