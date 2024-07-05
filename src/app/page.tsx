import Link from "next/link";
import Image from "next/image";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import LikeButton from "./_components/like-button";

export default async function Home() {
  const session = await getServerAuthSession();

  // Fetch posts with user information
  const postsWithUser = await db.post.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      createdBy: {
        select: {
          name: true, // Selecting the 'name' field from the User relation
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col mt-12 w-full px-8 mb-4">
        {/* Login/Logout button visible only on mobile devices */}
        <div className="flex justify-end w-full mb-2 md:hidden">
          {session ? (
            

            
            <Link href="/api/auth/signout">
              <div className=" flex items-center space-x-2">
              <FiLogOut className="text-white text-2xl" />
           {/* <p>Logout</p>  */}
           </div>  
            </Link>
        
          ) : (
            <div className=" flex items-center">
            <Link href="/api/auth/signin">
              <FiLogIn className="text-white text-2xl" />
             {/* <p>Login</p>  */}
            </Link>
            </div>
          )}
        </div>

        <h1 className="text-xl text-white font-semibold">Gallery</h1>

        <div className="flex items-center justify-between w-full mb-2 mt-2">
          <h4 className="text-sm text-[#212121]">Community Gallery</h4>
          <Link href="/image">
            <button className="px-4 py-2 rounded bg-[#D927C7] text-white">
              Add Picture
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
  {/* Rendering posts */}
  {postsWithUser.map((post) => (
    <div key={post.id} className="relative group">
      {/* Image */}
      <div className="relative h-52 rounded-lg overflow-hidden">
        {post.pictureUrl && (
          <Image
            src={post.pictureUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 text-white group-hover:bg-opacity-0 transition-opacity duration-300">
        {/* Top left: User info */}
        {post.createdBy ? (
          <div className="flex items-center mb-2">
            <div className="bg-[#D927C7] rounded-full w-10 h-10 flex items-center justify-center mr-2">
              <span className="text-white font-semibold text-lg">
                {post.createdBy.name ? post.createdBy.name[0] : "-"}
              </span>
            </div>
            <span className="text-white font-semibold">
              By {post.createdBy.name}
            </span>
          </div>
        ) : (
          <div className="text-white font-semibold mb-2">Unknown User</div>
        )}

        {/* Bottom left: Title and Description */}
        <div className="mt-auto">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm mt-1">{post.description}</p>
        </div>

        {/* Bottom right: Heart icon */}
        <LikeButton postId={post.id} initialLiked={false} />
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
