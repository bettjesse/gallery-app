import { db } from "~/server/db"; // Import database instance.
import Image from "next/image"; // Import Image component from Next.js.
import Link from "next/link"; // Import Link component from Next.js for client-side navigation.
import LikeButton from "~/app/_components/like-button"; // Import LikeButton component.

const ImageIdPage = async ({
  params
}: {
  params: { userId: string}
}) => {
  // Fetch images based on user ID from params
  const myImages = await db.post.findMany({
    where: {
      createdById: params.userId // Filter by the user's ID
    },
    include: {
      createdBy: {
        select: {
          name: true // Select the user's name
        }
      }
    }
  });

  // If no images found for the user, display a message and a link to the home page
  if (!myImages || myImages.length === 0) {
    return (
      <div className="flex flex-col items-center mt-12">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">My Store</h1>
        <p className="text-lg text-gray-600 mb-8">You have no posts yet.</p>
        <Link href="/">
          <a className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">
            Go to Home Page
          </a>
        </Link>
      </div>
    );
  }

  // Render the page with images if they exist
  return (
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
          {/* Rendering each image post */}
          {myImages?.map((post) => (
            <div key={post.id} className="relative">
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

                {/* Bottom right: Like button */}
                <LikeButton postId={post.id} initialLiked={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageIdPage;
