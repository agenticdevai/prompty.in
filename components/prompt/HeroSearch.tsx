"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TRENDING_TAGS = ["cinematic", "reels", "anime", "bollywood", "portrait", "fantasy"];

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submit = (q: string) => {
    const trimmed = q.trim();
    if (trimmed) router.push(`/explore?q=${encodeURIComponent(trimmed)}`);
    else router.push("/explore");
  };

  return (
    <div className="space-y-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
        className="relative max-w-md mx-auto mt-6"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#55556A]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Try "cinematic portrait" or "Reels prompts"'
          className="w-full bg-[#0A0A0F] border border-[#2A2A3A] rounded-[14px] pl-10 pr-4 py-3 text-sm text-[#F0F0FF] placeholder:text-[#55556A] focus:outline-none focus:border-[#7C3AED]/60 focus:ring-1 focus:ring-[#7C3AED]/30 transition-all"
        />
      </form>

      <div className="flex flex-wrap justify-center gap-2 pt-1">
        {TRENDING_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => submit(tag)}
            className="text-xs text-[#8888AA] bg-[#1C1C26] border border-[#2A2A3A] px-2.5 py-1 rounded-full hover:border-[#7C3AED]/40 hover:text-[#F0F0FF] cursor-pointer transition-colors"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}