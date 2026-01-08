# 📚 PBJT Library - Frontend

Modern library management system built with React 19, TypeScript, and Tauri for cross-platform desktop deployment.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-2.9.6-FFC131?logo=tauri)](https://tauri.app/)

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- Backend API running on `http://localhost:3000`
- Rust (for desktop builds)

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start web app
npm run dev

# Start desktop app
npm run tauri:dev
```

**Web**: http://localhost:5173

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=PBJT Library Management System
```

---

## ✨ Features

- 🔐 **Authentication** - JWT-based admin login
- 📚 **Books Management** - Full CRUD with search & filtering
- 👥 **Members Management** - Student registration & tracking
- 📖 **Loans Management** - Borrow/return with stock validation
- 🌙 **Dark Mode** - System-wide theme support
- 🖥️ **Desktop App** - Cross-platform (Windows, macOS, Linux)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS, Headless UI |
| **State** | Zustand, TanStack Query |
| **Forms** | React Hook Form, Zod |
| **Desktop** | Tauri 2.9 (Rust) |

---

## 📁 Project Structure

```
frontend-perpus/
├── src/
│   ├── features/          # Feature modules (auth, books, members, loans)
│   ├── components/        # Reusable UI components
│   ├── services/          # API client & endpoints
│   ├── types/             # TypeScript definitions
│   └── stores/            # Zustand state management
├── src-tauri/             # Desktop app (Rust)
│   ├── src/main.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
└── .env                   # Environment config
```

---

## 🌐 Backend Integration

### API Endpoints

| Resource | Methods | Auth |
|----------|---------|------|
| `/admin/login` | POST | ❌ |
| `/admin/register` | POST | ❌ |
| `/books` | GET, POST, PUT, DELETE | ✅ |
| `/members` | GET, POST, PUT, DELETE | ✅ |
| `/loans` | GET, POST, PUT, DELETE | ✅ |

### API Client

- **Base URL**: `VITE_API_BASE_URL` from `.env`
- **Auth**: JWT token in `Authorization: Bearer <token>`
- **Timeout**: 10 seconds
- **Auto-redirect**: 401 → `/login`

---

## 💻 Development

### Scripts

```bash
# Web Development
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run lint         # Run ESLint

# Desktop Development
npm run tauri:dev    # Start desktop app (dev mode)
npm run tauri:build  # Build desktop installers
```

### Development Workflow

1. Start backend: `cd ../backend-perpus && bun run dev`
2. Start frontend: `npm run dev` or `npm run tauri:dev`
3. Login with admin credentials

---

## 🚀 Deployment

### Web Deployment

```bash
# Build
npm run build

# Output: dist/
```

Deploy to: Vercel, Netlify, or Cloudflare Pages

### Desktop Deployment

```bash
# Build installers
npm run tauri:build

# Output: src-tauri/target/release/bundle/
# - Windows: .msi, .exe
# - macOS: .dmg, .app
# - Linux: .AppImage, .deb
```

### Automated Releases (GitHub Actions)

```bash
# Create and push version tag
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will build and release automatically
```

---

## 🎨 Design System

### Colors

**Light Mode**: Blue primary (#2563eb), Slate background  
**Dark Mode**: Slate-950 background, proper contrast ratios

### Features
- WCAG AA compliant
- Smooth transitions (200ms)
- Responsive design (mobile, tablet, desktop)
- Persistent theme preference

---

## 🐛 Troubleshooting

### CORS Errors
Ensure backend allows `http://localhost:5173` in CORS config.

### Connection Refused
- Check backend is running: `curl http://localhost:3000/books`
- Verify `.env` has correct `VITE_API_BASE_URL`

### Tauri Build Fails

**Windows**: Install Visual Studio Build Tools  
**macOS**: `xcode-select --install`  
**Linux**: 
```bash
sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf
```

### White Inputs in Dark Mode
Hard refresh: `Ctrl + Shift + R`

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Rafly Ashraffi Rachmat**  
Politeknik Baja Tegal - Teknik Informatika

---

**Built with React, TypeScript, Tailwind CSS, and Tauri**
