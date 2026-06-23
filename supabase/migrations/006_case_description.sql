-- ───────────────────────────────────────────────────────────────────
-- Case "Description" — the rich-text intro shown on the /class-actions
-- listing card (separate from the full Case body and the short summary).
-- Run in Supabase → SQL Editor → New query → Run.  Safe to re-run.
-- ───────────────────────────────────────────────────────────────────

alter table public.cases add column if not exists description text;
