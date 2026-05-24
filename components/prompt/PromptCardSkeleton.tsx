import { Skeleton } from "@/components/ui/skeleton";

const HEIGHTS = [280, 340, 220, 300, 260, 380, 240, 310];

export function PromptCardSkeleton({ index = 0 }: { index?: number }) {
  const imgHeight = HEIGHTS[index % HEIGHTS.length];

  return (
    <div className="rounded-[16px] overflow-hidden bg-surface shadow-card" style={{ breakInside: "avoid" }}>
      <Skeleton className="w-full bg-[#1C1C26]" style={{ height: imgHeight }} />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-[#1C1C26]" />
        <Skeleton className="h-3 w-1/2 bg-[#1C1C26]" />
        <div className="flex gap-1">
          <Skeleton className="h-4 w-14 rounded-full bg-[#1C1C26]" />
          <Skeleton className="h-4 w-16 rounded-full bg-[#1C1C26]" />
        </div>
        <Skeleton className="h-8 w-full rounded-[10px] bg-[#1C1C26]" />
      </div>
    </div>
  );
}
