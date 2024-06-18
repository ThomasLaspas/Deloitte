import React from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

function Header() {
    return (
        <div className='w-full py-6 sm:px-[4%] px-[6%] flex items-center justify-between border-b-2 border-primary '>
            <section className='flex items-center'>
                <h1 className='sm:text-4xl'>AI tax advisor</h1>
            </section>

            <section className='flex items-center gap-6 cursor-pointer '>

                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>


            </section>


        </div>
    )
}

export default Header