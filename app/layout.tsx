import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prompty — AI Prompt Discovery for Indian Creators",
    template: "%s | Prompty",
  },
  description:
    "Discover 5,000+ AI image prompts for Midjourney, DALL-E, Stable Diffusion & more. Made for Indian creators — Reels, portraits, cinematic styles.",
  keywords: ["AI prompts", "Midjourney prompts", "AI art India", "Reels prompts", "image prompts"],
  authors: [{ name: "Prompty" }],
  creator: "Prompty",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://prompty.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Prompty",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
