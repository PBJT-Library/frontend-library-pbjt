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

- 🔐 **Admin Authentication** - JWT-based login (admin-only access)
- 📚 **Books Management** - Full CRUD with search, filtering & stock tracking
- 👥 **Members Management** - Student registration & profile management
- 📖 **Loans Management** - Borrow/return with stock validation & due dates
- 🌙 **Dark Mode** - System-wide theme support with persistence
- 🖥️ **Desktop App** - Cross-platform (Windows, macOS, Linux)
- ⚙️ **Settings** - Profile, preferences, and security management

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **State** | Zustand, TanStack Query |
| **Forms** | React Hook Form, Zod |
| **Desktop** | Tauri 2.9 (Rust) |
| **Icons** | Heroicons |
| **Notifications** | Sonner |

---

## 📁 Project Structure

```
frontend-perpus/
├── .github/
│   └── workflows/
│       └── release.yml         # GitHub Actions for automated releases
│
├── public/                     # Static assets (empty after cleanup)
│
├── src/
│   ├── app/                    # Application configuration
│   │   └── providers/
│   │       └── QueryProvider.tsx  # TanStack Query setup
│   │
│   ├── components/             # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   │   ├── AppShell.tsx   # Main app layout wrapper
│   │   │   ├── Breadcrumbs.tsx # Navigation breadcrumbs
│   │   │   ├── Header.tsx     # Top navigation bar
│   │   │   ├── Sidebar.tsx    # Side navigation menu
│   │   │   └── index.ts       # Layout exports
│   │   │
│   │   └── ui/                # UI primitives
│   │       ├── Badge.tsx      # Status badges
│   │       ├── Button.tsx     # Button component
│   │       ├── Card.tsx       # Card container
│   │       ├── Input.tsx      # Text input
│   │       ├── LoadingSpinner.tsx # Loading indicator
│   │       ├── Modal.tsx      # Modal dialog
│   │       ├── Select.tsx     # Dropdown select
│   │       ├── Table.tsx      # Data table
│   │       └── index.ts       # UI exports
│   │
│   ├── features/              # Feature modules (domain-driven)
│   │   ├── auth/             # Authentication
│   │   │   ├── components/
│   │   │   │   ├── BrandPanel.tsx    # Auth page branding
│   │   │   │   └── LoginPage.tsx     # Login form
│   │   │   ├── schemas/
│   │   │   │   └── loginSchema.ts    # Login validation
│   │   │   └── store/
│   │   │       └── authStore.ts      # Auth state (Zustand)
│   │   │
│   │   ├── books/            # Books management
│   │   │   ├── components/
│   │   │   │   ├── BookFormModal.tsx    # Add/Edit book
│   │   │   │   ├── BooksPage.tsx        # Books list page
│   │   │   │   ├── BooksTable.tsx       # Books data table
│   │   │   │   ├── DeleteBookDialog.tsx # Delete confirmation
│   │   │   │   └── StockBadge.tsx       # Stock status badge
│   │   │   ├── hooks/
│   │   │   │   └── useBooks.ts          # Books data hooks
│   │   │   └── schemas/
│   │   │       └── bookSchema.ts        # Book validation
│   │   │
│   │   ├── dashboard/        # Dashboard
│   │   │   └── components/
│   │   │       └── Dashboard.tsx        # Main dashboard
│   │   │
│   │   ├── loans/            # Loans management
│   │   │   ├── components/
│   │   │   │   ├── EditLoanModal.tsx    # Edit loan details
│   │   │   │   ├── LoanFormModal.tsx    # Create new loan
│   │   │   │   ├── LoansPage.tsx        # Loans list page
│   │   │   │   └── LoansTable.tsx       # Loans data table
│   │   │   ├── hooks/
│   │   │   │   └── useLoans.ts          # Loans data hooks
│   │   │   └── schemas/
│   │   │       └── loanSchema.ts        # Loan validation
│   │   │
│   │   ├── members/          # Members management
│   │   │   ├── components/
│   │   │   │   ├── DeleteMemberDialog.tsx # Delete confirmation
│   │   │   │   ├── MemberFormModal.tsx    # Add/Edit member
│   │   │   │   ├── MembersPage.tsx        # Members list page
│   │   │   │   └── MembersTable.tsx       # Members data table
│   │   │   ├── hooks/
│   │   │   │   └── useMembers.ts          # Members data hooks
│   │   │   └── schemas/
│   │   │       └── memberSchema.ts        # Member validation
│   │   │
│   │   └── settings/         # User settings
│   │       ├── components/
│   │       │   ├── PreferencesTab.tsx   # App preferences
│   │       │   ├── ProfileTab.tsx       # User profile
│   │       │   ├── SecurityTab.tsx      # Password change
│   │       │   └── SettingsPage.tsx     # Settings container
│   │       └── schemas/
│   │           ├── passwordSchema.ts    # Password validation
│   │           └── profileSchema.ts     # Profile validation
│   │
│   ├── services/             # External services
│   │   ├── api/             # API client & endpoints
│   │   │   ├── auth.api.ts  # Authentication API
│   │   │   ├── books.api.ts # Books CRUD API
│   │   │   ├── client.ts    # Axios instance with interceptors
│   │   │   ├── index.ts     # API exports
│   │   │   ├── loans.api.ts # Loans CRUD API
│   │   │   └── members.api.ts # Members CRUD API
│   │   ├── constants/       # App constants
│   │   │   └── categories.ts # Book categories
│   │   └── utils/           # Service utilities
│   │       ├── delay.ts     # Async delay helper
│   │       ├── filter.ts    # Data filtering
│   │       └── pagination.ts # Pagination helper
│   │
│   ├── stores/              # Zustand state management
│   │   ├── themeStore.ts    # Dark mode state
│   │   └── uiStore.ts       # UI state (sidebar, etc)
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── admin.ts        # Admin & auth types
│   │   ├── book.ts         # Book entity
│   │   ├── index.ts        # Type exports
│   │   ├── loan.ts         # Loan entity
│   │   └── member.ts       # Member entity
│   │
│   ├── utils/               # Global utilities
│   │   └── cn.ts           # className merge utility
│   │
│   ├── App.tsx             # Root component with routing
│   ├── index.css           # Global styles & Tailwind
│   └── main.tsx            # Entry point
│
├── src-tauri/               # Tauri desktop app (Rust)
│   ├── icons/              # App icons for all platforms
│   ├── src/
│   │   └── main.rs         # Rust entry point
│   ├── build.rs            # Build script
│   ├── Cargo.toml          # Rust dependencies
│   └── tauri.conf.json     # Tauri configuration
│
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Node dependencies & scripts
├── postcss.config.cjs      # PostCSS configuration
├── README.md               # This file
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.app.json       # TypeScript config (app)
├── tsconfig.json           # TypeScript config (base)
├── tsconfig.node.json      # TypeScript config (node)
└── vite.config.ts          # Vite configuration
```

