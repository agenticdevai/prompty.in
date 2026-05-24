import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PromptPageClient } from "./PromptPageClient";
import { MOCK_PROMPTS } from "@/lib/mock-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = MOCK_PROMPTS.find((p) => p.slug === slug);
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
  const prompt = MOCK_PROMPTS.find((p) => p.slug === slug);
  if (!prompt) notFound();

  const related = MOCK_PROMPTS.filter(
    (p) => p.id !== prompt.id && (p.category === prompt.category || p.ai_tool === prompt.ai_tool)
  ).slice(0, 8);

  return <PromptPageClient prompt={prompt} related={related} />;
}
