export interface Game {
    id: string;
    name: string;
    yaw: number; // Degree per count (sensitivity multiplier)
}

export const games: Game[] = [
    { id: 'valorant', name: 'Valorant', yaw: 0.07 },
    { id: 'csgo', name: 'CS:GO / CS2', yaw: 0.022 },
    { id: 'apex', name: 'Apex Legends', yaw: 0.022 },
    { id: 'overwatch', name: 'Overwatch 2', yaw: 0.0066 },
    { id: 'cod', name: 'Call of Duty: Warzone / MW3', yaw: 0.0066 },
    { id: 'rainbow6', name: 'Rainbow Six Siege', yaw: 0.00572 }, // Default multiplier
    { id: 'fortnite', name: 'Fortnite', yaw: 0.005555 },
    { id: 'bf2042', name: 'Battlefield 2042', yaw: 0.022 },
    { id: 'pubg', name: 'PUBG', yaw: 0.00707 }, // Varies by view, approximate standard
    { id: 'destiny2', name: 'Destiny 2', yaw: 0.0066 },
    { id: 'quake', name: 'Quake / Source Engine', yaw: 0.022 },
    { id: 'roblox', name: 'Roblox', yaw: 0.2 }, // Rough estimate, highly variable
    { id: 'minecraft', name: 'Minecraft (Java)', yaw: 0.6 }, // Varies
];
