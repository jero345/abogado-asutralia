-- ───────────────────────────────────────────────────────────────────
-- Forms admin migration
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query → Run).
-- Safe to re-run.
-- ───────────────────────────────────────────────────────────────────

-- 1) Allow the two new form types on registrations.
--    Without this, submissions from the S&P CDO (claim-detailed) form and the
--    investigation mini-forms (mini-interest) are REJECTED on insert.
alter table public.registrations
  drop constraint if exists registrations_form_type_check;

alter table public.registrations
  add constraint registrations_form_type_check check (form_type in (
    'shareholder',
    'investment-detailed',
    'investment-interest',
    'claim-detailed',
    'mini-interest',
    'vehicle'
  ));

-- 2) Let the admin assign a registration form to a case from the Case editor.
--    `form_type` null = the case has no online form (or uses the code default).
alter table public.cases
  add column if not exists form_type text;

alter table public.cases
  add column if not exists form_notify_email text;
