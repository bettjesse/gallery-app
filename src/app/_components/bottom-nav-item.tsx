"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

interface BottomNavItemProps {
  label: string;
  href: string;
}

export const BottomNavItem = ({ label, href }: BottomNavItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "text-white text-sm font-[500] transition-all",
        isActive ? "text-[#D927C7]" : ""
      )}
    >
      {label}
    </button>
  );
};
