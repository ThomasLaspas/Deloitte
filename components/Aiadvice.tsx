"use client"
import React, { useState, useTransition } from 'react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { Aigenerator } from '@/actions/Aitax'
import { TextGenerateEffect } from './ui/text-generate-effect'

function Aiadvice() {
    const { toast } = useToast()
    const [pedding, startTransition] = useTransition()
    const [advice, setAdvice] = useState<string | null>(null)
    const aitax = async () => {
        startTransition(() => {
            Aigenerator().then((generatedAdvice) => {
                setAdvice(generatedAdvice.content);

            })
                .catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "Please try again.",

                    })
                })
        })
    }
    return (
        <div className='w-full text-center grid place-items-center gap-7'>
            <Button className="sm:text-xl lg:text-2xl text-lg" onClick={aitax} disabled={pedding}> tax advice</Button>
            {advice ? <div className="sm:w-4/6 w-full p-6 rounded-3xl gap-x-6 bg-primary text-black border-black text-justify overflow-auto " >
                <TextGenerateEffect className=" text-center" words={advice} />
            </div> : null}
        </div>
    )
}

export default Aiadvice