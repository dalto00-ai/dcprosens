"use client";

import { useState } from 'react';
import styles from './VoiceSearch.module.css';

export default function VoiceSearch() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice search is not supported in this browser. Try Chrome.');
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            // In a real app, implementation would trigger search/action here
            console.log('Voice Command:', text);
            window.open(`https://www.google.com/search?q=site:dcprosens.com+${text}`, '_blank');
        };

        recognition.start();
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.micButton} ${isListening ? styles.active : ''}`}
                onClick={startListening}
                title="Voice Search"
            >
                {isListening ? '🎤 Listening...' : '🎤 Voice Search'}
            </button>
            {transcript && <p className={styles.transcript}>Did you say: "{transcript}"?</p>}
        </div>
    );
}
