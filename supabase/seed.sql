-- ============================================================
-- Prompty.in — Seed Data (8 prompts from Phase 1 mock data)
-- Run after 001_initial_schema.sql
-- ============================================================

-- Tags
insert into public.tags (id, name, slug, count) values
  ('t1000000-0000-0000-0000-000000000001', 'bollywood',  'bollywood',  320),
  ('t1000000-0000-0000-0000-000000000002', 'cyberpunk',  'cyberpunk',  210),
  ('t1000000-0000-0000-0000-000000000003', 'ghibli',     'ghibli',     150),
  ('t1000000-0000-0000-0000-000000000004', 'warrior',    'warrior',    98),
  ('t1000000-0000-0000-0000-000000000005', 'product',    'product',    76),
  ('t1000000-0000-0000-0000-000000000006', 'india',      'india',      430),
  ('t1000000-0000-0000-0000-000000000007', '3d',         '3d',         88),
  ('t1000000-0000-0000-0000-000000000008', 'editorial',  'editorial',  120)
on conflict (slug) do nothing;

-- Prompts
insert into public.prompts
  (id, slug, title, prompt_text, prompt_hash, ai_tool, category, style, mood, aspect_ratio,
   is_premium, is_nsfw, is_approved, views, copies, likes_count, saves_count, created_at)
values
  (
    'p1000000-0000-0000-0000-000000000001',
    'cinematic-indian-woman-portrait',
    'Cinematic Indian Woman Portrait',
    'A stunning Indian woman, traditional silk saree in deep jewel tones, golden hour light, cinematic bokeh background, Bollywood aesthetic, hyperrealistic, shot on Hasselblad, 85mm lens, f/1.4, warm tones --ar 4:5 --v 6.1 --style raw',
    'hash1', 'midjourney', 'portrait', 'cinematic', 'warm', '4:5',
    false, false, true, 12400, 3200, 841, 290,
    now() - interval '2 days'
  ),
  (
    'p1000000-0000-0000-0000-000000000002',
    'neon-cyberpunk-cityscape-reels',
    'Neon Cyberpunk Cityscape for Reels',
    'Futuristic Mumbai skyline, neon lights reflecting on wet streets, cyberpunk aesthetic, rain, night time, ultra detailed, cinematic lighting, 9:16 vertical format, vibrant pink and blue neons --ar 9:16 --v 6.1',
    'hash2', 'midjourney', 'reels', 'neon', 'neon', '9:16',
    false, false, true, 9800, 4100, 612, 180,
    now() - interval '3 days'
  ),
  (
    'p1000000-0000-0000-0000-000000000003',
    'anime-girl-cherry-blossoms',
    'Anime Girl Under Cherry Blossoms',
    'Beautiful anime girl standing under cherry blossom tree, Studio Ghibli style, soft pastel colors, gentle breeze, petals falling, magical atmosphere, detailed eyes, flowing hair, spring season --ar 1:1 --niji 6',
    'hash3', 'midjourney', 'anime', 'anime', 'pastel', '1:1',
    false, false, true, 15200, 5600, 1240, 420,
    now() - interval '5 days'
  ),
  (
    'p1000000-0000-0000-0000-000000000004',
    'dark-fantasy-warrior-woman',
    'Dark Fantasy Warrior Woman',
    'Epic dark fantasy female warrior, ornate black armor with gold filigree, glowing runes, dramatic volumetric lighting, cinematic composition, ultra detailed, octane render, 8K resolution --ar 4:5 --v 6.1 --style raw',
    'hash4', 'dalle', 'fantasy', 'cinematic', 'dark', '4:5',
    true, false, true, 8700, 2100, 534, 198,
    now() - interval '1 day'
  ),
  (
    'p1000000-0000-0000-0000-000000000005',
    'minimalist-product-photography',
    'Minimalist Product Photography',
    'Luxury perfume bottle on white marble surface, soft studio lighting, reflections, minimalist composition, commercial photography style, ultra clean, 4K --ar 1:1',
    'hash5', 'dalle', 'product', 'minimal', 'cool', '1:1',
    false, false, true, 6300, 1800, 312, 145,
    now() - interval '7 days'
  ),
  (
    'p1000000-0000-0000-0000-000000000006',
    'watercolor-taj-mahal-sunrise',
    'Watercolor Taj Mahal at Sunrise',
    'Taj Mahal at golden sunrise, watercolor painting style, soft brushstrokes, warm amber and pink sky, reflection in Yamuna river, impressionist style, highly detailed --ar 16:9',
    'hash6', 'stable_diffusion', 'indian', 'watercolor', 'warm', '16:9',
    false, false, true, 18900, 6200, 1580, 520,
    now() - interval '10 days'
  ),
  (
    'p1000000-0000-0000-0000-000000000007',
    'stable-diffusion-3d-character',
    '3D Stylized Game Character',
    'Stylized 3D game character, Indian mythological warrior, Unreal Engine 5 render, PBR materials, rim lighting, heroic pose, detailed armor, cinematic shot --ar 4:5',
    'hash7', 'stable_diffusion', 'fantasy', '3d', 'vibrant', '4:5',
    false, false, true, 7200, 2400, 445, 167,
    now() - interval '4 days'
  ),
  (
    'p1000000-0000-0000-0000-000000000008',
    'flux-fashion-editorial',
    'High-Fashion Editorial Portrait',
    'High fashion editorial portrait, Indian model, contemporary fusion wear, dramatic studio lighting, Vogue India aesthetic, bold makeup, architectural background, shot on Phase One --ar 4:5',
    'hash8', 'flux', 'fashion', 'cinematic', 'vibrant', '4:5',
    true, false, true, 11200, 3800, 892, 310,
    now() - interval '6 days'
  )
