"use client";

import { useState, useMemo } from "react";
import { games } from "@/lib/games";
import styles from "./WidgetGenerator.module.css";

export default function WidgetGenerator() {
    const [name, setName] = useState("YourName");
    const [game, setGame] = useState("csgo");
    const [sens, setSens] = useState<number | string>(2);
    const [dpi, setDpi] = useState<number | string>(800);
    const [copied, setCopied] = useState(false);

    const embedUrl = useMemo(() => {
        const params = new URLSearchParams({
            game,
            sens: String(Number(sens) || 0),
            dpi: String(Number(dpi) || 0),
            name: name.trim() || "Streamer",
        });
        return `https://dcprosens.com/embed/?${params.toString()}`;
    }, [game, sens, dpi, name]);

    const iframeCode = `<iframe src="${embedUrl}" width="340" height="240" style="border:none;border-radius:10px;" title="${name || "Streamer"}'s sensitivity"></iframe>`;

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(iframeCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API unavailable (e.g. insecure context) — copied state
            // just won't flip; the code is still visible to select manually.
        }
    };

    return (
        <div className={styles.wrap}>
                <div className={styles.form}>
                    <label className={styles.field}>
                        <span>Display name</span>
                        <input
                            type="text"
                            value={name}
                            maxLength={24}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="YourName"
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Game</span>
                        <select value={game} onChange={(e) => setGame(e.target.value)}>
                            {games.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className={styles.row}>
                        <label className={styles.field}>
                            <span>Sensitivity</span>
                            <input
                                type="number"
                                step="0.001"
                                value={sens}
                                onChange={(e) => setSens(e.target.value)}
                            />
                        </label>
                        <label className={styles.field}>
                            <span>DPI</span>
                            <input
                                type="number"
                                step="50"
                                value={dpi}
                                onChange={(e) => setDpi(e.target.value)}
                            />
                        </label>
                    </div>
                </div>

                <div className={styles.previewCol}>
                    <p className={styles.previewLabel}>Live preview</p>
                    <div className={styles.previewFrame}>
                        <iframe
                            src={embedUrl}
                            width="340"
                            height="240"
                            style={{ border: "none", borderRadius: "10px" }}
                            title="Widget preview"
                        />
                    </div>

                    <button type="button" className={styles.copyBtn} onClick={copyCode}>
                        {copied ? "Copied!" : "Copy embed code"}
                    </button>
                    <textarea className={styles.codeBox} readOnly value={iframeCode} rows={3} />
                </div>
            </div>
    );
}

