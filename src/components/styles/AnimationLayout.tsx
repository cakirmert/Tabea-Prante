"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Series } from "@/data/series";
import { PhotoPlaceholder } from "@/components/common/PhotoPlaceholder";
import { getAssetPath } from "@/utils/paths";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AnimationLayoutProps {
    series: Series[];
}

export function AnimationLayout({ series }: AnimationLayoutProps) {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const workRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const horizontalScrollContainer = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // --- HERO SCROLL ANIMATION ---
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=100%",
                    scrub: true,
                    pin: true,
                }
            });

            heroTl
                .to(".hero-title", { scale: 1.5, opacity: 0, filter: "blur(20px)" })
                .to(".hero-subtitle", { y: -50, opacity: 0 }, "<");


            // --- WORK HORIZONTAL SCROLL ---
            const workSections = gsap.utils.toArray<HTMLElement>(".work-item");
            if (horizontalScrollContainer.current) {
                gsap.to(workSections, {
                    xPercent: -100 * (workSections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: workRef.current,
                        pin: true,
                        scrub: 1,
                        snap: 1 / (workSections.length - 1),
                        end: () => "+=" + (horizontalScrollContainer.current?.scrollWidth ?? 2000),
                    }
                });
            }

            // --- ABOUT REVEAL ---
            gsap.from(".about-text", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: "top 60%",
                    end: "top 20%",
                    scrub: 1,
                }
            })

        },
        { scope: container }
    );

    return (
        <div ref={container} className="bg-[#050505] text-white min-h-screen overflow-x-hidden selection:bg-white selection:text-black">

            {/* 1. HERO SECTION */}
            <section ref={heroRef} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden z-10">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url(${getAssetPath("/noise.svg")})`
                    }}
                ></div>

                <h1 className="hero-title text-5xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference mb-4 text-center">
                    TABEA PRANTE
                </h1>
                <p className="hero-subtitle text-zinc-400 uppercase tracking-[0.5em] text-xs md:text-sm">
                    Director // Visual Editor
                </p>

                <div className="absolute bottom-12 text-[10px] tracking-widest animate-pulse opacity-50">
                    SCROLL TO EXPLORE
                </div>
            </section>


            {/* 2. WORK SECTION (Horizontal Scroll) */}
            <section ref={workRef} className="h-screen w-full relative overflow-hidden flex items-center z-20">
                <div className="absolute top-8 left-8 text-xs uppercase tracking-widest text-zinc-500 z-30">
                    Selected Works
                </div>

                <div ref={horizontalScrollContainer} className="flex gap-24 px-[20vw] w-fit">
                    {series.flatMap((s) =>
                        s.images.map((image, i) => (
                            <Link href={`/series/${s.slug}`} key={image.id} className="work-item relative flex-shrink-0 w-[60vw] md:w-[40vw] flex flex-col gap-6 group cursor-pointer">
                                <div className="relative w-full aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                                    {image.usePlaceholder || !image.src ? (
                                        <PhotoPlaceholder
                                            series={s.slug}
                                            aspect={image.aspect}
                                            mediaType={image.mediaType}
                                        />
                                    ) : (
                                        <Image
                                            src={getAssetPath(image.src)}
                                            alt={image.title ?? ""}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex justify-between items-end border-b border-zinc-700 pb-4 group-hover:border-white transition-colors duration-500">
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-light tracking-wide group-hover:text-white transition-colors duration-500">{image.title || s.title}</h2>
                                        {image.mediaType && (
                                            <span className="text-xs uppercase tracking-widest text-zinc-500 mt-2 block group-hover:text-zinc-300 transition-colors">
                                                [{image.mediaType}]
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-mono text-zinc-500 group-hover:text-white transition-colors">0{i + 1}</span>
                                </div>
                            </Link>
                        )))}
                </div>
            </section>

            {/* 3. ABOUT SECTION */}
            <section ref={aboutRef} className="min-h-screen w-full flex items-center justify-center py-24 relative z-30">
                <div className="max-w-4xl px-6 text-center">
                    <p className="about-text text-2xl md:text-4xl leading-relaxed font-light text-zinc-300">
                        Tabea Prante is a visual storyteller working at the intersection of photography and design.
                    </p>
                    <br />
                    <p className="about-text text-2xl md:text-4xl leading-relaxed font-light text-zinc-500">
                        Her images move between intimacy and distance, between the constructed and the accidental.
                    </p>

                    <div className="mt-24 about-text">
                        <p className="text-xs uppercase tracking-widest text-zinc-600 mb-8">Connect</p>
                        <div className="flex justify-center gap-12 font-mono text-sm text-zinc-400">
                            <a href="mailto:tabea.prante@gmail.com" className="hover:text-white hover:underline transition-all">EMAIL</a>
                            <a href="https://instagram.com" className="hover:text-white hover:underline transition-all">INSTAGRAM</a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
