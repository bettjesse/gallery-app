
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";



export default async function Home() {
  

  // Simulate session for testing
  const session =  await getServerAuthSession();

 

  return (
    <div className="flex flex-col items-center">
      {session ? (
        <div className="flex flex-col mt-12 w-full px-8 mb-4">
          <div className="flex items-center justify-between w-full mb-2">
            <h1 className="text-xl text-white font-semibold">My store</h1>
            <Link href= "/image">
           
            <button
              className="px-4 py-2 rounded bg-[#D927C7] text-white"
             
            >
              Add Picture
            </button>
            </Link>
          </div>
          <h4 className="text-sm text-[#212121]">My recent uploads</h4>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Placeholder for grid images */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-300 h-52 rounded-lg"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-12 w-full px-8 mb-4">
          <div className="flex items-center justify-between w-full mb-2">
            <h1 className="text-xl text-white font-semibold">Gallery</h1>
            <Link href= "/image">
            <button
              className="px-4 py-2 rounded bg-[#D927C7] text-white"
             
            >
              Add Picture
            </button>
            </Link>
          </div>
          <h4 className="text-sm text-[#212121]">Community Gallery</h4>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Placeholder for grid images */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-300 h-52 rounded-lg"></div>
            ))}
          </div>
        </div>
      )}

      {/* Render FormComponent if showForm is true */}
   
    </div>
  );
}
