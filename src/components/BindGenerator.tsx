"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './BindGenerator.module.css';

interface BindConfig {
    id: string;
    label: string;
    description: string;
    defaultKey: string;
    comment: string;
    template: (key: string) => string;
}

const BIND_DEFINITIONS: BindConfig[] = [
    {
        id: 'jumpthrow',
        label: 'CS2 Jumpthrow Bind',
        description: 'Perfect consistency for throwing smoke grenades at the peak of your jump. CS2 sub-tick execution.',
        defaultKey: 'alt',
        comment: 'CS2 Jumpthrow Bind',
        template: (key) => `alias "+jumpaction" "+jump";\nalias "+throwaction" "-attack; -attack2";\nalias "-jumpaction" "-jump";\nbind "${key}" "+jumpaction;+throwaction";`
    },
    {
        id: 'radarZoom',
        label: 'Radar Zoom Toggle',
        description: 'Toggle between zoomed-in (combats, bomb hunting) and zoomed-out (full map overview) radar scaling.',
        defaultKey: 'c',
        comment: 'CS2 Radar Zoom Toggle',
        template: (key) => `alias "toggle_radar" "toggle cl_radar_scale 0.40 0.85";\nbind "${key}" "toggle_radar";`
    },
    {
        id: 'dropBomb',
        label: 'Instant Drop Bomb Bind',
        description: 'Drop the C4 bomb instantly without switching away from your primary rifle.',
        defaultKey: 'x',
        comment: 'CS2 Drop Bomb Bind',
        template: (key) => `bind "${key}" "slot5; drop; slot1";`
    },
    {
        id: 'crosshairToggle',
        label: 'Lineup Crosshair Toggle',
        description: 'Toggles a massive crosshair stretching across your screen for aligning smokes with distant references.',
        defaultKey: 'v',
        comment: 'CS2 Lineup Crosshair Toggle',
        template: (key) => `alias "crosshair_toggle" "toggle cl_crosshairsize 2 1000";\nbind "${key}" "crosshair_toggle";`
    },
    {
        id: 'muteVoice',
        label: 'Mute Voice Chat (Clutch)',
        description: 'Instantly mute and unmute all voice comms. Vital for clutching silent 1vX scenarios.',
        defaultKey: 'm',
        comment: 'CS2 Voice Toggle (Clutch)',
        template: (key) => `bind "${key}" "voice_modenable_toggle";`
    },
    {
        id: 'clearDecals',
        label: 'Inspect & Ping Cleanup Bind',
        description: 'r_cleardecals is disabled in CS2. This binds inspect to clean up HUD pings and decals when possible.',
        defaultKey: 'f',
        comment: 'CS2 Inspect Bind',
        template: (key) => `bind "${key}" "inspect";`
    }
];

