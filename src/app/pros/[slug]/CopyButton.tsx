'use client';

import { useState } from 'react';

interface CopyButtonProps {
    code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const el = document.createElement('textarea');
            el.value = code;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                padding: '0.65rem 1.25rem',
                background: copied
                    ? 'rgba(0,255,157,0.15)'
                    : 'var(--primary)',
                color: copied ? 'var(--primary)' : '#000',
                border: copied ? '1px solid var(--primary)' : 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
            }}
        >
            {copied ? '✅ Copied!' : '📋 Copy Code'}
        </button>
    );
}
