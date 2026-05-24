"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { AiTool } from "@/types";

const TOOLS: { value: AiTool | "all"; label: string; short: string }[] = [
  { value: "all", label: "All Tools", short: "All" },
  { value: "midjourney", label: "Midjourney", short: "MJ" },
  { value: "dalle", label: "DALL·E 3", short: "DALL·E" },
  { value: "stable_diffusion", label: "Stable Diffusion", short: "SD" },
  { value: "flux", label: "Flux", short: "Flux" },
  { value: "firefly", label: "Firefly", short: "FF" },
  { value: "ideogram", label: "Ideogram", short: "Ideo" },
];

interface AIToolTabsProps {
  active?: AiTool | "all";
  onChange?: (tool: AiTool | "all") => void;
}

export function AIToolTabs({ active = "all", onChange }: AIToolTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (value: AiTool | "all") => {
    if (onChange) {
      onChange(value);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("tool");
    } else {
      params.set("tool", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
      {TOOLS.map(({ value, label, short }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => handleClick(value)}
            title={label}
            className={cn(
              "whitespace-nowrap px-3 py-1.5 rounded-[8px] text-sm font-medium transition-all shrink-0",
              isActive
                ? "bg-[#1C1C26] text-[#F0F0FF] border border-[#7C3AED]/50"
                : "text-[#8888AA] hover:text-[#F0F0FF] hover:bg-[#13131A]"
            )}
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{short}</span>
          </button>
        );
      })}
    </div>
  );
}
