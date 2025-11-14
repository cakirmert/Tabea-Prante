import { PageShell } from "@/components/layout/PageShell";
import { seriesList } from "@/data/series";
import { SeriesCard } from "@/components/series/SeriesCard";

export default function SeriesIndexPage() {
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