export default function BindGenerator() {
    const [binds, setBinds] = useState<Record<string, string>>({
        jumpthrow: 'alt',
        radarZoom: 'c',
        dropBomb: 'x',
        crosshairToggle: 'v',
        muteVoice: 'm',
        clearDecals: 'f'
    });

    const [activeAction, setActiveAction] = useState<string | null>(null);
    const [copied, setCopied] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Global Key Listener for physical key binds
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!activeAction) return;

            e.preventDefault();
            e.stopPropagation();

            const rawKey = e.key;
            if (rawKey === 'Escape') {
                setActiveAction(null);
                return;
            }

            const mappedKey = mapJsKeyToCs2(rawKey);
            setBinds((prev) => ({
                ...prev,
                [activeAction]: mappedKey
            }));
            setActiveAction(null);
        };

        if (activeAction) {
            window.addEventListener('keydown', handleKeyDown, true);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [activeAction]);

    const mapJsKeyToCs2 = (key: string): string => {
        const k = key.toLowerCase();
        if (k === ' ') return 'space';
        if (k === 'control') return 'ctrl';
        if (k === 'altgraph') return 'alt';
        if (k === 'meta') return 'win';
        if (k === 'arrowup') return 'uparrow';
        if (k === 'arrowdown') return 'downarrow';
        if (k === 'arrowleft') return 'leftarrow';
        if (k === 'arrowright') return 'rightarrow';
        return k;
    };

    // Keyboard Visual Layout config
    const keyboardRows = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
        ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
        ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
        ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'rshift'],
        ['ctrl', 'alt', 'space', 'ralt', 'rctrl'],
        ['mouse3', 'mouse4', 'mouse5', 'mwheelup', 'mwheeldown']
    ];

    const getKeyWidth = (key: string): string => {
        switch (key) {
            case 'space': return '220px';
            case 'shift':
            case 'rshift': return '70px';
            case 'capslock': return '65px';
            case 'tab': return '50px';
            case 'enter': return '65px';
            case 'ctrl':
            case 'rctrl':
            case 'alt':
            case 'ralt': return '48px';
            case 'mouse3':
            case 'mouse4':
            case 'mouse5':
            case 'mwheelup':
            case 'mwheeldown': return '75px';
            default: return '38px';
        }
    };

    const handleKeyClick = (key: string) => {
        if (!activeAction) return;
        setBinds((prev) => ({
            ...prev,
            [activeAction]: key
        }));
        setActiveAction(null);
    };

    const clearBind = (actionId: string) => {
        setBinds((prev) => {
            const copy = { ...prev };
            delete copy[actionId];
            return copy;
        });
    };

    const isKeyBound = (key: string): boolean => {
        return Object.values(binds).includes(key);
    };

    const getActionForKey = (key: string): string | null => {
        const found = Object.entries(binds).find(([_, k]) => k === key);
        return found ? found[0] : null;
    };

    // Compile Config text
    const generateConfigText = (): string => {
        let text = `// =========================================================\n`;
        text += `// DCPROSENS CS2 CONFIG & AUTOEXEC\n`;
        text += `// Generated online: https://dcprosens.com/bind-generator\n`;
        text += `// Place this file in: steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg/autoexec.cfg\n`;
        text += `// =========================================================\n\n`;

        BIND_DEFINITIONS.forEach((def) => {
            const key = binds[def.id];
            if (key) {
                text += `// ${def.comment}\n`;
                text += `${def.template(key)}\n\n`;
            }
        });

        text += `// Video/Performance Optimizations\n`;
        text += `cl_join_advertise "2" // Allow friends to join your community servers without invitation\n`;
        text += `fps_max "0" // Unlimited FPS for lowest latency\n\n`;

        text += `host_writeconfig // Writes settings to config.cfg; vital for keeping binds saved\n`;
        text += `echo "============================================="\n`;
        text += `echo "DCPROSENS AUTOEXEC LOADED SUCCESSFULLY!"\n`;
        text += `echo "============================================="`;

        return text;
    };

    const copyToClipboard = () => {
        const text = generateConfigText();
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error("Could not copy config to clipboard", err);
        });
    };

    const downloadCfgFile = () => {
        const text = generateConfigText();
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = "autoexec.cfg";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className={styles.card} ref={containerRef}>
            <h3 className={styles.title}>Configure Binds</h3>

            {/* Bind Selection Rows */}
            <div className={styles.bindsContainer}>
                {BIND_DEFINITIONS.map((def) => {
                    const isListening = activeAction === def.id;
                    const boundKey = binds[def.id];

                    return (
                        <div
                            key={def.id}
                            className={`${styles.bindRow} ${isListening ? styles.bindRowActive : ''}`}
                        >
                            <div className={styles.bindInfo}>
                                <div className={styles.bindLabel}>{def.label}</div>
                                <div className={styles.bindDesc}>{def.description}</div>
                            </div>
                            <div className={styles.bindSelector}>
                                <button
                                    type="button"
                                    className={`${styles.keyButton} ${isListening ? styles.keyButtonListening : ''}`}
                                    onClick={() => setActiveAction(isListening ? null : def.id)}
                                >
                                    {isListening ? "Press Key..." : boundKey ? boundKey.toUpperCase() : "UNBOUND"}
                                </button>
                                {boundKey && (
                                    <button
                                        type="button"
                                        className={styles.clearBtn}
                                        onClick={() => clearBind(def.id)}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Virtual Keyboard Grid */}
            <div className={styles.keyboardSection}>
                <div className={styles.keyboardHeader}>
                    <div className={styles.keyboardTitle}>Interactive Keyboard Map</div>
                    <div className={styles.keyboardTip}>
                        {activeAction
                            ? `Click a key below to bind to "${BIND_DEFINITIONS.find((d) => d.id === activeAction)?.label}"`
                            : "Keys highlighted in neon green are currently bound."}
                    </div>
                </div>

                <div className={styles.keyboardLayout}>
                    {keyboardRows.map((row, rowIdx) => (
                        <div key={rowIdx} className={styles.keyboardRow}>
                            {row.map((key) => {
                                const isBound = isKeyBound(key);
                                const currentAction = getActionForKey(key);
                                const isCurrentActive = activeAction && binds[activeAction] === key;

                                let keyClass = styles.keycap;
                                if (isCurrentActive) {
                                    keyClass += ` ${styles.keycapActive}`;
                                } else if (isBound) {
                                    keyClass += ` ${styles.keycapBound}`;
                                }

                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        className={keyClass}
                                        style={{ width: getKeyWidth(key) }}
                                        onClick={() => handleKeyClick(key)}
                                        title={currentAction ? `Bound to: ${BIND_DEFINITIONS.find((d) => d.id === currentAction)?.label}` : undefined}
                                    >
                                        {key.toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Config Preview Section */}
            <div className={styles.previewSection}>
                <div className={styles.previewHeader}>
                    <div className={styles.previewTitle}>autoexec.cfg Live Preview</div>
                    <div className={styles.previewActions}>
                        <button
                            type="button"
                            className={styles.previewBtn}
                            onClick={copyToClipboard}
                        >
                            {copied ? "Copied!" : "Copy Code"}
                        </button>
                        <button
                            type="button"
                            className={`${styles.previewBtn} ${styles.downloadBtn}`}
                            onClick={downloadCfgFile}
                        >
                            Download autoexec.cfg
                        </button>
                    </div>
                </div>
                <textarea
                    className={styles.codeArea}
                    value={generateConfigText()}
                    readOnly
                />
            </div>
        </div>
    );
}
