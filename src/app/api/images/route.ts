import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export const POST = async (req: Request) => {
    const session = await getServerAuthSession();

    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { user } = session;
    const userId = user.id; // Assuming session.user contains an id field

    try {
        const { title, description, pictureUrl } = await req.json();

        if (!title || !description || !pictureUrl) {
            return new NextResponse('Title, description, and picture URL are required', { status: 400 });
        }
        const post = await db.post.create({
            data: {
                title,
                description,
                pictureUrl,
                createdById: userId,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log('[POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
