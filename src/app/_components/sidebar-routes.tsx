
import { SidebarItem } from "./sidebar-item";
import { getServerAuthSession } from "~/server/auth";


export const SidebarRoutes = async() => {
    const session = await getServerAuthSession()

    const routes = [
        {
          label: "Community",
          href: "/",
        },
        {
          label: "My Store",
          href: `/my-store/${session?.user.id}`,
        },
      ];
 
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
