"use client";

import React, { createContext, useContext, useState } from "react";

type CursorType = "default" | "hover" | "text" | "hidden" | "view" | "none" | "menu";

interface CursorContextType {
    cursorType: CursorType;
    setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextType>({
    cursorType: "default",
    setCursorType: () => { },
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [cursorType, setCursorType] = useState<CursorType>("default");

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => useContext(CursorContext);
