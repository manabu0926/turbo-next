# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- IMPORTANT: Please respond to all queries in Japanese (日本語で回答してください) -->

## Tech Stack

| Category | Technology | Version/Details |
|----------|------------|-----------------|
| **Framework** | Next.js | v15, App Router, Turbo |
| **Runtime** | Bun | Package manager & runtime |
| **API** | Hono | Type-safe API routes with Zod validation |
| **Database** | PostgreSQL + Drizzle ORM | No table prefix |
| **Auth** | NextAuth.js | v5 beta, Discord provider |
| **State** | Jotai + React Query | v5, Suspense enabled |
| **Code Gen** | Orval | OpenAPI → TypeScript/Zod/React Query |
| **Styling** | Tailwind CSS | v4, PostCSS |
| **UI Components** | shadcn/ui | Radix UI + Tailwind CSS |
| **Linting** | Biome | v2.1.4, auto-format & fix |
| **TypeScript** | v5.9.2 | Strict mode, path aliases (`@/*`) |

## Development Commands

```bash
# Development
bun dev              # Start dev server with Turbo (port 3000)
bun preview          # Build and start production preview

# Code Quality
bun check            # Run Biome checks
bun check:write      # Run Biome with auto-fix
bun check:unsafe     # Run Biome with unsafe fixes
bun typecheck        # TypeScript type checking

# Database
bun db:generate      # Generate Drizzle migrations
bun db:migrate       # Run migrations
bun db:push          # Push schema to database
bun db:studio        # Open Drizzle Studio GUI

# API Generation
bun schema           # Generate OpenAPI spec and regenerate API code via Orval
```

## Architecture

### API Layer Structure

The application uses a layered Hono API architecture:

1. **OpenAPI Definition** (`openapi/openapi.yml`): Source of truth for API contracts
2. **Code Generation** via Orval:
   - Server routes: `src/server/api/routes/`
   - Client queries: `src/app/generated/query/`
   - Zod schemas: `src/app/generated/zod/`
3. **Hono Integration**: 
   - Main app: `src/server/api/index.ts` (configures middleware, basePath)
   - Generated routes: `src/server/api/configured_api.ts` (auto-generated route composition)
   - Next.js bridge: `src/app/api/[[...route]]/route.ts`

### Key Integration Points

**Hono + Next.js**: The Hono app is mounted at `/api` through Next.js App Router's catch-all route. Note that `configured_api.ts` routes already include `/api` prefix, while `index.ts` sets basePath to `/`.

**Authentication Flow**: NextAuth.js handles auth at `/api/auth/*`, with session available in Hono middleware via `authMiddleware`.

**Database Access**: Drizzle ORM with PostgreSQL, connection via `DATABASE_URL`.

**Type Safety**: End-to-end type safety from OpenAPI → Zod validation → TypeScript types → React Query hooks.

### Path Aliases

- `@/*` maps to `./src/*` (configured in tsconfig.json)
- `@/app/components/ui/*` - shadcn/ui components
- `@/app/lib/utils` - Utility functions including cn()

## Quick Start

```bash
# Set environment variables
cp .env.example .env.local  # Configure DATABASE_URL, NEXTAUTH_*

# Install dependencies
bun install

# Initialize database
bun db:push

# Start development server
bun dev  # http://localhost:3000
```

## API Development Flow

```mermaid
openapi.yml → [bun schema] → Orval Generation → Handler Implementation → React Query Usage
```

1. Define API in `openapi/openapi.yml`
2. Generate code with `bun schema`
3. Implement logic in `src/server/api/routes/*/handlers.ts`
4. Use hooks from `src/app/generated/query/`

## UI Components (shadcn/ui)

### Component Management

```bash
# Add new components
bunx shadcn@latest add [component-name]

# Examples
bunx shadcn@latest add button card dialog form input
```

### Component Location
- Components are installed in `src/app/components/ui/`
- Import using: `import { Button } from "@/app/components/ui/button"`
- Utility functions: `import { cn } from "@/app/lib/utils"`

### Theming
- CSS variables defined in `src/styles/globals.css`
- Light/Dark mode support via CSS classes
- Customizable via Tailwind configuration

## State Management Patterns

- **Server State**: React Query with Suspense enabled by default
- **Client State**: Jotai atoms for global client state
- **Form State**: Zod schemas for validation (generated from OpenAPI)

## Code Quality Standards

- Biome enforces consistent formatting (double quotes, 2-space indentation)
- TypeScript strict mode enabled with additional checks
- Unused imports/variables auto-removed on format
- Tailwind classes automatically sorted

## Important Notes

### ⚠️ Auto-generated Files (DO NOT EDIT)
- `src/server/api/configured_api.ts` - Orval-generated route composition
- `src/server/api/routes/*/context.ts` - API type definitions
- `src/app/generated/` - Client-side generated code
- `src/app/components/ui/*` - shadcn/ui components (modify with caution)

### 🔧 Configuration Points
- **API Routing**: Routes in `configured_api.ts` include `/api` prefix
- **DB Tables**: No prefix applied to table names
- **Biome Exclusions**: `validator.ts` allows `any` and `{}` types
- **React 19**: Concurrent features enabled

### 🐛 Troubleshooting
- **404 Errors**: Check existence of `/src/app/api/[[...route]]/route.ts`
- **Type Errors**: `z.infer` is a type utility, not a runtime function
- **API Path Duplication**: Verify `index.ts` basePath vs `configured_api.ts` routes
- **DB Connection**: Ensure `DATABASE_URL` is properly configured
- **Orval Generation**: Run `bun schema` after OpenAPI changes