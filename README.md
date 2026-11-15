# Portfolio Website - Hammam (Static HTML, CSS, JS)

Proyek ini adalah hasil konversi dari aplikasi Flask (`app.py` & `templates/index.html`) menjadi website statis murni (**HTML, CSS, dan JavaScript**) yang siap di-deploy ke **Vercel**.

## Struktur Folder

```text
hammam-portfolio-vercel/
├── index.html          # Halaman utama (seluruh variabel Jinja2 sudah dikonversi)
├── vercel.json         # Konfigurasi optimal untuk Vercel Static Hosting
├── css/
│   └── style.css       # Kumpulan animasi & styling kustom
├── js/
│   └── script.js       # Logika interaktif (typewriter, drag karakter, 3D tilt, scroll reveal)
└── static/             # <-- Masukkan seluruh file gambar Anda ke dalam folder ini
    ├── Futuristic_H_Code.jpg
    ├── gunung.jpg
    ├── foto_gunung.jpg
    ├── Programming_coding_background.jpg
    ├── Github.jpg
    ├── Figma.jpg
    ├── PhotoBox.jpg
    ├── multilingual-learning.jpg
    ├── Seritifikat_dicoding_Hammam.jpg
    ├── Sertifikasi_Tahfidz_10 juz.jpg
    └── sertifikasi_canva.jpg
```

## Cara Menggabungkan & Deploy ke Vercel

1. **Ekstrak** file ZIP ini ke folder proyek Anda.
2. **Salin seluruh gambar** dari folder `static/` lama Anda ke dalam folder `static/` di proyek ini.
3. **Pastikan huruf besar/kecil nama file gambar sama persis** (Vercel berjalan di server Linux yang *case-sensitive*):
   - `PhotoBox.jpg` (huruf `B` kapital)
   - `Seritifikat_dicoding_Hammam.jpg`
   - `Sertifikasi_Tahfidz_10 juz.jpg`
4. **Test Lokal**: Buka `index.html` menggunakan *Live Server* di VS Code untuk memastikan semua gambar & animasi berjalan lancar.
5. **Deploy ke Vercel**:
   - **Cara 1 (GitHub)**: Upload seluruh isi folder `hammam-portfolio-vercel/` ke repositori GitHub, lalu *Import Project* di [vercel.com](https://vercel.com) (Framework Preset: **Other**, Build Command: kosongkan, Output Directory: `.`).
   - **Cara 2 (Vercel CLI)**: Jalankan perintah `npx vercel --prod` di dalam folder proyek.
