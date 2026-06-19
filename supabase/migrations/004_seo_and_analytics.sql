-- ───────────────────────────────────────────────────────────────────
-- SEO + Analytics migration
-- Run in Supabase → SQL Editor → New query → Run.  Safe to re-run.
--
-- Adds:
--   • seo_settings  — per-route SEO (title, description, OG, canonical…)
--   • site_settings — single-row global config (Google Analytics id, defaults)
-- ───────────────────────────────────────────────────────────────────

-- ── A) Per-route SEO ──────────────────────────────────────────────
create table if not exists public.seo_settings (
  id           uuid primary key default gen_random_uuid(),
  path         text not null unique,        -- '/', '/about', '/class-actions' …
  title        text,
  description  text,
  keywords     text,
  og_image     text,
  canonical    text,
  noindex      boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists trg_seo_settings_updated_at on public.seo_settings;
create trigger trg_seo_settings_updated_at
  before update on public.seo_settings
  for each row execute function public.set_updated_at();

alter table public.seo_settings enable row level security;

drop policy if exists "Public read seo"          on public.seo_settings;
drop policy if exists "Authenticated manage seo" on public.seo_settings;

-- Public read so the site can apply meta tags for every visitor.
create policy "Public read seo"
  on public.seo_settings for select using (true);

create policy "Authenticated manage seo"
  on public.seo_settings for all
  to authenticated using (true) with check (true);

-- ── B) Global site settings (single row, id = 1) ──────────────────
create table if not exists public.site_settings (
  id                  smallint primary key default 1,
  ga_measurement_id   text,                  -- Google Analytics 4 id, e.g. 'G-XXXXXXXXXX'
  default_title       text,
  title_suffix        text,                  -- appended to per-page titles, e.g. ' | Banton Group'
  default_description text,
  default_og_image    text,
  updated_at          timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

-- Ensure the single row exists.
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "Public read site settings"          on public.site_settings;
drop policy if exists "Authenticated manage site settings" on public.site_settings;

-- Public read so the site can load the GA id + default meta on first paint.
create policy "Public read site settings"
  on public.site_settings for select using (true);

create policy "Authenticated manage site settings"
  on public.site_settings for all
  to authenticated using (true) with check (true);
