"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { games } from "@/lib/games";
import { calculateCmPer360, convertSensitivity } from "@/lib/converter";
import styles from "./EmbedWidget.module.css";

export default function EmbedWidget() {
    const params = useSearchParams();

    const streamerGame = params.get("game") || "valorant";
    const streamerSens = Number(params.get("sens")) || 1;
    const streamerDpi = Number(params.get("dpi")) || 800;
    const streamerName = (params.get("name") || "Streamer").slice(0, 24);

    const validGame = games.some((g) => g.id === streamerGame);

    const [viewerGame, setViewerGame] = useState(
        streamerGame === "csgo" ? "valorant" : "csgo"
    );

    const cm360 = useMemo(
        () => (validGame ? calculateCmPer360(streamerSens, streamerDpi, streamerGame) : 0),
        [validGame, streamerSens, streamerDpi, streamerGame]
    );

    const convertedSens = useMemo(
        () =>
            validGame
                ? convertSensitivity(streamerGame, viewerGame, streamerSens, streamerDpi)
                : 0,
        [validGame, streamerGame, viewerGame, streamerSens, streamerDpi]
    );

    const gameName = (id: string) => games.find((g) => g.id === id)?.name ?? id;

    if (!validGame) {
        return (
            <div className={styles.card}>
                <p className={styles.errorState}>
                    Invalid or missing game parameter.{" "}
                    <a href="https://dcprosens.com/widget" style={{ color: "#00ff9d" }}>
                        Generate a widget →
                    </a>
                </p>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.streamer}>
                    <span className={styles.liveDot} aria-hidden="true" />
                    <span className={styles.streamerName}>{streamerName}&apos;s Sens</span>
                </div>
            </div>

            <div className={styles.statRow}>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>Game</div>
                    <div className={styles.statValue}>{gameName(streamerGame)}</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>Sens / DPI</div>
                    <div className={styles.statValue}>
                        {streamerSens} / {streamerDpi}
                    </div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>cm/360</div>
                    <div className={styles.statValue}>{cm360.toFixed(1)}</div>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.convertRow}>
                <span className={styles.convertLabel}>Your game:</span>
                <select
                    className={styles.select}
                    value={viewerGame}
                    onChange={(e) => setViewerGame(e.target.value)}
                >
                    {games.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.result}>
                <span className={styles.resultLabel}>Your equivalent sens</span>
                <span className={styles.resultValue}>{convertedSens.toFixed(3)}</span>
            </div>

            <div className={styles.footer}>
                <a href="https://dcprosens.com" target="_blank" rel="noopener noreferrer">
                    Powered by DCPROSENS
                </a>
            </div>
        </div>
    );
}
