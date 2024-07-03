import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export const POST = async (req: Request) => {
    const session = await getServerAuthSession();

    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { postId } = await req.json();
    const { user } = session;
    const userId = user.id;

    try {
        // Check if the post exists
        const existingPost = await db.post.findUnique({ where: { id: postId } });
        if (!existingPost) {
            return new NextResponse('Post not found', { status: 404 });
        }

        // Check if the user has already liked this post
        const existingLike = await db.like.findFirst({
            where: {
                postId: postId,
                userId: userId,
            },
        });

        if (existingLike) {
            // Unlike the post if already liked
            await db.like.delete({ where: { id: existingLike.id } });
            return NextResponse.json({ message: 'Post unliked' });
        } else {
            // Like the post if not already liked
            const newLike = await db.like.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });
            return NextResponse.json(newLike);
        }
    } catch (error) {
        console.log('[LIKE_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
