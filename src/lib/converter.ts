import { games, Game } from './games';

/**
 * Calculates centimeters per 360 degree turn.
 * Formula: 360 / (sensitivity * yaw * dpi) * 2.54
 * Simplified if using standardized units.
 * 
 * Standard approach:
 * 1. Calculate "True Sensitivity" (some call it eDPI but normalized).
 *    We can convert everything to a standard "yaw" (e.g., Source engine 0.022).
 *    
 *    cm/360 = 360 / (sens * yaw * dpi) * 2.54
 */

export function calculateCmPer360(sens: number, dpi: number, gameId: string): number {
    const game = games.find(g => g.id === gameId);
    if (!game || sens === 0 || dpi === 0) return 0;

    // inches/360 = 360 / (sens * yaw * dpi)
    // cm/360 = inches * 2.54

    // Note: some games calculate differently, but yaw-based is standard for FPS.
    // yaw is "degrees per count".
    // degrees = counts * yaw
    // For 360 degrees: 360 = counts * yaw  => counts = 360 / yaw
    // counts = inches * dpi  => inches = counts / dpi = (360/yaw) / dpi

    const inches = 360 / (sens * game.yaw * dpi);
    return inches * 2.54;
}

export function convertSensitivity(
    fromGameId: string,
    toGameId: string,
    fromSens: number,
    dpi: number // DPI is actually constant for the mouse, but needed if we want eDPI changes. 
    // For pure sens conversion between games (same mouse DPI), it's:
    // sens1 * yaw1 = sens2 * yaw2  => sens2 = sens1 * yaw1 / yaw2
): number {
    const fromGame = games.find(g => g.id === fromGameId);
    const toGame = games.find(g => g.id === toGameId);

    if (!fromGame || !toGame) return 0;

    // Simple conversion preserving cm/360
    return (fromSens * fromGame.yaw) / toGame.yaw;
}
