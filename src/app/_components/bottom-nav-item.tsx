"use client"; 

import { usePathname, useRouter } from "next/navigation"; 
import { cn } from "~/lib/utils"; 

interface BottomNavItemProps {
  label: string;
  href: string;
}

// Component for each bottom navigation item.
export const BottomNavItem = ({ label, href }: BottomNavItemProps) => {
  const pathname = usePathname(); // Get the current path.
  const router = useRouter(); // Get the router instance.

  // Determine if the current path matches the item's href.
  const isActive = pathname === href;

  // Handle the click event to navigate to the specified href.
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "text-white text-sm font-[500] transition-all",
        isActive ? "text-[#D927C7]" : "" // Apply active style if the item is active.
      )}
    >
      {label} {/* Display the label for the navigation item. */}
    </button>
  );
};
