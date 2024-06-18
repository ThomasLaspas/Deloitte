"use server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/utils/db"
import { revalidatePath } from "next/cache"
import { cache } from "react"

interface CreateProps {
    EmploymentInfo: string;
    sal: number;
    housen: number;
    location: string;
    mariedStatus: string;
    Expenses: string
}


export const CreateTax = async ({ EmploymentInfo, sal, housen, location, mariedStatus, Expenses }: CreateProps) => {

    const { userId } = auth()

    if (!userId) {
        throw new Error("unauthorized")
    }

    await prisma.users.update({
        where: { id: userId },
        data: {
            EmploymentInfo: EmploymentInfo,
            mariedStatus: mariedStatus,
            Expenses: Expenses,
            location: location,
            houseNoumber: housen,
            salary: sal,
            addTaxes: true
        }
    })
    revalidatePath("/")

}
