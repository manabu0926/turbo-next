# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Next.js 15 application using the T3 Stack with TypeScript, featuring:
- **Framework**: Next.js 15 with App Router and Turbo
- **API Layer**: Hono framework for type-safe API routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js (v5 beta)
- **State Management**: Jotai for global state, React Query v5 for server state
- **Code Generation**: Orval for OpenAPI-based client/server code generation
- **Styling**: Tailwind CSS v4
- **Code Quality**: Biome for linting and formatting

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

**Database Access**: Drizzle ORM with PostgreSQL, table prefix `turbo-next_*`, connection via `DATABASE_URL`.

**Type Safety**: End-to-end type safety from OpenAPI → Zod validation → TypeScript types → React Query hooks.

### Path Aliases

- `~/*` maps to `./src/*` (configured in tsconfig.json)

## API Development Workflow

1. **Define API** in `openapi/openapi.yml` or component files
2. **Generate code**: Run `bun schema` to regenerate all API code
3. **Implement handlers**: Edit generated handler stubs in `src/server/api/routes/*/`
4. **Use in frontend**: Import generated React Query hooks from `src/app/generated/query/`

## Environment Configuration

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: NextAuth.js secret
- `NEXTAUTH_URL`: Application URL for auth callbacks
- Discord OAuth credentials (for authentication)

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

- Generated files in `configured_api.ts` and route handlers should not be manually edited (marked with Orval header)
- The API routes in `configured_api.ts` include the `/api` prefix in their paths
- Database tables use `turbo-next_` prefix via Drizzle's table creator
- React 19 with concurrent features enabled
- Next.js Turbo enabled for faster development builds