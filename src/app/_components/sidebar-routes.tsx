import { SidebarItem } from "./sidebar-item"; 
import { getServerAuthSession } from "~/server/auth"; 

export const SidebarRoutes = async () => {
  const session = await getServerAuthSession(); // Fetch the current session.

  // Define the routes for the sidebar, including session-based redirection.
  const routes = [
    {
      label: "Community",
      href: "/",
    },
    {
      label: "My Store",
      href: session?.user ? `/my-store/${session.user.id}` : "/api/auth/signin", // Redirect to sign-in if no session.
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href} // Unique key for each route item.
          label={route.label} // Label for the navigation item.
          href={route.href} // URL for the navigation item.
        />
      ))}
    </div>
  );
};
