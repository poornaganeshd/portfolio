"use client";

import React, { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import { useCursor } from "../context/CursorContext";
import TextGravityReveal from "../components/TextGravityReveal";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function PlaygroundClient() {
    const { setCursorType } = useCursor();

    // --- Image Generator State ---
    const [imagePrompt, setImagePrompt] = useState("");
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    const generateImage = () => {
        if (!imagePrompt) return;
        setIsLoadingImage(true);
        // Simulate generation
        setTimeout(() => {
            setGeneratedImage(imagePrompt.includes("cyber") ? "/images/neural-scape.png" : "/images/void-terminal.png");
            setIsLoadingImage(false);
        }, 2000);
    };

    // --- RAG Chatbot State ---
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "SYSTEM ONLINE. Awaiting queries regarding user: Poornaganesh." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate RAG response
        setTimeout(() => {
            let response = "Access denied. Data fragmentation detected.";
            const lower = userMsg.content.toLowerCase();

            if (lower.includes("stack") || lower.includes("tech")) {
                response = "Analyzed Tech Stack: Next.js 14, React Server Components, TailwindCSS, TypeScript, WebGL, Node.js.";
            } else if (lower.includes("contact") || lower.includes("email")) {
                response = "Communication Channels: poornaganesh@example.com // Encrypted Signal Line Active.";
            } else if (lower.includes("hello") || lower.includes("hi")) {
                response = "Handshake acknowledged. Proceed with inquiry.";
            }

            setMessages(prev => [...prev, { role: "assistant", content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#F1F1F1] p-6 md:p-20 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 font-mono">

            {/* 1. Image Generator Console */}
            <div className="border border-white/10 bg-black/50 rounded-lg p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-20" />

                <div className="mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                        <span className="text-[#00F0FF]">&gt;</span> VISUAL_SYNTHESIS
                    </h2>
                    <p className="opacity-50 text-sm">Text-to-Image Diffusion Model v2.1</p>
                </div>

                <div className="aspect-square w-full bg-[#0A0A0A] border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden">
                    {isLoadingImage ? (
                        <div className="animate-pulse text-[#00F0FF]">GENERATING...</div>
                    ) : generatedImage ? (
                        <NextImage src={generatedImage} alt="Generated" fill className="object-cover" />
                    ) : (
                        <div className="opacity-20 text-center p-4">
                            Waiting for input prompt...
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Enter prompt e.g. 'Cyberpunk city'"
                        className="flex-1 bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-[#00F0FF] transition-colors"
                        onFocus={() => setCursorType("text")}
                        onBlur={() => setCursorType("default")}
                    />
                    <button
                        onClick={generateImage}
                        className="px-6 py-2 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/50 hover:bg-[#00F0FF] hover:text-black transition-all uppercase text-sm font-bold tracking-wider"
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        Generate
                    </button>
                </div>
            </div>

            {/* 2. RAG Chatbot Console */}
            <div className="border border-white/10 bg-black/50 rounded-lg p-8 flex flex-col h-[70vh] lg:h-auto">
                <div className="mb-4 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" /> SYSTEM_CHAT
                    </h2>
                    <p className="opacity-50 text-sm">RAG Protocol: Resume.pdf Loaded</p>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-lg text-sm ${msg.role === 'user'
                                    ? 'bg-white/10 border border-white/5'
                                    : 'bg-[#00F0FF]/5 border border-[#00F0FF]/20 text-[#00F0FF]'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/20 text-[#00F0FF] p-4 rounded-lg text-sm animate-pulse">
                                ...
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Query system database..."
                        className="flex-1 bg-transparent border border-white/20 p-4 rounded focus:outline-none focus:border-[#00F0FF] transition-colors"
                        onFocus={() => setCursorType("text")}
                        onBlur={() => setCursorType("default")}
                    />
                    <button
                        onClick={handleSend}
                        className="px-6 bg-white text-black font-bold uppercase hover:bg-[#00F0FF] transition-colors rounded"
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* Header Overlay */}
            <div className="fixed top-24 left-0 w-full pointer-events-none flex justify-center -z-10 opacity-20">
                <div className="max-w-4xl w-full text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#00F0FF] mb-2 glitch-text">
                        <TextGravityReveal>PLAYGROUND_v1.0</TextGravityReveal>
                    </h1>
                    <p className="opacity-50 tracking-widest text-sm uppercase">Generative AI // RAG Protocol</p>
                </div>
            </div>
        </div>
    );
}
