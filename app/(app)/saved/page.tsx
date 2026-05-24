import type { Metadata } from "next";
import Link from "next/link";
import { Bookmark, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getSavedPrompts } from "@/lib/supabase/queries";
import { MasonryGrid } from "@/components/prompt/MasonryGrid";

export const metadata: Metadata = {
  title: "Saved Prompts — Prompty.in",
  description: "Your saved AI prompts collection.",
};

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL;

export default async function SavedPage() {
  // Auth gate
  if (!USE_MOCK) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return <AuthGate />;
    }

    const saved = await getSavedPrompts(user.id);

    if (saved.length === 0) {
      return (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <SavedHeader />
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
            <Bookmark className="w-10 h-10 text-[#2A2A3A]" />
            <p className="text-[#55556A]">No saved prompts yet.</p>
            <Link href="/explore" className="text-sm text-[#7C3AED] hover:text-[#EC4899] transition-colors">
              Browse prompts →
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <SavedHeader />
        <p className="text-sm text-[#55556A]">{saved.length} saved</p>
        <MasonryGrid prompts={saved} />
      </div>
    );
  }

  // Mock mode: show auth gate (no real auth)
  return <AuthGate />;
}

function SavedHeader() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Bookmark className="w-6 h-6 text-[#7C3AED]" />
      <h1 className="text-2xl font-bold text-[#F0F0FF]">Saved Prompts</h1>
    </div>
  );
}

function AuthGate() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <SavedHeader />
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#1C1C26] border border-[#2A2A3A] flex items-center justify-center">
          <Lock className="w-7 h-7 text-[#55556A]" />
        </div>
        <div className="space-y-1">
          <p className="text-[#F0F0FF] font-semibold">Sign in to save prompts</p>
          <p className="text-sm text-[#55556A]">
            Create a free account to build your personal prompt collection.
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <Link
            href="/sign-in"
            className="px-5 py-2 rounded-[10px] gradient-copy text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Sign in
          </Link>
          <Link
            href="/explore"
            className="px-5 py-2 rounded-[10px] bg-[#1C1C26] border border-[#2A2A3A] text-[#8888AA] text-sm font-medium hover:text-[#F0F0FF] transition-colors"
          >
            Browse prompts
          </Link>
        </div>
      </div>
    </div>
  );
}
