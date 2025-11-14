"use client";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function Home() {
  return (
    <PageShell>
      {/* Intro-only hero */}
      <section className="min-h-[80vh] flex items-center py-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
            Tabea Prante · Photography & Design
          </p>
          <h1 className="max-w-xl text-4xl md:text-6xl leading-snug">
            Visual fragments of people, cities, and spaces,
            <br />
            quietly moving between clarity and blur.
          </h1>
          <p className="max-w-sm text-base text-zinc-600">
            Selected photographs in three ongoing threads: portrait,
            experiment, architecture.
          </p>
          <div className="mt-4 flex gap-3 text-[11px] uppercase tracking-[0.28em] text-zinc-600">
            <Link
              href="/work"
              className="border-b border-transparent pb-0.5 transition-colors hover:border-zinc-500 hover:text-zinc-900"
            >
              Work
            </Link>
            <span>·</span>
            <Link
              href="/about"
              className="border-b border-transparent pb-0.5 transition-colors hover:border-zinc-500 hover:text-zinc-900"
            >
              About
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
