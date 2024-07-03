import { db } from "~/server/db"
import Image from "next/image";
import Link from "next/link";
import LikeButton from "~/app/_components/like-button";

const ImageIdPage = async ({
    params
  }: {
    params: { userId: string}
  }) => {


   
   


  // Fetch the image based on imageId
  const myImages = await db.post.findMany({
    where: {
      createdById: params.userId // Filter by the user's ID
    },
    include: {
      createdBy: {
        select: {
          name: true
        }
      }
    }
  });
    return  (
      <div className="flex flex-col items-center">
      <div className="flex flex-col mt-12 w-full px-8 mb-4">
        <div className="flex items-center justify-between w-full mb-2">
          <h1 className="text-xl text-white font-semibold">My store</h1>
          <Link href="/image">
            <button className="px-4 py-2 rounded bg-[#D927C7] text-white">
              Add Picture
            </button>
          </Link>
        </div>
        <h4 className="text-sm text-[#212121]">My recent uploads</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Rendering posts */}
          {myImages?.map((post) => (
            <div key={post.id} className="relative">
              {/* Image */}
              <div className="relative h-52 rounded-lg overflow-hidden">
              {post.pictureUrl && (
  <div className="relative h-52 rounded-lg overflow-hidden">
    <Image
      src={post.pictureUrl}
      alt={post.title}
      layout="fill"
      objectFit="cover"
    />
  </div>
)}

              </div>

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 text-white">
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
                  <p className="text-sm mt-1">
                    {post.description}
                  </p>
                </div>

                {/* Bottom right: Heart icon */}
                <LikeButton postId={post.id} initialLiked={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    )
}
export default ImageIdPage