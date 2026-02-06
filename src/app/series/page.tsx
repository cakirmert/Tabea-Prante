import { PageShell } from "@/components/layout/PageShell";
import { getAllSeries } from "@/lib/content";
import { SeriesCard } from "@/components/series/SeriesCard";

export default function SeriesIndexPage() {
  const seriesList = getAllSeries();

  return (
    <PageShell>
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {seriesList.map((series) => (
          <SeriesCard key={series.slug} series={series} />
        ))}
      </section>
    </PageShell>
  );
}
