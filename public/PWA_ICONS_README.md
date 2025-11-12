# PWA Icons Setup

The PWA is configured but requires icon files. Create the following icons in the `/public` directory:

## Required Icons

1. **pwa-192x192.png** (192x192 pixels)
   - Standard PWA icon for Android home screen
   - Should be a clear, simple logo or profile photo
   - Transparent background or solid color

2. **pwa-512x512.png** (512x512 pixels)
   - High-resolution PWA icon
   - Used for splash screens and larger displays
   - Transparent background or solid color

## Recommended Tool

Use [PWA Icon Generator](https://www.pwabuilder.com/imageGenerator) or similar tools to generate all required sizes from a single source image.

## Design Guidelines

- **Simple and recognizable**: The icon should be clear at small sizes
- **Brand colors**: Use the accent color (#4A90E2) or primary color (#1A1A1A)
- **Maskable**: Consider making the 512x512 version maskable (safe area in center)
- **Consistent**: Match the overall Swiss spa aesthetic of the site

## Quick Setup

1. Create a 512x512 source image (e.g., "MR" initials or profile photo)
2. Use an icon generator tool to create both sizes
3. Place files in `/public/` directory
4. Test PWA installation on mobile device

## Testing

After adding icons:
```bash
npm run build
npm run preview
```

Visit on mobile device and test "Add to Home Screen" functionality.
