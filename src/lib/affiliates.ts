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
        badge: '🏆 Escolha dos Pro Players (60g)',
        title: 'Logitech G Pro X Superlight 2',
        description: 'O mouse mais vencedor do cenário competitivo. Shape icônico, sensor HERO 2 e switches ópticos-mecânicos híbridos.',
        link: 'https://amzn.to/3PEwF13',
    },
    {
        id: 'viper-v3-pro',
        badge: '⚡ Ultra-Leve Campeão de FPS (54g)',
        title: 'Razer Viper V3 Pro',
        description: 'Rastreador preciso com polling rate sem fio nativo de 8.000 Hz e formato simétrico ergonômico moderno.',
        link: 'https://amzn.to/3RQtILr',
    },
    {
        id: 'deathadder-v3-pro',
        badge: '👑 Melhor Ergonômico de FPS (63g)',
        title: 'Razer DeathAdder V3 Pro',
        description: 'Excelente para pegadas palm ou claw que querem apoio anatômico. Sensor Focus Pro 30K de última geração.',
        link: 'https://amzn.to/4agdh1h',
    },
    {
        id: 'lamzu-atlantis-thorn',
        badge: '🎯 Favorito dos Aimers de Elite (55g)',
        title: 'Lamzu Atlantis OG V2 / Thorn',
        description: 'Mouse boutique com peso irrisório e base vazada. Pegada traseira perfeita para controle agressivo de claw grip.',
        link: 'https://amzn.to/4uA6Lut',
    },
];

export const keyboardProduct: AffiliateProduct = {
    id: 'huntsman-v3-pro',
    badge: '⚡ Hall Effect Switches + Rapid Trigger',
    title: 'Razer Huntsman V3 Pro TKL / Wooting 60HE',
    description: 'Teclado analógico magnético de última geração que ativa e reseta teclas ao menor sinal de toque físico. Recomendação definitiva do cenário profissional de Valorant e CS2.',
    link: 'https://amzn.to/4dxQksG',
};
