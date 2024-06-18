"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState, useTransition } from "react"
import { CreateTax } from "@/actions/Createtax"
import { useToast } from "./ui/use-toast"
import { Getuser } from "@/actions/Getuser"


const formSchema = z.object({
    salary: z.string().min(1, {
        message: "Salary must have atleast one digit",
    }),
    HouseNumber: z.string(),
    Location: z.string(),
    Expenses: z.string(),
    Status: z.string({
        required_error: "Please select a status.",
    }),
    Employment: z.string({
        required_error: "Please select ayour current Employment .",
    })
})

function EditTask({ user }: { user: any }) {
    const { toast } = useToast()

    const [pedding, startTransition] = useTransition()



    // Define the  form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            salary: user.salary?.toString() || "",
            HouseNumber: user.houseNoumber?.toString() || "0",
            Location: user.location,
            Expenses: user.Expenses,
            Status: user.mariedStatus,
            Employment: user.EmploymentInfo


        },
    })

    // Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {

        const sal = parseFloat(values.salary);
        const housen = parseInt(values.HouseNumber)
        startTransition(() => {
            CreateTax({
                EmploymentInfo: values.Employment,
                sal: sal,
                housen: housen,
                location: values.Location,
                mariedStatus: values.Status,
                Expenses: values.Expenses,
            }).then(() => {
                toast({

                    title: "Succes",
                    description: "We received your info.",

                })
            })
                .catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "Please try again.",

                    })
                })
        })
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="sm:text-xl">Salary</FormLabel>
                                <FormControl className="w-full">
                                    <Input placeholder="Salary" {...field} className="w-full" />
                                </FormControl>
                                <FormDescription>
                                    Write the value only without , or .
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="HouseNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sm:text-xl">Number of houses</FormLabel>
                                <FormControl>
                                    <Input  {...field} placeholder="0" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                    <FormField
                        control={form.control}
                        name="Location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sm:text-xl">Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Location" {...field} />
                                </FormControl>
                                <FormDescription>
                                    If you have more than one house use , bettween your house locations.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Expenses"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sm:text-xl">Expenses</FormLabel>
                                <FormControl>
                                    <Input placeholder="Expenses" {...field} />
                                </FormControl>
                                <FormDescription>
                                    If you dont have any expenses, just write none.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                    <FormField
                        control={form.control}
                        name="Status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sm:text-xl">Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Your marital status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Unmaried">Unmaried</SelectItem>
                                        <SelectItem value="Maried">Maried</SelectItem>


                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Employment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sm:text-xl">Employment</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your current Employment" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Unemployed">Unemployed</SelectItem>
                                        <SelectItem value="Fulltime">Full time</SelectItem>
                                        <SelectItem value="Parttime">Part time</SelectItem>
                                        <SelectItem value="Freelancer">Freelancer</SelectItem>
                                        <SelectItem value="Selfemployed">Self employed</SelectItem>


                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" disabled={pedding}>Submit</Button>
            </form>
        </Form>
    )
}

export default EditTask