"use client";

import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StyleWrapper } from "@/components/styles/StyleWrapper";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useStyle } from "@/context/StyleContext";
import clsx from "clsx";

export default function AboutPage() {
  const { activeStyle } = useStyle();

  return (
    <StyleWrapper>
      <PageShell>
        {/* Local Navigation (Back to Home) */}
        <nav className="mb-12 flex justify-between text-xs uppercase tracking-[0.2em] text-zinc-400">
          <Link href="/" className="hover:text-black transition-colors">← Home</Link>
          <span>About</span>
        </nav>

        <AnimatedSection className="relative flex flex-col h-full">
          {/* Header Section */}
          <section className={clsx(
            "pt-10 pb-8 md:pt-16 md:pb-12",
            activeStyle === "EDITORIAL" && "grid grid-cols-12 gap-8 items-end border-b border-zinc-900 mb-12",
            activeStyle === "BRUTALIST" && "border-b-4 border-black mb-12",
          )}>
            {activeStyle === "MINIMAL" && (
              <>
                {/* Minimal header */}
              </>
            )}

            {activeStyle === "EDITORIAL" && (
              <>
                <div className="col-span-12 md:col-span-4">
                  <span className="text-xs font-bold uppercase tracking-widest block mb-2">Profile</span>
                  <h1 className="text-5xl font-serif">Bio</h1>
                </div>
              </>
            )}

            {activeStyle === "BRUTALIST" && (
              <h1 className="text-8xl font-black uppercase tracking-tighter mb-4">PROFILE_DATA</h1>
            )}

            {/* Main Text Content */}
            <div className={clsx(
              "space-y-6 leading-relaxed",
              activeStyle === "MINIMAL" && "max-w-xl text-base text-zinc-700",
              activeStyle === "EDITORIAL" && "col-span-12 md:col-span-8 text-lg font-serif text-[#1D1D1F] columns-1 md:columns-2 gap-8",
              activeStyle === "BRUTALIST" && "text-xl font-mono font-bold uppercase",
              activeStyle === "ANIMATION" && "text-xl font-light text-zinc-400 max-w-2xl leading-loose",
              activeStyle === "CLASSIC" && "max-w-xl text-lg font-serif italic text-zinc-600 text-center mx-auto"
            )}>
              <p>
                Tabea Prante is a visual storyteller working at the intersection of
                photography and design. Her images move between intimacy and
                distance, between the constructed and the accidental.
              </p>
              <p>
                She is drawn to small gestures, transitional spaces, and the quiet
                drama of light on surfaces.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className={clsx(
            "py-8 md:py-10 text-sm",
            activeStyle === "MINIMAL" && "border-t border-zinc-200",
            activeStyle === "EDITORIAL" && "flex justify-between items-center bg-zinc-200 p-8",
            activeStyle === "BRUTALIST" && "border-4 border-black p-4 mt-8 bg-black text-white",
            activeStyle === "CLASSIC" && "text-center border-t border-zinc-200 mt-12 pt-12"
          )}>
            <div className="space-y-3">
              <p className={clsx(
                "text-[10px] uppercase tracking-[0.3em]",
                activeStyle === "BRUTALIST" ? "text-white font-mono" : "text-zinc-500"
              )}>
                Contact
              </p>
              <div className={clsx(
                "flex flex-wrap gap-4 text-xs uppercase tracking-[0.24em]",
                activeStyle === "BRUTALIST" ? "text-white font-bold text-lg" : "text-zinc-800",
                activeStyle === "CLASSIC" && "justify-center"
              )}>
                <a
                  href="mailto:tabea.prante@gmail.com"
                  className="border-b border-current pb-1 hover:opacity-50 transition-opacity"
                >
                  tabea.prante@gmail.com
                </a>
                <span className="opacity-30">/</span>
                <a
                  href="https://www.instagram.com/filmsbytabea"
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-transparent pb-1 hover:border-current transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </PageShell>
    </StyleWrapper>
  );
}
