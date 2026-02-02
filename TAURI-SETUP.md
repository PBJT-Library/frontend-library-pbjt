# 🖥️ Panduan Menjalankan Aplikasi Desktop dengan Tauri

Panduan lengkap untuk menjalankan aplikasi PBJT Library sebagai aplikasi desktop menggunakan Tauri.

---

## 📋 Prasyarat

### 1. **Node.js dan npm**
```bash
# Cek versi Node.js (minimal 18.0.0)
node --version

# Cek versi npm
npm --version
```

Jika belum terinstall, download dari: https://nodejs.org/

### 2. **Rust dan Cargo**
Tauri membutuhkan Rust untuk build aplikasi desktop.

```bash
# Cek apakah Rust sudah terinstall
rustc --version
cargo --version
```

**Jika belum terinstall:**

**Windows:**
1. Download dan install dari: https://www.rust-lang.org/tools/install
2. Jalankan `rustup-init.exe`
3. Pilih opsi default (tekan Enter)
4. Restart terminal setelah instalasi

**Atau gunakan command:**
```powershell
# PowerShell (Run as Administrator)
winget install --id Rustlang.Rustup
```

### 3. **Visual Studio Build Tools (Windows)**
Diperlukan untuk kompilasi Rust di Windows.

**Opsi 1 - Visual Studio Build Tools (Recommended):**
1. Download: https://visualstudio.microsoft.com/downloads/
2. Install "Build Tools for Visual Studio 2022"
3. Pilih workload: "Desktop development with C++"

**Opsi 2 - Visual Studio Community:**
Install dengan workload "Desktop development with C++"

### 4. **WebView2 Runtime (Windows)**
Biasanya sudah terinstall di Windows 10/11 modern.

```bash
# Cek apakah WebView2 sudah ada
# Buka: C:\Program Files (x86)\Microsoft\EdgeWebView\Application
```

Jika belum ada, download dari: https://developer.microsoft.com/en-us/microsoft-edge/webview2/

---

## 🚀 Langkah-langkah Menjalankan Aplikasi

### **Langkah 1: Persiapan Backend**

Aplikasi frontend membutuhkan backend API yang berjalan.

```bash
# Buka terminal baru, navigasi ke folder backend
cd c:\Users\RAFLY A.R\Documents\Portfolio-Rafly\pbjt-library\backend-library

# Install dependencies (jika belum)
npm install

# Jalankan backend
npm run dev
```

Backend akan berjalan di: `http://localhost:3000`

> **Catatan:** Jangan tutup terminal ini, biarkan backend tetap berjalan.

---

### **Langkah 2: Setup Environment Variables**

```bash
# Navigasi ke folder frontend
cd c:\Users\RAFLY A.R\Documents\Portfolio-Rafly\pbjt-library\frontend-library

# Copy file .env.example menjadi .env
copy .env.example .env
```

**Edit file `.env`** dan pastikan isinya:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=PBJT Library Management System
```

---

### **Langkah 3: Install Dependencies**

```bash
# Pastikan masih di folder frontend-library
npm install
```

Proses ini akan menginstall:
- Dependencies React, TypeScript, Vite
- Tauri CLI dan dependencies
- Semua library yang dibutuhkan

---

### **Langkah 4: Jalankan Aplikasi Desktop (Development Mode)**

```bash
# Jalankan aplikasi Tauri dalam mode development
npm run tauri:dev
```

**Apa yang terjadi:**
1. Vite akan memulai dev server di `http://localhost:5173`
2. Tauri akan membuild aplikasi Rust
3. Aplikasi desktop akan terbuka secara otomatis
4. Hot reload aktif - perubahan code akan langsung terlihat

**Waktu build pertama kali:**
- Build pertama bisa memakan waktu 5-10 menit (Rust compile dependencies)
- Build selanjutnya akan jauh lebih cepat (1-2 menit)

---

### **Langkah 5: Login dan Testing**

1. Aplikasi desktop akan terbuka dengan halaman login
2. Gunakan kredensial admin dari backend
3. Test semua fitur:
   - Dashboard
   - Books Management
   - Members Management
   - Loans Management
   - Settings

---

## 🏗️ Build Aplikasi untuk Distribusi

Jika ingin membuat installer untuk distribusi:

```bash
# Build aplikasi production
npm run tauri:build
```

**Output:**
```
src-tauri/target/release/bundle/
├── msi/              # Windows Installer (.msi)
│   └── PBJT Library_1.0.0_x64_en-US.msi
└── nsis/             # NSIS Installer (.exe)
    └── PBJT Library_1.0.0_x64-setup.exe
```

**Waktu build:**
- Build production bisa memakan waktu 10-20 menit
- Hasil installer siap didistribusikan ke pengguna

---

## 🔧 Troubleshooting

### **1. Error: "Rust not found"**
```
error: Rust not found. Please install Rust from https://rustup.rs/
```

**Solusi:**
- Install Rust seperti di bagian Prasyarat
- Restart terminal setelah instalasi
- Jalankan `rustc --version` untuk verifikasi

---

### **2. Error: "MSVC build tools not found"**
```
error: linker `link.exe` not found
```

**Solusi:**
- Install Visual Studio Build Tools
- Pilih workload "Desktop development with C++"
- Restart komputer setelah instalasi

---

### **3. Error: "WebView2 not found"**
```
error: WebView2 runtime not found
```

**Solusi:**
- Download dan install WebView2 Runtime
- Link: https://developer.microsoft.com/en-us/microsoft-edge/webview2/

---

### **4. Port 5173 sudah digunakan**
```
Error: Port 5173 is already in use
```

**Solusi:**
```bash
# Hentikan proses yang menggunakan port 5173
# Atau ubah port di vite.config.ts
```

