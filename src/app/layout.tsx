import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import Sidebar from "./_components/Sidebar";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Gallery-app",
  description: "This is a gallery application allowing users to post pictures",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="flex flex-col md:flex-row items-start bg-[#212121]">
          {/* Sidebar - only show on larger screens (md and up) */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <div className="min-h-screen flex-grow mr-3 mt-3 rounded-lg bg-[#3F3F3F]">
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
