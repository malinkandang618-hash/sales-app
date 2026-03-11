# Aplikasi Rekap Penjualan

Aplikasi sederhana untuk rekap penjualan dengan halaman harga produk, modal, penjualan, dan laporan.

## Cara Menjalankan

1. Pastikan Node.js terinstall.
2. Jalankan `npm install` untuk install dependencies.
3. Jalankan `npm start` untuk development server.
4. Jalankan `npm run build` untuk build production.

## Deploy ke GitHub Pages

1. Push ke GitHub repo.
2. Gunakan GitHub Actions atau manual deploy build folder ke gh-pages branch.

## Deploy ke Netlify

1. **Buat akun** di https://app.netlify.com/signup dan hubungkan dengan GitHub.
2. **Push** project `sales-app` ke repository GitHub (kalau belum).
3. Di dashboard Netlify:
   - Klik **New site from Git** → pilih GitHub → pilih repo `sales-app`.
   - Atur build command: `npm run build` dan publish directory: `build`.
   - Klik **Deploy site**.
4. Setelah build selesai, Netlify akan memberikan URL (mis. `https://focused-raman-12345.netlify.app`).
5. Untuk variabel lingkungan, buka **Site settings → Build & deploy → Environment** dan tambahkan:
   - `REACT_APP_SUPABASE_URL` dengan nilai yang sama seperti di DEPLOY.md
   - `REACT_APP_SUPABASE_ANON_KEY` dengan nilai yang sama.

Netlify akan otomatis redeploy setiap kali Anda push perubahan ke repo.

## Fitur

- **Harga Produk**: Tambah dan lihat daftar produk dengan harga.
- **Modal**: Tambah biaya modal.
- **Penjualan**: Catat penjualan harian.
- **Laporan**: Filter penjualan berdasarkan tanggal dan lihat total pendapatan.