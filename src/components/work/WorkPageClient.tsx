"use client";

import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Series } from "@/data/series";
import { WorkListRenderer } from "@/components/styles/WorkListRenderer";
import { StyleWrapper } from "@/components/styles/StyleWrapper";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useStyle } from "@/context/StyleContext";

interface WorkPageClientProps {
    series: Series[];
}

export function WorkPageClient({ series }: WorkPageClientProps) {
    const { activeStyle } = useStyle();

    return (
        <StyleWrapper>
            <PageShell>
                {/* Local Navigation (Back to Home) because SiteHeader is removed */}
                <nav className="mb-12 flex justify-between text-xs uppercase tracking-[0.2em] text-zinc-400">
                    <Link href="/" className="hover:text-black transition-colors">← Home</Link>
                    <span>Work</span>
                </nav>

                {/* Header Section */}
                <AnimatedSection className="pt-4 pb-10">
                    {activeStyle === "MINIMAL" && (
                        <>
                            <h1 className="mt-3 text-2xl md:text-3xl">Selected series</h1>
                        </>
                    )}

                    {activeStyle === "BRUTALIST" && (
                        <div className="border-b-4 border-black pb-8">
                            <h1 className="text-8xl font-black uppercase tracking-tighter">PROJECT_INDEX</h1>
                        </div>
                    )}

                    {activeStyle === "EDITORIAL" && (
                        <div className="flex justify-between items-end border-b border-black pb-6">
                            <h1 className="text-5xl font-serif">Collections</h1>
                            <span className="text-xs font-bold uppercase tracking-widest">Fal/Win 2026</span>
                        </div>
                    )}

                    {(activeStyle === "ANIMATION" || activeStyle === "CLASSIC") && (
                        <div className="text-center py-8">
                            <h1 className="font-serif text-5xl text-zinc-800 tracking-wide italic">Exhibitions</h1>
                            <div className="mt-6 w-24 h-px bg-zinc-300 mx-auto"></div>
                        </div>
                    )}

                </AnimatedSection>

                <WorkListRenderer seriesList={series} />
            </PageShell>
        </StyleWrapper>
    );
}
