import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { SeriesImageLayout } from "@/components/series/SeriesImageLayout";
import { StyleWrapper } from "@/components/styles/StyleWrapper";
import { SeriesHeader } from "@/components/series/SeriesHeader";
import { getSeriesBySlug, type SeriesSlug, seriesList } from "@/data/series";

export async function generateStaticParams() {
  return seriesList.map((series) => ({
    slug: series.slug,
  }));
}

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
    <StyleWrapper>
      <PageShell>
        <SeriesHeader title={series.title} />
        <SeriesImageLayout series={series} />
      </PageShell>
    </StyleWrapper>
  );
}
