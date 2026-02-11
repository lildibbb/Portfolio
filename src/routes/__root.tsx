import { Outlet, createRootRoute } from "@tanstack/react-router";
import { MainNav } from "@/components/main-nav";

export const Route = createRootRoute({
  // beforeLoad: ({ context }) => {
  // 	if (!context.auth.isAuthenticated) {
  // 		throw redirect({ to: "/login" });
  // 	}
  // 	// Redirect root to dashboard
  // 	throw redirect({ to: "/dashboard" });
  // },

  component: () => (
    <div className="min-h-screen relative pb-24 bg-background text-foreground">
      <MainNav />
      <Outlet />
    </div>
  ),
});
