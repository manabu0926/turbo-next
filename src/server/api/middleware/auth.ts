import type { Context, Next } from "hono";
import { auth } from "@/server/auth";

/**
 * Authentication middleware for Hono routes
 * Adds the session to the context for use in route handlers
 */
export async function authMiddleware(c: Context, next: Next) {
  try {
    // Get the session from NextAuth
    const session = await auth();

    // Add session to context
    c.set("session", session);

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    c.set("session", null);
    await next();
  }
}

/**
 * Protected route middleware - requires authentication
 * Returns 401 if no session is found
 */
export async function requireAuth(c: Context, next: Next) {
  const session = await auth();

  if (!session) {
    return c.json(
      {
        success: false,
        error: "Authentication required",
      },
      401,
    );
  }

  c.set("session", session);
  await next();
}
