import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { SeriesImageLayout } from "@/components/series/SeriesImageLayout";
import { getSeriesBySlug, type SeriesSlug } from "@/data/series";

interface SeriesPageProps {
  params: Promise<{ slug: SeriesSlug }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    return notFound();
  }

  return (
    <PageShell>
      <header className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-zinc-600">
        <span>{series.title}</span>
      </header>
      <SeriesImageLayout series={series} />
    </PageShell>
  );
}
