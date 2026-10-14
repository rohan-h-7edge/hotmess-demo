# Hotmess

A fashion shopping app built with Expo (SDK 57) and React Native, backed by Supabase.

Users sign up and log in, browse collections, search products, save items to a wishlist and manage a cart. The app is available in English and Hindi, in light and dark mode.

## Getting started

Requirements: Node 20+, Android Studio or Xcode, and a physical device or emulator.

```bash
npm install
npm start              # Metro dev server
npm run build          # prebuild + install the dev build on Android
npm run build:ios      # same for iOS
```

The app uses native modules, so it runs in a development build, not Expo Go. Run `npm run build` again after adding a library with native code.

### Environment

`.env` holds the public settings the app needs:

| Variable | Purpose |
|---|---|
| `EXPO_PUBLIC_APP_VARIANT` | `develop`, `qa`, `preprod` or `prod`; picks the bundle ID and app icon |
| `EXPO_PUBLIC_API_URL` | Supabase project URL |
| `EXPO_PUBLIC_API_KEY` | Supabase publishable key (safe to ship in the app) |

Never put a secret or `service_role` key in an `EXPO_PUBLIC_*` variable; those are bundled into the app.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Start Metro with a clean cache |
| `npm run build` / `build:ios` | Generate native projects and run on Android / iOS |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |
| `npm test` | Jest unit and component tests (`test:coverage` for coverage) |
| `npx expo-doctor` | Check dependency and config health |

## Architecture

### Layers

Data flows one way. Each layer only talks to the one below it.

```
Screens & components        UI only: props in, callbacks out
        │
Query hooks (React Query)   useProducts, useCart, useAddToWishlist …
        │
Feature services            catalogService, cartService …
        │
ACL (DTOs + mappers)        Zod-validates backend responses, maps backend names ↔ app models
        │
services/api.ts             Shared axios client: base URL, auth header, token refresh, errors
        │
Supabase                    Auth, REST (PostgREST) and Storage
```

- **Server data** lives in React Query, never in component state or stores.
- **Client state** shared across screens (signed-in user, tokens) lives in a Zustand store.
- **Backend field names** never leave a feature's `acl/` and `services/` folders.

### Folders

```
src/
├── App.tsx              Providers and API setup
├── features/            One folder per feature (see below)
├── components/          Shared UI: button, common, dialog, icon, input, product, typography
├── navigation/          Navigators and route types
├── services/            api.ts (HTTP client), queryClient.ts
├── hooks/               Hooks used by 2+ features
├── utils/               scaling, formatPrice, storageUrl, haptics, validation
├── theme/               Colors (light + dark), spacing, radius, typography
├── i18n/                i18next setup and shared strings (en, hi)
├── config/env.ts        Zod-validated environment variables
└── assets/              icons/ (single-colour, tinted) and images/ (shown as-is)
plugins/                 Expo config plugins (Android keyboard insets)
```

### Features

Each feature folder contains what it needs from `screens/`, `components/`, `queries/`, `services/`, `acl/`, `types/`, `hooks/` and `i18n/`, plus an `index.ts` that is its public API. Other code imports a feature only through that `index.ts`.

| Feature | What it does |
|---|---|
| `splash` | Launch screen with progress bar |
| `auth` | Login, register, logout, token refresh |
| `user` | Signed-in user's profile and session store |
| `home` | Home: collection tiles, winter banner, New In row |
| `catalog` | Product lists by collection, search, paging |
| `cart` | Cart screen, quantities, add to cart |
| `wishlist` | Wishlist tab, save / remove products |
| `profile` | Profile, language switch, edit profile, sign out |
| `editorials` | Placeholder tab |

### Navigation

```
Root stack
├── Splash (once per launch)
├── Signed out:  Login · Register
└── Signed in:   Main tabs · Cart · Search · EditProfile
                 └── Tabs: Home (stack: Home → ProductList) · Wishlist · Editorials · Profile
```

Signing in or out switches the screen set automatically.

## Backend

The Supabase schema, migrations and catalog seed scripts live in a separate repo, `../hotmess-supabase`. The tables are `categories`, `products`, `cart_items` and `wishlist_items`, with row-level security so each user only sees their own cart and wishlist. Product images are in the public `product-images` storage bucket.

## Conventions

Coding rules are in [AGENTS.md](AGENTS.md): file structure, the design system (theme tokens only, no hard-coded colours or sizes), translations for every user-facing string, testing, and SOLID guidelines.
