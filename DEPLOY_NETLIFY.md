# Panduan Deploy Otomatis ke Netlify

## 📋 Persiapan Awal

### 1. Buat Akun GitHub (jika belum)
- Buka: https://github.com/signup
- Isi data diri dan verifikasi email
- **Catat username GitHub Anda**

### 2. Buat Akun Netlify (Connect dengan GitHub)
- Buka: https://app.netlify.com/signup
- Pilih opsi **"Sign up with GitHub"**
- Authorize Netlify untuk akses ke akun GitHub Anda
- Selesai setup

---

## 🚀 Langkah-Langkah Setup Deployment Otomatis

### Langkah 1: Push Project ke GitHub

Di folder `sales-app`, jalankan perintah:

```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@anda.com"
git add .
git commit -m "Initial commit - Sales App"
git branch -M main
git remote add origin https://github.com/USERNAME/sales-app.git
git push -u origin main
```

**⚠️ Ganti `USERNAME` dengan username GitHub Anda**

---

### Langkah 2: Hubungkan Repository ke Netlify

1. Login ke **Netlify** di https://app.netlify.com/
2. Klik tombol **"Add new site"** (atau **"New site from Git"**)
3. Pilih **GitHub** sebagai Git provider
4. Authorize Netlify dan pilih repository **`sales-app`** dari daftar repo Anda
5. Klik **Import repository**

---

### Langkah 3: Konfigurasi Build Settings

Netlify akan menampilkan form pengaturan build:

| Field | Nilai | Keterangan |
|-------|-------|-----------|
| **Branch to deploy** | `main` | Deploy dari branch utama |
| **Build command** | `npm run build` | Perintah build aplikasi React |
| **Publish directory** | `build` | Folder hasil build yang akan di-host |

✅ **Jangan ada perubahan yang diperlukan** – setting default sudah benar untuk CRA (Create React App).

---

### Langkah 4: Atur Environment Variables

**PENTING:** Sebelum deploy, tambahkan variabel lingkungan Supabase:

1. Di form yang sama, cari bagian **"Environment Variables"** atau **"Environment"**
2. Klik **"Edit variables"**
3. Tambahkan 2 variable baru:

   **Variable 1:**
   - Key: `REACT_APP_SUPABASE_URL`
   - Value: `https://ahkcpispxbejwwrqlgqf.supabase.co`

   **Variable 2:**
   - Key: `REACT_APP_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoa2NwaXNweGJland3cnFsZ3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjYyNjcsImV4cCI6MjA4ODY0MjI2N30.X_eQPnwjPA6nMP6ixXAPshhg3500cAWHjIEBIrDwCQw`

4. Klik **"Save"** atau **"Deploy site"**

---

### Langkah 5: Deploy Pertama Kali

1. Klik tombol **"Deploy site"** (sudut kanan bawah form)
2. Netlify akan **otomatis** menjalankan build process:
   - `npm install` → install dependencies
   - `npm run build` → build aplikasi
   - Deploy ke CDN Netlify
3. Tunggu status berubah menjadi **"Published"** (biasanya 2-5 menit)
4. Netlify akan memberikan **domain publik** (contoh: `https://focused-raman-12345.netlify.app`)

---

## 🔄 Automatic Deployment (Setiap Kali ada Perubahan)

### Alur Otomatis:

```
┌─────────┬──────────┬─────────┐
│ Anda    │ GitHub   │ Netlify │
│ edit    │ push     │ auto    │
│ code    │ commit   │ deploy  │
└─────────┴──────────┴─────────┘
```

### Setiap kali Anda melakukan perubahan:

```bash
# 1. Edit file aplikasi (contoh: src/App.js, src/pages/Home.js, dll)

# 2. Simpan perubahan dan push ke GitHub
git add .
git commit -m "Deskripsi perubahan yang Anda lakukan"
git push origin main

# 3. Netlify OTOMATIS MENDETEKSI PUSH dan:
#    - Menjalankan build
#    - Deploy versi terbaru dalam 1-3 menit
#    - Website Anda sudah live dengan changes terbaru!
```

### Pantau Progress di Netlify Dashboard:

1. Buka https://app.netlify.com/ dan pilih site `sales-app`
2. Lihat tab **"Deploys"** untuk melihat history
3. Setiap push akan menambah entry baru di daftar
4. Status akan berubah: `Building` → `Publishing` → `Published`

---

## 🛠️ Troubleshooting

### ❌ Build Failed?

1. Klik deploy entry yang gagal di tab **"Deploys"**
2. Buka **"Deploy log"** untuk melihat detailnya
3. Kemungkinan penyebab:
   - Syntax error di code → perbaiki dan push lagi
   - Missing environment variable → tambah di **Site settings → Build & deploy → Environment**
   - Module tidak terinstall → pastikan sudah di `package.json`

### ❌ Aplikasi tidak menampilkan data?

- Pastikan environment variables `REACT_APP_SUPABASE_URL` dan `REACT_APP_SUPABASE_ANON_KEY` sudah benar di **Site settings → Build & deploy → Environment**
- Setelah update, Netlify akan otomatis rebuild dan deploy versi baru

### ✅ Cek Deployment Status

```bash
# Di folder lokal, cek bahwa semua file sudah terupdate
git status

# Jika ada file yang belum di-commit
git add .
git commit -m "Perbaikan"
git push origin main

# Tunggu 1-3 menit, deployment otomatis dimulai
```

---

## 📊 Custom Domain (Opsional)

Ingin domain sendiri (bukan `netlify.app`)?

1. Beli domain di registrar (Namecheap, GoDaddy, dll)
2. Di Netlify, buka **Site settings → Domain management → Custom domains**
3. Tambahkan domain Anda
4. Update DNS records di registrar domain Anda sesuai instruksi Netlify
5. Tunggu propagasi DNS (biasanya 24 jam)

---

## 📞 Ringkasan Workflow

| Tahap | Aksi | Durasi |
|-------|------|--------|
| **Setup Awal** | Push ke GitHub + Connect Netlify | 5-10 menit |
| **Setiap Update** | `git commit` → `git push` → Netlify auto deploy | 1-3 menit |
| **Monitoring** | Cek tab **"Deploys"** di dashboard Netlify | Real-time |

---

✨ **Selesai!** Sekarang setiap kali Anda mengubah kode dan push ke GitHub, Netlify otomatis akan mem-build dan deploy aplikasi Anda. Tidak perlu perintah manual deploy lagi!

---

**Catatan Penting:**
- Database Supabase sudah online, jadi data tersimpan di cloud dan accessible dari mana saja
- Netlify deployment gratis dengan limit fair (300 build per bulan)
- Netlify memberikan SSL/HTTPS gratis dan otomatis
