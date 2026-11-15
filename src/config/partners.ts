export interface PartnerSlotConfig {
  enabled: boolean;
  imageUrl?: string;
  mobileImageUrl?: string;
  linkUrl: string;
  altText: string;
  sponsorName: string;
}

export interface PartnersConfig {
  globalEnabled: boolean;
  leaderboard: PartnerSlotConfig;
  inContent: PartnerSlotConfig;
  bottomRailAmazon: PartnerSlotConfig;
  bottomRailBrands: PartnerSlotConfig;
  sideRailLeft: PartnerSlotConfig;
  sideRailRight: PartnerSlotConfig;
}

export const PARTNERS_CONFIG: PartnersConfig = {
  globalEnabled: true,

  // Topo do site (Leaderboard): Divulgação para marcas anunciarem no DCPROSENS
  leaderboard: {
    enabled: true,
    imageUrl: '/partners/brands-728x90.webp',
    mobileImageUrl: '/partners/brands-320x50.webp',
    linkUrl: '/advertise',
    altText: 'DCPROSENS - Put Your Brand in the Spotlight - Advertise With Us',
    sponsorName: 'Featured Partner',
  },

  // Meio do conteúdo dos artigos e calculadoras: Ofertas Amazon
  inContent: {
    enabled: true,
    imageUrl: '/partners/amazon-300x250.webp',
    linkUrl: '/deals',
    altText: 'DCPROSENS - Upgrade Your Gaming Setup on Amazon',
    sponsorName: 'Amazon Gaming',
  },

  // Pré-rodapé duplo: Amazon + Anuncie Conosco
  bottomRailAmazon: {
    enabled: true,
    imageUrl: '/partners/amazon-300x250.webp',
    linkUrl: '/deals',
    altText: 'DCPROSENS - Upgrade Your Gaming Setup on Amazon',
    sponsorName: 'Amazon Gaming',
  },

  bottomRailBrands: {
    enabled: true,
    imageUrl: '/partners/brands-300x250.webp',
    linkUrl: '/advertise',
    altText: 'DCPROSENS - Put Your Brand in the Spotlight - Advertise With Us',
    sponsorName: 'Brand Spotlight',
  },

  // Arranha-céu lateral esquerdo: Amazon Gear
  sideRailLeft: {
    enabled: true,
    imageUrl: '/partners/amazon-160x600.webp',
    linkUrl: '/deals',
    altText: 'Upgrade Your Setup - Shop on Amazon',
    sponsorName: 'Amazon Deals',
  },

  // Arranha-céu lateral direito: Marcas e Anúncios
  sideRailRight: {
    enabled: true,
    imageUrl: '/partners/brands-160x600.webp',
    linkUrl: '/advertise',
    altText: 'Put Your Brand in the Spotlight - Advertise With Us',
    sponsorName: 'Advertise',
  },
};
