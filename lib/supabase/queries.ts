import { createClient } from "./server";
import type { Prompt, PromptsFilter, PaginatedResponse } from "@/types";

const DEFAULT_LIMIT = 24;

// ── Shape returned by Supabase joins → our Prompt type ──────────────────────

function mapRow(row: Record<string, unknown>): Prompt {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    prompt_text: row.prompt_text as string,
    prompt_hash: row.prompt_hash as string,
    negative_prompt: row.negative_prompt as string | undefined,
    parameters: row.parameters as Record<string, string> | undefined,
    ai_tool: row.ai_tool as Prompt["ai_tool"],
    category: row.category as Prompt["category"],
    style: row.style as Prompt["style"],
    mood: row.mood as Prompt["mood"],
    aspect_ratio: row.aspect_ratio as Prompt["aspect_ratio"],
    quality_score: row.quality_score as number | undefined,
    is_premium: row.is_premium as boolean,
    is_nsfw: row.is_nsfw as boolean,
    is_approved: row.is_approved as boolean,
    source_url: row.source_url as string | undefined,
    source_name: row.source_name as string | undefined,
    submitted_by: row.submitted_by as string | undefined,
    views: row.views as number,
    copies: row.copies as number,
    likes_count: row.likes_count as number,
    saves_count: row.saves_count as number,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    images: (row.prompt_images as Record<string, unknown>[] | null)?.map((img) => ({
      id: img.id as string,
      prompt_id: img.prompt_id as string,
      image_url: img.image_url as string,
      cdn_url: img.cdn_url as string | undefined,
      is_primary: img.is_primary as boolean,
      width: img.width as number | undefined,
      height: img.height as number | undefined,
      created_at: img.created_at as string,
    })),
    tags: (row.prompt_tags as { tags: Record<string, unknown> }[] | null)?.map((pt) => ({
      id: pt.tags.id as string,
      name: pt.tags.name as string,
      slug: pt.tags.slug as string,
      count: pt.tags.count as number,
    })),
  };
}

// ── List prompts with filters ────────────────────────────────────────────────

export async function getPrompts(
  filter: PromptsFilter = {}
): Promise<PaginatedResponse<Prompt>> {
  const supabase = await createClient();
  const limit = filter.limit ?? DEFAULT_LIMIT;
  const page = filter.page ?? 1;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("prompts")
    .select(
      `*, prompt_images(*), prompt_tags(tags(*))`,
      { count: "exact" }
    )
    .eq("is_approved", true)
    .eq("is_nsfw", false);

  if (filter.category) query = query.eq("category", filter.category);
  if (filter.tool)     query = query.eq("ai_tool", filter.tool);
  if (filter.style)    query = query.eq("style", filter.style);
  if (filter.aspect_ratio) query = query.eq("aspect_ratio", filter.aspect_ratio);

  if (filter.search) {
    query = query.textSearch("fts", filter.search, { type: "websearch" });
  }

  switch (filter.sort ?? "trending") {
    case "newest":      query = query.order("created_at", { ascending: false }); break;
    case "most_liked":  query = query.order("likes_count", { ascending: false }); break;
    case "most_copied": query = query.order("copies",      { ascending: false }); break;
    default:            query = query.order("trending_score", { ascending: false });
  }

  const { data, count, error } = await query.range(offset, offset + limit - 1);

  if (error) throw error;

  return {
    data: (data ?? []).map(mapRow),
    total: count ?? 0,
    page,
    limit,
    hasMore: (count ?? 0) > offset + limit,
  };
}

// ── Single prompt by slug ────────────────────────────────────────────────────

export async function getPromptBySlug(slug: string): Promise<Prompt | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prompts")
    .select(`*, prompt_images(*), prompt_tags(tags(*))`)
    .eq("slug", slug)
    .eq("is_approved", true)
    .eq("is_nsfw", false)
    .single();

  if (error || !data) return null;
  return mapRow(data as Record<string, unknown>);
}

// ── Related prompts (same category or tool, excluding self) ─────────────────

export async function getRelatedPrompts(
  promptId: string,
  category: string,
  tool: string,
  limit = 8
): Promise<Prompt[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("prompts")
    .select(`*, prompt_images(*), prompt_tags(tags(*))`)
    .eq("is_approved", true)
    .eq("is_nsfw", false)
    .neq("id", promptId)
    .or(`category.eq.${category},ai_tool.eq.${tool}`)
    .order("trending_score", { ascending: false })
    .limit(limit);

  return (data ?? []).map(mapRow);
}

// ── Trending (top N) ─────────────────────────────────────────────────────────

export async function getTrendingPrompts(limit = 50): Promise<Prompt[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("prompts")
    .select(`*, prompt_images(*), prompt_tags(tags(*))`)
    .eq("is_approved", true)
    .eq("is_nsfw", false)
    .order("trending_score", { ascending: false })
    .limit(limit);

  return (data ?? []).map(mapRow);
}

// ── User's liked prompt IDs ──────────────────────────────────────────────────

export async function getUserLikedIds(userId: string): Promise<Set<string>> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("user_likes")
    .select("prompt_id")
    .eq("user_id", userId);

  return new Set((data ?? []).map((r) => r.prompt_id as string));
}

// ── User's saved prompt IDs ──────────────────────────────────────────────────

export async function getUserSavedIds(userId: string): Promise<Set<string>> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("user_saves")
    .select("prompt_id")
    .eq("user_id", userId);

  return new Set((data ?? []).map((r) => r.prompt_id as string));
}

// ── Saved prompts for /saved page ────────────────────────────────────────────

export async function getSavedPrompts(userId: string): Promise<Prompt[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("user_saves")
    .select(`prompt_id, prompts(*, prompt_images(*), prompt_tags(tags(*)))`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data ?? [])
    .map((r) => r.prompts as unknown as Record<string, unknown> | null)
    .filter(Boolean)
    .map((row) => mapRow(row!));
}
