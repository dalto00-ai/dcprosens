// src/lib/gearDatabase.ts
// Extended gear database: keyboards, headsets, monitors, mousepads

export interface Keyboard {
    id: string;
    name: string;
    brand: string;
    switch: string;
    form: string; // TKL, 60%, 65%, Full
    connectivity: 'Wired' | 'Wireless' | 'Both';
    price: string;
    proUsage: string[];
    features: string[];
    affiliateLink: string;
    rating: number;
    badge?: string;
}

export interface Headset {
    id: string;
    name: string;
    brand: string;
    type: 'Wired' | 'Wireless';
    driver: string; // driver size mm
    frequency: string; // Hz range
    microphone: boolean;
    surround: boolean;
    weight: number; // grams
    price: string;
    proUsage: string[];
    affiliateLink: string;
    rating: number;
    badge?: string;
}

export interface Monitor {
    id: string;
    name: string;
    brand: string;
    size: number; // inches
    resolution: string;
    refreshRate: number; // Hz
    panelType: 'TN' | 'IPS' | 'VA' | 'OLED';
    responseTime: string; // ms
    price: string;
    proUsage: string[];
    affiliateLink: string;
    rating: number;
    badge?: string;
}

export interface Mousepad {
    id: string;
    name: string;
    brand: string;
    size: string; // S / M / L / XL / Extended
    dimensions: string; // WxH mm
    thickness: string; // mm
    surface: 'Cloth' | 'Hard' | 'Hybrid';
    price: string;
    proUsage: string[];
    affiliateLink: string;
    rating: number;
    badge?: string;
    bestFor: string; // low / mid / high sens
}

// ─── KEYBOARDS ──────────────────────────────────────────────────────────────

export const keyboards: Keyboard[] = [
    {
        id: 'wooting-60he',
        name: 'Wooting 60HE',
        brand: 'Wooting',
        switch: 'Lekker (Hall Effect)',
        form: '60%',
        connectivity: 'Wired',
        price: '$174',
        proUsage: ['Demon1', 'ZywOo', 'cNed', 'yay'],
        features: ['Analog input', 'Rapid trigger', 'Hall Effect switches', 'No debounce delay', '0.1mm actuation'],
        affiliateLink: 'https://wooting.io/wooting-60he',
        rating: 4.9,
        badge: '🏆 #1 Competitive',
    },
    {
        id: 'logitech-g-pro-x',
        name: 'Logitech G PRO X',
        brand: 'Logitech',
        switch: 'GX Blue / Brown / Red (swappable)',
        form: 'TKL',
        connectivity: 'Wired',
        price: '$129',
        proUsage: ['TenZ', 'Aspas', 's1mple', 'NiKo', 'Demon1', 'ropz'],
        features: ['Hot-swappable switches', 'Detachable cable', 'PBT keycaps', 'Pro-grade build'],
        affiliateLink: 'https://www.amazon.com/dp/B07W1NTH5F',
        rating: 4.7,
        badge: '⭐ Most Used by Pros',
    },
    {
        id: 'steelseries-apex-pro',
        name: 'SteelSeries Apex Pro TKL',
        brand: 'SteelSeries',
        switch: 'OmniPoint Adjustable',
        form: 'TKL',
        connectivity: 'Wired',
        price: '$159',
        proUsage: ['karrigan', 'dev1ce'],
        features: ['Adjustable actuation 0.2-3.8mm', 'OLED display', 'Magnetic wrist rest', '100% anti-ghosting'],
        affiliateLink: 'https://www.amazon.com/dp/B07SVJJCP3',
        rating: 4.6,
        badge: '🎯 Adjustable Actuation',
    },
    {
        id: 'ducky-one-3',
        name: 'Ducky One 3 Mini',
        brand: 'Ducky',
        switch: 'Cherry MX / Kailh Box',
        form: '60%',
        connectivity: 'Wired',
        price: '$109',
        proUsage: ['NiKo', 'broky'],
        features: ['Hot-swap', 'RGB per key', 'PBT double-shot keycaps', 'USB-C'],
        affiliateLink: 'https://www.amazon.com/dp/B09BLC1YJV',
        rating: 4.5,
    },
    {
        id: 'razer-blackwidow-v4-pro',
        name: 'Razer BlackWidow V4 Pro',
        brand: 'Razer',
        switch: 'Razer Yellow',
        form: 'Full',
        connectivity: 'Wireless',
        price: '$229',
        proUsage: ['TenZ', 'Faker'],
        features: ['Wireless 2.4GHz', 'Multi-function roller', 'Macro keys', 'Chroma RGB'],
        affiliateLink: 'https://www.amazon.com/dp/B0BVXM4SBX',
        rating: 4.4,
    },
    {
        id: 'hyperx-alloy-origins-core',
        name: 'HyperX Alloy Origins Core',
        brand: 'HyperX',
        switch: 'HyperX Red Linear',
        form: 'TKL',
        connectivity: 'Wired',
        price: '$69',
        proUsage: ['broky', 's1mple (previous)'],
        features: ['Aircraft-grade aluminum body', 'Per-key RGB', 'USB-C', 'N-key rollover'],
        affiliateLink: 'https://www.amazon.com/dp/B07Z3ZNBQ8',
        rating: 4.5,
        badge: '💰 Best Value',
    },
];

