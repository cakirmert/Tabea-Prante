import { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <SiteHeader />
      <main className="mx-auto flex max-w-4xl flex-col gap-14 px-4 pb-20 pt-24 sm:pt-32">
        {children}
      </main>
    </div>
  );
}
