"use client";

import { useMemo, useState } from "react";
import { Flame } from "lucide-react";
import { MasonryGrid } from "@/components/prompt/MasonryGrid";
import { AIToolTabs } from "@/components/prompt/AIToolTabs";
import { MOCK_PROMPTS } from "@/lib/mock-data";
import { trendingScore } from "@/lib/trending";
import { cn } from "@/lib/utils";
import type { AiTool } from "@/types";

const PERIODS = [
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
] as const;

type Period = (typeof PERIODS)[number]["value"];

export function TrendingClient() {
  const [period, setPeriod] = useState<Period>("week");
  const [tool, setTool] = useState<AiTool | "all">("all");

  const sorted = useMemo(() => {
    return MOCK_PROMPTS.filter((p) => tool === "all" || p.ai_tool === tool)
      .map((p) => ({
        ...p,
        _score: trendingScore({
          likes: p.likes_count,
          copies: p.copies,
          views: p.views,
          saves: p.saves_count,
          createdAt: new Date(p.created_at),
        }),
      }))
      .sort((a, b) => b._score - a._score);
  // period is a UI-only filter until real DB queries are wired; score is time-invariant on mock data
  }, [tool]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-[#F0F0FF]">
          <Flame className="w-6 h-6 text-[#F59E0B]" />
          Trending Prompts
        </h1>
        <p className="text-sm text-[#55556A]">
          Ranked by likes, copies, saves & views
        </p>
      </div>

      {/* Period tabs */}
      <div className="flex gap-1 bg-[#13131A] border border-[#2A2A3A] rounded-[12px] p-1 w-fit">
        {PERIODS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setPeriod(value)}
            className={cn(
              "px-4 py-1.5 rounded-[8px] text-sm font-medium transition-all",
              period === value
                ? "bg-[#7C3AED] text-white"
                : "text-[#8888AA] hover:text-[#F0F0FF]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tool filter */}
      <AIToolTabs active={tool} onChange={setTool} />

      {/* Count */}
      <p className="text-sm text-[#55556A]">{sorted.length} prompts</p>

      {/* Grid */}
      <MasonryGrid prompts={sorted} />
    </div>
  );
}
