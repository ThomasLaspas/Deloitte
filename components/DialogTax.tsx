"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EditTask from "./EditTax"
import { useEffect, useState } from "react"
import { Getuser } from "@/actions/Getuser"
import { useToast } from "./ui/use-toast"

export function DialogDemo() {
    const { toast } = useToast()
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await Getuser();
                setUser(userData);

            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error fetching user data",
                    description: "Unable to fetch user data. Please try again later.",
                });

            }
        };

        fetchUser();
    }, []);

    return (
        <Dialog  >
            <DialogTrigger asChild>
                <Button variant="destructive" className="sm:text-xl lg:text-2xl text-lg">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when  done.
                    </DialogDescription>
                </DialogHeader>

                <EditTask user={user} />


            </DialogContent>
        </Dialog>
    )
}
