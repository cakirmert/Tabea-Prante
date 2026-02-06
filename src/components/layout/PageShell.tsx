import { ReactNode } from "react";
import clsx from "clsx";

interface PageShellProps {
  children: ReactNode;
  fluid?: boolean;
  className?: string;
}

export function PageShell({ children, fluid = false, className }: PageShellProps) {
  return (
    <div className={clsx("min-h-screen", className)}>
      <main
        className={clsx(
          "mx-auto flex flex-col gap-14 px-4 pb-20 pt-24 sm:pt-32",
          fluid ? "max-w-none px-0 pt-0" : "max-w-4xl"
        )}
      >
        {children}
      </main>
    </div>
  );
}
