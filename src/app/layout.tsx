import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Tabea Prante",
  description: "Photography portfolio of Tabea Prante.",
};

import { StyleProvider } from "@/context/StyleContext";
import { StyleSwitcher } from "@/components/styles/StyleSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <StyleProvider>
          {children}
          <StyleSwitcher />
        </StyleProvider>
      </body>
    </html>
  );
}
