"use client";

import { useState, useMemo } from 'react';
import { mouseDatabase, MouseSpec } from '@/lib/mouseDatabase';
import styles from './MouseDatabaseClient.module.css';

type SortKey = 'weight' | 'price' | 'proScore' | 'rating';
type FilterShape = 'All' | 'Symmetrical' | 'Ergonomic Right';
type FilterConn = 'All' | 'Wired' | 'Wireless' | 'Both';
type FilterCat = 'All' | 'Ultra-Light' | 'Competitive' | 'Ergonomic' | 'Value';

export default function MouseDatabaseClient() {
    const [sortBy, setSortBy] = useState<SortKey>('proScore');
    const [filterShape, setFilterShape] = useState<FilterShape>('All');
    const [filterConn, setFilterConn] = useState<FilterConn>('All');
    const [filterCat, setFilterCat] = useState<FilterCat>('All');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => {
        let mice = [...mouseDatabase];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            mice = mice.filter(m =>
                m.name.toLowerCase().includes(q) ||
                m.brand.toLowerCase().includes(q) ||
                m.sensor.toLowerCase().includes(q) ||
                m.proUsage.some(p => p.toLowerCase().includes(q))
            );
        }

        if (filterShape !== 'All') mice = mice.filter(m => m.shape === filterShape);
        if (filterConn !== 'All') mice = mice.filter(m => m.connectivity === filterConn || m.connectivity === 'Both');
        if (filterCat !== 'All') mice = mice.filter(m => m.category === filterCat);

        mice.sort((a, b) => {
            if (sortBy === 'weight') return a.weight - b.weight;
            if (sortBy === 'price') return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
            if (sortBy === 'proScore') return b.proScore - a.proScore;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });

        return mice;
    }, [sortBy, filterShape, filterConn, filterCat, searchQuery]);

    const getRatingStars = (rating: number) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
    };

    return (
        <div className={styles.wrapper}>
            {/* FILTERS BAR */}
            <div className={styles.filtersBar}>
                <input
                    type="search"
                    className={styles.searchInput}
                    placeholder="🔍 Search mouse, brand, sensor, or pro player..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="mouse-search"
                />

                <div className={styles.filterGroups}>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Shape</label>
                        <div className={styles.pills}>
                            {(['All', 'Symmetrical', 'Ergonomic Right'] as FilterShape[]).map(v => (
                                <button key={v} className={`${styles.pill} ${filterShape === v ? styles.pillActive : ''}`}
                                    onClick={() => setFilterShape(v)}>{v}</button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Connection</label>
                        <div className={styles.pills}>
                            {(['All', 'Wired', 'Wireless'] as FilterConn[]).map(v => (
                                <button key={v} className={`${styles.pill} ${filterConn === v ? styles.pillActive : ''}`}
                                    onClick={() => setFilterConn(v)}>{v}</button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Category</label>
                        <div className={styles.pills}>
                            {(['All', 'Ultra-Light', 'Competitive', 'Ergonomic', 'Value'] as FilterCat[]).map(v => (
                                <button key={v} className={`${styles.pill} ${filterCat === v ? styles.pillActive : ''}`}
                                    onClick={() => setFilterCat(v)}>{v}</button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Sort by</label>
                        <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}>
                            <option value="proScore">Pro Usage</option>
                            <option value="rating">Rating</option>
                            <option value="weight">Lightest First</option>
                            <option value="price">Lowest Price</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* RESULTS COUNT */}
            <p className={styles.resultsCount}>
                Showing <strong>{filtered.length}</strong> mice
            </p>

            {/* MOUSE CARDS GRID */}
            <div className={styles.grid}>
                {filtered.map(mouse => (
                    <div key={mouse.id} className={`${styles.card} ${expandedId === mouse.id ? styles.cardExpanded : ''}`}>
                        {/* CARD HEADER */}
                        <div className={styles.cardHeader}>
                            {mouse.badge && (
                                <span className={styles.badge}>{mouse.badge}</span>
                            )}
                            <div className={styles.brandRow}>
                                <span className={styles.brand}>{mouse.brand}</span>
                                <span className={styles.connectivity}
                                    style={{ color: mouse.connectivity === 'Wireless' ? 'var(--primary)' : 'var(--text-secondary)' }}>
                                    {mouse.connectivity === 'Wireless' ? '📡 Wireless' : '🔌 Wired'}
                                </span>
                            </div>
                            <h3 className={styles.mouseName}>{mouse.name}</h3>

                            <div className={styles.ratingRow}>
                                <span className={styles.stars}>{getRatingStars(mouse.rating)}</span>
                                <span className={styles.ratingNum}>{mouse.rating}/5</span>
                            </div>
                        </div>

                        {/* KEY SPECS */}
                        <div className={styles.keySpecs}>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Weight</span>
                                <strong className={styles.specValue} style={{ color: mouse.weight < 60 ? 'var(--primary)' : 'var(--text-primary)' }}>
                                    {mouse.weight}g
                                </strong>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Sensor</span>
                                <strong className={styles.specValue}>{mouse.sensor}</strong>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Polling</span>
                                <strong className={styles.specValue}>{mouse.pollingRate}</strong>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Price</span>
                                <strong className={styles.specValue} style={{ color: 'var(--primary)' }}>{mouse.price}</strong>
                            </div>
                        </div>

                        {/* EXPANDABLE DETAILS */}
                        {expandedId === mouse.id && (
                            <div className={styles.expandedDetails}>
                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailRow}>
                                        <span>Shape</span><strong>{mouse.shape}</strong>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span>Max DPI</span><strong>{mouse.maxDpi.toLocaleString()} DPI</strong>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span>Clicks</span><strong>{mouse.clicks}</strong>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span>Dimensions</span><strong>{mouse.length}×{mouse.width}×{mouse.height} mm</strong>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span>Category</span><strong>{mouse.category}</strong>
                                    </div>
                                </div>

                                {mouse.proUsage.length > 0 && (
                                    <div className={styles.proUsageSection}>
                                        <span className={styles.proUsageLabel}>👤 Used by pros:</span>
                                        <div className={styles.proTags}>
                                            {mouse.proUsage.map(p => (
                                                <span key={p} className={styles.proTag}>{p}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {mouse.games.length > 0 && (
                                    <div className={styles.gamesSection}>
                                        <span className={styles.proUsageLabel}>🎮 Best for:</span>
                                        <div className={styles.proTags}>
                                            {mouse.games.map(g => (
                                                <span key={g} className={styles.gameTag}>{g}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CARD ACTIONS */}
                        <div className={styles.cardActions}>
                            <button
                                className={styles.detailsBtn}
                                onClick={() => setExpandedId(expandedId === mouse.id ? null : mouse.id)}
                            >
                                {expandedId === mouse.id ? '↑ Less' : '↓ Full Specs'}
                            </button>
                            <a
                                href={mouse.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className={styles.buyBtn}
                            >
                                View on Amazon →
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className={styles.emptyState}>
                    <span style={{ fontSize: '3rem' }}>🖱️</span>
                    <p>No mice match your filters. Try clearing some filters.</p>
                </div>
            )}
        </div>
    );
}
