"use client";

import { useStyle } from "@/context/StyleContext";
import Link from "next/link";
import clsx from "clsx";

export function SeriesHeader({ title }: { title: string }) {
    const { activeStyle } = useStyle();

    if (activeStyle === "BRUTALIST") {
        return (
            <header className="mb-24 flex flex-col gap-6 relative z-10">
                <div className="border-b-4 border-black pb-4">
                    <Link href="/" className="text-sm font-bold tracking-widest uppercase hover:underline">
                        ← Back
                    </Link>
                </div>
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                    {title}
                </h1>
            </header>
        );
    }

    if (activeStyle === "EDITORIAL") {
        return (
            <header className="mb-20 flex flex-col gap-8 relative z-10 text-center">
                <nav className="flex justify-center">
                    <Link href="/" className="font-serif italic text-lg hover:text-zinc-600 transition-colors">
                        Back to Index
                    </Link>
                </nav>
                <h1 className="font-serif text-5xl md:text-7xl italic leading-tight text-zinc-900">
                    {title}
                </h1>
                <div className="w-12 h-[1px] bg-zinc-300 mx-auto"></div>
            </header>
        );
    }

    if (activeStyle === "ANIMATION") {
        return (
            <header className="mb-24 flex items-center justify-between text-zinc-400 relative z-10">
                <Link href="/" className="text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">
                    ← Home
                </Link>
                <h1 className="text-xl md:text-2xl font-light tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {title}
                </h1>
            </header>
        );
    }

    // MINIMAL & CLASSIC (Default)
    return (
        <header className="mb-12 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-zinc-500 relative z-10">
            <Link href="/" className="hover:text-zinc-800 transition-colors">
                ← Back
            </Link>
            <span className="text-zinc-800 font-medium">{title}</span>
        </header>
    );
}
