"use server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/utils/db"
import { revalidatePath } from "next/cache"
import { cache } from "react"




export const Getuser = cache(async () => {

    const { userId } = auth()

    if (!userId) {
        return
    }

    const user = await prisma.users.findFirst({
        where: { id: userId },

    })

    return user


})