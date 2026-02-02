# 🚀 Quick Start - Tauri Desktop App

Panduan cepat untuk menjalankan aplikasi PBJT Library sebagai aplikasi desktop.

## ⚡ Cara Tercepat

### Menggunakan Script (Recommended)

```powershell
# Navigasi ke folder frontend
cd c:\Users\RAFLY A.R\Documents\Portfolio-Rafly\pbjt-library\frontend-library

# Jalankan script
.\start-tauri.ps1
```

Script akan otomatis:
- ✅ Cek semua prasyarat (Node.js, Rust, Cargo)
- ✅ Setup file `.env` jika belum ada
- ✅ Install dependencies jika belum
- ✅ Mengingatkan untuk menjalankan backend
- ✅ Menjalankan aplikasi desktop

---

## 📋 Manual Steps

### 1. Pastikan Backend Berjalan

```bash
# Terminal 1 - Backend
cd c:\Users\RAFLY A.R\Documents\Portfolio-Rafly\pbjt-library\backend-library
npm run dev
```

### 2. Jalankan Desktop App

```bash
# Terminal 2 - Frontend Desktop
cd c:\Users\RAFLY A.R\Documents\Portfolio-Rafly\pbjt-library\frontend-library
npm run tauri:dev
```

---

## 🔧 Prasyarat (Harus Sudah Terinstall)

- ✅ **Node.js** v18+ - [Download](https://nodejs.org/)
- ✅ **Rust** - [Download](https://www.rust-lang.org/tools/install)
- ✅ **Visual Studio Build Tools** (Windows) - [Download](https://visualstudio.microsoft.com/downloads/)
  - Pilih workload: "Desktop development with C++"
- ✅ **WebView2 Runtime** (Windows) - Biasanya sudah ada di Windows 10/11

### Verifikasi Instalasi

```bash
node --version    # Harus v18+
rustc --version   # Harus ada
cargo --version   # Harus ada
```

---

## ⏱️ Waktu Build

- **Build Pertama:** 5-10 menit (compile Rust dependencies)
- **Build Selanjutnya:** 1-2 menit (incremental compilation)

---

## 🆘 Troubleshooting Cepat

### Error: "Rust not found"
```bash
# Install Rust
# Download: https://www.rust-lang.org/tools/install
# Restart terminal setelah instalasi
```

### Error: "MSVC build tools not found"
```bash
# Install Visual Studio Build Tools
# Download: https://visualstudio.microsoft.com/downloads/
# Pilih: "Desktop development with C++"
# Restart komputer
```

### Error: "Backend tidak bisa diakses"
```bash
# Pastikan backend berjalan
cd backend-library
npm run dev

# Test backend
curl http://localhost:3000/books
```

---

## 📚 Dokumentasi Lengkap

- **Setup Lengkap:** [`TAURI-SETUP.md`](./TAURI-SETUP.md)
- **Workflow:** [`.agent/workflows/run-tauri.md`](../.agent/workflows/run-tauri.md)
- **README Utama:** [`README.md`](./README.md)

---

## 🎯 Perintah Penting

```bash
# Development Mode (hot reload)
npm run tauri:dev

# Build Production (installer)
npm run tauri:build

# Web Mode (tanpa Tauri)
npm run dev
```

---

**Butuh bantuan?** Baca dokumentasi lengkap di [`TAURI-SETUP.md`](./TAURI-SETUP.md)
