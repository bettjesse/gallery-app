import { getServerAuthSession } from '~/server/auth';
import { BottomNavItem } from './bottom-nav-item';

const BottomNavigation = async() => {
  const session = await getServerAuthSession();

  const routes = [
    {
      label: "Community",
      href: "/",
    },
    {
      label: "My Store",
      href: session?.user ? `/my-store/${session.user.id}` : "/api/auth/signin",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#606060] p-4 flex justify-around md:hidden rounded-md">
      {routes.map((route) => (
        <BottomNavItem
          key={route.href}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default BottomNavigation;
