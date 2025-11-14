import { PageShell } from "@/components/layout/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="pt-10 pb-8 md:pt-16 md:pb-12">
        <div className="max-w-xl space-y-4 text-base leading-relaxed text-zinc-700">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            About
          </p>
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

      <section className="border-t border-zinc-200 py-8 md:py-10 text-sm">
        <div className="max-w-xl space-y-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Contact
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-zinc-800">
            <a
              href="mailto:tabea.prante@gmail.com"
              className="border-b border-zinc-400 pb-1 hover:text-zinc-500"
            >
              tabea.prante@gmail.com
            </a>
            <span className="text-zinc-400">/</span>
            <a
              href="https://www.instagram.com/filmsbytabea"
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent pb-1 hover:border-zinc-400 hover:text-zinc-500"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