### 📂 Structure Explanation

#### **`src/app/`** - Application Core
- **`providers/`**: React context providers (TanStack Query setup)

#### **`src/components/`** - Reusable Components
- **`layout/`**: Page layout components (AppShell, Header, Sidebar, Breadcrumbs)
- **`ui/`**: Primitive UI components (Button, Input, Modal, Table, etc.)

#### **`src/features/`** - Feature Modules (Domain-Driven Design)
Each feature is self-contained with:
- **`components/`**: Feature-specific UI components
- **`hooks/`**: Custom React hooks for data fetching (TanStack Query)
- **`schemas/`**: Zod validation schemas
- **`store/`**: Zustand state management (auth only)

**Features**:
- **`auth/`**: Login, authentication state
- **`books/`**: Book CRUD operations
- **`dashboard/`**: Main dashboard with statistics
- **`loans/`**: Loan/borrow management
- **`members/`**: Member/student management
- **`settings/`**: User profile, preferences, security

#### **`src/services/`** - External Services
- **`api/`**: API client and endpoint definitions
  - `client.ts`: Axios instance with auth interceptors
  - `*.api.ts`: Resource-specific API calls
- **`constants/`**: Application constants (categories, etc.)
- **`utils/`**: Service utilities (pagination, filtering, delay)

