"use client";

import React, { createContext, useContext, useState, useRef } from "react";

type SoundType = "hover" | "click" | "menu-open" | "menu-close";

interface SoundContextProps {
    playSound: (type: SoundType) => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const SoundContext = createContext<SoundContextProps>({
    playSound: () => { },
    isMuted: false,
    toggleMute: () => { },
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMuted, setIsMuted] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext on first interaction
    const initAudio = () => {
        if (!audioCtxRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                audioCtxRef.current = new AudioContextClass();
            }
        }
        if (audioCtxRef.current?.state === "suspended") {
            audioCtxRef.current.resume();
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const playSound = (type: SoundType) => {
        if (isMuted) return;
        initAudio(); // Ensure context is ready

        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === "hover") {
            // High pitch, short blip
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
            gainNode.gain.setValueAtTime(0.05, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.start(now);
            osc.stop(now + 0.05);

        } else if (type === "click") {
            // Low pitch, punchy
            osc.type = "square";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            osc.start(now);
            osc.stop(now + 0.1);

        } else if (type === "menu-open") {
            // Rising sweep
            osc.type = "triangle";
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
            gainNode.gain.setValueAtTime(0.05, now);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.3);

            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === "menu-close") {
            // Falling sweep
            osc.type = "triangle";
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
            gainNode.gain.setValueAtTime(0.05, now);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.3);

            osc.start(now);
            osc.stop(now + 0.3);
        }
    };

    return (
        <SoundContext.Provider value={{ playSound, isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
};
