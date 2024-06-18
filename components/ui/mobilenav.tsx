"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from './Togglemode'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'
import { HomeIcon, Crosshair2Icon, RocketIcon, DashboardIcon } from '@radix-ui/react-icons'
function Mobilenav() {
    const path = usePathname()
    return (
        <div className='sm:hidden flex'>
            <Sheet >
                <SheetTrigger><HamburgerMenuIcon /></SheetTrigger>
                <SheetContent side={'left'} className='w-full'>
                    <SheetHeader>
                        <section className='flex items-center justify-between mt-8 '>
                            <ModeToggle />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>


                        </section>
                        <SheetDescription>
                            <div className="flex flex-col  gap-4 w-fullt mt-10">
                                <Button
                                    variant="ghost"
                                    className={path === "/learn" ? "bg-primary" : ""}

                                >
                                    {" "}
                                    <Link
                                        href="/learn"
                                        className=" w-full text-start flex items-center gap-3"
                                    >
                                        <HomeIcon />
                                        Learn
                                    </Link>{" "}
                                </Button>
                                <Button variant="ghost"
                                    className={path === "/leaderboard" ? "bg-primary" : ""}>

                                    <Link
                                        href="/leaderboard"
                                        className=" w-full text-start flex items-center gap-3"
                                    >
                                        <Crosshair2Icon />
                                        Leaderboard
                                    </Link>{" "}
                                </Button>
                                <Button variant="ghost"
                                    className={path === "/quests" ? "bg-primary" : ""}>

                                    <Link
                                        href="/quests"
                                        className=" w-full text-start flex items-center gap-3"
                                    >
                                        <RocketIcon />
                                        Quests
                                    </Link>
                                </Button >
                                <Button variant="ghost"
                                    className={path === "/shop" ? "bg-primary" : ""}>

                                    <Link
                                        href="/shop"
                                        className=" w-full text-start flex items-center gap-3"
                                    >
                                        <DashboardIcon /> Shop{" "}
                                    </Link>{" "}
                                </Button >



                            </div >

                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Mobilenav