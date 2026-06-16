-- ───────────────────────────────────────────────────────────────────
-- Form builder migration  (supersedes 002 — safe to run on its own)
-- Run in Supabase → SQL Editor → New query → Run.  Safe to re-run.
-- ───────────────────────────────────────────────────────────────────

-- A) registrations.form_type: drop the strict IN-list so the built-in form
--    types AND admin-built custom forms ('custom:<id>') are all accepted.
alter table public.registrations
  drop constraint if exists registrations_form_type_check;

-- B) cases: admin-assignable form (built-in type, 'custom:<form id>', or 'formstack').
alter table public.cases add column if not exists form_type text;
alter table public.cases add column if not exists form_notify_email text;
-- Formstack embed URL, used when form_type = 'formstack'.
alter table public.cases add column if not exists formstack_url text;

-- C) custom forms built in the admin form builder.
create table if not exists public.forms (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text not null default '',
  notify_email  text,
  fields        jsonb not null default '[]'::jsonb,  -- [{name,label,type,required,options?}]
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists trg_forms_updated_at on public.forms;
create trigger trg_forms_updated_at
  before update on public.forms
  for each row execute function public.set_updated_at();

alter table public.forms enable row level security;

drop policy if exists "Public read forms"        on public.forms;
drop policy if exists "Authenticated manage forms" on public.forms;

-- Public read so the renderer can load a form on the public /register page.
create policy "Public read forms"
  on public.forms for select
  using (true);

create policy "Authenticated manage forms"
  on public.forms for all
  to authenticated using (true) with check (true);
