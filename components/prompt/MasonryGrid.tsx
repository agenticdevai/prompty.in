"use client";

import { motion } from "motion/react";
import { PromptCard } from "./PromptCard";
import { PromptCardSkeleton } from "./PromptCardSkeleton";
import { staggerChildren, cardItem } from "@/lib/motion";
import type { Prompt } from "@/types";

interface MasonryGridProps {
  prompts: Prompt[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function MasonryGrid({ prompts, isLoading, skeletonCount = 12 }: MasonryGridProps) {
  if (isLoading) {
    return (
      <div
        className="w-full"
        style={{
          columns: "2 160px",
          gap: "8px",
        }}
        // responsive via style: 2col mobile, 3 tablet, 4 desktop, 5 wide
      >
        <style>{`
          @media (min-width: 640px)  { .masonry { columns: 3 !important; gap: 12px !important; } }
          @media (min-width: 1024px) { .masonry { columns: 4 !important; gap: 16px !important; } }
          @media (min-width: 1536px) { .masonry { columns: 5 !important; gap: 16px !important; } }
        `}</style>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="mb-2 sm:mb-3 md:mb-4">
            <PromptCardSkeleton index={i} />
          </div>
        ))}
      </div>
    );
  }

  if (!prompts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-[#55556A] text-lg mb-2">No prompts found</p>
        <p className="text-[#55556A] text-sm">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .masonry {
          columns: 2;
          column-gap: 8px;
        }
        @media (min-width: 640px)  { .masonry { columns: 3; column-gap: 12px; } }
        @media (min-width: 1024px) { .masonry { columns: 4; column-gap: 16px; } }
        @media (min-width: 1536px) { .masonry { columns: 5; column-gap: 16px; } }
      `}</style>
      <motion.div
        className="masonry w-full"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {prompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            variants={cardItem}
            className="mb-2 sm:mb-3 md:mb-4"
          >
            <PromptCard prompt={prompt} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