---

### **5. Backend tidak bisa diakses**
```
Network Error / Connection Refused
```

**Solusi:**
- Pastikan backend berjalan di `http://localhost:3000`
- Cek file `.env` sudah benar
- Test backend: `curl http://localhost:3000/books`

---

### **6. Build sangat lambat**
**Tips optimasi:**
- Tutup aplikasi lain yang berat
- Build pertama memang lama (compile Rust dependencies)
- Build selanjutnya akan lebih cepat (incremental compilation)

---

### **7. Aplikasi tidak muncul setelah build**
**Solusi:**
```bash
# Hapus cache dan rebuild
cd src-tauri
cargo clean
cd ..
npm run tauri:dev
```

---

## 📊 Perbandingan Mode Development vs Production

| Aspek | Development (`tauri:dev`) | Production (`tauri:build`) |
|-------|---------------------------|----------------------------|
| **Waktu Build** | 1-2 menit (setelah pertama) | 10-20 menit |
| **Hot Reload** | ✅ Ya | ❌ Tidak |
| **Ukuran File** | Besar (~100MB+) | Optimized (~20-30MB) |
| **DevTools** | ✅ Tersedia | ❌ Disabled |
| **Performance** | Normal | ⚡ Optimized |
| **Untuk** | Development & Testing | Distribusi ke User |

---

## 🎯 Workflow Pengembangan yang Disarankan

### **Skenario 1: Development Harian**
```bash
# Terminal 1 - Backend
cd backend-library
npm run dev

# Terminal 2 - Frontend Desktop
cd frontend-library
npm run tauri:dev
```

### **Skenario 2: Testing Web Version**
```bash
# Terminal 1 - Backend
cd backend-library
npm run dev

# Terminal 2 - Frontend Web
cd frontend-library
npm run dev
# Buka browser: http://localhost:5173
```

### **Skenario 3: Build untuk Release**
```bash
# Pastikan backend berjalan untuk testing
cd backend-library
npm run dev

# Build aplikasi desktop
cd ../frontend-library
npm run tauri:build

# Test installer yang dihasilkan
cd src-tauri/target/release/bundle/msi
# Double-click installer untuk test
```

---

## 🔒 Keamanan

### **Environment Variables**
- ✅ File `.env` sudah di-gitignore
- ✅ Jangan commit API keys atau secrets
- ✅ Gunakan `.env.example` sebagai template

### **API Communication**
- ✅ JWT token disimpan di localStorage
- ✅ Auto-redirect ke login jika unauthorized
- ✅ HTTPS recommended untuk production

### **Desktop App Security**
- ✅ CSP (Content Security Policy) dikonfigurasi
- ✅ WebView2 menggunakan sandbox
- ✅ No eval() atau unsafe code execution

---

## 📱 Fitur Aplikasi Desktop

### **Keunggulan vs Web:**
- ✅ **Native Performance** - Lebih cepat dan responsif
- ✅ **Offline Capable** - Bisa dikembangkan untuk offline mode
- ✅ **Native Look & Feel** - Integrasi dengan OS
- ✅ **No Browser Required** - Standalone application
- ✅ **Auto Updates** - Bisa dikonfigurasi (Tauri Updater)
- ✅ **System Tray** - Bisa dikembangkan
- ✅ **File System Access** - Untuk export/import data

### **Window Configuration:**
- **Default Size:** 1280x800
- **Minimum Size:** 1024x600
- **Resizable:** Ya
- **Fullscreen:** Bisa diaktifkan

---

## 🎨 Customization

### **Mengubah Icon Aplikasi:**
1. Siapkan icon dalam format PNG (berbagai ukuran)
2. Letakkan di `src-tauri/icons/`
3. Update `tauri.conf.json`:
```json
"icon": [
  "icons/32x32.png",
  "icons/128x128.png",
  "icons/icon.ico"
]
```

### **Mengubah Nama Aplikasi:**
Edit `src-tauri/tauri.conf.json`:
```json
{
  "productName": "PBJT Library",
  "app": {
    "windows": [{
      "title": "PBJT Library Management System"
    }]
  }
}
```

### **Mengubah Window Size:**
Edit `src-tauri/tauri.conf.json`:
```json
"windows": [{
  "width": 1280,
  "height": 800,
  "minWidth": 1024,
  "minHeight": 600
}]
```

---

## 📚 Resources

### **Dokumentasi:**
- Tauri Docs: https://tauri.app/
- Rust Book: https://doc.rust-lang.org/book/
- Vite Docs: https://vitejs.dev/

### **Community:**
- Tauri Discord: https://discord.com/invite/tauri
- GitHub Issues: https://github.com/tauri-apps/tauri/issues

---

## ✅ Checklist Sebelum Menjalankan

- [ ] Node.js terinstall (v18+)
- [ ] Rust terinstall
- [ ] Visual Studio Build Tools terinstall (Windows)
- [ ] WebView2 Runtime terinstall (Windows)
- [ ] Backend berjalan di `http://localhost:3000`
- [ ] File `.env` sudah dikonfigurasi
- [ ] Dependencies sudah diinstall (`npm install`)

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Install Rust (jika belum)
# Download: https://www.rust-lang.org/tools/install

# 2. Install Visual Studio Build Tools (Windows)
# Download: https://visualstudio.microsoft.com/downloads/

# 3. Jalankan Backend
cd backend-library
npm run dev

# 4. Setup Frontend (terminal baru)
cd frontend-library
npm install
copy .env.example .env

# 5. Jalankan Desktop App
npm run tauri:dev
```

---

**Selamat mencoba! 🎉**

Jika ada pertanyaan atau masalah, silakan buka issue atau hubungi developer.
