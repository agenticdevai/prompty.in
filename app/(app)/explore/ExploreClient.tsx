"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CategoryPills } from "@/components/prompt/CategoryPills";
import { AIToolTabs } from "@/components/prompt/AIToolTabs";
import { MasonryGrid } from "@/components/prompt/MasonryGrid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MOCK_PROMPTS } from "@/lib/mock-data";
import type { AiTool, Category, Style, AspectRatio, SortOption } from "@/types";

const STYLES: { value: Style | "all"; label: string }[] = [
  { value: "all", label: "All Styles" },
  { value: "realistic", label: "Realistic" },
  { value: "cinematic", label: "Cinematic" },
  { value: "anime", label: "Anime" },
  { value: "illustration", label: "Illustration" },
  { value: "3d", label: "3D" },
  { value: "watercolor", label: "Watercolor" },
  { value: "neon", label: "Neon" },
  { value: "minimal", label: "Minimal" },
];

const ASPECT_RATIOS: { value: AspectRatio | "all"; label: string }[] = [
  { value: "all", label: "Any ratio" },
  { value: "1:1", label: "Square 1:1" },
  { value: "4:5", label: "Portrait 4:5" },
  { value: "9:16", label: "Reels 9:16" },
  { value: "16:9", label: "Wide 16:9" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "most_liked", label: "Most Liked" },
  { value: "most_copied", label: "Most Copied" },
];

export function ExploreClient() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<Category | "all">(
    (searchParams.get("category") as Category) ?? "all"
  );
  const [tool, setTool] = useState<AiTool | "all">(
    (searchParams.get("tool") as AiTool) ?? "all"
  );
  const [style, setStyle] = useState<Style | "all">("all");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio | "all">("all");
  const [sort, setSort] = useState<SortOption>("trending");
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [
    category !== "all",
    tool !== "all",
    style !== "all",
    aspectRatio !== "all",
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    return MOCK_PROMPTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (tool !== "all" && p.ai_tool !== tool) return false;
      if (style !== "all" && p.style !== style) return false;
      if (aspectRatio !== "all" && p.aspect_ratio !== aspectRatio) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.prompt_text.toLowerCase().includes(q);
      }
      return true;
    });
  }, [category, tool, style, aspectRatio, search]);

  const clearFilters = () => {
    setCategory("all");
    setTool("all");
    setStyle("all");
    setAspectRatio("all");
    setSearch("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Sticky filter bar */}
      <div className="sticky top-14 z-30 bg-[#0A0A0F]/95 backdrop-blur-xl pt-4 pb-3 space-y-3 border-b border-[#2A2A3A] -mx-4 px-4">
        {/* Search + filter toggle */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#55556A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts..."
              className="w-full bg-[#13131A] border border-[#2A2A3A] rounded-[12px] pl-9 pr-4 py-2 text-sm text-[#F0F0FF] placeholder:text-[#55556A] focus:outline-none focus:border-[#7C3AED]/60 transition-colors"
            />
          </div>
          <Button
            onClick={() => setShowFilters((v) => !v)}
            variant="outline"
            size="sm"
            className={cn(
              "gap-1.5 border-[#2A2A3A] bg-transparent text-sm h-9 shrink-0",
              showFilters ? "border-[#7C3AED]/50 text-[#7C3AED]" : "text-[#8888AA]"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-[#7C3AED] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
          {activeFilterCount > 0 && (
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="text-[#55556A] hover:text-[#F0F0FF] h-9 px-2 shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Category pills */}
        <CategoryPills active={category} onChange={setCategory} />

        {/* AI tool tabs */}
        <AIToolTabs active={tool} onChange={setTool} />

        {/* Expanded filters */}
        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {/* Style */}
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as Style | "all")}
              className="bg-[#13131A] border border-[#2A2A3A] rounded-[10px] px-3 py-2 text-sm text-[#8888AA] focus:outline-none focus:border-[#7C3AED]/50"
            >
              {STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* Aspect ratio */}
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatio | "all")}
              className="bg-[#13131A] border border-[#2A2A3A] rounded-[10px] px-3 py-2 text-sm text-[#8888AA] focus:outline-none focus:border-[#7C3AED]/50"
            >
              {ASPECT_RATIOS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-[#13131A] border border-[#2A2A3A] rounded-[10px] px-3 py-2 text-sm text-[#8888AA] focus:outline-none focus:border-[#7C3AED]/50"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="py-4 text-sm text-[#55556A]">
        {filtered.length} prompts
        {activeFilterCount > 0 || search ? " matching filters" : ""}
      </div>

      {/* Grid */}
      <MasonryGrid prompts={filtered} />
    </div>
  );
}
