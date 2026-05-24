"use server";

import { createClient } from "./server";
import { revalidatePath } from "next/cache";

// ── Like / Unlike ────────────────────────────────────────────────────────────

export async function toggleLike(promptId: string): Promise<{ liked: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("user_likes")
    .select("prompt_id")
    .eq("user_id", user.id)
    .eq("prompt_id", promptId)
    .single();

  if (existing) {
    await supabase.from("user_likes").delete()
      .eq("user_id", user.id).eq("prompt_id", promptId);
    revalidatePath(`/p/[slug]`, "page");
    return { liked: false };
  } else {
    await supabase.from("user_likes").insert({ user_id: user.id, prompt_id: promptId });
    revalidatePath(`/p/[slug]`, "page");
    return { liked: true };
  }
}

// ── Save / Unsave ────────────────────────────────────────────────────────────

export async function toggleSave(promptId: string): Promise<{ saved: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("user_saves")
    .select("prompt_id")
    .eq("user_id", user.id)
    .eq("prompt_id", promptId)
    .single();

  if (existing) {
    await supabase.from("user_saves").delete()
      .eq("user_id", user.id).eq("prompt_id", promptId);
    revalidatePath("/saved");
    return { saved: false };
  } else {
    await supabase.from("user_saves").insert({ user_id: user.id, prompt_id: promptId });
    revalidatePath("/saved");
    return { saved: true };
  }
}

// ── Record copy ──────────────────────────────────────────────────────────────

export async function recordCopy(promptId: string): Promise<void> {
  const supabase = await createClient();

  // Increment public copies counter (works for anon too via service role)
  await supabase.rpc("increment_copies", { p_id: promptId });

  // If authenticated, record user-level copy
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("user_copies")
    .upsert(
      { user_id: user.id, prompt_id: promptId, last_copied_at: new Date().toISOString() },
      { onConflict: "user_id,prompt_id", ignoreDuplicates: false }
    );
}
