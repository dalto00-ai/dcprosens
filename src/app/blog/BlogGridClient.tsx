'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BlogImage from '@/components/BlogImage';
import blogStyles from './blog.module.css';

export interface BlogPostSummary {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
}

interface BlogGridClientProps {
    posts: BlogPostSummary[];
    initialCount?: number;
}

const PAGE_SIZE = 24;

export default function BlogGridClient({ posts, initialCount = PAGE_SIZE }: BlogGridClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const [visibleCount, setVisibleCount] = useState<number>(initialCount);

    // Extract unique categories in uppercase
    const categories = useMemo(() => {
        const set = new Set<string>();
        posts.forEach(p => {
            if (p.category) {
                set.add(p.category.trim().toUpperCase());
            }
        });
        return ['ALL', ...Array.from(set).sort()];
    }, [posts]);

    // Filter posts by category and search query
    const filteredPosts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return posts.filter(post => {
            const matchesCategory =
                selectedCategory === 'ALL' ||
                (post.category && post.category.trim().toUpperCase() === selectedCategory);

            if (!matchesCategory) return false;
            if (!query) return true;

            return (
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                (post.category && post.category.toLowerCase().includes(query))
            );
        });
    }, [posts, selectedCategory, searchQuery]);

    const displayedPosts = filteredPosts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPosts.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    };

    const handleCategoryClick = (cat: string) => {
        setSelectedCategory(cat);
        setVisibleCount(PAGE_SIZE);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setVisibleCount(PAGE_SIZE);
    };

    return (
        <div>
            {/* Search & Category Filter Controls */}
            <div className={blogStyles.filterBar}>
                <div className={blogStyles.searchWrapper}>
                    <span className={blogStyles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search 440+ aim guides, sensitivity calculators, mice, eDPI..."
                        className={blogStyles.searchInput}
                        aria-label="Search guides"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className={blogStyles.clearSearchBtn}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className={blogStyles.categoryList}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => handleCategoryClick(cat)}
                            className={`${blogStyles.categoryPill} ${
                                selectedCategory === cat ? blogStyles.categoryPillActive : ''
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={blogStyles.resultsCount}>
                    Showing {displayedPosts.length} of {filteredPosts.length} guides
                    {selectedCategory !== 'ALL' && ` in "${selectedCategory}"`}
                    {searchQuery && ` matching "${searchQuery}"`}
                </div>
            </div>

            {/* Empty State */}
            {displayedPosts.length === 0 ? (
                <div className={blogStyles.emptyState}>
                    <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No guides found</p>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Try searching with different keywords or reset your category filter.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('ALL');
                        }}
                        className={blogStyles.resetBtn}
                    >
                        Reset Filters
                    </button>
                </div>
            ) : (
                /* Grid of Cards */
                <div className={blogStyles.grid}>
                    {displayedPosts.map(post => (
                        <Link
                            href={`/blog/${post.slug}/`}
                            key={post.slug}
                            style={{ display: 'block', height: '100%' }}
                        >
                            <div className={blogStyles.card}>
                                <div className={blogStyles.cardImageWrapper}>
                                    <BlogImage
                                        src={post.image}
                                        alt={post.title}
                                        width={480}
                                        height={200}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={blogStyles.cardBody}>
                                    <div className={blogStyles.category}>
                                        {post.category ? post.category.toUpperCase() : 'GUIDE'}
                                    </div>
                                    <div className={blogStyles.meta}>
                                        {post.readTime} • {post.date}
                                    </div>
                                    <h2 className={blogStyles.title}>{post.title}</h2>
                                    <p className={blogStyles.excerpt}>{post.excerpt}</p>
                                    <div className={blogStyles.readMore}>Read Article →</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Load More Button */}
            {hasMore && (
                <div className={blogStyles.loadMoreWrapper}>
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        className={blogStyles.loadMoreBtn}
                    >
                        Load More Articles (+{Math.min(PAGE_SIZE, filteredPosts.length - visibleCount)})
                    </button>
                    <p className={blogStyles.loadMoreMeta}>
                        Showing {displayedPosts.length} of {filteredPosts.length} articles
                    </p>
                </div>
            )}
        </div>
    );
}

