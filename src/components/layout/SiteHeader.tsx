"use client";

import Link from "next/link";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.18em] text-zinc-800">
        <Link href="/" className="select-none transition-colors hover:text-zinc-400">
          Tabea Prante
        </Link>
        <nav className="flex gap-4">
          {links.map((link) =>
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-zinc-400"
              >
                {link.label}
              </Link>
            ,
          )}
        </nav>
      </div>
    </header>
  );
}
