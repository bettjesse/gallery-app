import { NextResponse } from "next/server"; 
import { getServerAuthSession } from "~/server/auth"; 
import { db } from "~/server/db"; // Import database instance.


export const POST = async (req: Request) => {
    const session = await getServerAuthSession(); 

    // If no session or user is found, return Unauthorized response.
    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { user } = session; // Extract user information from the session.
    const userId = user.id; // Assuming session.user contains an id field.

    try {
        const { title, description, pictureUrl } = await req.json(); // Extract title, description, and pictureUrl from request body.

        // Validate required fields.
        if (!title || !description || !pictureUrl) {
            return new NextResponse('Title, description, and picture URL are required', { status: 400 });
        }

        // Create a new post in the database.
        const post = await db.post.create({
            data: {
                title,
                description,
                pictureUrl,
                createdById: userId, // Associate the post with the current user.
            },
        });

        // Return the created post as JSON response.
        return NextResponse.json(post);
    } catch (error) {
        console.log('[POST]', error); // Log any errors that occur during the process.
        return new NextResponse('Internal Error', { status: 500 }); // Return an internal server error response.
    }
};
