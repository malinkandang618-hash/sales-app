# SETUP DATABASE SUPABASE

## Step 1: Daftar Supabase
1. Buka https://supabase.com
2. Klik "Sign Up"
3. Gunakan Google atau Email
4. Verifikasi email

## Step 2: Buat Project
1. Klik "New Project"
2. Isi nama project: `sales-app`
3. Isi password database
4. Pilih region terdekat (Asia Tenggara - Singapore)
5. Klik "Create new project" 
6. Tunggu ~2 menit sampai selesai

## Step 3: Buat Tabel - PRODUCTS
1. Di dashboard Supabase, buka **SQL Editor** (sidebar kiri)
2. Klik **New Query**
3. Paste code ini:
```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
4. Klik **Run** (atau Ctrl+Enter)

## Step 4: Buat Tabel - MODALS
Paste code ini di SQL Editor baru:
```sql
CREATE TABLE modals (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  description TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Step 5: Buat Tabel - SALES
Paste code ini:
```sql
CREATE TABLE sales (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id BIGINT NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  date DATE NOT NULL,
  buyer_name TEXT NOT NULL,
  address TEXT NOT NULL,
  shipping_cost DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Step 6: Ambil API Key & URL
1. Di dashboard, klik **Settings** (gear icon)
2. Pilih **API** di sidebar
3. **Copy:**
   - `Project URL` → Paste sebagai `REACT_APP_SUPABASE_URL`
   - `anon public` key → Paste sebagai `REACT_APP_SUPABASE_ANON_KEY`

## Step 7: Masukkan Key ke Aplikasi
Edit file `.env.local` di folder `sales-app`:
```
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJ0...xxxxx
```

## Step 8: Restart Aplikasi
```bash
npm start
```

## Step 9: Test Aplikasi
1. Buka http://localhost:3000
2. Tambah produk, modal, penjualan
3. Data akan otomatis tersimpan di Supabase

## BONUS: Lihat Data di Dashboard
1. Dashboard Supabase → **Table Editor**
2. Pilih tabel `products`, `modals`, atau `sales`
3. Semua data yang kamu input akan terlihat di sini

---

**Jika ada error:**
- Cek apakah API key sudah benar
- Pastikan koneksi internet lancar
- Buka Console (F12) untuk melihat error detail

**Aplikasi punya fallback:** Jika Supabase offline, aplikasi tetap bekerja pakai localStorage.
