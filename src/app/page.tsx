import { getAllSeries } from "@/lib/content";
import { ClientHomeWrapper } from "@/components/home/ClientHomeWrapper";

export default function Home() {
  const series = getAllSeries();

  return <ClientHomeWrapper series={series} />;
}
