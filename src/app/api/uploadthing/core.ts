import { getServerAuthSession } from "~/server/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async (_req: Request) => {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    throw new UploadThingError("Unauthorized");
  }
  return { userId: session.user.id };
};

export const ourFileRouter = {
  galleryImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const { userId } = await handleAuth(req);
      return { userId }; // Pass the user ID to the middleware
    })
    .onUploadComplete(() =>{
         // Add any necessary logic here, even if it's just a comment
    }),

    galleryAttachment: f(["text", "image"])
    .middleware(async ({ req }) => {
        const { userId } = await handleAuth(req);
        return { userId }; // Pass the user ID to the middleware
      })
      .onUploadComplete(() =>{
       // any necessary logic here, even if it's just a comment
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
