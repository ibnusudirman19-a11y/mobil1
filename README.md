# bertindaklah-sebagai-tim-profe

Bertindaklah sebagai tim profesional yang terdiri dari:
- Product Manager
- UI/UX Designer
- Senior PHP Laravel Developer
- Database Engineer (MySQL)
- Copywriter Otomotif

Saya ingin membangun sebuah website jual mobil bekas berbasis PHP menggunakan framework Laravel.
Website ini berfungsi sebagai showroom mobil online yang profesional, modern, dan terpercaya.

Website ini BUKAN marketplace dan BUKAN media sosial.

================================
TUJUAN WEBSITE
================================
- Menampilkan mobil bekas secara profesional dan meyakinkan
- Memudahkan calon pembeli mencari mobil sesuai kebutuhan
- Menjadi katalog digital resmi showroom mobil bekas
- Siap digunakan secara nyata (production-ready)

================================
TEKNOLOGI WAJIB
================================
- Bahasa: PHP
- Framework: Laravel (MVC)
- Frontend: Blade Template + CSS + JavaScript
- Database: MySQL
- Autentikasi: Laravel Auth (Admin only)
- Storage: Laravel Storage (upload gambar)

================================
ROLE PENGGUNA
================================
1. PENGUNJUNG (TANPA LOGIN)
- Melihat daftar mobil
- Melihat detail mobil
- Menghubungi penjual via WhatsApp

2. ADMIN (LOGIN)
- Mengelola seluruh data website
- Mengelola data mobil dan foto

================================
FITUR FRONTEND (PENGUNJUNG)
================================

1. HALAMAN BERANDA
- Hero section full width (gambar mobil resolusi tinggi)
- Headline & slogan showroom
- Tombol CTA (Lihat Mobil / Hubungi Kami)
- Section mobil unggulan
- Section keunggulan showroom
- Responsive & modern

2. HALAMAN DAFTAR MOBIL
- Tampilan grid / card modern
- Setiap card menampilkan:
  - Foto mobil
  - Merk & model
  - Tahun
  - Kilometer
  - Harga
- Filter:
  - Merk
  - Tahun
  - Harga minimum & maksimum
  - Transmisi
  - Bahan bakar
- Sorting:
  - Harga termurah – termahal
  - Mobil terbaru

3. HALAMAN DETAIL MOBIL
- Slider galeri foto (multi foto)
- Informasi utama:
  - Harga
  - Status (Tersedia / Terjual)
- Spesifikasi lengkap:
  - Merk
  - Model
  - Tahun
  - Kilometer
  - Transmisi
  - Bahan bakar
  - Warna
  - Plat wilayah
- Deskripsi kondisi mobil
- Tombol WhatsApp “Hubungi Penjual”

4. HALAMAN TENTANG SHOWROOM
- Profil showroom
- Visi & misi
- Komitmen kualitas

5. HALAMAN KONTAK
- Alamat showroom
- Nomor WhatsApp
- Google Maps embed

================================
FITUR BACKEND (ADMIN PANEL)
================================

1. AUTENTIKASI ADMIN
- Login admin
- Proteksi middleware auth

2. DASHBOARD ADMIN
- Total mobil
- Mobil tersedia
- Mobil terjual

3. CRUD DATA MOBIL
- Tambah mobil
- Edit mobil
- Hapus mobil
- Upload banyak foto per mobil
- Tandai mobil sebagai “Terjual”

4. MASTER DATA
- Merk mobil
- Transmisi
- Bahan bakar

================================
STRUKTUR DATABASE (MySQL)
================================

Tabel utama:
- users (admin)
- cars
- car_images
- brands
- transmissions
- fuel_types

Relasi:
- cars hasMany car_images
- brands hasMany cars

================================
STRUKTUR LARAVEL YANG WAJIB
================================
- routes/web.php
- app/Models
- app/Http/Controllers
- resources/views (Blade)
- database/migrations
- storage/app/public

================================
DESAIN & UI/UX
================================
- Desain modern & profesional
- Warna elegan (hitam, putih, abu, merah)
- Tipografi tegas (otomotif style)
- Hover effect pada card mobil
- Responsive (mobile, tablet, desktop)

================================
KETENTUAN OUTPUT
================================
- Jelaskan langkah pembuatan secara SANGAT DETAIL
- Mulai dari setup Laravel hingga siap digunakan
- Sertakan:
  - Struktur folder
  - Route Laravel
  - Controller
  - Model & Migration
  - Blade Template
- Gunakan best practice Laravel (MVC, validation, storage)
- Jangan melompati tahapan
- Gunakan bahasa yang mudah dipahami


## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal.

## Project Information

- Generated with Yapi
- Project ID: zWg2oUSbQDFqEU8RAhkxi
- Created: 2026-01-04T02:02:52.440Z
