"use client";

import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StyleWrapper } from "@/components/styles/StyleWrapper";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimationLayout } from "@/components/styles/AnimationLayout";
import { useStyle } from "@/context/StyleContext";
import { Series } from "@/data/series";

interface ClientHomeWrapperProps {
    series: Series[];
}

export function ClientHomeWrapper({ series }: ClientHomeWrapperProps) {
    const { activeStyle } = useStyle();

    // Animation style uses its own independent layout (SPA)
    if (activeStyle === "ANIMATION") {
        return (
            <StyleWrapper>
                <AnimationLayout series={series} />
            </StyleWrapper>
        );
    }

    return (
        <StyleWrapper>
            <PageShell>
                <section className="flex flex-col justify-center relative min-h-[70vh] py-10">

                    <AnimatedSection className="mb-12 flex justify-between items-center text-xs uppercase tracking-[0.2em] text-zinc-400 relative z-50">
                        {activeStyle !== "BRUTALIST" && activeStyle !== "EDITORIAL" ? (
                            <span>Tabea Prante</span>
                        ) : (
                            <span>{/* Spacer or empty */}</span>
                        )}

                        <nav className="flex gap-6 pointer-events-auto">
                            <Link href="/work" className="hover:text-black transition-colors">Work</Link>
                            <Link href="/about" className="hover:text-black transition-colors">About</Link>
                        </nav>
                    </AnimatedSection>

                    {/* MINIMAL (Default) */}
                    {activeStyle === "MINIMAL" && (
                        <AnimatedSection className="flex flex-col gap-6 md:gap-8 max-w-2xl px-4 md:px-0">
                            <h1 className="text-4xl md:text-6xl leading-[1.1] font-light tracking-tight text-zinc-900">
                                Capturing the silence between <span className="italic font-serif">chaos</span> and <span className="opacity-50 blur-[1px]">clarity</span>.
                            </h1>
                            <p className="text-base text-zinc-500 leading-relaxed max-w-md">
                                A collection of visual fragments. Exploring the delicate balance of light, form, and human presence in a digital age.
                            </p>
                        </AnimatedSection>
                    )}

                    {/* BRUTALIST */}
                    {activeStyle === "BRUTALIST" && (
                        <div className="grid grid-cols-1 gap-12 px-4 md:px-0">
                            <AnimatedSection delay={0.1}>
                                <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-black select-none">
                                    TABEA<br />PRANTE
                                </h1>
                            </AnimatedSection>
                            <AnimatedSection delay={0.2} className="border-t-4 border-black pt-6 flex flex-col md:flex-row justify-between gap-8">
                                <p className="text-xl font-bold font-mono max-w-4xl uppercase">
                                    Structures of reality. <br /> Filtered through aperture.
                                </p>
                            </AnimatedSection>
                        </div>
                    )}

                    {/* EDITORIAL */}
                    {activeStyle === "EDITORIAL" && (
                        <div className="grid grid-cols-12 gap-4 px-4 md:px-0">
                            <div className="col-span-12 md:col-span-8">
                                <AnimatedSection>
                                    <span className="block text-sm font-bold uppercase tracking-widest mb-4">Tabea Prante</span>
                                    <h1 className="text-6xl md:text-9xl font-serif tracking-tight text-[#1D1D1F] leading-none mb-6">
                                        Visual<br />Editor
                                    </h1>
                                </AnimatedSection>
                            </div>
                            <div className="col-span-12 md:col-span-4 flex flex-col justify-end pb-4">
                                <AnimatedSection delay={0.3}>
                                    <div className="w-12 h-px bg-black mb-4"></div>
                                    <p className="text-sm font-sans leading-relaxed text-zinc-600">
                                        Fashioning narratives from the mundane. A curated study of light, texture, and the human condition.
                                    </p>
                                </AnimatedSection>
                            </div>
                        </div>
                    )}

                    {/* CLASSIC */}
                    {activeStyle === "CLASSIC" && (
                        <AnimatedSection className="text-center flex flex-col items-center gap-10 px-4 md:px-0">
                            <div className="w-px h-24 bg-zinc-300"></div>
                            <p className="font-serif italic text-xl text-zinc-500">
                                The Portfolio of Tabea Prante
                            </p>
                            <h1 className="text-6xl md:text-8xl font-serif text-zinc-900 tracking-wide">
                                Visual<br />Short Stories
                            </h1>
                            <p className="max-w-lg text-lg text-zinc-600 font-serif leading-loose">
                                Where photography meets the art of design, quietly observing the world through a lens of timeless elegance.
                            </p>
                            <div className="w-px h-24 bg-zinc-300"></div>
                        </AnimatedSection>
                    )}

                </section>
            </PageShell>
        </StyleWrapper>
    );
}
