import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import Sidebar from "./_components/Sidebar";
import { ToastProvider } from "~/components/providers/ToastProvider";
import { TRPCReactProvider } from "~/trpc/react";
import BottomNavigation from "./_components/bottom-nav";

export const metadata = {
  title: "Gallery-app",
  description: "This is a gallery application allowing users to post pictures",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-[#212121] text-white">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar - only show on larger screens (md and up) */}
          <div className="md:block hidden w-72">
            <Sidebar />
          </div>

          <div className="flex-1 min-h-screen my-0  md:my-5 mr-0 md:mr-5 rounded-md bg-[#3F3F3F] relative">
            <ToastProvider/>
              <TRPCReactProvider>{children}</TRPCReactProvider>
              <BottomNavigation/>
            
          </div>
        </div>
      </body>
    </html>
  );
}
