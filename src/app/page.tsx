import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StyleWrapper } from "@/components/styles/StyleWrapper";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimationLayout } from "@/components/styles/AnimationLayout";
// import { useStyle } from "@/context/StyleContext"; // Removed client hook from server component
import { getAllSeries } from "@/lib/content";
import { ClientHomeWrapper } from "@/components/home/ClientHomeWrapper"; // New wrapper for client logic

export default function Home() {
  const series = getAllSeries();

  return (
    <ClientHomeWrapper series={series}>
      {/* 
          This children content is for the non-Animation styles (Minimal, Brutalist, etc.)
          The Wrapper will handle the conditional rendering of AnimationLayout based on context.
          Wait, ClientHomeWrapper needs to hold the `useStyle` logic.
          Let's refactor this approach. 
          
          We can't use `useStyle` in this Server Component. 
          So we pass `series` to a Client Component that handles the switching.
       */}
    </ClientHomeWrapper>
  );
}
