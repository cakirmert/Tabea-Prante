"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorkListRenderer } from "@/components/styles/WorkListRenderer";
import { Series } from "@/data/series";

interface ClientHomeWrapperProps {
    series: Series[];
}

gsap.registerPlugin(ScrollTrigger);

export function ClientHomeWrapper({ series }: ClientHomeWrapperProps) {
    const backdropRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const backdrop = backdropRef.current;
        const overlay = overlayRef.current;
        const spacer = spacerRef.current;
        if (!backdrop || !overlay || !spacer) return;

        const st1 = ScrollTrigger.create({
            trigger: spacer,
            start: "top top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to(overlay, {
                opacity: 0,
                filter: "blur(30px)",
                scale: 1.6,
                ease: "none",
            }),
            onLeave: () => {
                overlay.style.visibility = "hidden";
                backdrop.style.visibility = "hidden";
            },
            onEnterBack: () => {
                overlay.style.visibility = "visible";
                backdrop.style.visibility = "visible";
            },
        });

        const st2 = ScrollTrigger.create({
            trigger: spacer,
            start: "top top",
            end: "80% top",
            scrub: true,
            animation: gsap.to(backdrop, {
                opacity: 0,
                ease: "none",
            }),
        });

        return () => {
            st1.kill();
            st2.kill();
        };
    }, []);

    return (
        <div className="relative bg-[#e8e8e8]">
            {/* Hero — fixed overlay, true black */}
            <div ref={backdropRef} className="fixed inset-0 z-20 bg-black pointer-events-none" />
            <div ref={overlayRef} className="fixed inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
                <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-light tracking-[0.08em] uppercase text-zinc-200 leading-none text-center">
                    Tabea Prante
                </h1>
                <p className="mt-4 text-xs uppercase tracking-[0.35em] text-zinc-500">
                    Director &nbsp;/&nbsp; Visual Editor
                </p>
            </div>

            {/* Spacer — shorter so gallery appears sooner */}
            <div ref={spacerRef} className="h-[60vh]" />

            {/* Work */}
            <main className="relative z-10 bg-[#e8e8e8] text-zinc-900">
                <div className="mx-auto max-w-[1600px] px-6 pt-8 pb-16 md:px-12">
                    <p className="mb-6 text-xs uppercase tracking-[0.2em] text-zinc-500">
                        selected work
                    </p>
                    <WorkListRenderer seriesList={series} />
                </div>

                {/* Contact */}
                <section className="bg-[#e8e8e8] border-t border-zinc-300 text-zinc-900">
                    <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 lg:py-20">
                        <div className="space-y-6 max-w-lg">
                            <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">Contact</p>
                            <p className="text-base leading-relaxed text-zinc-600">
                                Say hi for work inquiries or collaborations.
                            </p>
                            <div className="flex flex-col gap-4">
                                <a
                                    href="mailto:tabea.prante@gmail.com"
                                    className="w-fit text-lg text-zinc-800 border-b border-zinc-400 pb-1 transition-colors hover:text-black hover:border-black"
                                >
                                    tabea.prante@gmail.com
                                </a>
                                <a
                                    href="https://www.instagram.com/filmsbytabea"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-fit text-lg text-zinc-800 border-b border-zinc-400 pb-1 transition-colors hover:text-black hover:border-black"
                                >
                                    @filmsbytabea
                                </a>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-12 border-t border-zinc-300 pt-6 pb-2 flex flex-col gap-4 sm:flex-row sm:justify-between text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                            <span>Tabea Prante &copy; {new Date().getFullYear()}</span>
                            <div className="flex gap-6">
                                <Link href="/impressum" className="hover:text-zinc-700 transition-colors">Impressum</Link>
                                <Link href="/datenschutz" className="hover:text-zinc-700 transition-colors">Datenschutz</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
