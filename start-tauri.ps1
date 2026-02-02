# PBJT Library - Tauri Desktop App Quick Start
# Script untuk menjalankan aplikasi desktop dengan mudah

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PBJT Library - Tauri Desktop App" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Fungsi untuk cek apakah command tersedia
function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Cek prasyarat
Write-Host "Memeriksa prasyarat..." -ForegroundColor Yellow
Write-Host ""

$allPrereqsMet = $true

# Cek Node.js
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js terinstall: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "[X] Node.js tidak ditemukan!" -ForegroundColor Red
    Write-Host "    Install dari: https://nodejs.org/" -ForegroundColor Yellow
    $allPrereqsMet = $false
}

# Cek npm
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "[OK] npm terinstall: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "[X] npm tidak ditemukan!" -ForegroundColor Red
    $allPrereqsMet = $false
}

# Cek Rust
if (Test-Command "rustc") {
    $rustVersion = rustc --version
    Write-Host "[OK] Rust terinstall: $rustVersion" -ForegroundColor Green
} else {
    Write-Host "[X] Rust tidak ditemukan!" -ForegroundColor Red
    Write-Host "    Install dari: https://www.rust-lang.org/tools/install" -ForegroundColor Yellow
    $allPrereqsMet = $false
}

# Cek Cargo
if (Test-Command "cargo") {
    $cargoVersion = cargo --version
    Write-Host "[OK] Cargo terinstall: $cargoVersion" -ForegroundColor Green
} else {
    Write-Host "[X] Cargo tidak ditemukan!" -ForegroundColor Red
    $allPrereqsMet = $false
}

Write-Host ""

if (-not $allPrereqsMet) {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  PRASYARAT BELUM TERPENUHI!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Silakan install tools yang diperlukan terlebih dahulu." -ForegroundColor Yellow
    Write-Host "Lihat TAURI-SETUP.md untuk panduan lengkap." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Tekan Enter untuk keluar"
    exit 1
}

# Cek apakah .env sudah ada
if (-not (Test-Path ".env")) {
    Write-Host "File .env tidak ditemukan. Membuat dari .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "[OK] File .env berhasil dibuat" -ForegroundColor Green
        Write-Host ""
        Write-Host "PENTING: Edit file .env dan pastikan VITE_API_BASE_URL sudah benar!" -ForegroundColor Yellow
        Write-Host "Default: VITE_API_BASE_URL=http://localhost:3000" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host "[X] File .env.example tidak ditemukan!" -ForegroundColor Red
        exit 1
    }
}

# Cek apakah node_modules ada
if (-not (Test-Path "node_modules")) {
    Write-Host "Dependencies belum terinstall. Menjalankan npm install..." -ForegroundColor Yellow
    Write-Host ""
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "[X] npm install gagal!" -ForegroundColor Red
        Read-Host "Tekan Enter untuk keluar"
        exit 1
    }
    Write-Host ""
    Write-Host "[OK] Dependencies berhasil diinstall" -ForegroundColor Green
    Write-Host ""
}

# Peringatan backend
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  PENTING: Backend API" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pastikan backend API sudah berjalan di:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Jika belum, buka terminal baru dan jalankan:" -ForegroundColor Yellow
Write-Host "  cd ..\backend-library" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""

# Konfirmasi untuk melanjutkan
$continue = Read-Host "Apakah backend sudah berjalan? (y/n)"
if ($continue -ne "y" -and $continue -ne "Y") {
    Write-Host ""
    Write-Host "Silakan jalankan backend terlebih dahulu." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Tekan Enter untuk keluar"
    exit 0
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Memulai Aplikasi Desktop..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Build pertama kali akan memakan waktu 5-10 menit." -ForegroundColor Yellow
Write-Host "Build selanjutnya akan lebih cepat (1-2 menit)." -ForegroundColor Yellow
Write-Host ""
Write-Host "Aplikasi akan terbuka secara otomatis setelah build selesai." -ForegroundColor Green
Write-Host ""

# Jalankan Tauri dev
npm run tauri:dev
