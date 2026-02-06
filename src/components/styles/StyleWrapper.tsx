"use client";

import { useStyle } from "@/context/StyleContext";
import clsx from "clsx";
import { ReactNode } from "react";

export function StyleWrapper({ children }: { children: ReactNode }) {
    const { activeStyle } = useStyle();

    return (
        <div
            className={clsx(
                "min-h-screen transition-colors duration-700",
                activeStyle === "MINIMAL" && "bg-white text-zinc-900",
                activeStyle === "BRUTALIST" && "bg-white text-black",
                activeStyle === "EDITORIAL" && "bg-[#F5F5F7] text-[#1D1D1F]", // Soft modern grey/white
                activeStyle === "ANIMATION" && "bg-[#0A0A0A] text-zinc-300", // Deep dark
                activeStyle === "CLASSIC" && "bg-[#FDFBF7] text-zinc-800"
            )}
        >
            {children}
        </div>
    );
}
