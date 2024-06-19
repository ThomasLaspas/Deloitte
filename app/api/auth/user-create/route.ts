import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { currentUser, auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
    try {
      

        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        let dbUser = await prisma.users.findUnique({
            where: {
                id: user.id,
            },
        });

        if (!dbUser) {
            dbUser = await prisma.users.create({
                data: {
                    id: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    Name: user.firstName||null,
                    LastName: user.lastName||null,
                },
            });
            console.log("User created successfully");
            return NextResponse.redirect(new URL('/', request.url));
        }
        revalidatePath("/")
        

        return NextResponse.redirect(new URL('/', request.url));
    } catch (error) {
        console.error("Error in API handler:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
