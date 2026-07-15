# Buddy Script

A full-featured social media platform built with Next.js 16, featuring post interactions, threaded commenting, JWT authentication, and a responsive three-column feed layout with dark mode support.

## Live Demo

- **Live URL:** [https://buddyscript-delta.vercel.app](https://buddyscript-delta.vercel.app)
- **Repository:** [https://github.com/adnanhjoy/buddyscript-frontend](https://github.com/adnanhjoy/buddyscript-frontend)

## Overview

Buddy Script is a modern social media frontend application that enables users to register, log in, create posts with images, engage through comments and replies, and react to content. It connects to a REST API backend via server-side data fetching and API proxying.

## Features

| Feature                | Description                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Authentication**     | Email/password registration and login with JWT-based auth using httpOnly cookies                      |
| **Session Management** | Automatic token refresh with redirect to login on expiry                                              |
| **Route Protection**   | Unauthenticated users are redirected to login; authenticated users cannot access login/register       |
| **Post Feed**          | Server-rendered timeline displaying posts with author info, timestamps, images, and engagement counts |
| **Post Creation**      | Create posts with text content, image uploads (via FormData), and public/private visibility toggle    |
| **Post Reactions**     | Like/unlike posts with optimistic UI updates via React Query mutations                                |
| **Comment Replies**    | Nested reply threads with toggle-to-reveal and inline reply forms                                     |
| **Comment Reactions**  | Like/unlike comments and replies                                                                      |
| **Like Count Display** | Shows avatars of users who liked a post with aggregate count                                          |
| **Dark Mode**          | Toggle between light and dark themes via a floating switch button                                     |
| **Profile Dropdown**   | User avatar, name, settings link, help & support, and logout action                                   |
| **404 Page**           | Custom styled not-found page with home redirect                                                       |
| **Loading States**     | Global loading indicator during page transitions                                                      |

## Tech Stack

| Category               | Technology                                                        |
| ---------------------- | ----------------------------------------------------------------- |
| **Framework**          | Next.js 16.2.10 (App Router)                                      |
| **UI Library**         | React 19.2.4                                                      |
| **Language**           | TypeScript 5 (strict mode)                                        |
| **State Management**   | TanStack React Query v5                                           |
| **Styling**            | Bootstrap 5.3.8 + Custom CSS (modular)                            |
| **Forms**              | Native HTML forms + React `useActionState` (React 19)             |
| **Authentication**     | JWT (httpOnly cookies) + `jsonwebtoken` for server-side decoding  |
| **API Layer**          | Next.js Server Actions + API Routes + `fetch` with credentials    |
| **Routing**            | Next.js App Router (file-based) + Next.js Rewrites (API proxy)    |
| **Image Optimization** | Next.js `<Image>` with Cloudinary remote patterns                 |
| **Date Utilities**     | dayjs with `relativeTime` plugin                                  |
| **Fonts**              | Google Fonts (Poppins) + FontAwesome (self-hosted)                |
| **Linting**            | ESLint 9 with `eslint-config-next` (Core Web Vitals + TypeScript) |
| **Build Tool**         | Next.js built-in (Turbopack-compatible)                           |

## Project Structure

```
├── app/                          # Next.js App Router pages and layouts
│   ├── api/me/route.ts           # Server API: returns decoded JWT user
│   ├── login/page.tsx            # Login page with split layout
│   ├── registration/page.tsx     # Registration page with split layout
│   ├── styles/                   # Modular CSS (common, main, responsive)
│   ├── layout.tsx                # Root layout (providers, fonts, metadata)
│   ├── page.tsx                  # Home feed page (3-column layout)
│   ├── loading.tsx               # Route-level loading UI
│   └── not-found.tsx             # Custom 404 page
├── components/                   # Reusable UI components
│   ├── card/                     # PostCard, CommentCard, ReplyCard, CommentSection
│   ├── feed/                     # FeedClient, LayoutMiddle, LeftSidebar, RightSidebar,
│   │                             # DesktopMenu, MobileMenu, MobileBottomNavigation,
│   │                             # PostAreaBox, PostReaction, PostLikeCount, CommentReaction,
│   │                             # SwitchingButton
│   ├── form/                     # LoginForm, RegistrationForm, CommentForm, LogoutButton
│   └── providers/                # QueryProvider (React Query), SessionProvider (token refresh)
├── lib/                          # Business logic and API integration
│   ├── api/                      # Base URL config, fetchWithAuth, token utilities
│   ├── auth/                     # Auth endpoints (signup, login, logout, refresh)
│   ├── engagement/               # Likes, comments, replies endpoints
│   ├── posts/                    # Post CRUD endpoints
│   └── user/                     # User endpoints (get, update, current)
├── hook/                         # Custom server hooks
│   └── useDecodedUserFromCookie.ts
├── utils/                        # Utility functions
│   └── shortRelativeTime.ts      # Compact relative time formatting (e.g., "3h", "2d")
├── public/                       # Static assets
│   ├── images/                   # UI images, icons, and placeholders
│   └── fonts/                    # Self-hosted FontAwesome font files
├── proxy.ts                      # Route protection logic (auth guard)
├── next.config.ts                # Next.js config (rewrites, image domains)
├── tsconfig.json                 # TypeScript config (strict, path aliases)
├── eslint.config.mjs             # ESLint flat config
└── postcss.config.mjs            # PostCSS config
```

## Getting Started

### Prerequisites

- **Node.js** 18.18 or later
- **npm** (or yarn/pnpm/bun)
- A running backend API server (the app expects it at `NEXT_PUBLIC_API_BASE_URL`)

### Installation

```bash
# Clone the repository
git clone https://github.com/adnanhjoy/buddyscript-frontend.git
cd buddyscript-frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
JWT_SECRET=your-jwt-secret-here
```

| Variable                   | Description                                      | Required |
| -------------------------- | ------------------------------------------------ | -------- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend REST API                 | Yes      |
| `JWT_SECRET`               | Secret key used to verify JWT tokens server-side | Yes      |

### Running the Project

```bash
# Development server
npm run dev

# Opens at http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

## Available Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint across the project        |

## Architecture & Design Decisions

### Server Components + Client Components Hybrid

The application leverages Next.js 16 App Router's server/client component model. Server components handle data fetching (posts, comments, user profile) at request time, reducing client-side JavaScript and improving initial load performance. Client components are used for interactive features (forms, reactions, dropdowns, dark mode toggle).

### API Proxying via Next.js Rewrites

All API calls are routed through Next.js rewrites (`/api/v1/:path*` → backend URL). This avoids CORS issues and keeps the backend URL server-side. Server-side functions read the JWT from httpOnly cookies to make authenticated requests to the backend.

### JWT Authentication with httpOnly Cookies

Auth tokens are stored in httpOnly cookies set by the backend. The frontend reads them server-side via `next/headers` for API calls and decodes them with `jsonwebtoken` to identify the current user. Client-side session management is handled by `SessionProvider`, which refreshes the token every 45 seconds.

### Optimistic Updates with React Query

Like/comment mutations use React Query's `onMutate` for optimistic updates, providing instant UI feedback. On error, the previous state is restored. On settlement, queries are invalidated to sync with the server.

### Modular CSS Architecture

Styles are split into three files — `common.css` (global resets and base styles), `main.css` (component-specific styles), and `responsive.css` (media queries) — rather than CSS modules or CSS-in-JS. This was chosen to match the original design template's conventions.

### Server Actions for Data Mutations

Post creation and other mutations use Next.js Server Actions (`"use server"` directive) to handle form submissions on the server, with `useActionState` (React 19) for managing form state and pending states on the client.

## Performance Optimizations

- **Server-Side Data Fetching** — Posts and comments are fetched on the server during render, reducing client-side API calls and improving FCP (First Contentful Paint)
- **React Query Caching** — `initialData` hydration from server fetches avoids duplicate client requests; mutations use cache invalidation instead of full refetches
- **Optimistic UI Updates** — Likes, comments, and replies update the UI immediately before server confirmation
- **Next.js Image Optimization** — All images use `next/image` with automatic lazy loading, srcset generation, and format optimization
- **Font Preconnect** — Google Fonts uses `preconnect` hints to reduce DNS/TLS latency
- **Self-Hosted Fonts** — FontAwesome is served from `public/fonts/` to avoid third-party requests
- **Automatic Token Refresh** — Background token refresh prevents auth-related full-page reloads

## Code Quality

- **TypeScript** — Full strict-mode TypeScript across all files with interface definitions for API payloads and component props
- **ESLint** — Configured with `eslint-config-next` (Core Web Vitals + TypeScript rules) using the flat config format
- **Reusable Components** — Atomic component architecture (Card, Form, Feed, Provider layers)
- **Custom Hooks** — Server-side JWT decoding via `useDecodedUserFromCookie`
- **Separation of Concerns** — API functions organized by domain (`auth`, `posts`, `engagement`, `user`) with shared infrastructure (`api/`)
- **Error Handling** — Forms display inline error messages; API functions throw typed errors; React Query handles mutation errors with rollback

## Responsive Design

The application is fully responsive with distinct layouts for desktop, tablet, and mobile:

| Breakpoint                | Layout                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **Desktop** (>1200px)     | 3-column layout: left sidebar, center feed, right sidebar. Full top navbar with profile dropdown.   |
| **Tablet** (768px–1199px) | 2-column layout: center feed + right sidebar. Left sidebar hidden. Collapsible navbar.              |
| **Mobile** (<768px)       | Single-column feed. Mobile header with search. Fixed bottom navigation bar. Horizontal story cards. |

Key responsive behaviors:

- Left sidebar with Explore, Suggested People, and Events is hidden on tablet and mobile
- Story cards switch from a 4-column grid (desktop) to a horizontal scroll (mobile)
- Post creation toolbar duplicates controls for mobile bottom placement
- Bottom navigation bar appears only on mobile viewports
- Font sizes and spacing adapt across breakpoints (355px, 385px, 390px, 420px, 576px, 768px, 992px, 1200px)

Ensure the production server has access to both environment variables and can reach the backend API.

## Author

**Adnan Hossain** — [adnanwebdevs@gmail.com](mailto:adnanwebdevs@gmail.com)

- GitHub: [@adnanhjoy](https://github.com/adnanhjoy)
- LinkedIn: [Adnan Hossain](https://linkedin.com/in/adnanh-joy)
