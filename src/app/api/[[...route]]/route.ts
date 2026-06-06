import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";
const app = new Hono().basePath("/api");

// Placeholder route to test if Hono is working
app.get("/hello", (c) => {
  return c.json({
    message: "Hono API is active!",
    status: "online",
    user: "furqan-dev",
  });
});

/**
 * Map your existing routes here.
 * Ensure the paths match your new project structure.
 * Example:
 * app.post("/contact", async (c) => {
 */

// Export handlers for Next.js App Router
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
