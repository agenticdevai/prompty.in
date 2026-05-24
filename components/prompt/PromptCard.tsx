"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Eye, Heart, Bookmark, Zap, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import type { Prompt } from "@/types";

interface PromptCardProps {
  prompt: Prompt;
  onSave?: (id: string) => void;
  isSaved?: boolean;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  priority?: boolean;
}

export function PromptCard({
  prompt,
  onSave,
  isSaved = false,
  isLiked = false,
  onLike,
  priority = false,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(prompt.likes_count);
  const [saved, setSaved] = useState(isSaved);

  const primaryImage = prompt.images?.find((img) => img.is_primary) ?? prompt.images?.[0];

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(prompt.prompt_text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard not available
      }
    },
    [prompt.prompt_text]
  );

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      onLike?.(prompt.id);
    },
    [liked, onLike, prompt.id]
  );

  const handleSave = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSaved((prev) => !prev);
      onSave?.(prompt.id);
    },
    [onSave, prompt.id]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      className="group relative rounded-[16px] overflow-hidden shadow-card bg-surface cursor-pointer"
      style={{ breakInside: "avoid", marginBottom: 0 }}
    >
      <Link href={`/p/${prompt.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden bg-surface-elevated">
          {primaryImage ? (
            <motion.div
              variants={{ hover: { scale: 1.06 } }}
              transition={spring.gentle}
              className="w-full"
            >
              <Image
                src={primaryImage.cdn_url ?? primaryImage.image_url}
                alt={prompt.title}
                width={primaryImage.width ?? 400}
                height={primaryImage.height ?? 400}
                className="w-full h-auto object-cover"
                priority={priority}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
            </motion.div>
          ) : (
            <div
              className="w-full bg-surface-elevated flex items-center justify-center"
              style={{ aspectRatio: prompt.aspect_ratio?.replace(":", "/") ?? "1/1" }}
            >
              <span className="text-[#55556A] text-sm">No image</span>
            </div>
          )}

          {/* Aspect ratio badge */}
          {prompt.aspect_ratio && (
            <span className="absolute top-2 left-2 bg-black/60 text-white/80 text-[10px] font-mono px-1.5 py-0.5 rounded-md backdrop-blur-sm">
              {prompt.aspect_ratio}
            </span>
          )}

          {/* Premium badge */}
          {prompt.is_premium && (
            <span className="absolute top-2 right-2 gradient-copy text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              PRO
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="p-3">
          <p className="font-semibold text-[#F0F0FF] text-sm leading-snug line-clamp-2 mb-2">
            {prompt.title}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-[#1C1C26] text-[#8888AA] border-0 rounded-full">
              {prompt.category}
            </Badge>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-[#1C1C26] text-[#8888AA] border-0 rounded-full">
              {prompt.ai_tool === "dalle" ? "DALL·E" : prompt.ai_tool.replace("_", " ")}
            </Badge>
            {prompt.tags?.slice(0, 1).map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 bg-[#1C1C26] text-[#8888AA] border-0 rounded-full"
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-[11px] text-[#55556A] mb-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatCount(prompt.views)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className={cn("w-3 h-3", liked && "fill-[#EC4899] text-[#EC4899]")} />
              {formatCount(likeCount)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {/* Copy button */}
            <motion.button
              onClick={handleCopy}
              animate={copied ? { scale: [0.94, 1] } : {}}
              transition={spring.bouncy}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-[10px] transition-all",
                copied
                  ? "bg-[#10B981] text-white"
                  : "gradient-copy text-white hover:opacity-90 active:scale-95"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </motion.button>

            {/* Like button */}
            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.8 }}
              transition={spring.bouncy}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-[10px] border transition-all",
                liked
                  ? "bg-[#EC4899]/10 border-[#EC4899]/40 text-[#EC4899]"
                  : "bg-[#1C1C26] border-[#2A2A3A] text-[#8888AA] hover:border-[#EC4899]/40 hover:text-[#EC4899]"
              )}
            >
              <Heart className={cn("w-4 h-4", liked && "fill-[#EC4899]")} />
            </motion.button>

            {/* Save button */}
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.8 }}
              transition={spring.bouncy}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-[10px] border transition-all",
                saved
                  ? "bg-[#7C3AED]/10 border-[#7C3AED]/40 text-[#7C3AED]"
                  : "bg-[#1C1C26] border-[#2A2A3A] text-[#8888AA] hover:border-[#7C3AED]/40 hover:text-[#7C3AED]"
              )}
            >
              <Bookmark className={cn("w-4 h-4", saved && "fill-[#7C3AED]")} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
