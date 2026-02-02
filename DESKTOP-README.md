# PBJT Library Desktop App

Desktop application for PBJT Library Management System built with Tauri and React.

## Download

Download the latest version from [Releases](https://github.com/PBJT-Library/frontend-library-pbjt/releases)

**Windows:**
- `.exe` installer (recommended): One-click installer
- `.msi` installer: For enterprise deployment

## Features

- 📚 Modern library management interface
- 🚀 Fast and lightweight (~10MB vs 100MB+ Electron apps)
- 🔒 Secure desktop application
- 🌐 Connected to production API
- 💾 Local caching for better performance

## System Requirements

- **OS:** Windows 10/11 (64-bit)
- **RAM:** 2GB minimum (4GB recommended)
- **Disk:** 50MB free space

## Installation

### Windows

1. Download `PBJT-Library_x.x.x_x64-setup.exe` from releases
2. Run the installer
3. Follow installation wizard
4. Launch app from Start Menu

## Development

### Prerequisites

- **Node.js:** 18+ or Bun 1.0+
- **Rust:** Latest stable version
- **System Dependencies:**
  - Windows: Visual Studio Build Tools or Visual Studio 2022

### Setup

```bash
# Install dependencies
bun install

# Run in development mode
bun run tauri:dev

# Build for production
bun run tauri:build
```

### Build Output

Production builds will be in:
```
src-tauri/target/release/bundle/
├── nsis/          # .exe installer
└── msi/           # .msi installer
```

## 

Architecture

```
Frontend (React + Vite)
    ↓
Tauri Bridge
    ↓
Rust Backend (System APIs)
    ↓
Operating System
```

## Configuration

Production API endpoint configured in `.env.production`:
```env
VITE_API_BASE_URL=https://library-pbjt.momoi.my.id
```

## Contributing

This desktop app shares the same frontend codebase with the web version. Contributions are welcome!

## Troubleshooting

**App won't start:**
- Check system requirements
- Try reinstalling
- Check antivirus hasn't blocked it

**Can't connect to API:**
- Check internet connection
- Verify firewall settings
- Contact administrator

**Update not working:**
- Manually download latest version from releases
- Uninstall old version first

## License

Copyright © 2026 PBJT (Politeknik Baja Tegal)

---

**Built with** [Tauri](https://tauri.app) + [React](https://react.dev) + [TypeScript](https://typescriptlang.org)
