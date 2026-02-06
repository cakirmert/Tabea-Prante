"use client";

import Image from "next/image";
import Link from "next/link";
import { type Series } from "@/data/series";
import { useStyle } from "@/context/StyleContext";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StyleWrapper } from "@/components/styles/StyleWrapper";
import { PhotoPlaceholder } from "@/components/common/PhotoPlaceholder";

import clsx from "clsx";

interface WorkListRendererProps {
    seriesList: Series[];
}

export function WorkListRenderer({ seriesList }: WorkListRendererProps) {
    const { activeStyle } = useStyle();

    return (
        <StyleWrapper>
            {seriesList.map((series, index) => {
                const hero = series.images[0];
                if (!hero) return null;

                return (
                    <AnimatedSection key={series.slug} className="mb-24" delay={index * 0.1}>
                        {/* MINIMAL STYLE (Original) */}
                        {activeStyle === "MINIMAL" && (
                            <div className="group grid gap-4 md:grid-cols-[3fr,2fr] md:items-stretch">
                                <div className="overflow-hidden rounded-md bg-zinc-100/50">
                                    {hero.usePlaceholder || !hero.src ? (
                                        <PhotoPlaceholder
                                            series={series.slug}
                                            aspect="landscape"
                                            mediaType={hero.mediaType}
                                        />
                                    ) : (
                                        <Image
                                            src={hero.src}
                                            alt={hero.title ?? ""}
                                            width={1600}
                                            height={1000}
                                            className="h-auto w-full object-cover align-middle transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col justify-between gap-4 text-xs uppercase tracking-[0.22em] text-zinc-500">
                                    <div>{series.title}</div>
                                    <div className="h-px w-full bg-zinc-200" />
                                    <div className="flex items-center justify-between text-[10px]">
                                        <Link
                                            href={`/series/${series.slug}`}
                                            className="border-b border-transparent pb-1 hover:border-zinc-500 hover:text-zinc-800"
                                        >
                                            View series
                                        </Link>
                                        <span>→</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BRUTALIST STYLE */}
                        {activeStyle === "BRUTALIST" && (
                            <div className="group border-b-8 border-black pb-12 transition-all bg-white hover:bg-zinc-100">
                                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-t-8 border-black pt-4">
                                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter decoration-black leading-[0.8]">
                                        {series.title}
                                    </h2>
                                    <span className="font-mono text-xl font-bold mt-4 md:mt-0">
                                        PRJ.0{index + 1}
                                    </span>
                                </div>

                                <div className="relative border-4 border-black overflow-hidden">
                                    {hero.usePlaceholder || !hero.src ? (
                                        <PhotoPlaceholder
                                            series={series.slug}
                                            aspect="landscape"
                                            mediaType={hero.mediaType}
                                        />
                                    ) : (
                                        <Image
                                            src={hero.src}
                                            alt={hero.title ?? ""}
                                            width={1600}
                                            height={1000}
                                            className="h-auto w-full object-cover grayscale contrast-125 block hover:scale-110 transition-transform duration-300"
                                        />
                                    )}
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <Link
                                        href={`/series/${series.slug}`}
                                        className="bg-black text-white px-8 py-4 text-xl font-mono font-bold hover:bg-red-600 transition-colors uppercase"
                                    >
                                        [ VIEW PROJECT ]
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* EDITORIAL STYLE */}
                        {activeStyle === "EDITORIAL" && (
                            <div className="flex flex-col md:grid md:grid-cols-12 gap-8 items-center py-12">
                                <div className="md:col-span-4 flex flex-col justify-center space-y-6 text-right md:pr-8">
                                    <span className="text-[10px] tracking-[0.3em] font-medium text-zinc-400">ISSUE {index + 1}</span>
                                    <h2 className="text-5xl font-serif text-[#1D1D1F] leading-tight">
                                        {series.title}
                                    </h2>
                                    <p className="font-sans text-sm text-zinc-500 leading-relaxed w-[200px] break-words ml-auto">
                                        {hero.description}
                                    </p>
                                    <Link
                                        href={`/series/${series.slug}`}
                                        className="text-xs uppercase tracking-widest border-b border-zinc-900 w-fit ml-auto pb-1 hover:text-zinc-500 transition-colors"
                                    >
                                        Read Story
                                    </Link>
                                </div>
                                <div className="md:col-span-8 w-full relative aspect-[4/3] overflow-hidden">
                                    {hero.usePlaceholder || !hero.src ? (
                                        <PhotoPlaceholder
                                            series={series.slug}
                                            aspect="landscape"
                                            mediaType={hero.mediaType}
                                        />
                                    ) : (
                                        <Image
                                            src={hero.src}
                                            alt={hero.title ?? ""}
                                            fill
                                            className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* CINEMATIC STYLE */}
                        {activeStyle === "CINEMATIC" && (
                            <div className="relative w-full aspect-video overflow-hidden group">
                                <Image
                                    src={hero.src}
                                    alt={hero.title ?? ""}
                                    fill
                                    className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-1000 ease-in-out"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col items-start gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                    <span className="text-[10px] tracking-[0.5em] text-zinc-400 uppercase">Scene {index + 1}</span>
                                    <h2 className="text-6xl font-light tracking-wide text-zinc-100 mix-blend-difference">
                                        {series.title}
                                    </h2>
                                    <Link
                                        href={`/series/${series.slug}`}
                                        className="mt-4 px-6 py-2 border border-zinc-500 text-zinc-300 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
                                    >
                                        Play Reel
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* CLASSIC STYLE */}
                        {activeStyle === "CLASSIC" && (
                            <div className="flex flex-col items-center gap-12 py-24 first:pt-12">
                                <div className="text-center space-y-4">
                                    <span className="font-serif italic text-zinc-400 text-lg tracking-widest">Plate No. {index + 1}</span>
                                    <h2 className="font-serif text-5xl md:text-6xl text-zinc-900 tracking-wide">
                                        {series.title}
                                    </h2>
                                </div>

                                {hero.usePlaceholder || !hero.src ? (
                                    <PhotoPlaceholder
                                        series={series.slug}
                                        aspect="landscape"
                                        mediaType={hero.mediaType}
                                    />
                                ) : (
                                    <Image
                                        src={hero.src}
                                        alt={hero.title ?? ""}
                                        width={1600}
                                        height={1000}
                                        className="h-auto w-full object-cover sepia-[.15]"
                                    />
                                )}

                                <div className="max-w-md text-center">
                                    <p className="font-serif text-lg leading-relaxed text-zinc-600 italic">
                                        &ldquo;{hero.description}&rdquo;
                                    </p>
                                    <div className="mt-8 flex justify-center">
                                        <Link
                                            href={`/series/${series.slug}`}
                                            className="font-serif text-sm uppercase tracking-[0.2em] text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-600 hover:border-zinc-400 transition-colors"
                                        >
                                            Enter Gallery
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                    </AnimatedSection>
                );
            })}
        </StyleWrapper>
    );
}
