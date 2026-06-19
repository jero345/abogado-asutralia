-- ───────────────────────────────────────────────────────────────────
-- Focus keyphrase for the SEO assistant (Yoast-style analysis)
-- Run in Supabase → SQL Editor → New query → Run.  Safe to re-run.
-- ───────────────────────────────────────────────────────────────────

alter table public.articles add column if not exists seo_keyphrase text;
alter table public.cases    add column if not exists seo_keyphrase text;
