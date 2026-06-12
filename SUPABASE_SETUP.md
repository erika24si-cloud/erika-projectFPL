# Setup Supabase — Mew CRM (Sesuai Modul Pertemuan 13)

## Step 1 — Isi file .env

```
VITE_SUPABASE_URL=https://kvudisdwhyegtjsvlstf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_pqTFqHOBqmSEZmQNg_EF4Q_vVOopib2
```

---

## Step 2 — Jalankan SQL berikut di Supabase → SQL Editor

```sql
-- ── TABEL 1: profiles (akun user/admin CRM) ──────────────────────────────
create table public.profiles (
  id         uuid primary key default gen_random_uuid(),
  full_name  text,
  email      text,
  password   text,
  role       text default 'admin',
  created_at timestamptz default now()
);

-- Matikan RLS sesuai modul
alter table public.profiles disable row level security;


-- ── TABEL 2: customers (pelanggan klinik hewan) ───────────────────────────
create table public.customers (
  id           uuid primary key default gen_random_uuid(),
  nama_lengkap text,
  email        text,
  nomor_hp     text,
  nama_hewan   text,
  jenis_hewan  text,
  created_at   timestamptz default now()
);

-- Matikan RLS sesuai modul
alter table public.customers disable row level security;
```

---

## Step 3 — Matikan Email Confirmation

Supabase → Authentication → Providers → Email
→ Matikan toggle "Confirm email"

---

## Step 4 — Struktur halaman

| Halaman          | Tabel Supabase | Keterangan                        |
|------------------|---------------|-----------------------------------|
| /users           | profiles      | CRUD akun admin/user CRM          |
| /customers       | customers     | CRUD pelanggan klinik hewan       |
| /login           | auth.users    | Login via Supabase Auth           |
| /register        | auth.users    | Register via Supabase Auth        |

---

## Step 5 — Jalankan project

```
npm run dev
```
