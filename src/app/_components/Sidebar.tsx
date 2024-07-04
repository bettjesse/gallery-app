

import { getServerAuthSession } from "~/server/auth";
import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";
const Sidebar = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="sticky top-0 px-8 my-5 rounded-lg py-4 flex flex-col ml-5 justify-between min-h-screen bg-[#606060]">
      <div className="p-6">
     
      </div>
      <div className="flex-grow flex flex-col justify-center items-center">
        <SidebarRoutes />
      </div>
      <div className="flex flex-col items-center">
        {session ? (
          <>
            <div className="flex items-center mb-2">
              {session.user?.name && (
                <>
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    {session.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2 text-white"> {session.user.name}</span>
                </>
              )}
            </div>
            <Link href="/api/auth/signout">
              <button className="px-16 py-2 rounded text-sm bg-[#757575] text-white">Sign Out</button>
            </Link>
          </>
        ) : (
          <Link href="/api/auth/signin">
            <button className="px-16 py-2 rounded text-sm  bg-[#757575] text-white">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

