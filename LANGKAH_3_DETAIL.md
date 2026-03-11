# Langkah 3: Konfigurasi Build Settings & Environment Variables (Detail Lengkap)

Setelah Anda memilih repository `sales-app` di Langkah 2, Netlify akan menampilkan halaman **"Configure your site"** atau **"Authorize and install"**. Halaman ini sangat penting karena di sini Anda akan mengatur bagaimana aplikasi akan di-build dan di-deploy.

---

## 📋 Halaman Konfigurasi yang Akan Anda Lihat

Setelah klik "Import repository" di Langkah 2, Netlify akan membawa Anda ke halaman seperti ini:

```
┌─────────────────────────────────────────────────────┐
│  Configure your site before deploying to production │
└─────────────────────────────────────────────────────┘

Team:         [ malinkandang618-hash... ]
Repository:   [ sales-app ]

Build command:
  [ npm run build ]

Publish directory:
  [ build ]

Environment:
  [ Add environment variables ]

                    [ Deploy site ]
```

---

## 🔧 Area 1: Team & Repository (Otomatis, Tidak perlu diubah)

**Bagian ini sudah terisi otomatis dari langkah sebelumnya:**

- **Team**: Nama workspace/team Netlify milik Anda → **JANGAN DIUBAH**
- **Repository**: Harus menunjukkan `sales-app` → **JANGAN DIUBAH**
- **Branch**: Biasanya `main` sudah dipilih → **JANGAN DIUBAH**

✅ Abaikan bagian ini dan lanjut ke Area 2.

---

## 🔨 Area 2: Build Command

**Apa itu?**
Build command adalah perintah yang dijalankan Netlify saat Anda melakukan push ke GitHub. Perintah ini mengubah kode React Anda menjadi file statis HTML/CSS/JS yang siap di-serve ke browser.

**Field yang akan Anda lihat:**

```
Build command:
  [ npm run build ]  ← Ini sudah benar!
```

### ✅ Penjelasan

- **`npm run build`** adalah standar untuk semua aplikasi React yang dibuat dengan `create-react-app`
- Perintah ini akan:
  1. Mengoptimalkan kode JavaScript
  2. Mengcompile JSX menjadi JavaScript biasa
  3. Membuat folder `build/` yang berisi semua file siap-deploy
  4. Menghapus unused code untuk memperkecil ukuran (minification)

### ✅ Aksi yang diperlukan

**JANGAN UBAH** nilai di field ini. Biarkan tetap `npm run build`.

Jika kosong, ketik: `npm run build`

---

## 📁 Area 3: Publish Directory

**Apa itu?**
Publish directory adalah folder yang berisi file-file yang akan di-upload ke server Netlify dan dibuat available untuk diakses publik.

**Field yang akan Anda lihat:**

```
Publish directory:
  [ build ]  ← Ini sudah benar!
```

### ✅ Penjelasan

- Folder `build/` adalah output dari perintah `npm run build`
- Folder ini berisi semua file HTML, CSS, JavaScript yang siap untuk production
- Netlify akan mengambil **HANYA** isi folder `build/` dan upload ke CDN mereka
- File-file lain di repository (seperti `src/`, `node_modules/`, `.git/`) tidak akan di-upload

### ✅ Aksi yang diperlukan

**JANGAN UBAH** nilai di field ini. Biarkan tetap `build`.

Jika kosong, ketik: `build`

---

## 🔐 Area 4: Environment Variables (❗ PALING PENTING)

**Apa itu?**
Environment variables adalah nilai-nilai konfigurasi yang dibutuhkan aplikasi untuk berfungsi, seperti API keys untuk Supabase. Variabel ini **HARUS** di-set sebelum deploy, atau aplikasi Anda tidak akan bisa connect ke database.

### 📍 Lokasi Field

Cari bagian yang bertulisan:

```
Environment variables
  [ Add environment variables ]  ← Klik di sini
```

Atau ada yang versinya:

```
Build & test settings

Build command:        npm run build
Publish directory:    build
Functions directory:  functions

Environment variables
  [+ List] Add environment variables
```

### 🎯 Langkah-Langkah Menambah Environment Variables

Setelah Anda klik **"Add environment variables"**, akan muncul form seperti ini:

```
┌──────────────────────────────────────────────┐
│  Environment Variables                       │
├──────────────────────────────────────────────┤
│                                              │
│  KEY                    │  VALUE              │
│  ___________________   │  _______________    │
│                        │                     │
│  ___________________   │  _______________    │
│                        │                     │
│                                              │
│              [x] [+]                         │
│                                              │
│              [ Save ]                        │
└──────────────────────────────────────────────┘
```

### ✏️ Variable Pertama: REACT_APP_SUPABASE_URL

**Langkah-langkahnya:**

1. **Klik field KEY (kolom kiri, baris pertama)**
   - Ketik: `REACT_APP_SUPABASE_URL` (harus PERSIS seperti ini, case-sensitive!)

2. **Klik field VALUE (kolom kanan, baris pertama)**
   - Ketik: `https://ahkcpispxbejwwrqlgqf.supabase.co` (copy-paste untuk menghindari typo)

3. **Hasilnya akan terlihat seperti:**

   ```
   KEY: REACT_APP_SUPABASE_URL
   VALUE: https://ahkcpispxbejwwrqlgqf.supabase.co
   ```

### ✏️ Variable Kedua: REACT_APP_SUPABASE_ANON_KEY

**Langkah-langkahnya:**

1. **Klik field KEY (kolom kiri, baris kedua)**
   - Ketik: `REACT_APP_SUPABASE_ANON_KEY` (harus PERSIS seperti ini!)

