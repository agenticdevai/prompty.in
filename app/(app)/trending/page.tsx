import type { Metadata } from "next";
import { Suspense } from "react";
import { TrendingClient } from "./TrendingClient";

export const metadata: Metadata = {
  title: "Trending Prompts — Prompty.in",
  description: "The hottest AI image prompts right now. Updated hourly.",
};

export default function TrendingPage() {
  return (
    <Suspense>
      <TrendingClient />
    </Suspense>
  );
}
