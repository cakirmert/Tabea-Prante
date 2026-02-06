import { getAllSeries } from "@/lib/content";
import { WorkPageClient } from "@/components/work/WorkPageClient";

export default function WorkPage() {
  const series = getAllSeries();

  return <WorkPageClient series={series} />;
}
