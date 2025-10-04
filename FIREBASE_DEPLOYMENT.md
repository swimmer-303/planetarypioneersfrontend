# Firebase Hosting Deployment Guide

## Prerequisites
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize project: `firebase init hosting` (if not already done)

## Deployment Commands

### Build Command (for CI/CD):
```bash
npm run export
```

### Deploy Command:
```bash
npm run deploy
```

Or manually:
```bash
firebase deploy
```

## Configuration Files

### firebase.json
- Configured for static export with `out` directory as public folder
- Includes rewrite rules for SPA routing

### next.config.js
- Added `output: 'export'` for static site generation
- Added `trailingSlash: true` for Firebase compatibility
- Set `images.unoptimized: true` for static export

## Manual Deployment Steps

1. **Build the static site:**
   ```bash
   npm run export
   ```

2. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```

## CI/CD Integration

For automated deployments, use:
- **Build Command:** `npm run export`
- **Deploy Command:** `firebase deploy --token $FIREBASE_TOKEN`

Make sure to set the `FIREBASE_TOKEN` environment variable in your CI/CD system.
