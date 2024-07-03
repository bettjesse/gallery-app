"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Assuming usePathname is correctly imported

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#606060] p-4 flex justify-around md:hidden rounded-md">
      <Link href="/">
        <p className={`text-white ${pathname === '/' ? 'text-[#D927C7]' : ''}`}> Community</p>
      </Link>
      <Link href="/my-store">
        <p className={`text-white ${pathname === '/my-store' ? 'text-[#D927C7]' : ''}`}>My Store</p>
      </Link>
    </div>
  );
};

export default BottomNavigation;