// ─── HEADSETS ───────────────────────────────────────────────────────────────

export const headsets: Headset[] = [
    {
        id: 'logitech-g-pro-x-2',
        name: 'Logitech G PRO X 2 Lightspeed',
        brand: 'Logitech',
        type: 'Wireless',
        driver: '50mm',
        frequency: '20Hz-20kHz',
        microphone: true,
        surround: true,
        weight: 344,
        price: '$249',
        proUsage: ['TenZ', 'Aspas', 's1mple', 'NiKo', 'ropz', 'm0NESY'],
        affiliateLink: 'https://www.amazon.com/dp/B0BY4FC5WW',
        rating: 4.8,
        badge: '🏆 Most Used by Pros',
    },
    {
        id: 'sennheiser-hd-560s',
        name: 'Sennheiser HD 560S',
        brand: 'Sennheiser',
        type: 'Wired',
        driver: '38mm',
        frequency: '6Hz-38kHz',
        microphone: false,
        surround: false,
        weight: 240,
        price: '$99',
        proUsage: ['ZywOo', 'Demon1'],
        affiliateLink: 'https://www.amazon.com/dp/B08G4DLLBM',
        rating: 4.7,
        badge: '🎧 Best Audio Quality',
    },
    {
        id: 'hyperx-cloud-alpha',
        name: 'HyperX Cloud Alpha',
        brand: 'HyperX',
        type: 'Wired',
        driver: '50mm dual-chamber',
        frequency: '13Hz-27kHz',
        microphone: true,
        surround: false,
        weight: 336,
        price: '$79',
        proUsage: ['s1mple', 'karrigan', 'electronic', 'broky'],
        affiliateLink: 'https://www.amazon.com/dp/B074NBSF9N',
        rating: 4.6,
        badge: '💰 Best Value',
    },
    {
        id: 'steelseries-arctis-pro',
        name: 'SteelSeries Arctis Pro Wireless',
        brand: 'SteelSeries',
        type: 'Wireless',
        driver: '40mm neodymium',
        frequency: '10Hz-40kHz',
        microphone: true,
        surround: true,
        weight: 352,
        price: '$199',
        proUsage: ['bugha', 'dev1ce'],
        affiliateLink: 'https://www.amazon.com/dp/B079YBPXG8',
        rating: 4.5,
    },
    {
        id: 'razer-blackshark-v2-pro',
        name: 'Razer BlackShark V2 Pro 2023',
        brand: 'Razer',
        type: 'Wireless',
        driver: '50mm',
        frequency: '20Hz-20kHz',
        microphone: true,
        surround: true,
        weight: 320,
        price: '$179',
        proUsage: ['TenZ', 'Boaster'],
        affiliateLink: 'https://www.amazon.com/dp/B0BHJ31TFV',
        rating: 4.6,
    },
];

// ─── MONITORS ───────────────────────────────────────────────────────────────

