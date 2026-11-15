from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = 'hammam_secret_key_portofolio'

# Data profil utama
profile_data = {
    "nama": "Hammam",
    "peran": "Full-Stack Developer & Hafidz Qur'an",
    "sekolah": "Pondok Tahfidz Plus Abu Dzar",
    "umur": 17,
    "hobi": ["Programming", "Futsal", "Bulu Tangkis", "Design Poster Islami"],
    "skills": ["React", "Node.js", "Python", "Tailwind CSS"],
    "keagamaan": ["Hafidz Qur'an", "Sertifikasi Tahfidz", "Sertifikasi Beasiswa Tahfidz"],
    "foto": "foto_home.jpg",
    "hero_intro": "Welcome to my portfolio! Explore my projects, discover my skills, and get to know me better.",
    "about_main": "Saya adalah seorang Full-Stack Developer yang suka belajar dan mengembangkan website. Saat ini, saya terus mengasah kemampuan dalam HTML, CSS, JavaScript, Python, React, dan Node.js, serta mencoba berbagai teknologi baru untuk menambah pengalaman di dunia web development.",
    "about_sub": "Di luar dunia pemrograman, saya juga tertarik pada UI/UX Design, cybersecurity, dan desain poster Islami. Saya senang mempelajari hal baru, mengeksplorasi ide kreatif, serta mengembangkan keterampilan untuk menciptakan karya digital yang bermanfaat.",
    
    # Kontak
    "email": "hhammam668@gmail.com",
    "telepon": "+62 819-2078-4050",
    "lokasi": "Indonesia",

    # Subtitle & Title Skills
    "skills_subtitle": "DESIGN · DEVELOP · CREATE",
    "skills_title": "Tools And Skills",

    # Penjelasan Umum Portofolio (Bahasa Inggris & Indonesia)
    "portfolio_info": {
        "deskripsi_en": "A portfolio is a curated collection of a person's best projects and technical accomplishments, serving as concrete proof of skills and experience.",
        "deskripsi_id": "Portofolio adalah kumpulan karya terbaik, hasil proyek, dan rekam jejak keterampilan teknis yang telah dibuat sebagai bukti nyata kemampuan profesional."
    },

    # Data Organisasi (Mudabbir, Sapalah, & OSIS)
    "organisasi": [
        {
            "short_name": "Mudabbir",
            "tahun": "2025 – 2026",
            "judul": "Mudabbir (pembimbing santri)",
            "deskripsi": "Membimbing dan mengatur kegiatan harian santri, mulai dari jadwal ibadah dan belajar sampai kedisiplinan asrama.",
            "poin": [
                "Memimpin kelompok santri dan menjadi penghubung dengan pengasuh",
                "Menyusun dan mengawasi jadwal kegiatan harian"
            ]
        },
        {
            "short_name": "Sapala",
            "tahun": "2024 – 2025",
            "judul": "Pengurus Sapala",
            "deskripsi": "Merancang dan menjalankan program kerja serta kegiatan luar ruangan (outdoor) dan pecinta alam.",
            "poin": [
                "Menjadi panitia dan pelaksana kegiatan dari perencanaan sampai evaluasi",
                "Berkoordinasi dengan pembina, pengurus, dan seluruh anggota"
            ]
        },
        {
            "short_name": "OSIS",
            "tahun": "2024 – 2025",
            "judul": "Pengurus OSIS",
            "deskripsi": "Merancang dan menjalankan program kerja serta kegiatan sekolah bersama pengurus lain.",
            "poin": [
                "Menjadi panitia acara sekolah dari perencanaan sampai evaluasi",
                "Berkoordinasi dengan guru, pembina, dan seluruh seksi"
            ]
        }
    ]
}


@app.route('/')
def home():
    return render_template('index.html', data=profile_data)


if __name__ == '__main__':
    app.run(debug=True)