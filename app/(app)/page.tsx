import { HeroSearch } from "@/components/prompt/HeroSearch";
import { HomeFilters } from "@/components/layout/HomeFilters";
import { MasonryGrid } from "@/components/prompt/MasonryGrid";
import { TrendingCarousel } from "@/components/prompt/TrendingCarousel";
import { MOCK_PROMPTS } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Hero */}
      <section className="relative rounded-[24px] overflow-hidden bg-[#13131A] border border-[#2A2A3A] px-6 py-10 sm:py-14 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/4 w-64 h-64 rounded-full bg-[#7C3AED]/20 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-64 h-64 rounded-full bg-[#EC4899]/20 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F0F0FF] leading-tight">
            Discover{" "}
            <span className="gradient-brand-text">AI Prompts</span>
            <br />
            Made for Indian Creators
          </h1>
          <p className="text-[#8888AA] text-sm sm:text-base">
            5,000+ prompts for Midjourney, DALL·E, Stable Diffusion & more.
            One-tap copy. Reels-optimized. Free.
          </p>

          <HeroSearch />
        </div>
      </section>

      {/* Trending carousel */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#F0F0FF]">🔥 Trending This Week</h2>
          <a href="/trending" className="text-sm text-[#7C3AED] hover:text-[#EC4899] transition-colors">
            View all →
          </a>
        </div>
        <TrendingCarousel prompts={MOCK_PROMPTS.slice(0, 6)} />
      </section>

      {/* Category + tool filters — clicking navigates to /explore */}
      <div className="sticky top-14 z-30 bg-[#0A0A0F]/95 backdrop-blur-xl py-3 -mx-4 px-4 border-b border-[#2A2A3A]">
        <HomeFilters />
      </div>

      {/* Grid */}
      <MasonryGrid prompts={MOCK_PROMPTS} />
    </div>
  );
}