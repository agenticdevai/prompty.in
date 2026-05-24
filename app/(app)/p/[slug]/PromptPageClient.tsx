"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Bookmark,
  Share2,
  Check,
  Zap,
  ChevronDown,
  Eye,
  Copy,
  ArrowLeft,
} from "lucide-react";
import { MasonryGrid } from "@/components/prompt/MasonryGrid";
import { cn } from "@/lib/utils";
import { spring, fadeUp } from "@/lib/motion";
import type { Prompt } from "@/types";

const TOOL_LABELS: Record<string, string> = {
  midjourney: "Midjourney",
  dalle: "DALL·E",
  stable_diffusion: "Stable Diffusion",
  flux: "Flux",
  firefly: "Firefly",
  ideogram: "Ideogram",
  unknown: "Unknown",
};

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function countTokens(text: string) {
  return Math.ceil(text.split(/\s+/).filter(Boolean).length * 1.3);
}

interface Props {
  prompt: Prompt;
  related: Prompt[];
}

export function PromptPageClient({ prompt, related }: Props) {
  const images = prompt.images ?? [];
  const primaryIndex = images.findIndex((img) => img.is_primary);
  const [activeImg, setActiveImg] = useState(primaryIndex >= 0 ? primaryIndex : 0);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(prompt.likes_count);
  const [saved, setSaved] = useState(false);
  const [negativeOpen, setNegativeOpen] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [prompt.prompt_text]);

  const handleLike = useCallback(() => {
    setLiked((v) => {
      setLikeCount((c) => (v ? c - 1 : c + 1));
      return !v;
    });
  }, []);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: prompt.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
  }, [prompt.title]);

  const activeImage = images[activeImg];
  const tokenCount = countTokens(prompt.prompt_text);
  const hasParameters = prompt.parameters && Object.keys(prompt.parameters).length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Back */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-sm text-[#55556A] hover:text-[#F0F0FF] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image gallery */}
        <motion.div {...fadeUp} className="space-y-3">
          <div className="relative rounded-[18px] overflow-hidden bg-[#13131A] border border-[#2A2A3A] aspect-square">
            {activeImage ? (
              <Image
                src={activeImage.cdn_url ?? activeImage.image_url}
                alt={prompt.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#2A2A3A]" />
              </div>
            )}
            {prompt.aspect_ratio && (
              <span className="absolute top-3 right-3 text-[10px] font-semibold bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                {prompt.aspect_ratio}
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative w-16 h-16 rounded-[10px] overflow-hidden border-2 transition-all flex-shrink-0",
                    i === activeImg
                      ? "border-[#7C3AED]"
                      : "border-[#2A2A3A] hover:border-[#7C3AED]/50"
                  )}
                >
                  <Image
                    src={img.cdn_url ?? img.image_url}
                    alt={`View ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { ...spring.gentle, delay: 0.08 } }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#F0F0FF] leading-snug">
              {prompt.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30">
                {TOOL_LABELS[prompt.ai_tool] ?? prompt.ai_tool}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1C1C26] text-[#8888AA] border border-[#2A2A3A] capitalize">
                {prompt.category}
              </span>
              {prompt.style && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1C1C26] text-[#8888AA] border border-[#2A2A3A] capitalize">
                  {prompt.style}
                </span>
              )}
              {prompt.is_premium && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                  PRO
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-[#55556A]">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {formatCount(prompt.views)}
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              {formatCount(likeCount)}
            </span>
            <span className="flex items-center gap-1.5">
              <Copy className="w-4 h-4" />
              {formatCount(prompt.copies)}
            </span>
          </div>

          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {prompt.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/explore?tag=${tag.slug}`}
                  className="text-xs text-[#55556A] hover:text-[#A78BFA] transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Prompt text */}
          <div className="bg-[#13131A] border border-[#2A2A3A] rounded-[14px] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#55556A] uppercase tracking-wider">
                Prompt
              </span>
              <span className="text-[10px] text-[#55556A]">~{tokenCount} tokens</span>
            </div>
            <p className="font-mono text-sm text-[#C4C4D4] leading-relaxed break-words">
              {prompt.prompt_text}
            </p>
          </div>

          {/* Negative prompt */}
          {prompt.negative_prompt && (
            <div className="bg-[#13131A] border border-[#2A2A3A] rounded-[14px] overflow-hidden">
              <button
                onClick={() => setNegativeOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#8888AA] hover:text-[#F0F0FF] transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Negative Prompt
                </span>
                <motion.div
                  animate={{ rotate: negativeOpen ? 180 : 0 }}
                  transition={spring.snappy}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {negativeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring.gentle}
                    className="overflow-hidden"
                  >
                    <p className="font-mono text-sm text-[#C4C4D4] leading-relaxed px-4 pb-4">
                      {prompt.negative_prompt}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Parameters */}
          {hasParameters && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#55556A] uppercase tracking-wider">
                Parameters
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(prompt.parameters!).map(([key, value]) => (
                  <span
                    key={key}
                    className="font-mono text-xs bg-[#1C1C26] border border-[#2A2A3A] px-2.5 py-1 rounded-[8px] text-[#8888AA]"
                  >
                    {key}: <span className="text-[#C4C4D4]">{value}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <motion.button
              onClick={handleCopy}
              whileTap={{ scale: 0.95 }}
              transition={spring.bouncy}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[12px] font-semibold text-sm transition-all",
                copied ? "bg-[#10B981] text-white" : "gradient-copy text-white hover:opacity-90"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={spring.bouncy}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={spring.bouncy}
                    className="flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" /> Copy Prompt
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.8 }}
              transition={spring.bouncy}
              className={cn(
                "w-11 h-11 rounded-[12px] flex items-center justify-center border transition-colors",
                liked
                  ? "bg-[#EC4899]/15 border-[#EC4899]/50 text-[#EC4899]"
                  : "bg-transparent border-[#2A2A3A] text-[#55556A] hover:text-[#EC4899] hover:border-[#EC4899]/30"
              )}
            >
              <Heart className={cn("w-4 h-4", liked && "fill-current")} />
            </motion.button>

            <motion.button
              onClick={() => setSaved((v) => !v)}
              whileTap={{ scale: 0.8 }}
              transition={spring.bouncy}
              className={cn(
                "w-11 h-11 rounded-[12px] flex items-center justify-center border transition-colors",
                saved
                  ? "bg-[#7C3AED]/15 border-[#7C3AED]/50 text-[#7C3AED]"
                  : "bg-transparent border-[#2A2A3A] text-[#55556A] hover:text-[#7C3AED] hover:border-[#7C3AED]/30"
              )}
            >
              <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
            </motion.button>

            <motion.button
              onClick={handleShare}
              whileTap={{ scale: 0.8 }}
              transition={spring.bouncy}
              className={cn(
                "w-11 h-11 rounded-[12px] flex items-center justify-center border transition-colors",
                shared
                  ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]"
                  : "bg-transparent border-[#2A2A3A] text-[#55556A] hover:text-[#F0F0FF] hover:border-[#2A2A3A]"
              )}
            >
              {shared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Related prompts */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-[#F0F0FF] mb-4">Related Prompts</h2>
          <MasonryGrid prompts={related} />
        </section>
      )}

      {/* Sticky mobile copy — above MobileBottomNav */}
      <div className="fixed bottom-16 left-0 right-0 px-4 sm:hidden z-40 pointer-events-none">
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.97 }}
          transition={spring.bouncy}
          style={{ pointerEvents: "auto" }}
          className={cn(
            "w-full py-3 rounded-[14px] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all",
            copied ? "bg-[#10B981] text-white" : "gradient-copy text-white"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copied!
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" /> Copy Prompt
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}