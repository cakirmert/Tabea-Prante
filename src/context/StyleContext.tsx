"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ArtStyle = "MINIMAL" | "BRUTALIST" | "EDITORIAL" | "ANIMATION" | "CLASSIC";

interface StyleContextType {
    activeStyle: ArtStyle;
    setStyle: (style: ArtStyle) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function useStyle() {
    const context = useContext(StyleContext);
    if (!context) {
        throw new Error("useStyle must be used within a StyleProvider");
    }
    return context;
}

interface StyleProviderProps {
    children: ReactNode;
}

export function StyleProvider({ children }: StyleProviderProps) {
    const [activeStyle, setActiveStyle] = useState<ArtStyle>("MINIMAL");

    return (
        <StyleContext.Provider value={{ activeStyle, setStyle: setActiveStyle }}>
            {children}
        </StyleContext.Provider>
    );
}
