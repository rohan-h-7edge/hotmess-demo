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

<details>
<summary>Full project tree</summary>

Generated, ignored and tooling folders are left out (`node_modules`, `android`, `ios`, `.expo`, `.git`, `.claude`). Every folder that contains code also has a `__tests__/` folder with its tests; those are left out to keep the tree readable.

```
hotmess-demo/
├── assets
│   ├── android-icon-background.png
│   ├── android-icon-foreground.png
│   └── android-icon-monochrome.png
├── plugins
│   └── withAndroidImeInsets.js
├── src
│   ├── assets
│   │   ├── fonts
│   │   │   ├── OFL.txt
│   │   │   ├── Poppins-Medium.ttf
│   │   │   ├── Poppins-Regular.ttf
│   │   │   └── Poppins-SemiBold.ttf
│   │   ├── icons
│   │   │   ├── adaptive-icon-develop.png
│   │   │   ├── adaptive-icon-prod.png
│   │   │   ├── arrow-left.svg
│   │   │   ├── cart.png
│   │   │   ├── chevron-down.svg
│   │   │   ├── chevron-right.svg
│   │   │   ├── close.svg
│   │   │   ├── editorials.png
│   │   │   ├── eye-off.svg
│   │   │   ├── eye.svg
│   │   │   ├── filter.svg
│   │   │   ├── globe.svg
│   │   │   ├── heart-filled.svg
│   │   │   ├── heart-outline.svg
│   │   │   ├── heart.png
│   │   │   ├── home.png
│   │   │   ├── icon-develop.png
│   │   │   ├── icon-prod.png
│   │   │   ├── pencil.svg
│   │   │   ├── percent.svg
│   │   │   ├── profile.png
│   │   │   └── search.png
│   │   └── images
│   │       ├── empty-cart.png
│   │       ├── hotmess-frame.svg
│   │       ├── hotmess-logo.png
│   │       └── splash-screen.jpg
│   ├── components
│   │   ├── button
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── common
│   │   │   ├── AppHeader.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── index.ts
│   │   │   ├── ListHeader.tsx
│   │   │   └── SafeAreaScreen.tsx
│   │   ├── dialog
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── index.ts
│   │   ├── icon
│   │   │   ├── Icon.tsx
│   │   │   └── index.ts
│   │   ├── input
│   │   │   ├── index.ts
│   │   │   └── Input.tsx
│   │   ├── product
│   │   │   ├── index.ts
│   │   │   └── ProductGridCard.tsx
│   │   └── typography
│   │       ├── AppText.tsx
│   │       └── index.ts
│   ├── config
│   │   └── env.ts
│   ├── features
│   │   ├── auth
│   │   │   ├── acl
│   │   │   │   ├── auth.dto.ts
│   │   │   │   └── authMapper.ts
│   │   │   ├── components
│   │   │   │   ├── AuthFooterLink.tsx
│   │   │   │   ├── AuthHeader.tsx
│   │   │   │   ├── AuthLayout.tsx
│   │   │   │   ├── FormError.tsx
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── PasswordInput.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── i18n
│   │   │   │   ├── en.json
│   │   │   │   ├── hi.json
│   │   │   │   └── index.ts
│   │   │   ├── queries
│   │   │   │   ├── useLogin.ts
│   │   │   │   ├── useLogout.ts
│   │   │   │   └── useRegister.ts
│   │   │   ├── screens
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   └── RegisterScreen.tsx
│   │   │   ├── services
│   │   │   │   └── authService.ts
│   │   │   ├── session
│   │   │   │   └── refreshSession.ts
│   │   │   ├── types
│   │   │   │   └── auth.types.ts
│   │   │   └── index.ts
│   │   ├── cart
│   │   │   ├── acl
│   │   │   │   ├── cart.dto.ts
│   │   │   │   └── cartMapper.ts
│   │   │   ├── components
│   │   │   │   ├── CartItemCard.tsx
│   │   │   │   ├── CheckoutBar.tsx
│   │   │   │   ├── CouponRow.tsx
│   │   │   │   ├── EmptyCart.tsx
│   │   │   │   ├── OrderDetails.tsx
│   │   │   │   └── QuantityPicker.tsx
│   │   │   ├── hooks
│   │   │   ├── i18n
│   │   │   │   ├── en.json
│   │   │   │   ├── hi.json
│   │   │   │   └── index.ts
│   │   │   ├── queries
│   │   │   │   ├── cartKeys.ts
│   │   │   │   ├── useAddToCart.ts
│   │   │   │   ├── useCart.ts
│   │   │   │   ├── useRemoveFromCart.ts
│   │   │   │   └── useUpdateCartQuantity.ts
│   │   │   ├── screens
│   │   │   │   └── CartScreen.tsx
│   │   │   ├── services
│   │   │   │   └── cartService.ts
│   │   │   ├── types
│   │   │   │   └── cart.types.ts
│   │   │   ├── utils
│   │   │   │   └── cartTotal.ts
│   │   │   └── index.ts
│   │   ├── catalog
│   │   │   ├── acl
│   │   │   │   ├── catalog.dto.ts
│   │   │   │   └── catalogMapper.ts
│   │   │   ├── components
│   │   │   │   ├── FilterButton.tsx
│   │   │   │   ├── PopularSearches.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   ├── config
│   │   │   │   └── collections.ts
│   │   │   ├── hooks
│   │   │   │   ├── useDebouncedValue.ts
│   │   │   │   └── useProductCardActions.ts
│   │   │   ├── i18n
│   │   │   │   ├── en.json
│   │   │   │   ├── hi.json
│   │   │   │   └── index.ts
│   │   │   ├── queries
│   │   │   │   ├── catalogKeys.ts
│   │   │   │   ├── useProductPages.ts
│   │   │   │   ├── useProducts.ts
│   │   │   │   └── useTopCategories.ts
│   │   │   ├── screens
│   │   │   │   ├── ProductListScreen.tsx
│   │   │   │   └── SearchScreen.tsx
│   │   │   ├── services
│   │   │   │   └── catalogService.ts
│   │   │   ├── types
│   │   │   │   └── catalog.types.ts
│   │   │   └── index.ts
│   │   ├── editorials
│   │   │   ├── components
│   │   │   ├── i18n
│   │   │   │   ├── en.json
│   │   │   │   ├── hi.json
│   │   │   │   └── index.ts
│   │   │   ├── screens
│   │   │   │   └── EditorialsScreen.tsx
│   │   │   └── index.ts
│   │   ├── home
│   │   │   ├── components
│   │   │   │   ├── CollectionTile.tsx
│   │   │   │   ├── NewInSection.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   └── PromoBanner.tsx
│   │   │   ├── hooks
│   │   │   │   └── useHomeCatalog.ts
│   │   │   ├── i18n
│   │   │   │   ├── en.json
│   │   │   │   ├── hi.json
│   │   │   │   └── index.ts
│   │   │   ├── screens
│   │   │   │   └── HomeScreen.tsx
│   │   │   └── index.ts
│   │   ├── profile
│   │   │   ├── components
│   │   │   │   ├── LanguageSwitch.tsx
│   │   │   │   ├── MenuRow.tsx
│   │   │   │   ├── MenuSection.tsx
│   │   │   │   └── ProfileHeader.tsx
│   │   │   ├── i18n
│   │   │   │   ├── en.json
│   │   │   │   ├── hi.json
│   │   │   │   └── index.ts
│   │   │   ├── screens
│   │   │   │   ├── EditProfileScreen.tsx
│   │   │   │   └── ProfileScreen.tsx
│   │   │   └── index.ts
│   │   ├── splash
│   │   │   ├── components
│   │   │   │   └── SplashProgressBar.tsx
│   │   │   ├── i18n
│   │   │   │   ├── en.json
│   │   │   │   ├── hi.json
│   │   │   │   └── index.ts
│   │   │   ├── screens
│   │   │   │   └── SplashScreen.tsx
│   │   │   └── index.ts
│   │   ├── user
│   │   │   ├── acl
│   │   │   │   ├── user.dto.ts
│   │   │   │   └── userMapper.ts
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   │   └── useAuth.ts
│   │   │   ├── queries
│   │   │   │   ├── userKeys.ts
│   │   │   │   ├── useUpdateProfile.ts
│   │   │   │   └── useUserProfile.ts
│   │   │   ├── services
│   │   │   │   └── userService.ts
│   │   │   ├── store
│   │   │   │   └── userStore.ts
│   │   │   ├── types
│   │   │   │   └── user.types.ts
│   │   │   └── index.ts
│   │   └── wishlist
│   │       ├── acl
│   │       │   ├── wishlist.dto.ts
│   │       │   └── wishlistMapper.ts
│   │       ├── components
│   │       │   └── EmptyWishlist.tsx
│   │       ├── hooks
│   │       │   └── useMoveToWishlist.ts
│   │       ├── i18n
│   │       │   ├── en.json
│   │       │   ├── hi.json
│   │       │   └── index.ts
│   │       ├── queries
│   │       │   ├── useAddToWishlist.ts
│   │       │   ├── useRemoveFromWishlist.ts
│   │       │   ├── useWishlist.ts
│   │       │   └── wishlistKeys.ts
│   │       ├── screens
│   │       │   └── WishlistScreen.tsx
│   │       ├── services
│   │       │   └── wishlistService.ts
│   │       ├── types
│   │       │   └── wishlist.types.ts
│   │       └── index.ts
│   ├── hooks
│   │   ├── useForm.ts
│   │   ├── useGridItemWidth.ts
│   │   ├── useLanguage.ts
│   │   └── useRefetchOnAppFocus.ts
│   ├── i18n
│   │   ├── locales
│   │   │   ├── en.json
│   │   │   └── hi.json
│   │   ├── i18next.d.ts
│   │   └── index.ts
│   ├── navigation
│   │   ├── AppNavigator.tsx
│   │   ├── CartRoute.tsx
│   │   ├── HomeStackNavigator.tsx
│   │   ├── renderAppHeader.tsx
│   │   ├── TabNavigator.tsx
│   │   └── types.ts
│   ├── services
│   │   ├── api.ts
│   │   └── queryClient.ts
│   ├── test-utils
│   │   └── renderWithProviders.tsx
│   ├── theme
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   ├── navigationTheme.ts
│   │   ├── radius.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── useTheme.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   ├── formatPrice.ts
│   │   ├── haptics.ts
│   │   ├── scaling.ts
│   │   ├── storageUrl.ts
│   │   └── validation.ts
│   └── App.tsx
├── AGENTS.md
├── app.config.ts
├── CLAUDE.md
├── .env
├── eslint.config.js
├── .gitignore
├── index.ts
├── jest.config.js
├── jest.setup.ts
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── skills-lock.json
└── tsconfig.json
```

