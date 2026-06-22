# Setup Supabase — Mew CRM

## Step 1 — Isi file .env

```
VITE_SUPABASE_URL=https://kvudisdwhyegtjsvlstf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_pqTFqHOBqmSEZmQNg_EF4Q_vVOopib2
```

---

## Step 2 — Jalankan SQL di Supabase → SQL Editor

```sql
-- ── TABEL 1: profiles (akun ADMIN CRM) ───────────────────────────────
create table public.profiles (
  id         uuid primary key default gen_random_uuid(),
  full_name  text,
  email      text,
  password   text,
  role       text default 'admin',
  created_at timestamptz default now()
);
alter table public.profiles disable row level security;


-- ── TABEL 2: members (akun MEMBER / pelanggan umum) ──────────────────
-- Terhubung ke auth.users Supabase saat daftar lewat /daftar
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

---

## Step 3 — Matikan Email Confirmation

Supabase → Authentication → Providers → Email
→ Matikan toggle **"Confirm email"**

---

## Step 4 — Struktur Halaman & Route

| Route       | Halaman              | Akses  | Keterangan                          |
|-------------|----------------------|--------|-------------------------------------|
| `/`         | Landing Page         | Publik | Halaman utama guest                 |
| `/promo`    | Promo & Benefit      | Publik | Promo dari data admin               |
| `/daftar`   | MemberRegister       | Publik | Daftar akun member baru             |
| `/masuk`    | MemberLogin          | Publik | Login member                        |
| `/member`   | MemberHome           | Member | Beranda akun member                 |
| `/login`    | Login Admin          | Publik | Login admin CRM                     |
| `/register` | Register Admin       | Publik | Daftar akun admin                   |
| `/dashboard`| Dashboard Admin      | Admin  | Semua halaman CRUD admin            |

---

## Step 5 — Jalankan project

```
npm run dev
```
