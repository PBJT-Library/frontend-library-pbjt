# Tauri Desktop App - TODO

## Icons Required

> [!IMPORTANT]
> The app is **ready to build** but needs custom icons for professional appearance.

### Generate Icons

Use one of these methods:

**Option 1: Tauri CLI (Recommended)**
```bash
# Place a 1024x1024 PNG icon at: src-tauri/app-icon.png
# Then run:
bunx tauri icon src-tauri/app-icon.png
```

**Option 2: Online Generator**
- https://icon.kitchen - Upload your logo and download icon set
- Extract to `src-tauri/icons/`

### Required Files

Place in `src-tauri/icons/`:
- `32x32.png`
- `128x128.png`
- `128x128@2x.png`
- `icon.ico` (Windows)
- `icon.icns` (macOS - optional)

---

## Testing

### Local Build Test

```bash
cd frontend-library

# Test dev mode (opens desktop app)
bun run tauri:dev

# Test production build (takes 5-10 minutes)
bun run tauri:build
```

Build output:
```
src-tauri/target/release/bundle/
├── nsis/PBJT-Library_1.0.0_x64-setup.exe
└── msi/PBJT-Library_1.0.0_x64_en-US.msi
```

---

## Deployment

### GitHub Release

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "feat: add Tauri desktop app support"
   git push
   ```

2. **Create version tag:**
   ```bash
   git tag v1.0.0
   git push --tags
   ```

3. **Monitor build:**
   - Go to: https://github.com/PBJT-Library/frontend-library-pbjt/actions
   - Workflow: "Build Desktop App" 
   - Wait ~10-15 minutes for Windows build
   
4. **Check release:**
   - Go to: https://github.com/PBJT-Library/frontend-library-pbjt/releases
   - Download artifacts: `.exe` and `.msi`
   - Test installers on Windows machine

---

## Next Steps

- [ ] Create app icon (1024x1024 PNG)
- [ ] Run `bunx tauri icon` command
- [ ] Test `bun run tauri:dev`
- [ ] Test `bun run tauri:build` (optional)
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Create tag `v1.0.0`
- [ ] Verify GitHub Actions build
- [ ] Download & test installers

---

**Estimated time:** 30 minutes
