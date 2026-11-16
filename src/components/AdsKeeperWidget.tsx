'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        _mgq?: Array<unknown[]>;
    }
}

const EXCLUDED_PREFIXES = [
    '/embed',
    '/login',
    '/dashboard',
    '/pricing',
    '/ebooks/download',
    '/vip-overhaul',
];

interface AdsKeeperWidgetProps {
    widgetId: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Renders an AdsKeeper (_mgwidget) container and queues `_mgc.load` on mount
 * and client-side route transitions. Automatically suppressed on auth,
 * checkout, and embed routes.
 */
export default function AdsKeeperWidget({ widgetId, className, style }: AdsKeeperWidgetProps) {
    const pathname = usePathname();
    const isExcluded = EXCLUDED_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

    useEffect(() => {
        if (isExcluded) return;
        window._mgq = window._mgq || [];
        window._mgq.push(['_mgc.load']);
    }, [isExcluded, pathname, widgetId]);

    if (isExcluded) {
        return null;
    }

    return (
        <div
            className={className}
            style={style}
            data-type="_mgwidget"
            data-widget-id={widgetId}
        />
    );
}
