import { hc } from "hono/client";
import type { ApiType } from "~/server/api";

/**
 * Type-safe API client for Hono endpoints
 *
 * Usage example:
 * ```ts
 * import { api } from "~/lib/api-client";
 *
 * // Get all users
 * const response = await api.users.$get();
 * const { data } = await response.json();
 *
 * // Create a post
 * const postResponse = await api.posts.$post({
 *   json: { name: "My new post" }
 * });
 * const newPost = await postResponse.json();
 * ```
 */

// Get the base URL for API calls
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Browser should use relative path
    return "";
  }
  if (process.env.VERCEL_URL) {
    // SSR should use Vercel URL
    return `https://${process.env.VERCEL_URL}`;
  }
  // Development SSR should use localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

// Create the typed client
export const api = hc<ApiType>(`${getBaseUrl()}/api/hono`);
