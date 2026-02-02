# Assets Directory

This directory contains all static assets for the application.

## Structure

```
assets/
├── images/           # Logo, banners, photos
│   ├── logo.png
│   ├── logo-dark.png
│   ├── logo-light.png
│   └── logo-icon.png
│
└── icons/           # SVG icons and small graphics
    └── ...
```

## Image Guidelines

### Logo Files

| Filename | Purpose | Recommended Size |
|----------|---------|------------------|
| `logo.png` | Primary logo (default) | 200-400px width |
| `logo-dark.png` | Dark mode variant | Same as primary |
| `logo-light.png` | Light mode variant | Same as primary |
| `logo-icon.png` | Icon only (no text) | 64x64 or 128x128 |
| `logo-sm.png` | Small size (navbar) | 40-60px height |

### Best Practices

1. **Format:**
   - Use **SVG** when possible for scalability
   - Use **PNG** for photos/complex graphics with transparency
   - Use **WebP** for better compression

2. **Optimization:**
   - Compress images before adding to repo
   - Use tools like TinyPNG, ImageOptim
   - Keep file sizes under 100KB when possible

3. **Naming:**
   - Use lowercase with hyphens: `logo-dark.png`
   - Be descriptive: `hero-banner-mobile.png`
   - Include size variants: `logo-sm.png`, `logo-lg.png`

## Usage

### In React Components

```tsx
// Import from assets
import logo from '@/assets/images/logo.png';

function Header() {
  return <img src={logo} alt="App Logo" />;
}
```

### With Logo Component

```tsx
import { Logo } from '@/components/ui';

function Header() {
  return <Logo size="md" />;  // Auto dark mode support
}
```

## Public vs Assets

**Use `/src/assets/`** for:
- Images imported in components
- Assets that need optimization
- Assets with cache busting

**Use `/public/`** for:
- Favicon
- PWA manifest icons
- Static files referenced in HTML
- Files that should not be processed
