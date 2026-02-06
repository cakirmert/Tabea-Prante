"use client";

import { useStyle, ArtStyle } from "@/context/StyleContext";
import clsx from "clsx";

export function StyleSwitcher() {
    const { activeStyle, setStyle } = useStyle();

    const styles: { id: ArtStyle; label: string }[] = [
        { id: "MINIMAL", label: "Minimal" },
        { id: "BRUTALIST", label: "Brutalist" },
        { id: "EDITORIAL", label: "Editorial" },
        { id: "ANIMATION", label: "Animation" },
        { id: "CLASSIC", label: "Classic" },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 bg-white/80 px-2 py-1 backdrop-blur-sm rounded-sm">
                Select Style
            </div>
            <div className="flex flex-col gap-1 bg-white/90 p-2 rounded-sm shadow-sm backdrop-blur-md border border-zinc-100">
                {styles.map((style) => (
                    <button
                        key={style.id}
                        onClick={() => setStyle(style.id)}
                        className={clsx(
                            "px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-all text-right w-32",
                            activeStyle === style.id
                                ? "bg-zinc-900 text-white font-medium"
                                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                        )}
                    >
                        {style.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
