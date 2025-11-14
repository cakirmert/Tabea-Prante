import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { seriesList } from "@/data/series";

export default function WorkPage() {
  return (
    <PageShell>
      <section className="pt-4 pb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          Work
        </p>
        <h1 className="mt-3 text-2xl md:text-3xl">Selected series</h1>
      </section>

      <section className="flex flex-col gap-16 pb-16">
        {seriesList.map((series) => {
          const hero = series.images[0];
          if (!hero) return null;

          return (
            <article key={series.slug} className="group flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-[3fr,2fr] md:items-stretch">
                <div className="overflow-hidden rounded-md bg-zinc-100">
                  <Image
                    src={hero.src}
                    alt={hero.title ?? ""}
                    width={1600}
                    height={1000}
                    className="h-auto w-full object-cover align-middle transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
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
            </article>
          );
        })}
      </section>
    </PageShell>
  );
}
