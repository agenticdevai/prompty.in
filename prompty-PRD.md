# Prompty.in — Product Requirements Document (PRD)
**Version:** 1.0 | **Date:** May 2026 | **Status:** Draft — Awaiting Review

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Target Users](#4-target-users)
5. [Competitive Analysis](#5-competitive-analysis)
6. [Site Architecture & Information Architecture](#6-site-architecture--information-architecture)
7. [Feature Specifications](#7-feature-specifications)
8. [UI/UX Design System](#8-uiux-design-system)
9. [Animations & Motion Design](#9-animations--motion-design)
10. [Scraping Architecture](#10-scraping-architecture)
11. [Database Schema](#11-database-schema)
12. [API Design](#12-api-design)
13. [Tech Stack](#13-tech-stack)
14. [SEO Strategy](#14-seo-strategy)
15. [Monetization Strategy](#15-monetization-strategy)
16. [Performance Requirements](#16-performance-requirements)
17. [Development Roadmap](#17-development-roadmap)
18. [Open Questions](#18-open-questions)

---

## 1. Executive Summary

**Prompty.in** is being redesigned from a simple 48-prompt static gallery into a **high-retention AI prompt discovery platform** targeting Gen-Z creators, Instagram Reelers, and AI art enthusiasts — primarily in India.

The new platform will:
- Aggregate **5,000+ prompts** via automated scrapers from top AI platforms
- Serve as the **go-to destination** for Indian creators who need AI image prompts for Reels, thumbnails, and content
- Provide an **addictive, Pinterest-style infinite scroll experience** with one-tap prompt copying
- Build a **community layer** (saves, collections, likes) for retention and return visits
- Own the **untapped Indian/South Asian AI prompt niche** — no competitor does this

**Unique Positioning:** *"The #1 AI Prompt Platform for Indian Creators"* — regional language prompts, Reels-optimized formats, Indian cultural styles.

---

## 2. Problem Statement

### Current Pain Points (Prompty.in)

| Pain Point | User Impact |
|---|---|
| Only 48 prompts | Users exhaust content in 3 minutes, never return |
| No search or filter | Finding anything specific is impossible |
| No copy button | Users have to screenshot or manually type prompts |
| No categories or tags | No way to explore by style or AI tool |
| WhatsApp-only sharing | Misses Instagram, X/Twitter, TikTok sharing |
| No SEO-optimized pages | Near-zero organic search traffic |
| No accounts or saves | Zero reason to return after first visit |
| Desktop layout broken | Single-column layout looks outdated on desktop |
| No social proof | No likes, views, or ratings on prompts |

### Broader Market Gap
No platform specifically serves **Indian Gen-Z creators** who want prompts for:
- Instagram Reels AI avatars
- Bollywood/South Asian aesthetic styles
- Regional language prompt variations (Hindi, Tamil, Telugu)
- Mobile-first, thumb-friendly browsing

---

## 3. Goals & Success Metrics

### Primary Goals
1. **Traffic** — Grow from ~0 organic visits to 50,000 monthly visitors in 6 months
2. **Retention** — Average session duration > 4 minutes; return visitor rate > 35%
3. **Content** — 5,000+ indexed prompts within 3 months of launch
4. **Community** — 10,000 registered users within 6 months

### Key Metrics (KPIs)

| Metric | Current | 3-Month Target | 6-Month Target |
|---|---|---|---|
| Monthly visitors | ~500 | 10,000 | 50,000 |
| Prompts indexed | 48 | 2,000 | 5,000+ |
| Session duration | ~1 min | 3 min | 5 min |
| Registered users | 0 | 2,000 | 10,000 |
| Prompt copies/day | ~20 | 500 | 5,000 |
| Return visitor rate | ~5% | 25% | 40% |

---

## 4. Target Users

### Primary Persona — "Creator Kavya" (Gen-Z)
- **Age:** 18–26 | **Location:** Tier 1 & Tier 2 Indian cities
- **Platform:** Primarily mobile (Instagram, YouTube Shorts, Pinterest)
- **Goal:** Make aesthetic AI art for Reels, profile pics, and story highlights
- **Frustration:** Prompt engineering is hard; existing sites are in English and feel "foreign"
- **Behavior:** Scrolls fast, copies first, reads later, shares immediately
- **Device:** Android (75%), iPhone (25%), barely uses desktop

### Secondary Persona — "Designer Dev"
- **Age:** 22–32 | Freelance graphic designer / content agency
- **Goal:** Batch-create AI visuals for client social media
- **Need:** Collections, bulk export, high-quality prompts with parameters

### Tertiary Persona — "Hobbyist Harsh"
- **Age:** 16–24 | Student, casual AI art explorer
- **Goal:** Experiment with cool prompts, share results on Discord/Reddit
- **Behavior:** Deep dives into specific styles, leaves comments and ratings

---

## 5. Competitive Analysis

| Feature | Prompty.in (current) | PromptBase | PromptHero | Lexica.art | **Prompty.in (new)** |
|---|---|---|---|---|---|
| Free prompts | Yes | Paid ($2-9) | Yes | Yes | **Yes + Premium** |
| Search | ❌ | ✅ | ✅ | ✅ | **✅ Instant** |
| Tags / Filter | ❌ | ✅ | ✅ | ✅ | **✅ Multi-filter** |
| User accounts | ❌ | ✅ | ✅ | ✅ | **✅ Google SSO** |
| 1-click copy | ❌ | ✅ | ✅ | ✅ | **✅** |
| Infinite scroll | ❌ | ❌ | ✅ | ✅ | **✅** |
| Indian focus | ✅ | ❌ | ❌ | ❌ | **✅ Core USP** |
| Reels format | ✅ | ❌ | ❌ | ❌ | **✅ Core USP** |
| Hindi prompts | ❌ | ❌ | ❌ | ❌ | **✅ Unique** |
| Collections | ❌ | ❌ | ✅ | ✅ | **✅** |
| Mobile-first | Partial | ❌ | ❌ | ❌ | **✅ Primary** |
| Auto-scraped content | ❌ | ❌ | ❌ | ❌ | **✅ 5000+** |

**Competitive moat:** Indian language support + Reels-optimized prompts + mobile-first Gen-Z UX = no current competitor.

---

## 6. Site Architecture & Information Architecture

### URL Structure

```
prompty.in/                          → Home (trending + categories + search)
prompty.in/explore                   → Full gallery (all prompts, filterable)
prompty.in/p/[slug]                  → Individual prompt page (SEO goldmine)
prompty.in/category/[name]           → Category page (portrait, cinematic, etc.)
prompty.in/tool/[name]               → Tool page (midjourney, dall-e, flux, etc.)
prompty.in/collections               → Browse public collections
prompty.in/collections/[slug]        → Individual collection page
prompty.in/u/[username]              → User profile page
prompty.in/submit                    → Submit a prompt
prompty.in/trending                  → Weekly trending prompts
prompty.in/new                       → Latest added prompts
prompty.in/blog                      → SEO articles
prompty.in/blog/[slug]               → Individual blog post
prompty.in/search?q=...              → Search results
```

### Navigation Structure

```
Header (sticky, blur backdrop)
├── Logo (Prompty)
├── Search bar (center, cmd+K shortcut)
├── [Explore] [Trending] [New] [Collections]
├── [Submit Prompt]
└── [Login / Avatar]

Mobile Bottom Navigation
├── 🏠 Home
├── 🔍 Search
├── ✨ Trending
├── 📚 Saved
└── 👤 Profile
```

### Page Hierarchy

```
Home
├── Hero Search Bar
├── Category Pills (horizontal scroll)
├── AI Tool Filter Tabs
├── Trending This Week (horizontal carousel)
├── Featured Collections
├── Infinite Scroll Grid (masonry)
└── "Load More" / Auto-load trigger

Explore (Full Gallery)
├── Sticky Filter Bar
│   ├── Search input
│   ├── Category dropdown
│   ├── AI Tool filter
│   ├── Style filter (realistic, anime, cinematic...)
│   ├── Aspect ratio (1:1, 9:16, 16:9)
│   └── Sort (trending / newest / most liked)
└── Masonry Grid (infinite scroll)

Individual Prompt Page
├── Back navigation
├── Primary image (full width on mobile)
├── Image gallery (swipeable, multiple outputs)
├── Title + tags
├── One-tap Copy Prompt button (sticky on mobile)
├── Prompt text (expandable)
├── Negative prompt (collapsible)
├── Parameters (model, AR, style, seed)
├── "Works with" badges
├── Action bar: Like | Save | Share
├── Comments section
└── Related Prompts grid
```

---

## 7. Feature Specifications

### 7.1 Homepage

**Hero Section**
- Full-width animated gradient background (aurora effect)
- Large search bar with placeholder cycling text: "Search cinematic portraits...", "Find Reels prompts...", "Explore anime styles..."
- Trending tag pills beneath search
- Subtle animated prompt cards floating in background (parallax)

**Category Pills**
- Horizontal scrollable row (no scrollbar visible on mobile)
- Categories: `🎭 Portrait` `🎬 Cinematic` `🌸 Anime` `🏙️ Urban` `✨ Fantasy` `👗 Fashion` `🏛️ Architecture` `🌿 Nature` `🎨 Abstract` `📸 Reels` `🇮🇳 Indian`
- Active state: filled pill with gradient border

**AI Tool Tabs**
- Tab row: `All` `Midjourney` `DALL-E 3` `Stable Diffusion` `Flux` `Firefly` `Ideogram`
- Each tab shows tool logo + name
- Selecting filters the grid instantly (no page reload)

**Trending Section**
- Horizontal carousel, auto-scrolls slowly
- Each card: image + title + like count + "Copy" button
- "View all trending →" link

**Infinite Scroll Grid**
- Masonry layout: 4 columns desktop, 3 tablet, 2 mobile
- Cards load in batches of 20
- Intersection Observer triggers next batch
- Skeleton loading cards while fetching

---

### 7.2 Prompt Card (Component)

```
┌──────────────────────────┐
│                          │
│   [Generated Image]      │  ← aspect ratio preserved
│   (hover: slight zoom)   │
│                          │
├──────────────────────────┤
│  Bold Title              │
│  🏷 Cinematic  🏷 MJ v6  │
│  ─────────────────────── │
│  👁 2.3k   ❤️ 841        │
│                          │
│  [⚡ Copy]   [🔖 Save]   │
└──────────────────────────┘
```

**Interactions:**
- Hover: image subtly zooms (scale 1.03), card elevates (shadow deepens)
- "Copy" button: one click copies full prompt text → shows "Copied! ✓" toast
- "Save" button: heart animation, opens save-to-collection modal if logged in
- Card click: opens individual prompt page (with page transition)
- Long press (mobile): quick action sheet (copy, save, share)

---

### 7.3 Individual Prompt Page

**Image Section**
- Swipeable image gallery (multiple AI-generated outputs for same prompt)
- Tap to zoom / pinch to zoom on mobile
- Download button (watermarked for free users)

**Prompt Section**
- Prompt text displayed in monospace card
- "Copy Full Prompt" — large sticky button on mobile (bottom of screen)
- Token counter showing prompt length
- Expandable "Negative Prompt" section
- "Parameters" section: `--ar 9:16  --v 6.1  --style raw  --q 2`
- Copy individual sections (just negative, just params)

**Metadata**
- AI Tool badge (Midjourney logo, etc.)
- Category + Tags (clickable, go to filtered explore)
- Aspect ratio badge (great for Reels: 9:16)
- Difficulty: Beginner / Intermediate / Advanced
- Source credit with link

**Social Actions**
- ❤️ Like (animated heart burst on click)
- 🔖 Save to Collection
- Share sheet: WhatsApp | Instagram Story | X/Twitter | Copy Link | Download card (image with prompt overlay)

**Comments**
- Threaded comments (Google login required)
- "My result" — users can share their generated image in comments
- Helpful tips from community ("Try changing X to Y for better results")

---

### 7.4 Search & Discovery

**Instant Search (cmd+K or search bar focus)**
- Search modal overlay with blurred backdrop
- Instant results as user types (debounced 200ms)
- Results grouped: Prompts | Categories | Collections
- Recent searches (stored in localStorage)
- Trending searches shown when empty

**Advanced Filters (Explore page)**
- Multi-select categories
- Multi-select AI tools
- Style: Realistic | Cinematic | Anime | Illustration | 3D | Watercolor | Sketch
- Aspect ratio: Square (1:1) | Portrait (4:5) | Reels (9:16) | Landscape (16:9)
- Color mood: Warm | Cool | Dark | Pastel | Neon | B&W
- Sort: Trending | Newest | Most Liked | Most Viewed
- Filter count badge on filter button
- "Clear all filters" option

---

### 7.5 User Accounts & Profiles

**Authentication**
- Google OAuth (primary — one click)
- Email + password (secondary)
- No friction: can browse and copy without account; account required only for saves/likes

**User Profile Page**
- Avatar, username, bio
- Stats: prompts saved, collections created, likes given
- Public collections grid
- Activity feed (optional privacy toggle)

**Collections**
- Create named collections (e.g., "Reels Prompts", "Fantasy Pack")
- Public or private toggle
- Cover image = first prompt image in collection
- Share collection URL
- Follow other users' collections

---

### 7.6 Prompt Submission (Community)

**Submit Form**
- Prompt title
- Prompt text (textarea with character count)
- Negative prompt (optional)
- AI tool selector
- Category + tags (multi-select)
- Upload example image(s) — max 5
- Parameters (optional: model version, AR, seed)
- Source credit (optional URL)

**Moderation Queue**
- Auto-approve if: image passes NSFW check + prompt text doesn't contain banned keywords
- Manual review queue for flagged submissions
- Contributor badge on profile after 5 approved submissions

---

### 7.7 Trending & Discovery Algorithms

**Trending Score Formula**
```
score = (likes × 3 + copies × 5 + views × 1 + saves × 4) / age_decay_factor
age_decay_factor = log(hours_since_posted + 2)
```

**Personalization (Phase 2)**
- After 5 interactions, start personalizing home feed
- Track: categories viewed, AI tools filtered, prompts copied
- "Because you liked Cinematic Portraits" sections

---

### 7.8 Notifications & Re-Engagement

- Email digest: "Top 10 Prompts This Week" (weekly)
- Push notifications (web): new prompts in saved categories
- "New prompts in your saved collection" alerts
- Milestone notifications: "Your submitted prompt hit 1,000 copies!"

---

## 8. UI/UX Design System

### Design Principles

1. **Thumb-first** — all primary actions reachable with one thumb on mobile
2. **Instant feedback** — every interaction responds in <100ms (optimistic UI)
3. **Content over chrome** — UI gets out of the way; prompts are the hero
4. **Progressive disclosure** — show essentials first, details on demand
5. **Delight through motion** — micro-animations reward interactions

### Color System

```
Background:      #0A0A0F  (near black, not pure black — softer on OLED)
Surface:         #13131A  (cards, modals)
Surface Elevated:#1C1C26  (hover states, active)
Border:          #2A2A3A  (subtle, low contrast)

Brand Gradient:  linear-gradient(135deg, #7C3AED → #EC4899 → #F59E0B)
                 (purple → pink → amber — premium, Gen-Z aesthetic)

Accent Purple:   #7C3AED
Accent Pink:     #EC4899
Accent Amber:    #F59E0B

Text Primary:    #F0F0FF   (slightly cool white)
Text Secondary:  #8888AA
Text Muted:      #55556A

Success:         #10B981
Warning:         #F59E0B
Error:           #EF4444

Copy Button:     Gradient (purple → pink) with glow on hover
Like Active:     #EC4899 (pink)
Save Active:     #7C3AED (purple)
```

### Typography

```
Display Font:    "Clash Display" or "Cal Sans" — bold, modern, Gen-Z energy
Body Font:       "Inter" — clean, readable
Mono Font:       "JetBrains Mono" — for prompt text display

Scale:
  xs:   11px
  sm:   13px
  base: 15px
  lg:   17px
  xl:   20px
  2xl:  24px
  3xl:  30px
  4xl:  36px
  5xl:  48px
```

### Spacing & Layout

```
Border Radius:
  card:    16px
  button:  12px
  pill:    999px
  modal:   24px

Grid:
  mobile:  2 col, 8px gap
  tablet:  3 col, 12px gap
  desktop: 4 col, 16px gap
  wide:    5 col, 16px gap

Card Shadow (dark mode):
  default:  0 0 0 1px #2A2A3A
  hover:    0 0 0 1px #7C3AED, 0 8px 32px rgba(124, 58, 237, 0.2)
```

### Component Library Stack

- **Base components:** [shadcn/ui](https://ui.shadcn.com/) — headless, fully customizable
- **Community components:** [21st.dev](https://21st.dev/) — copy-paste advanced UI blocks
- **Drawer/sheet (mobile):** [Vaul](https://github.com/emilkowalski/vaul) — native-feel bottom sheets
- **Design quality auditing:** [Impeccable](https://github.com/pbakaus/impeccable) — catch design anti-patterns before ship
- **Icons:** [Lucide React](https://lucide.dev/) + custom SVGs
- **Images:** Next.js `<Image>` with blur placeholder

---

## 9. Animations & Motion Design

**Library:** [Motion](https://motion.dev/) (formerly Framer Motion) — `npm install motion`

### Animation Tokens

```ts
// Spring configs
export const spring = {
  snappy:  { type: "spring", stiffness: 400, damping: 28 },
  gentle:  { type: "spring", stiffness: 200, damping: 24 },
  bouncy:  { type: "spring", stiffness: 300, damping: 18 },
}

// Durations
export const duration = {
  fast:    0.12,
  normal:  0.22,
  slow:    0.38,
}
```

### Motion Patterns

**Page Transitions**
```
Enter: opacity 0→1, y +12→0, duration: 0.22s ease-out
Exit:  opacity 1→0, y 0→-8, duration: 0.15s ease-in
```

**Card Hover**
```
Scale:     1 → 1.02 (spring: snappy)
Shadow:    elevation increase + purple glow
Image:     scale 1 → 1.06 (overflow hidden, slow: gentle)
```

**Copy Button Click**
```
1. Button scales down (0.94) → back (1.0) — spring: bouncy
2. Text swaps "Copy" → "Copied! ✓" 
3. Green checkmark icon animates in (scale 0 → 1, rotate -10 → 0)
4. Resets after 2 seconds
```

**Like Heart Animation**
```
1. Heart scales 0.8 → 1.3 → 1.0 (spring: bouncy)
2. Color floods from grey → pink
3. Particle burst: 6 small hearts fly outward and fade
4. Counter increments with number flip animation
```

**Toast Notifications**
```
Enter: x +100 → 0, opacity 0→1, spring: snappy
Exit:  x 0 → +100, opacity 1→0
Stack: newer toasts push older ones down
```

**Infinite Scroll Cards**
```
Each new batch: cards stagger in
  opacity: 0 → 1
  y: 20 → 0
  stagger: 0.04s per card
```

**Search Modal**
```
Backdrop: opacity 0 → 0.8, blur 0 → 12px, duration 0.2s
Panel:    scale 0.96 → 1, opacity 0 → 1, y -8 → 0
```

**Scroll-Linked Hero**
```
Background gradient shifts hue as user scrolls down hero
Floating prompt cards: parallax at 0.3x scroll speed
```

**Mobile Bottom Sheet (Vaul)**
```
Drag to dismiss: native spring physics
Snap points: 40%, 80%, 100%
Backdrop: opacity tied to drag position
```

### Anti-Patterns to Avoid (Impeccable rules)
- No layout shift during load
- No animation that blocks interaction
- No easing curves that feel "default" (avoid ease-in-out linear)
- No excessive bounce (stiffness > 450 feels toy-like)
- No simultaneous animations on >5 elements at once

---

## 10. Scraping Architecture

### Target Sources

| Source | API Available | Data | Priority |
|---|---|---|---|
| Lexica.art | ✅ Public REST API | Prompt + image URL + model | P0 |
| Civitai.com | ✅ Public REST API | SD prompts + negative + metadata | P0 |
| Reddit (r/midjourney, r/StableDiffusion, r/AIArt) | ✅ Reddit API (free) | Top posts + prompts from comments | P1 |
| PublicPrompts.art | Scrape HTML | Prompt + tags + images | P1 |
| OpenArt.ai | Scrape public feed | Prompts + styles | P2 |
| PromptBase (free prompts only) | Scrape public listings | Free prompts | P2 |
| Pinterest AI boards | ⚠️ ToS — avoid | Titles only | P3 |

### Scraper System Architecture

```
┌─────────────────────────────────────────────────────┐
│                  SCRAPER ORCHESTRATOR                │
│          (Cron: runs every 6 hours)                  │
└─────────────────┬───────────────────────────────────┘
                  │ dispatches jobs
    ┌─────────────┼──────────────┐
    ▼             ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│  Lexica  │ │ Civitai  │ │  Reddit  │  ... more workers
│  Worker  │ │  Worker  │ │  Worker  │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     └────────────┼─────────────┘
                  ▼
         ┌────────────────┐
         │  Raw Job Queue │  (Redis / BullMQ)
         └───────┬────────┘
                 ▼
         ┌────────────────┐
         │  Dedup Engine  │  Hash(prompt_text) → skip if exists
         └───────┬────────┘
                 ▼
         ┌────────────────────────────┐
         │  AI Classifier (Claude API)│
         │  - Auto-assign category    │
         │  - Auto-tag style/mood     │
         │  - Detect AI tool          │
         │  - Quality score (1-10)    │
         │  - NSFW check              │
         └───────┬────────────────────┘
                 ▼
         ┌────────────────┐
         │  Image Fetch   │  Download + resize + WebP convert
         │  & CDN Upload  │  → Cloudflare R2
         └───────┬────────┘
                 ▼
         ┌─────────────────────────────┐
         │  Review Gate                │
         │  quality_score >= 7 →       │
         │    auto-approve             │
         │  quality_score 4-6 →        │
         │    manual review queue      │
         │  quality_score < 4 →        │
         │    auto-reject              │
         └───────┬─────────────────────┘
                 ▼
         ┌────────────────┐
         │   PostgreSQL   │  Prompts table
         └────────────────┘
```

### Scraper Tech Stack
- **Language:** Python 3.11
- **HTTP:** `httpx` (async) + `playwright` (JS-heavy sites)
- **Queue:** BullMQ (Node) or Celery (Python) + Redis
- **Classification:** Claude Haiku API (cheap, fast, accurate)
- **Image processing:** Pillow + `sharp` (WebP conversion)
- **Storage:** Cloudflare R2 (S3-compatible, cheaper)
- **Hosting:** Railway.app or Render (background worker)
- **Rate limiting:** Per-domain delay: 2–5 seconds between requests
- **Dedup:** SHA-256 hash of normalized prompt text (lowercase, stripped)

### Claude Haiku Classification Prompt
```
Given this AI image prompt text, return JSON with:
- category: one of [portrait, cinematic, fantasy, anime, architecture, 
                    fashion, nature, abstract, urban, product, reels]
- style: one of [realistic, cinematic, anime, illustration, 3d, 
                  watercolor, sketch, neon, vintage, minimal]
- ai_tool: one of [midjourney, dalle, stable_diffusion, flux, 
                    firefly, ideogram, unknown]
- mood: one of [warm, cool, dark, pastel, neon, bw, vibrant]
- quality_score: 1-10 (based on specificity, uniqueness, creativity)
- is_nsfw: boolean
- tags: array of 3-7 descriptive tags

Prompt: "{prompt_text}"
```

---

## 11. Database Schema

### Core Tables (PostgreSQL on Supabase)

```sql
-- Prompts (core content)
CREATE TABLE prompts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,          -- URL slug
  title         TEXT NOT NULL,
  prompt_text   TEXT NOT NULL,
  prompt_hash   TEXT UNIQUE NOT NULL,          -- dedup hash
  negative_prompt TEXT,
  parameters    JSONB,                         -- {"ar": "9:16", "v": "6.1", ...}
  ai_tool       TEXT NOT NULL,                 -- midjourney, dalle, etc.
  category      TEXT NOT NULL,
  style         TEXT,
  mood          TEXT,
  aspect_ratio  TEXT,                          -- 1:1, 9:16, 16:9, 4:5
  quality_score SMALLINT,                      -- 1-10
  is_premium    BOOLEAN DEFAULT false,
  is_nsfw       BOOLEAN DEFAULT false,
  is_approved   BOOLEAN DEFAULT false,
  source_url    TEXT,
  source_name   TEXT,
  submitted_by  UUID REFERENCES users(id),
  views         INTEGER DEFAULT 0,
  copies        INTEGER DEFAULT 0,
  likes_count   INTEGER DEFAULT 0,
  saves_count   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Prompt Images
CREATE TABLE prompt_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id   UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  cdn_url     TEXT,                            -- Cloudflare R2 URL
  is_primary  BOOLEAN DEFAULT false,
  width       INTEGER,
  height      INTEGER,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tags
CREATE TABLE tags (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT UNIQUE NOT NULL,
  slug  TEXT UNIQUE NOT NULL,
  count INTEGER DEFAULT 0                      -- denormalized for performance
);

CREATE TABLE prompt_tags (
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  tag_id    UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (prompt_id, tag_id)
);

-- Users
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  username        TEXT UNIQUE,
  display_name    TEXT,
  avatar_url      TEXT,
  bio             TEXT,
  plan            TEXT DEFAULT 'free',         -- free, pro
  is_creator      BOOLEAN DEFAULT false,
  total_copies    INTEGER DEFAULT 0,
  total_likes     INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Collections (user-curated boards)
CREATE TABLE collections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL,
  description TEXT,
  is_public   BOOLEAN DEFAULT true,
  cover_url   TEXT,
  item_count  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, slug)
);

CREATE TABLE collection_items (
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  prompt_id     UUID REFERENCES prompts(id) ON DELETE CASCADE,
  added_at      TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (collection_id, prompt_id)
);

-- Likes
CREATE TABLE likes (
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  prompt_id  UUID REFERENCES prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, prompt_id)
);

-- Copy events (analytics, no PII)
CREATE TABLE copy_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id  UUID NOT NULL REFERENCES prompts(id),
  user_id    UUID REFERENCES users(id),
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Comments
CREATE TABLE comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id   UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  image_url   TEXT,                            -- user's result image
  parent_id   UUID REFERENCES comments(id),   -- replies
  likes       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Scraper Sources
CREATE TABLE scrape_sources (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  base_url         TEXT NOT NULL,
  scraper_type     TEXT NOT NULL,              -- api, html, reddit
  is_active        BOOLEAN DEFAULT true,
  last_scraped_at  TIMESTAMPTZ,
  prompts_scraped  INTEGER DEFAULT 0,
  config           JSONB                       -- per-source config
);
```

### Key Indexes

```sql
CREATE INDEX idx_prompts_category     ON prompts(category);
CREATE INDEX idx_prompts_ai_tool      ON prompts(ai_tool);
CREATE INDEX idx_prompts_approved     ON prompts(is_approved) WHERE is_approved = true;
CREATE INDEX idx_prompts_trending     ON prompts(likes_count DESC, copies DESC);
CREATE INDEX idx_prompts_created      ON prompts(created_at DESC);
CREATE INDEX idx_prompts_search       ON prompts USING GIN(to_tsvector('english', title || ' ' || prompt_text));
CREATE INDEX idx_prompt_tags_tag      ON prompt_tags(tag_id);
CREATE INDEX idx_collections_user     ON collections(user_id);
CREATE INDEX idx_likes_prompt         ON likes(prompt_id);
CREATE INDEX idx_copy_events_prompt   ON copy_events(prompt_id, created_at);
```

---

## 12. API Design

### REST API Endpoints

```
GET  /api/prompts                     → List prompts (paginated, filterable)
GET  /api/prompts/trending            → Trending prompts (weekly score)
GET  /api/prompts/new                 → Newest prompts
GET  /api/prompts/:slug               → Single prompt by slug
POST /api/prompts/:id/copy            → Record copy event + return prompt text
POST /api/prompts/:id/like            → Toggle like (auth required)
POST /api/prompts/:id/save            → Save to collection (auth required)
POST /api/prompts                     → Submit new prompt (auth required)

GET  /api/categories                  → List all categories with counts
GET  /api/tags/popular                → Top 50 tags
GET  /api/search?q=...               → Full-text search

GET  /api/collections                 → Public collections
GET  /api/collections/:slug           → Single collection
POST /api/collections                 → Create collection (auth required)
POST /api/collections/:id/items       → Add prompt to collection

GET  /api/users/:username             → Public user profile
GET  /api/me                          → Current user data (auth required)

GET  /api/prompts/:id/comments        → Get comments
POST /api/prompts/:id/comments        → Post comment (auth required)
```

### Query Params for `/api/prompts`

```
category=portrait
tool=midjourney
style=cinematic
aspect_ratio=9:16
mood=dark
sort=trending|newest|most_liked|most_copied
page=1
limit=20 (max 50)
search=...
```

---

## 13. Tech Stack

### Frontend

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSR/SSG for SEO, React Server Components |
| Language | **TypeScript** | Type safety, better DX |
| Styling | **Tailwind CSS v4** | Utility-first, fast iteration |
| Components | **shadcn/ui** + **21st.dev** | Headless + beautiful, Gen-Z components |
| Animations | **Motion** (Framer Motion v11) | Best-in-class React animations |
| Bottom sheet | **Vaul** | Native-feel mobile drawers |
| State | **Zustand** | Simple, fast global state |
| Data fetching | **TanStack Query (React Query)** | Caching, infinite scroll, optimistic UI |
| Forms | **React Hook Form** + **Zod** | Validation + type safety |
| Search UI | **cmdk** | cmd+K search palette |
| Image | **Next.js Image** + blur hash | LQIP placeholders, CDN optimization |
| Fonts | **next/font** (Cal Sans, Inter, JetBrains Mono) | Zero layout shift |
| Design QA | **Impeccable** | Anti-pattern detection before shipping |

### Backend

| Layer | Technology | Why |
|---|---|---|
| API | Next.js API Routes (Edge Runtime) | Co-located with frontend, fast |
| Database | **PostgreSQL** via **Supabase** | Full-text search, Row Level Security |
| Auth | **Supabase Auth** + Google OAuth | One-click setup, handles sessions |
| Cache | **Upstash Redis** | Edge-compatible, rate limiting, trending cache |
| CDN / Images | **Cloudflare R2** + **Cloudflare Images** | Cheap storage, global CDN, resizing |
| Email | **Resend** | Developer-friendly transactional email |

### Scraper

| Component | Technology |
|---|---|
| Language | Python 3.11 |
| HTTP client | `httpx` (async) |
| JS sites | `playwright` headless |
| Queue | BullMQ + Upstash Redis |
| Classification | Claude Haiku API |
| Image processing | Pillow + `sharp` |
| Hosting | Railway.app |

### DevOps

| Tool | Purpose |
|---|---|
| Vercel | Frontend hosting (zero config, edge network) |
| Railway | Scraper worker hosting |
| GitHub Actions | CI/CD — type check, lint, deploy |
| Sentry | Error monitoring |
| PostHog | Product analytics (free, self-hostable) |
| Uptime Robot | Uptime monitoring |

---

## 14. SEO Strategy

### Technical SEO

- **Individual prompt pages** at `/p/[slug]` — each prompt is a unique, indexable page
- **Dynamic metadata** per page: `<title>`, `<meta description>`, Open Graph, Twitter Card
- **OG image** = the primary prompt image (auto-generated with prompt title overlay)
- **Sitemap** auto-generated: `/sitemap.xml` with all prompts, categories, collections
- **robots.txt** — allow all, disallow /api
- **Structured data** (JSON-LD): `ImageObject`, `HowTo` schema for prompts
- **Core Web Vitals** target: LCP < 2.5s, CLS < 0.1, FID < 100ms
- **No JavaScript required** for first paint (RSC + SSR)

### Content SEO

| Target Keyword | Page | Monthly Volume (est.) |
|---|---|---|
| midjourney portrait prompts | /category/portrait + /tool/midjourney | 8,000 |
| AI image prompts for reels | /category/reels | 5,000 |
| stable diffusion prompts | /tool/stable-diffusion | 12,000 |
| cinematic AI prompts | /category/cinematic | 3,000 |
| anime AI art prompts | /category/anime | 6,000 |
| DALL-E 3 prompts | /tool/dall-e | 4,000 |
| best midjourney prompts india | /blog/... | 1,500 |

### Blog Strategy (SEO Articles)
- "50 Best Midjourney Prompts for Instagram Reels 2026"
- "How to Write AI Image Prompts for Indian Aesthetics"
- "Complete Guide to DALL-E 3 Prompts for Beginners"
- "Midjourney v7 Prompts: What Changed + Best Examples"
- "AI Portrait Prompts: 30 Cinematic Examples with Results"

---

## 15. Monetization Strategy

### Tier 1 — Free (0 friction, maximum users)
- Browse all prompts
- Copy up to 20 prompts/day
- Basic search + filter
- Like and save (account required)
- 3 public collections

### Tier 2 — Creator (Free with account)
- Unlimited copies
- Unlimited collections (public/private)
- Download prompt result images (watermarked)
- Submit community prompts
- Comment and rate

### Tier 3 — Pro (₹199/month or ₹1499/year)
- Exclusive premium prompt packs
- No watermarks on downloads
- Early access to new prompts
- Bulk export (CSV/JSON)
- API access (1000 req/day)
- Creator badge + profile highlight

### Revenue Streams

| Stream | Description | Target Revenue |
|---|---|---|
| Pro subscriptions | ₹199/mo recurring | Primary |
| Prompt packs | One-time ₹99–₹499 themed bundles | Secondary |
| Sponsored prompts | Brand-specific prompts (e.g., "Made with Adobe Firefly") | Tertiary |
| Creator marketplace | Power users sell premium packs (70/30 split) | Phase 2 |
| API licensing | B2B access for apps/tools | Phase 2 |
| Newsletter ads | Sponsored slots in weekly digest | Phase 3 |

---

## 16. Performance Requirements

| Metric | Target | Tool |
|---|---|---|
| Time to First Byte (TTFB) | < 200ms | Vercel Edge |
| Largest Contentful Paint (LCP) | < 2.5s | Next.js Image + CDN |
| Cumulative Layout Shift (CLS) | < 0.05 | Blur placeholders + fixed aspect ratios |
| First Input Delay (FID) | < 50ms | RSC + minimal JS |
| Bundle size (JS) | < 150kb gzipped | Tree-shaking + RSC |
| Image format | WebP / AVIF | Cloudflare Images |
| API response time (p95) | < 300ms | Supabase + Redis cache |
| Infinite scroll next page load | < 500ms | TanStack Query prefetch |
| Search results (instant) | < 200ms | Algolia or pg_trgm |
| Mobile Lighthouse score | > 90 | All of the above |

### Caching Strategy
- Trending prompts: Redis cache, TTL 1 hour
- Category pages: ISR (Incremental Static Regeneration), revalidate every 10 minutes
- Individual prompt pages: ISR, revalidate every 1 hour
- User data: TanStack Query, stale-while-revalidate

---

## 17. Development Roadmap

### Phase 0 — Setup (Week 1)
- [ ] Next.js 15 project init with TypeScript + Tailwind
- [ ] Supabase project setup (DB + Auth)
- [ ] Cloudflare R2 bucket setup
- [ ] Deploy to Vercel (CI/CD via GitHub Actions)
- [ ] Google OAuth configured
- [ ] Run Impeccable on current site to document all design issues

### Phase 1 — Core Redesign (Weeks 2–4)
- [ ] Design system: colors, typography, spacing tokens in Tailwind config
- [ ] New prompt card component with hover animations (Motion)
- [ ] Masonry grid layout (4-col desktop, 2-col mobile)
- [ ] Homepage: hero search bar + category pills + AI tool tabs
- [ ] Explore page: filter bar + infinite scroll grid
- [ ] Individual prompt page with copy button
- [ ] Basic search (PostgreSQL full-text)
- [ ] Migrate existing 48 prompts to new DB
- [ ] Mobile bottom navigation bar

### Phase 2 — Content & Scraping (Weeks 5–7)
- [ ] Lexica.art scraper (API) — target 1,000 prompts
- [ ] Civitai.com scraper (API) — target 1,000 prompts
- [ ] Reddit scraper (r/midjourney, r/AIArt) — target 500 prompts
- [ ] Claude Haiku auto-classifier pipeline
- [ ] Image download + CDN upload pipeline
- [ ] Admin dashboard: review queue, approve/reject
- [ ] Tag system + category pages
- [ ] Trending algorithm + trending page

### Phase 3 — Community (Weeks 8–10)
- [ ] Google OAuth login flow
- [ ] Like / save functionality (optimistic UI)
- [ ] Collections (create, manage, share)
- [ ] User profile pages
- [ ] Community prompt submission form
- [ ] Comments system
- [ ] Share sheet (WhatsApp, X, Instagram, Copy Link)
- [ ] Toast notifications + like animations

### Phase 4 — Growth & SEO (Weeks 11–12)
- [ ] Dynamic OG images per prompt (Vercel OG)
- [ ] Sitemap generation
- [ ] Structured data (JSON-LD)
- [ ] Blog section + first 5 SEO articles
- [ ] Email newsletter (Resend + signup form)
- [ ] Weekly digest email automation
- [ ] PostHog analytics integration
- [ ] Lighthouse audit + performance pass

### Phase 5 — Monetization (Weeks 13–16)
- [ ] Pro tier subscription (Razorpay for Indian users)
- [ ] Prompt pack landing pages
- [ ] Premium prompt flag + paywall UI
- [ ] API key management for Pro users
- [ ] Creator dashboard (submitted prompt analytics)

---

## 18. Open Questions

1. **Domain:** Keep `prompty.in` or consider `promptly.in` / `aiprompts.in` for clarity?
2. **Hindi prompts:** Auto-translate top prompts to Hindi or let community submit? Both?
3. **NSFW policy:** Strict SFW-only (safer for brand + India) or separate SFW/NSFW toggle?
4. **Scraping ToS:** Lexica and Civitai allow API use but ToS varies — need legal review before scraping PromptBase
5. **Storage costs:** At 5,000 prompts × avg 3 images × 500kb avg = ~7.5GB. Cloudflare R2 is $0.015/GB — negligible. Scale plan?
6. **Mobile app:** React Native / Expo app after web launch? (Large distribution opportunity via Play Store / App Store)
7. **AI tool of the month:** Partner with Midjourney / Adobe Firefly for sponsored content?

---

## Appendix A — Key Libraries & Skills

| Library/Skill | Purpose | Install |
|---|---|---|
| Motion | Animations (heart burst, page transitions, stagger) | `npm install motion` |
| shadcn/ui | Base component library (button, modal, tabs) | `npx shadcn@latest init` |
| 21st.dev | Advanced UI blocks (hero, cards, grids) | Copy from site |
| Vaul | Mobile bottom sheets / drawers | `npm install vaul` |
| Impeccable | Design anti-pattern audit | `npx skills add pbakaus/impeccable` |
| TanStack Query | Data fetching, infinite scroll, cache | `npm install @tanstack/react-query` |
| cmdk | cmd+K search palette | `npm install cmdk` |
| Zustand | Global state (filters, user session) | `npm install zustand` |
| React Hook Form | Form validation | `npm install react-hook-form zod` |
| Supabase JS | DB + auth client | `npm install @supabase/supabase-js` |
| Upstash Redis | Edge caching + rate limiting | `npm install @upstash/redis` |

---

*Document Owner: Vijith | Next Review: After Phase 1 completion*