on conflict (slug) do nothing;

-- Images
insert into public.prompt_images (id, prompt_id, image_url, cdn_url, is_primary, width, height) values
  ('i1', 'p1000000-0000-0000-0000-000000000001', 'https://picsum.photos/seed/portrait1/400/500',  'https://picsum.photos/seed/portrait1/400/500',  true, 400, 500),
  ('i2', 'p1000000-0000-0000-0000-000000000002', 'https://picsum.photos/seed/reels2/360/640',    'https://picsum.photos/seed/reels2/360/640',    true, 360, 640),
  ('i3', 'p1000000-0000-0000-0000-000000000003', 'https://picsum.photos/seed/anime3/400/400',    'https://picsum.photos/seed/anime3/400/400',    true, 400, 400),
  ('i4', 'p1000000-0000-0000-0000-000000000004', 'https://picsum.photos/seed/fantasy4/400/500',  'https://picsum.photos/seed/fantasy4/400/500',  true, 400, 500),
  ('i5', 'p1000000-0000-0000-0000-000000000005', 'https://picsum.photos/seed/product5/400/400',  'https://picsum.photos/seed/product5/400/400',  true, 400, 400),
  ('i6', 'p1000000-0000-0000-0000-000000000006', 'https://picsum.photos/seed/india6/640/360',    'https://picsum.photos/seed/india6/640/360',    true, 640, 360),
  ('i7', 'p1000000-0000-0000-0000-000000000007', 'https://picsum.photos/seed/char7/400/500',     'https://picsum.photos/seed/char7/400/500',     true, 400, 500),
  ('i8', 'p1000000-0000-0000-0000-000000000008', 'https://picsum.photos/seed/fashion8/400/500',  'https://picsum.photos/seed/fashion8/400/500',  true, 400, 500)
on conflict do nothing;

-- Prompt ↔ Tag links
insert into public.prompt_tags (prompt_id, tag_id) values
  ('p1000000-0000-0000-0000-000000000001', 't1000000-0000-0000-0000-000000000001'),
  ('p1000000-0000-0000-0000-000000000002', 't1000000-0000-0000-0000-000000000002'),
  ('p1000000-0000-0000-0000-000000000003', 't1000000-0000-0000-0000-000000000003'),
  ('p1000000-0000-0000-0000-000000000004', 't1000000-0000-0000-0000-000000000004'),
  ('p1000000-0000-0000-0000-000000000005', 't1000000-0000-0000-0000-000000000005'),
  ('p1000000-0000-0000-0000-000000000006', 't1000000-0000-0000-0000-000000000006'),
  ('p1000000-0000-0000-0000-000000000007', 't1000000-0000-0000-0000-000000000007'),
  ('p1000000-0000-0000-0000-000000000008', 't1000000-0000-0000-0000-000000000008')
on conflict do nothing;

-- Refresh trending scores after seed
select public.refresh_trending_scores();
