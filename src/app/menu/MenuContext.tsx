"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MenuContextType {
    isOpen: boolean;
    isVisible: boolean; // For scroll logic
    toggleMenu: () => void;
    closeMenu: () => void;
    openMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Scroll Logic to hide button
    useEffect(() => {
        const handleScroll = () => {
            // Hide after 80% of viewport
            if (window.scrollY > window.innerHeight * 0.8) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);
    const openMenu = () => setIsOpen(true);

    return (
        <MenuContext.Provider value={{ isOpen, isVisible, toggleMenu, closeMenu, openMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};
