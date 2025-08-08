// Type definitions for Hono client - fixes TypeScript issues with hc client
declare module "hono/client" {
  export function hc<T>(baseUrl: string, options?: RequestInit): T;
}
