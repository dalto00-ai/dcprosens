export interface ProPlayer {
    name: string;
    game: string;
    team: string;
    dpi: number;
    sens: number;
    mouse: string;
}

export const pros: ProPlayer[] = [
    { name: 'TenZ', game: 'Valorant', team: 'Sentinels', dpi: 800, sens: 0.3, mouse: 'Lamzu Atlantis' },
    { name: 's1mple', game: 'CS2', team: 'Falcons', dpi: 400, sens: 3.09, mouse: 'Logitech G Pro X Superlight 2' },
    { name: 'NiKo', game: 'CS2', team: 'G2', dpi: 400, sens: 1.4, mouse: 'Zowie EC2-GW' },
    { name: 'Demon1', game: 'Valorant', team: 'NRG', dpi: 1600, sens: 0.1, mouse: 'G-Wolves HTS+ 4K' },
    { name: 'ZywOo', game: 'CS2', team: 'Vitality', dpi: 400, sens: 2.0, mouse: 'Pulsar Xlite V3' },
    { name: 'Faker', game: 'LoL', team: 'T1', dpi: 3200, sens: 50, mouse: 'Razer DeathAdder V3' },
    { name: 'Aspas', game: 'Valorant', team: 'LEV', dpi: 800, sens: 0.4, mouse: 'Logitech G Pro X Superlight 2' },
    { name: 'm0NESY', game: 'CS2', team: 'G2', dpi: 400, sens: 2.3, mouse: 'Logitech G Pro X Superlight 2' },
    { name: 'Boaster', game: 'Valorant', team: 'Fnatic', dpi: 800, sens: 0.25, mouse: 'Logitech G Pro X Superlight' },
    { name: 'Gumayusi', game: 'LoL', team: 'T1', dpi: 1600, sens: 40, mouse: 'Logitech G Pro Wireless' },
];