export const monitors: Monitor[] = [
    {
        id: 'benq-zowie-xl2546k',
        name: 'BenQ ZOWIE XL2546K',
        brand: 'BenQ ZOWIE',
        size: 24.5,
        resolution: '1920x1080',
        refreshRate: 240,
        panelType: 'TN',
        responseTime: '0.5ms GTG',
        price: '$399',
        proUsage: ['s1mple', 'NiKo', 'ZywOo', 'ropz', 'Boaster', 'karrigan', 'broky', 'electronic', 'dev1ce'],
        affiliateLink: 'https://www.amazon.com/dp/B096KYXL7P',
        rating: 4.8,
        badge: '🏆 #1 CS2 Pro Monitor',
    },
    {
        id: 'asus-rog-swift-pg259qn',
        name: 'ASUS ROG Swift PG259QN',
        brand: 'ASUS ROG',
        size: 24.5,
        resolution: '1920x1080',
        refreshRate: 360,
        panelType: 'IPS',
        responseTime: '1ms GTG',
        price: '$449',
        proUsage: ['TenZ', 'yay', 'm0NESY', 'Aspas'],
        affiliateLink: 'https://www.amazon.com/dp/B08JCZD9XJ',
        rating: 4.7,
        badge: '⚡ 360Hz — Fastest IPS',
    },
    {
        id: 'alienware-aw2521h',
        name: 'Alienware AW2521H',
        brand: 'Alienware',
        size: 24.5,
        resolution: '1920x1080',
        refreshRate: 360,
        panelType: 'IPS',
        responseTime: '1ms GTG',
        price: '$379',
        proUsage: ['bugha', 'sweetdreams', 'karrigan'],
        affiliateLink: 'https://www.amazon.com/dp/B08LLML8JR',
        rating: 4.7,
    },
    {
        id: 'benq-zowie-xl2411k',
        name: 'BenQ ZOWIE XL2411K',
        brand: 'BenQ ZOWIE',
        size: 24,
        resolution: '1920x1080',
        refreshRate: 144,
        panelType: 'TN',
        responseTime: '1ms GTG',
        price: '$199',
        proUsage: [],
        affiliateLink: 'https://www.amazon.com/dp/B08FXJN6Y5',
        rating: 4.4,
        badge: '💰 Budget Pick',
    },
];

// ─── MOUSEPADS ──────────────────────────────────────────────────────────────

export const mousepads: Mousepad[] = [
    {
        id: 'artisan-zero-fx-l',
        name: 'Artisan Zero FX L',
        brand: 'Artisan',
        size: 'L',
        dimensions: '490x420mm',
        thickness: '3mm',
        surface: 'Cloth',
        price: '$69',
        proUsage: ['ZywOo', 'TenZ', 'ropz'],
        affiliateLink: 'https://www.amazon.com/dp/B07YNQPXJ9',
        rating: 4.9,
        badge: '🏆 Best Cloth Pad',
        bestFor: 'low-mid',
    },
    {
        id: 'logitech-g640',
        name: 'Logitech G640',
        brand: 'Logitech',
        size: 'L',
        dimensions: '460x400mm',
        thickness: '3mm',
        surface: 'Cloth',
        price: '$39',
        proUsage: ['TenZ', 'Aspas', 'm0NESY', 'ImperialHal', 'Bugha'],
        affiliateLink: 'https://www.amazon.com/dp/B07CX8ZB6J',
        rating: 4.7,
        badge: '⭐ Most Used by Pros',
        bestFor: 'mid',
    },
    {
        id: 'logitech-g840',
        name: 'Logitech G840 XL',
        brand: 'Logitech',
        size: 'XL',
        dimensions: '900x400mm',
        thickness: '3mm',
        surface: 'Cloth',
        price: '$69',
        proUsage: ['s1mple', 'electronic', 'karrigan', 'nAts'],
        affiliateLink: 'https://www.amazon.com/dp/B01N0P54U8',
        rating: 4.7,
        badge: '📐 XL Format',
        bestFor: 'low',
    },
    {
        id: 'steelseries-qck-heavy',
        name: 'SteelSeries QcK Heavy Large',
        brand: 'SteelSeries',
        size: 'L',
        dimensions: '450x400mm',
        thickness: '6mm',
        surface: 'Cloth',
        price: '$29',
        proUsage: [],
        affiliateLink: 'https://www.amazon.com/dp/B000UEZ36W',
        rating: 4.6,
        badge: '💰 Best Budget',
        bestFor: 'all',
    },
    {
        id: 'zowie-g-sr',
        name: 'Zowie G-SR',
        brand: 'Zowie',
        size: 'L',
        dimensions: '480x400mm',
        thickness: '3.5mm',
        surface: 'Cloth',
        price: '$49',
        proUsage: ['NiKo', 'device'],
        affiliateLink: 'https://www.amazon.com/dp/B01CQCL5SG',
        rating: 4.6,
        bestFor: 'mid',
    },
    {
        id: 'fnatic-dash-l',
        name: 'Fnatic DASH L',
        brand: 'Fnatic',
        size: 'L',
        dimensions: '420x320mm',
        thickness: '3mm',
        surface: 'Cloth',
        price: '$35',
        proUsage: ['Boaster'],
        affiliateLink: 'https://fnatic.com/gear/mousepads',
        rating: 4.4,
        bestFor: 'mid-high',
    },
];
