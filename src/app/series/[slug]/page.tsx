import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { SeriesImageLayout } from "@/components/series/SeriesImageLayout";
import { StyleWrapper } from "@/components/styles/StyleWrapper";
import { SeriesHeader } from "@/components/series/SeriesHeader";
import { getAllSeries, getSeries } from "@/lib/content";
import { SeriesSlug } from "@/data/series";

export async function generateStaticParams() {
  const series = getAllSeries();
  return series.map((s) => ({
    slug: s.slug,
  }));
}

interface SeriesPageProps {
  params: Promise<{ slug: SeriesSlug }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeries(slug);

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
