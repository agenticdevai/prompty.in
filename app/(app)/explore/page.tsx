import { Suspense } from "react";
import { ExploreClient } from "./ExploreClient";

export const metadata = {
  title: "Explore AI Prompts",
  description: "Browse 5,000+ AI image prompts. Filter by category, AI tool, style, and aspect ratio.",
};

export default function ExplorePage() {
  return (
    <Suspense>
      <ExploreClient />
    </Suspense>
  );
}
