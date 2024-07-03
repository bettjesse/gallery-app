"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

interface SidebarItemProps {
  label: string;
  href: string;
}

export const SidebarItem = ({ label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
  (pathname === "/" && href === "/") || // Exact match for home route
  pathname === href || // Exact match for other routes
  (pathname.startsWith(href) && href !== "/"); // Prefix match for nested routes

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-white text-sm font-[500] pl-6 transition-all ",
        isActive && "bg-[#D927C7] text-white rounded-lg"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        {label}
      </div>
    </button>
  );
};
