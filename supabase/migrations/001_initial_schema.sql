-- ============================================================
-- Prompty.in — Initial Schema
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";  -- trigram for full-text search

-- ============================================================
-- ENUMS
-- ============================================================

create type ai_tool as enum (
  'midjourney', 'dalle', 'stable_diffusion', 'flux',
  'firefly', 'ideogram', 'unknown'
);

create type category as enum (
  'portrait', 'cinematic', 'fantasy', 'anime',
  'architecture', 'fashion', 'nature', 'abstract',
  'urban', 'product', 'reels', 'indian'
);

create type style as enum (
  'realistic', 'cinematic', 'anime', 'illustration',
  '3d', 'watercolor', 'sketch', 'neon', 'vintage', 'minimal'
);

create type mood as enum (
  'warm', 'cool', 'dark', 'pastel', 'neon', 'bw', 'vibrant'
);

create type aspect_ratio as enum ('1:1', '4:5', '9:16', '16:9');

create type user_plan as enum ('free', 'pro');

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique,
  display_name  text,
  avatar_url    text,
  bio           text,
  plan          user_plan not null default 'free',
  is_creator    boolean   not null default false,
  total_copies  integer   not null default 0,
  total_likes   integer   not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- TAGS
-- ============================================================

create table public.tags (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,
  slug       text not null unique,
  count      integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- PROMPTS
-- ============================================================

create table public.prompts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,
  title           text not null,
  prompt_text     text not null,
  prompt_hash     text not null unique,  -- md5 of normalised prompt_text
  negative_prompt text,
  parameters      jsonb,
  ai_tool         ai_tool    not null default 'unknown',
  category        category   not null,
  style           style,
  mood            mood,
  aspect_ratio    aspect_ratio,
  quality_score   numeric(3,2),
  is_premium      boolean not null default false,
  is_nsfw         boolean not null default false,
  is_approved     boolean not null default true,
  source_url      text,
  source_name     text,
  submitted_by    uuid references public.profiles(id) on delete set null,
  views           integer not null default 0,
  copies          integer not null default 0,
  likes_count     integer not null default 0,
  saves_count     integer not null default 0,
  -- computed trending score stored for fast sort (refreshed by pg_cron hourly)
  trending_score  numeric not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  -- full-text search vector
  fts             tsvector generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(prompt_text, ''))
  ) stored
);

-- ============================================================
-- PROMPT IMAGES
-- ============================================================

create table public.prompt_images (
  id         uuid primary key default uuid_generate_v4(),
  prompt_id  uuid not null references public.prompts(id) on delete cascade,
  image_url  text not null,
  cdn_url    text,
  is_primary boolean not null default false,
  width      integer,
  height     integer,
  created_at timestamptz not null default now()
);

-- ============================================================
-- PROMPT ↔ TAG (many-to-many)
-- ============================================================

create table public.prompt_tags (
  prompt_id uuid not null references public.prompts(id) on delete cascade,
  tag_id    uuid not null references public.tags(id)    on delete cascade,
  primary key (prompt_id, tag_id)
);

-- ============================================================
-- USER INTERACTIONS
-- ============================================================

