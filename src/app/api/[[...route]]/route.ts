import { handle } from "hono/vercel";
import app from "~/server/api";

// Export HTTP methods for Next.js App Router
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
