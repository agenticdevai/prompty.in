"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

const CATEGORIES: { value: Category | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "✨" },
  { value: "portrait", label: "Portrait", emoji: "🎭" },
  { value: "cinematic", label: "Cinematic", emoji: "🎬" },
  { value: "anime", label: "Anime", emoji: "🌸" },
  { value: "urban", label: "Urban", emoji: "🏙️" },
  { value: "fantasy", label: "Fantasy", emoji: "✨" },
  { value: "fashion", label: "Fashion", emoji: "👗" },
  { value: "architecture", label: "Architecture", emoji: "🏛️" },
  { value: "nature", label: "Nature", emoji: "🌿" },
  { value: "abstract", label: "Abstract", emoji: "🎨" },
  { value: "reels", label: "Reels", emoji: "📸" },
  { value: "indian", label: "Indian", emoji: "🇮🇳" },
];

interface CategoryPillsProps {
  active?: Category | "all";
  onChange?: (category: Category | "all") => void;
}

export function CategoryPills({ active = "all", onChange }: CategoryPillsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (value: Category | "all") => {
    if (onChange) {
      onChange(value);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {CATEGORIES.map(({ value, label, emoji }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all shrink-0",
              isActive
                ? "gradient-copy text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                : "bg-[#13131A] border border-[#2A2A3A] text-[#8888AA] hover:border-[#7C3AED]/40 hover:text-[#F0F0FF]"
            )}
          >
            <span className="text-base leading-none">{emoji}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
