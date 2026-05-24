"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, TrendingUp, BookOpen, PlusCircle, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/trending", label: "Trending" },
  { href: "/new", label: "New" },
  { href: "/collections", label: "Collections" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2A2A3A] bg-[#0A0A0F]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0 mr-2">
          <Sparkles className="w-5 h-5 text-[#7C3AED]" />
          <span className="font-bold text-lg text-[#F0F0FF] tracking-tight">
            Prompty
          </span>
        </Link>

        {/* Search bar — center */}
        <Link
          href="/search"
          className="flex-1 max-w-md hidden sm:flex items-center gap-2 bg-[#13131A] border border-[#2A2A3A] rounded-[12px] px-3 h-9 text-sm text-[#55556A] hover:border-[#7C3AED]/50 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search prompts...</span>
          <kbd className="ml-auto text-[10px] bg-[#1C1C26] text-[#55556A] px-1.5 py-0.5 rounded border border-[#2A2A3A]">
            ⌘K
          </kbd>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-[8px] text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-[#1C1C26] text-[#F0F0FF]"
                  : "text-[#8888AA] hover:text-[#F0F0FF] hover:bg-[#13131A]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/submit">
            <Button
              size="sm"
              variant="outline"
              className="hidden sm:flex gap-1.5 border-[#2A2A3A] text-[#8888AA] hover:text-[#F0F0FF] hover:border-[#7C3AED]/50 bg-transparent text-xs h-8"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Submit
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="sm"
              className="gradient-copy text-white text-xs h-8 px-3 hover:opacity-90"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
