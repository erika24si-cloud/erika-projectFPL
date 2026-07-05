create table public.members (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  email      text,
  tier       text default 'Silver',
  phone      text,
  created_at timestamptz default now()
);
alter table public.members disable row level security;


-- ── TABEL 3: customers (data pelanggan klinik hewan) ─────────────────
create table public.customers (
  id           uuid primary key default gen_random_uuid(),
  nama_lengkap text,
  email        text,
  nomor_hp     text,
  nama_hewan   text,
  jenis_hewan  text,
  created_at   timestamptz default now()
);
alter table public.customers disable row level security;
```
