-- Banton Group — blog admin schema
-- Run this once in your Supabase project SQL Editor.
-- Dashboard → SQL Editor → New query → paste → Run.

-- ───────────────────────────────────────────────
-- Articles table
-- ───────────────────────────────────────────────
create table if not exists public.articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  date         date not null default current_date,
  excerpt      text not null default '',
  category     text,
  author       text,
  source_name  text,
  source_url   text,
  cover_image  text,
  content      jsonb not null default '[]'::jsonb,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists articles_date_desc_idx on public.articles (date desc);
create index if not exists articles_published_idx on public.articles (published);

-- Auto-update updated_at on every UPDATE
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────────
-- Row Level Security
-- Public can READ published articles.
-- Only authenticated users (admin) can INSERT / UPDATE / DELETE.
-- ───────────────────────────────────────────────
alter table public.articles enable row level security;

drop policy if exists "Public read published"     on public.articles;
drop policy if exists "Authenticated read all"    on public.articles;
drop policy if exists "Authenticated can insert"  on public.articles;
drop policy if exists "Authenticated can update"  on public.articles;
drop policy if exists "Authenticated can delete"  on public.articles;

create policy "Public read published"
  on public.articles for select
  using (published = true);

create policy "Authenticated read all"
  on public.articles for select
  to authenticated
  using (true);

create policy "Authenticated can insert"
  on public.articles for insert
  to authenticated
  with check (true);

create policy "Authenticated can update"
  on public.articles for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete"
  on public.articles for delete
  to authenticated
  using (true);
