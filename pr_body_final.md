Resolves #1

# Frontend Admin Tasks – Sprint 1

**Goal:** Admin dapat login, membuat, melihat dengan paginasi, mengedit, dan menghapus data karyawan.

## Daftar Tugas

- [x] Inisialisasi proyek Vite + React + Tailwind + shadcn/ui.
- [x] Persiapan *routing* dasar (React Router) dan *state management* sederhana untuk autentikasi.
- [x] Halaman login admin (memanggil `POST /api/auth/login`).
- [x] Halaman daftar karyawan terproteksi (Tabel dengan **pagination**, menampilkan: NIK, nama, status pengisian).
- [x] Form tambah karyawan (modal/halaman terpisah dengan input: NIK, nama, email, password sementara).
- [x] Form edit data pokok karyawan (modal/halaman terpisah untuk merubah NIK, nama, email memanggil `PUT /api/admin/employees/:id`).
- [x] Aksi hapus karyawan (tombol hapus memanggil `DELETE /api/admin/employees/:id` disertai konfirmasi dialog).
- [x] Fungsi logout (memanggil `POST /api/auth/logout`) dan kembali ke halaman login.
