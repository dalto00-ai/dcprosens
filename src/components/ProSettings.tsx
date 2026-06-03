"use client";

import { useState } from 'react';
import { pros } from '@/lib/pros';
import styles from './ProSettings.module.css';

export default function ProSettings() {
    const [filterGame, setFilterGame] = useState('All');

    const filteredPros = filterGame === 'All'
        ? pros
        : pros.filter(p => p.game.includes(filterGame));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Pro Player Settings Database</h2>
                <div className={styles.filters} role="group" aria-label="Filter by game">
                    {['All', 'Valorant', 'CS2', 'LoL'].map(game => (
                        <button
                            key={game}
                            onClick={() => setFilterGame(game)}
                            className={`${styles.filterBtn} ${filterGame === game ? styles.active : ''}`}
                            aria-label={`Filter by ${game}`}
                            aria-pressed={filterGame === game}
                        >
                            {game}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Game</th>
                            <th>Team</th>
                            <th>DPI</th>
                            <th>Sens</th>
                            <th>eDPI</th>
                            <th>Mouse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPros.map((p) => (
                            <tr key={`${p.name}-${p.game}`}>
                                <td className={styles.playerName}>{p.name}</td>
                                <td>{p.game}</td>
                                <td>{p.team}</td>
                                <td>{p.dpi}</td>
                                <td>{p.sens}</td>
                                <td className={styles.edpi}>
                                    {p.game === 'LoL' ? '-' : (p.dpi * p.sens).toFixed(0)}
                                </td>
                                <td className={styles.mouse}>{p.mouse}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