2. **Klik field VALUE (kolom kanan, baris kedua)**
   - Ketik atau copy-paste nilai ini dengan SANGAT HATI-HATI (jangan ada spasi di awal/akhir):

   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoa2NwaXNweGJland3cnFsZ3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjYyNjcsImV4cCI6MjA4ODY0MjI2N30.X_eQPnwjPA6nMP6ixXAPshhg3500cAWHjIEBIrDwCQw
   ```

3. **Hasilnya akan terlihat seperti:**

   ```
   KEY: REACT_APP_SUPABASE_ANON_KEY
   VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoa2NwaXNweGJland3cnFsZ3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjYyNjcsImV4cCI6MjA4ODY0MjI2N30.X_eQPnwjPA6nMP6ixXAPshhg3500cAWHjIEBIrDwCQw
   ```

### ⚠️ Catatan Penting!

- **Nama key HARUS persis** (case-sensitive): `REACT_APP_SUPABASE_URL` dan `REACT_APP_SUPABASE_ANON_KEY`
- **Value HARUS benar tanpa spasi** di awal atau akhir
- Jika ada typo, database connection Anda tidak akan bekerja dan aplikasi akan error
- **SECRET KEY jangan pernah dibagikan** kepada orang lain (sudah Anda punya dari screenshot Vercel sebelumnya)

### 💾 Menyimpan Environment Variables

Setelah Anda isi kedua variable:

1. **Cari tombol untuk save/confirm**:
   - Ada yang bertulisan **"Save"**
   - Ada yang bertulisan **"Update environment"**
   - Atau bisa jadi tombol **"Deploy site"** akan langsung tersedia

2. **Klik tombol tersebut** untuk confirm dan simpan environment variables

---

## ✅ Area 5: Review Sebelum Deploy

Sebelum klik **"Deploy site"**, pastikan:

| Bagian | Nilai | Status |
|--------|-------|--------|
| **Team** | `malinkandang618-hash...` atau nama tim Anda | ✅ Sudah benar |
| **Repository** | `sales-app` | ✅ Sudah benar |
| **Branch** | `main` | ✅ Sudah benar |
| **Build command** | `npm run build` | ✅ Sudah benar |
| **Publish directory** | `build` | ✅ Sudah benar |
| **REACT_APP_SUPABASE_URL** | `https://ahkcpispxbejwwrqlgqf.supabase.co` | ✅ Harus ada |
| **REACT_APP_SUPABASE_ANON_KEY** | `eyJhbGci...` | ✅ Harus ada |

---

## 🚀 Deploy Site

Setelah semua field terisi dengan benar:

1. **Klik tombol "Deploy site"** (biasanya di sudut kanan bawah form)
2. Netlify akan mulai proses:
   - Fetch code dari GitHub
   - Install dependencies (`npm install`)
   - Run build command (`npm run build`)
   - Upload file ke server CDN
   - Buat domain otomatis (contoh: `https://focused-raman-12345.netlify.app`)

3. **Tunggu sampai status berubah**:
   ```
   Building...  →  Publishing...  →  Published ✅
   ```

   Proses ini biasanya memakan waktu **1-3 menit**.

---

## 📊 Monitoring Deploy Progress

Setelah Anda klik "Deploy site", Netlify akan menampilkan halaman progress:

```
┌──────────────────────────────────────────┐
│  Building                                │
│  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     │
│  30%                                     │
│                                          │
│  Creating a new deploy...                │
│  Installing dependencies...              │
│  Running "npm run build"...              │
└──────────────────────────────────────────┘
```

**Jangan tutup/reload halaman ini** sampai selesai. Biarkan process berjalan hingga status berubah menjadi "Published".

---

## ✨ Deploy Berhasil!

Setelah selesai, Anda akan melihat:

```
┌──────────────────────────────────────────┐
│  ✅ Deploy Preview Ready!                │
│                                          │
│  Name: focused-raman-12345               │
│  URL: https://focused-raman-12345.netlify.app
│                                          │
│  [Visit Preview]  [Cancel Deploy]        │
└──────────────────────────────────────────┘
```

**Buka URL tersebut di browser** untuk verifikasi aplikasi sudah live dan berfungsi dengan baik!

---

## ❌ Jika Ada Error

Jika deploy gagal, Netlify akan menampilkan error:

1. **Klik "View deploy log"** atau "Deploy failed" untuk melihat detail error
2. **Common errors:**
   - `npm install` gagal → Ada missing dependency di `package.json`
   - Build gagal → Ada syntax error di code
   - Environment variables tidak terdeteksi → Pastikan nama key PERSIS benar
   - Database connection error → Pastikan ANON_KEY value copy dengan benar, tidak ada spasi

3. **Perbaiki error tersebut** di lokal:
   ```bash
   git add .
   git commit -m "Fix build error"
   git push origin main
   ```
   
4. **Netlify otomatis redeploy** dan akan terlihat di deploy history

---

## 📌 Checklist Langkah 3

Sebelum melanjutkan ke langkah berikutnya, pastikan:

- [ ] Build command sudah terisi: `npm run build`
- [ ] Publish directory sudah terisi: `build`
- [ ] Environment variable 1 sudah ditambah:
  - Key: `REACT_APP_SUPABASE_URL`
  - Value: `https://ahkcpispxbejwwrqlgqf.supabase.co`
- [ ] Environment variable 2 sudah ditambah:
  - Key: `REACT_APP_SUPABASE_ANON_KEY`
  - Value: `eyJhbGci...` (panjang itu)
- [ ] Deploy berjalan tanpa error (status: Published)
- [ ] URL domain Netlify sudah diberikan

Setelah semua checklist selesai, lanjut ke **Langkah 4** untuk akses aplikasi Anda! 🎉

