create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "Site content is publicly readable"
  on public.site_content for select to anon, authenticated using (true);
create policy "Anyone can update site content"
  on public.site_content for update to anon, authenticated using (true) with check (true);
create policy "Anyone can insert site content"
  on public.site_content for insert to anon, authenticated with check (true);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  requirement text not null,
  budget text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  source text default 'lead_gate',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Anyone can insert leads"
  on public.leads for insert to anon, authenticated with check (true);
create policy "Leads readable"
  on public.leads for select to anon, authenticated using (true);

insert into storage.buckets (id, name, public)
values ('venus-media', 'venus-media', true);

create policy "Public read venus-media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'venus-media');
create policy "Anyone can upload venus-media"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'venus-media');
create policy "Anyone can update venus-media"
  on storage.objects for update to anon, authenticated
  using (bucket_id = 'venus-media');
create policy "Anyone can delete venus-media"
  on storage.objects for delete to anon, authenticated
  using (bucket_id = 'venus-media');

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger site_content_touch
before update on public.site_content
for each row execute function public.touch_updated_at();