create table public.user_likes (
  user_id    uuid not null references auth.users(id) on delete cascade,
  prompt_id  uuid not null references public.prompts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

create table public.user_saves (
  user_id    uuid not null references auth.users(id) on delete cascade,
  prompt_id  uuid not null references public.prompts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

create table public.user_copies (
  user_id    uuid not null references auth.users(id) on delete cascade,
  prompt_id  uuid not null references public.prompts(id) on delete cascade,
  count      integer not null default 1,
  last_copied_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Prompts: list queries
create index idx_prompts_category       on public.prompts(category)       where is_approved and not is_nsfw;
create index idx_prompts_ai_tool        on public.prompts(ai_tool)        where is_approved and not is_nsfw;
create index idx_prompts_style          on public.prompts(style)          where is_approved and not is_nsfw;
create index idx_prompts_aspect_ratio   on public.prompts(aspect_ratio)   where is_approved and not is_nsfw;
create index idx_prompts_trending       on public.prompts(trending_score desc) where is_approved and not is_nsfw;
create index idx_prompts_created_at     on public.prompts(created_at desc) where is_approved and not is_nsfw;
create index idx_prompts_likes          on public.prompts(likes_count desc) where is_approved and not is_nsfw;
create index idx_prompts_copies         on public.prompts(copies desc)    where is_approved and not is_nsfw;

-- Full-text search
create index idx_prompts_fts on public.prompts using gin(fts);
-- Trigram for partial-word search (title)
create index idx_prompts_title_trgm on public.prompts using gin(title gin_trgm_ops);

-- Images: fast primary lookup
create index idx_prompt_images_prompt_id on public.prompt_images(prompt_id);

-- Interactions
create index idx_user_likes_user    on public.user_likes(user_id);
create index idx_user_saves_user    on public.user_saves(user_id);
create index idx_user_copies_user   on public.user_copies(user_id);

-- ============================================================
-- TRIGGERS: updated_at
-- ============================================================

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_prompts_updated_at
  before update on public.prompts
  for each row execute function public.set_updated_at();

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ============================================================
-- TRIGGERS: sync interaction counts on prompts
-- ============================================================

create or replace function public.sync_likes_count()
returns trigger language plpgsql as $$
begin
  if TG_OP = 'INSERT' then
    update public.prompts set likes_count = likes_count + 1 where id = new.prompt_id;
  elsif TG_OP = 'DELETE' then
    update public.prompts set likes_count = greatest(likes_count - 1, 0) where id = old.prompt_id;
  end if;
  return null;
end;
$$;

create trigger trg_sync_likes
  after insert or delete on public.user_likes
  for each row execute function public.sync_likes_count();

create or replace function public.sync_saves_count()
returns trigger language plpgsql as $$
begin
  if TG_OP = 'INSERT' then
    update public.prompts set saves_count = saves_count + 1 where id = new.prompt_id;
  elsif TG_OP = 'DELETE' then
    update public.prompts set saves_count = greatest(saves_count - 1, 0) where id = old.prompt_id;
  end if;
  return null;
end;
$$;

create trigger trg_sync_saves
  after insert or delete on public.user_saves
  for each row execute function public.sync_saves_count();

-- ============================================================
-- FUNCTION: increment copies (safe for anon via security definer)
-- ============================================================

create or replace function public.increment_copies(p_id uuid)
returns void language plpgsql security definer as $$
begin
  update public.prompts set copies = copies + 1 where id = p_id;
end;
$$;

-- ============================================================
-- FUNCTION: refresh trending scores (call via pg_cron hourly)
-- score = (likes×3 + copies×5 + views×1 + saves×4) / log(hours_since_posted + 2)
-- ============================================================

create or replace function public.refresh_trending_scores()
returns void language plpgsql as $$
begin
  update public.prompts
  set trending_score = (
    (likes_count * 3 + copies * 5 + views * 1 + saves_count * 4)::numeric
    / log(extract(epoch from (now() - created_at)) / 3600 + 2)
  )
  where is_approved and not is_nsfw;
end;
$$;

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================

alter table public.profiles     enable row level security;
alter table public.prompts      enable row level security;
alter table public.prompt_images enable row level security;
alter table public.tags         enable row level security;
alter table public.prompt_tags  enable row level security;
alter table public.user_likes   enable row level security;
alter table public.user_saves   enable row level security;
alter table public.user_copies  enable row level security;

-- profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- prompts: public read for approved, non-NSFW
create policy "Approved prompts are public"
  on public.prompts for select using (is_approved and not is_nsfw);
create policy "Authenticated users can insert prompts"
  on public.prompts for insert with check (auth.role() = 'authenticated');

-- prompt_images: public read
create policy "Prompt images are public"
  on public.prompt_images for select using (true);

-- tags: public read
create policy "Tags are public"
  on public.tags for select using (true);
create policy "Prompt tags are public"
  on public.prompt_tags for select using (true);

-- user_likes
create policy "Users see own likes"
  on public.user_likes for select using (auth.uid() = user_id);
create policy "Users can like"
  on public.user_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike"
  on public.user_likes for delete using (auth.uid() = user_id);

-- user_saves
create policy "Users see own saves"
  on public.user_saves for select using (auth.uid() = user_id);
create policy "Users can save"
  on public.user_saves for insert with check (auth.uid() = user_id);
create policy "Users can unsave"
  on public.user_saves for delete using (auth.uid() = user_id);

-- user_copies
create policy "Users see own copies"
  on public.user_copies for select using (auth.uid() = user_id);
create policy "Users can record copies"
  on public.user_copies for insert with check (auth.uid() = user_id);
create policy "Users can update copy count"
  on public.user_copies for update using (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: auto-create profile on sign-up
-- ============================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
