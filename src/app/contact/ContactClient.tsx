"use client";

import React, { useState } from "react";
import { useCursor } from "../context/CursorContext";
import TextGravityReveal from "../components/TextGravityReveal";

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactClient() {
    const { setCursorType } = useCursor();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: FormErrors = {};
        if (!formData.name) newErrors.name = "ID Required";
        if (!formData.email) newErrors.email = "Signal Path Required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid Signal Path";
        if (!formData.message) newErrors.message = "Data Payload Empty";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-[#E5E7EB] flex flex-col md:flex-row relative">

            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#00FFA3 1px, transparent 1px), linear-gradient(90deg, #00FFA3 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />

            {/* Left Panel: Context & Info */}
            <div className="w-full md:w-[45%] p-8 md:p-20 flex flex-col justify-center gap-12 border-b md:border-b-0 md:border-r border-[#00FFA3]/10 md:h-screen md:sticky md:top-0 relative overflow-hidden">

                {/* Decorative Cyber Elements */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-[#00FFA3] animate-pulse" />
                <div className="absolute bottom-10 right-10 text-[10px] font-tech text-[#00FFA3]/40">
                    SYS.READY
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="font-tech text-xs text-[#00FFA3] tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-ping" />
                        OPEN CHANNEL
                    </div>
                    <h1 className="text-6xl md:text-8xl font-cyber font-bold leading-[0.9] tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#E5E7EB] to-[#6B7280]">
                        <TextGravityReveal staggerDelay={0.02}>LET&apos;S</TextGravityReveal><br />
                        <TextGravityReveal staggerDelay={0.02} delay={0.1}>BUILD</TextGravityReveal>
                    </h1>

                    <p className="font-tech text-[#6B7280] text-sm md:text-base max-w-sm leading-relaxed border-l-2 border-[#00FFA3]/30 pl-6">
                        Initializing collaborative protocols. Define your parameters and we will engineer the solution.
                    </p>
                </div>

                <div className="mt-8 space-y-10">
                    <div>
                        <span className="block text-[10px] font-tech tracking-widest text-[#6B7280] mb-2 uppercase">Secure Uplink</span>
                        <a href="mailto:hello@poorna.dev"
                            className="text-xl md:text-2xl font-cyber font-medium hover:text-[#00FFA3] transition-colors duration-300 flex items-center gap-3 group"
                            onMouseEnter={() => setCursorType("hover")}
                            onMouseLeave={() => setCursorType("default")}>
                            <span className="opacity-50 group-hover:opacity-100 transition-opacity">►</span>
                            hello@poorna.dev
                        </a>
                    </div>

                    <div>
                        <span className="block text-[10px] font-tech tracking-widest text-[#6B7280] mb-4 uppercase">Network Nodes</span>
                        <div className="flex gap-8 text-xs font-tech text-[#E5E7EB]">
                            {['TWITTER', 'LINKEDIN', 'GITHUB', 'INSTAGRAM'].map((social) => (
                                <a key={social} href="#"
                                    className="hover:text-[#00FFA3] transition-colors duration-300 relative group tracking-wider uppercase"
                                    onMouseEnter={() => setCursorType("hover")}
                                    onMouseLeave={() => setCursorType("default")}>
                                    [{social}]
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: The Form */}
            <div className="w-full md:w-[55%] p-8 md:p-24 flex items-center justify-center min-h-[50vh] relative">
                <div className="w-full max-w-xl relative transform transition-all">
                    {isSubmitted ? (
                        <div className="bg-[#00FFA3]/5 border border-[#00FFA3]/30 p-12 text-center rounded animate-fade-in relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFA3] to-transparent animate-scan" />
                            <h3 className="text-3xl font-cyber font-bold text-[#00FFA3] mb-4 tracking-tight uppercase">Transmission Complete</h3>
                            <p className="font-tech text-[#6B7280] text-sm mb-8">Data packet successfully integrated into the system.</p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-xs font-tech underline text-[#E5E7EB] hover:text-[#00FFA3] tracking-widest uppercase"
                                onMouseEnter={() => setCursorType("hover")}
                                onMouseLeave={() => setCursorType("default")}
                            >
                                [ Reset Connection ]
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-12">

                            {/* Name Field */}
                            <div className="group relative">
                                <label className="block text-[10px] font-tech uppercase tracking-[0.2em] text-[#6B7280] mb-2 group-focus-within:text-[#00FFA3] transition-colors">
                                    Identification
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    placeholder="ex: User_01"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-[#6B7280]/30 py-4 text-xl font-cyber tracking-wide text-[#E5E7EB] placeholder-[#6B7280]/20 focus:outline-none focus:border-[#00FFA3] transition-all duration-300"
                                    onFocus={() => setCursorType("text")}
                                    onBlur={() => setCursorType("default")}
                                />
                                {errors.name && <span className="absolute -bottom-6 left-0 text-[#FF3366] text-[10px] font-tech tracking-wider">{errors.name}</span>}
                            </div>

                            {/* Email Field */}
                            <div className="group relative">
                                <label className="block text-[10px] font-tech uppercase tracking-[0.2em] text-[#6B7280] mb-2 group-focus-within:text-[#00FFA3] transition-colors">
                                    Signal Frequency
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    placeholder="user@network.com"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-[#6B7280]/30 py-4 text-xl font-cyber tracking-wide text-[#E5E7EB] placeholder-[#6B7280]/20 focus:outline-none focus:border-[#00FFA3] transition-all duration-300"
                                    onFocus={() => setCursorType("text")}
                                    onBlur={() => setCursorType("default")}
                                />
                                {errors.email && <span className="absolute -bottom-6 left-0 text-[#FF3366] text-[10px] font-tech tracking-wider">{errors.email}</span>}
                            </div>

                            {/* Message Field */}
                            <div className="group relative">
                                <label className="block text-[10px] font-tech uppercase tracking-[0.2em] text-[#6B7280] mb-2 group-focus-within:text-[#00FFA3] transition-colors">
                                    Data Payload
                                </label>
                                <textarea
                                    rows={1}
                                    value={formData.message}
                                    placeholder="Input message parameters..."
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-transparent border-b border-[#6B7280]/30 py-4 text-lg font-cyber text-[#E5E7EB] leading-relaxed placeholder-[#6B7280]/20 focus:outline-none focus:border-[#00FFA3] transition-all duration-300 resize-none min-h-[100px]"
                                    onFocus={() => setCursorType("text")}
                                    onBlur={() => setCursorType("default")}
                                />
                                {errors.message && <span className="absolute -bottom-6 left-0 text-[#FF3366] text-[10px] font-tech tracking-wider">{errors.message}</span>}
                            </div>

                            <div className="pt-8">
                                <button
                                    disabled={isSubmitting}
                                    className="relative w-full md:w-auto group"
                                    onMouseEnter={() => setCursorType("hover")}
                                    onMouseLeave={() => setCursorType("default")}
                                >
                                    <div className={`
                                        relative px-10 py-4 bg-[#00FFA3] text-[#020617] font-tech font-bold text-sm tracking-widest uppercase
                                        transition-all duration-300 hover:bg-[#00FFA3]/90
                                        ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
                                    `}>
                                        <span className="flex items-center gap-3">
                                            {isSubmitting ? "PROCESSING..." : "EXECUTE TRANSMISSION"}
                                            {!isSubmitting && <span className="text-lg">→</span>}
                                        </span>
                                    </div>
                                    {/* Glitch Decorative Element */}
                                    <div className="absolute top-1 left-1 w-full h-full border border-[#00FFA3]/30 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
