# Panduan Deploy ke Vercel

## 📋 Persiapan

### 1. Buat Akun GitHub
- Buka: https://github.com/signup
- Isi data diri dan verifikasi email
- **Catat username GitHub Anda**

### 2. Buat Akun Vercel (Connect dengan GitHub)
- Buka: https://vercel.com/signup
- Klik "Continue with GitHub"
- Authorize Vercel untuk akses GitHub Anda
- Selesai setup

## 🚀 Deployment Steps

### Langkah 1: Push Code ke GitHub

Jalankan command di folder `sales-app`:
```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@anda.com"
git add .
git commit -m "Initial commit - sales app"
git branch -M main
git remote add origin https://github.com/USERNAME/sales-app.git
git push -u origin main
```

**Ganti `USERNAME` dengan username GitHub Anda**

### Langkah 2: Import Project ke Vercel
1. Buka https://vercel.com/dashboard
2. Klik "Add New" → "Project"
3. Pilih repository "sales-app" dari GitHub
4. Klik "Import"

### Langkah 3: Setup Environment Variables
Di Vercel dashboard, saat setup project:
1. Buka "Environment Variables"
2. Tambahkan 2 variable:
   - **Name**: `REACT_APP_SUPABASE_URL`
   - **Value**: `https://ahkcpispxbejwwrqlgqf.supabase.co`
   
   - **Name**: `REACT_APP_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoa2NwaXNweGJland3cnFsZ3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjYyNjcsImV4cCI6MjA4ODY0MjI2N30.X_eQPnwjPA6nMP6ixXAPshhg3500cAWHjIEBIrDwCQw`

3. Klik "Deploy"

### Langkah 4: Akses Aplikasi
- Vercel otomatis generate URL domain
- Format: `https://sales-app-xyz.vercel.app`
- Deploy biasanya selesai dalam 2-5 menit

## ✅ Testing dari Handphone

1. Tunggu deployment selesai (status "Ready")
2. Copy domain URL dari Vercel
3. Buka di handphone (pastikan terhubung WiFi/internet)
4. Test semua fitur:
   - Harga Produk
   - Modal
   - Catat Penjualan
   - Laporan

## 🔧 Update Aplikasi di Masa Depan

Setiap kali Anda edit code:
```bash
git add .
git commit -m "Deskripsi perubahan"
git push
```

Vercel otomatis deploy ulang!

## 📞 Support

Jika ada error saat deployment:
1. Cek di Vercel dashboard → Deployments → lihat logs
2. Pastikan `npm install` berjalan tanpa error
3. Pastikan semua environment variables terisi dengan benar

---

**Catatan Penting**: Database Supabase sudah online, jadi data akan tersimpan di cloud dan dapat diakses dari mana saja!
