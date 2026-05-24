import { NextResponse } from "next/server";
import { getPrompts } from "@/lib/supabase/queries";
import type { PromptsFilter } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filter: PromptsFilter = {
    search:       searchParams.get("q")            ?? undefined,
    category:     searchParams.get("category") as PromptsFilter["category"] ?? undefined,
    tool:         searchParams.get("tool")     as PromptsFilter["tool"]     ?? undefined,
    style:        searchParams.get("style")    as PromptsFilter["style"]    ?? undefined,
    aspect_ratio: searchParams.get("ratio")    as PromptsFilter["aspect_ratio"] ?? undefined,
    sort:         (searchParams.get("sort") ?? "trending") as PromptsFilter["sort"],
    page:         parseInt(searchParams.get("page") ?? "1", 10),
    limit:        parseInt(searchParams.get("limit") ?? "24", 10),
  };

  try {
    const result = await getPrompts(filter);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/prompts]", err);
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
}