</details>

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

<details>
<summary>Feature tree</summary>

Inside a feature, `screens/` and `components/` are the UI, `queries/` the React Query hooks, `services/` the HTTP calls, `acl/` the backend DTOs and mappers, `types/` the app models, `hooks/` the feature's logic hooks and `i18n/` its strings. A feature only has the folders it needs. Each code folder also has a `__tests__/` folder, left out here.

```
src/features
├── auth
│   ├── acl
│   │   ├── auth.dto.ts
│   │   └── authMapper.ts
│   ├── components
│   │   ├── AuthFooterLink.tsx
│   │   ├── AuthHeader.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── FormError.tsx
│   │   ├── LoginForm.tsx
│   │   ├── PasswordInput.tsx
│   │   └── RegisterForm.tsx
│   ├── i18n
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── index.ts
│   ├── queries
│   │   ├── useLogin.ts
│   │   ├── useLogout.ts
│   │   └── useRegister.ts
│   ├── screens
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── services
│   │   └── authService.ts
│   ├── session
│   │   └── refreshSession.ts
│   ├── types
│   │   └── auth.types.ts
│   └── index.ts
├── cart
│   ├── acl
│   │   ├── cart.dto.ts
│   │   └── cartMapper.ts
│   ├── components
│   │   ├── CartItemCard.tsx
│   │   ├── CheckoutBar.tsx
│   │   ├── CouponRow.tsx
│   │   ├── EmptyCart.tsx
│   │   ├── OrderDetails.tsx
│   │   └── QuantityPicker.tsx
│   ├── hooks
│   ├── i18n
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── index.ts
│   ├── queries
│   │   ├── cartKeys.ts
│   │   ├── useAddToCart.ts
│   │   ├── useCart.ts
│   │   ├── useRemoveFromCart.ts
│   │   └── useUpdateCartQuantity.ts
│   ├── screens
│   │   └── CartScreen.tsx
│   ├── services
│   │   └── cartService.ts
│   ├── types
│   │   └── cart.types.ts
│   ├── utils
│   │   └── cartTotal.ts
│   └── index.ts
├── catalog
│   ├── acl
│   │   ├── catalog.dto.ts
│   │   └── catalogMapper.ts
│   ├── components
│   │   ├── FilterButton.tsx
│   │   ├── PopularSearches.tsx
│   │   └── SearchBar.tsx
│   ├── config
│   │   └── collections.ts
│   ├── hooks
│   │   ├── useDebouncedValue.ts
│   │   └── useProductCardActions.ts
│   ├── i18n
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── index.ts
│   ├── queries
│   │   ├── catalogKeys.ts
│   │   ├── useProductPages.ts
│   │   ├── useProducts.ts
│   │   └── useTopCategories.ts
│   ├── screens
│   │   ├── ProductListScreen.tsx
│   │   └── SearchScreen.tsx
│   ├── services
│   │   └── catalogService.ts
│   ├── types
│   │   └── catalog.types.ts
│   └── index.ts
├── editorials
│   ├── components
│   ├── i18n
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── index.ts
│   ├── screens
│   │   └── EditorialsScreen.tsx
│   └── index.ts
├── home
│   ├── components
│   │   ├── CollectionTile.tsx
│   │   ├── NewInSection.tsx
│   │   ├── ProductCard.tsx
│   │   └── PromoBanner.tsx
│   ├── hooks
│   │   └── useHomeCatalog.ts
│   ├── i18n
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── index.ts
│   ├── screens
│   │   └── HomeScreen.tsx
│   └── index.ts
├── profile
│   ├── components
│   │   ├── LanguageSwitch.tsx
│   │   ├── MenuRow.tsx
│   │   ├── MenuSection.tsx
│   │   └── ProfileHeader.tsx
│   ├── i18n
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── index.ts
│   ├── screens
│   │   ├── EditProfileScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── index.ts
├── splash
│   ├── components
│   │   └── SplashProgressBar.tsx
│   ├── i18n
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── index.ts
│   ├── screens
│   │   └── SplashScreen.tsx
│   └── index.ts
├── user
│   ├── acl
│   │   ├── user.dto.ts
│   │   └── userMapper.ts
│   ├── components
│   ├── hooks
│   │   └── useAuth.ts
│   ├── queries
│   │   ├── userKeys.ts
│   │   ├── useUpdateProfile.ts
│   │   └── useUserProfile.ts
│   ├── services
│   │   └── userService.ts
│   ├── store
│   │   └── userStore.ts
│   ├── types
│   │   └── user.types.ts
│   └── index.ts
└── wishlist
    ├── acl
    │   ├── wishlist.dto.ts
    │   └── wishlistMapper.ts
    ├── components
    │   └── EmptyWishlist.tsx
    ├── hooks
    │   └── useMoveToWishlist.ts
    ├── i18n
    │   ├── en.json
    │   ├── hi.json
    │   └── index.ts
    ├── queries
    │   ├── useAddToWishlist.ts
    │   ├── useRemoveFromWishlist.ts
    │   ├── useWishlist.ts
    │   └── wishlistKeys.ts
    ├── screens
    │   └── WishlistScreen.tsx
    ├── services
    │   └── wishlistService.ts
    ├── types
    │   └── wishlist.types.ts
    └── index.ts
```

</details>

### Navigation

```
Root stack
├── Splash (once per launch)
├── Signed out:  Login · Register
└── Signed in:   Main tabs · Cart · Search · EditProfile
                 └── Tabs: Home (stack: Home → ProductList) · Wishlist · Editorials · Profile
```

Signing in or out switches the screen set automatically.

## Conventions

Coding rules are in [AGENTS.md](AGENTS.md): file structure, the design system (theme tokens only, no hard-coded colours or sizes), translations for every user-facing string, testing, and SOLID guidelines.