#### **`src/stores/`** - Global State (Zustand)
- **`themeStore.ts`**: Dark mode toggle and persistence
- **`uiStore.ts`**: UI state (sidebar open/close, etc.)

#### **`src/types/`** - TypeScript Definitions
- Entity types: `Book`, `Member`, `Loan`, `Admin`
- API request/response types
- Centralized type exports

#### **`src/utils/`** - Global Utilities
- **`cn.ts`**: Tailwind className merge utility (using `clsx` + `tailwind-merge`)

#### **`src-tauri/`** - Desktop App (Rust)
- Tauri configuration for cross-platform desktop builds
- App icons and build scripts

---

## 🌐 Backend Integration

### API Endpoints

| Resource | Methods | Auth |
|----------|---------|------|
| `/admin/login` | POST | ❌ |
| `/admin/me` | GET, PUT | ✅ |
| `/books` | GET, POST, PUT, DELETE | ✅ |
| `/members` | GET, POST, PUT, DELETE | ✅ |
| `/loans` | GET, POST, PUT | ✅ |
| `/loans/:id/return` | PUT | ✅ |

### API Client Features

- **Base URL**: `VITE_API_BASE_URL` from `.env`
- **Authentication**: JWT token in `Authorization: Bearer <token>`
- **Auto-retry**: 1 retry on failure
- **Timeout**: 10 seconds
- **Auto-redirect**: 401 → `/login`
- **Error handling**: Centralized error interceptor

---

## 💻 Development

### Scripts

```bash
# Web Development
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Desktop Development
npm run tauri:dev    # Start desktop app (dev mode)
npm run tauri:build  # Build desktop installers
```

### Development Workflow

1. **Start backend**: `cd ../backend-perpus && bun run dev`
2. **Start frontend**: `npm run dev` or `npm run tauri:dev`
3. **Login**: Use admin credentials from backend

---

## 🚀 Deployment

### Web Deployment

```bash
# Build for production
npm run build

# Output: dist/
# Deploy to: Vercel, Netlify, Cloudflare Pages
```

**Environment Variables** (Production):
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_NAME=PBJT Library Management System
```

### Desktop Deployment

```bash
# Build installers for current platform
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

# GitHub Actions will:
# 1. Build for Windows, macOS, Linux
# 2. Create GitHub Release
# 3. Upload installers as assets
```

---

## 🎨 Design System

### Colors

**Light Mode**:
- Primary: Blue (#2563eb)
- Background: White/Slate-50
- Text: Slate-900

**Dark Mode**:
- Primary: Blue-400
- Background: Slate-950
- Text: Slate-50

### Features
- ✅ WCAG AA compliant contrast ratios
- ✅ Smooth transitions (200ms)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Persistent theme preference (localStorage)
- ✅ System preference detection

---

## 🐛 Troubleshooting

### CORS Errors
Ensure backend allows `http://localhost:5173` in CORS configuration.

### Connection Refused
- Check backend is running: `curl http://localhost:3000/books`
- Verify `.env` has correct `VITE_API_BASE_URL`

### Tauri Build Fails

**Windows**: Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/)

**macOS**: 
```bash
xcode-select --install
```

**Linux**:
```bash
sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf
```

### White Inputs in Dark Mode
Hard refresh browser: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (macOS)

---

## 📦 Dependencies

### Production Dependencies
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching & caching
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **React Router** - Routing
- **Heroicons** - Icons
- **Sonner** - Toast notifications
- **Tauri** - Desktop app framework

### Development Dependencies
- **ESLint** - Code linting
- **TypeScript ESLint** - TS linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Rafly Ashraffi Rachmat**  
Politeknik Baja Tegal - Teknik Informatika

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Tauri**
