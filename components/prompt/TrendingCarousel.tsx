"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Check, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Prompt } from "@/types";

interface TrendingCarouselProps {
  prompts: Prompt[];
}

export function TrendingCarousel({ prompts }: TrendingCarouselProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
      {prompts.map((prompt) => (
        <TrendingCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}

function TrendingCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const primaryImage = prompt.images?.find((img) => img.is_primary) ?? prompt.images?.[0];

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(prompt.prompt_text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    },
    [prompt.prompt_text]
  );

  return (
    <Link
      href={`/p/${prompt.slug}`}
      className="group relative shrink-0 w-40 sm:w-48 rounded-[14px] overflow-hidden border border-[#2A2A3A] bg-[#13131A] hover:border-[#7C3AED]/50 transition-colors"
    >
      {/* Image */}
      <div className="relative h-36 sm:h-44 overflow-hidden bg-[#1C1C26]">
        {primaryImage && (
          <Image
            src={primaryImage.cdn_url ?? primaryImage.image_url}
            alt={prompt.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 space-y-2">
        <p className="text-xs font-semibold text-[#F0F0FF] leading-snug line-clamp-2">
          {prompt.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10px] text-[#55556A]">
            <Heart className="w-3 h-3" />
            {prompt.likes_count.toLocaleString()}
          </span>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full transition-all",
              copied
                ? "bg-[#10B981] text-white"
                : "gradient-copy text-white hover:opacity-90"
            )}
          >
            {copied ? <Check className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </Link>
  );
}
