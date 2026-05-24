import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PromptPageClient } from "./PromptPageClient";
import { getPromptBySlug, getRelatedPrompts } from "@/lib/supabase/queries";
import { MOCK_PROMPTS } from "@/lib/mock-data";

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const prompt = USE_MOCK
    ? MOCK_PROMPTS.find((p) => p.slug === slug)
    : await getPromptBySlug(slug);

  if (!prompt) return {};

  return {
    title: prompt.title,
    description: `${prompt.prompt_text.slice(0, 155)}...`,
    openGraph: {
      title: prompt.title,
      description: prompt.prompt_text.slice(0, 200),
      images: prompt.images?.[0]?.cdn_url ? [prompt.images[0].cdn_url] : [],
    },
  };
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;

  let prompt, related;

  if (USE_MOCK) {
    prompt = MOCK_PROMPTS.find((p) => p.slug === slug);
    if (!prompt) notFound();
    related = MOCK_PROMPTS.filter(
      (p) => p.id !== prompt!.id &&
        (p.category === prompt!.category || p.ai_tool === prompt!.ai_tool)
    ).slice(0, 8);
  } else {
    prompt = await getPromptBySlug(slug);
    if (!prompt) notFound();
    related = await getRelatedPrompts(prompt.id, prompt.category, prompt.ai_tool);
  }

  return <PromptPageClient prompt={prompt!} related={related} />;
}
