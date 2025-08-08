import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { timing } from "hono/timing";
import type { Session } from "next-auth";
import app from "./configuredApi";
import { authMiddleware } from "./middleware/auth";

// Create the main Hono app
export const app_configured = new Hono<{
  Variables: {
    session: Session | null;
  };
}>().basePath("/");

// Global middleware
app_configured.use("*", timing());
app_configured.use("*", logger());
app_configured.use(
  "*",
  cors({
    origin: (origin) => origin,
    credentials: true,
  }),
);

// Add auth middleware
app_configured.use("*", authMiddleware);

// Health check endpoint
app_configured.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Mount routers
app_configured.route("/", app);
export default app_configured;

// Export type for client
export type ApiType = typeof app_configured;
