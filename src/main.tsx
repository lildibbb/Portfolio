import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance with not found handling
const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => {
    // Log the error
    console.error("Router error:", error);
  },
  defaultPendingComponent: () => (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>
  ),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app with Toaster as a standalone component
// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
