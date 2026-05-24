export type AiTool =
  | "midjourney"
  | "dalle"
  | "stable_diffusion"
  | "flux"
  | "firefly"
  | "ideogram"
  | "unknown";

export type Category =
  | "portrait"
  | "cinematic"
  | "fantasy"
  | "anime"
  | "architecture"
  | "fashion"
  | "nature"
  | "abstract"
  | "urban"
  | "product"
  | "reels"
  | "indian";

export type Style =
  | "realistic"
  | "cinematic"
  | "anime"
  | "illustration"
  | "3d"
  | "watercolor"
  | "sketch"
  | "neon"
  | "vintage"
  | "minimal";

export type Mood = "warm" | "cool" | "dark" | "pastel" | "neon" | "bw" | "vibrant";

export type AspectRatio = "1:1" | "4:5" | "9:16" | "16:9";

export type SortOption = "trending" | "newest" | "most_liked" | "most_copied";

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  prompt_text: string;
  prompt_hash: string;
  negative_prompt?: string;
  parameters?: Record<string, string>;
  ai_tool: AiTool;
  category: Category;
  style?: Style;
  mood?: Mood;
  aspect_ratio?: AspectRatio;
  quality_score?: number;
  is_premium: boolean;
  is_nsfw: boolean;
  is_approved: boolean;
  source_url?: string;
  source_name?: string;
  submitted_by?: string;
  views: number;
  copies: number;
  likes_count: number;
  saves_count: number;
  created_at: string;
  updated_at: string;
  images?: PromptImage[];
  tags?: Tag[];
}

export interface PromptImage {
  id: string;
  prompt_id: string;
  image_url: string;
  cdn_url?: string;
  is_primary: boolean;
  width?: number;
  height?: number;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  plan: "free" | "pro";
  is_creator: boolean;
  total_copies: number;
  total_likes: number;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description?: string;
  is_public: boolean;
  cover_url?: string;
  item_count: number;
  created_at: string;
  user?: Pick<User, "username" | "display_name" | "avatar_url">;
}

export interface PromptsFilter {
  category?: Category;
  tool?: AiTool;
  style?: Style;
  aspect_ratio?: AspectRatio;
  mood?: Mood;
  sort?: SortOption;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
