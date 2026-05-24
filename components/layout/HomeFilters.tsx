"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { CategoryPills } from "@/components/prompt/CategoryPills";
import { AIToolTabs } from "@/components/prompt/AIToolTabs";
import type { AiTool, Category } from "@/types";

export function HomeFilters() {
  const router = useRouter();

  const handleCategory = (c: Category | "all") => {
    router.push(c === "all" ? "/explore" : `/explore?category=${c}`);
  };

  const handleTool = (t: AiTool | "all") => {
    router.push(t === "all" ? "/explore" : `/explore?tool=${t}`);
  };

  return (
    <div className="space-y-3">
      <Suspense>
        <CategoryPills onChange={handleCategory} />
      </Suspense>
      <Suspense>
        <AIToolTabs onChange={handleTool} />
      </Suspense>
    </div>
  );
}