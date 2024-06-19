import { Getuser } from "@/actions/Getuser";
import Aiadvice from "@/components/Aiadvice";
import CreateForm from "@/components/CreateForm";
import { DialogDemo } from "@/components/DialogTax";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth()
  const user = await Getuser()

  if (!userId) {
    return (
      <div className="h-[80vh] grid place-items-center w-full sm:px-[4%] px-[6%] ">
        <div className="flex flex-col gap-5">
          <h1 className="sm:text-3xl lg:text-4xl text-lg">Login first to use our Ai feature</h1>
          <Button className="w-full cursor-pointer"><Link href="/sign-in" className="cursor-pointer">Sign-in</Link></Button>
        </div>
      </div>)
  }
  return (
    <div className="flex flex-col items-center h-full sm:px-[4%] px-[6%]  pt-3 w-full ">


      {user?.addTaxes ? <div className="flex flex-col gap-7 mt-4">
        <h1 className="sm:text-3xl lg:text-4xl text-lg text-center">We take your info, click the button bellow to generate our most efficient tax advice and get money back. Or if you think your info isnt correct you can edit.</h1>
        <div className="flex items-center justify-center "> <DialogDemo /> </div>
        <div className="flex items-center justify-center "> <Aiadvice /></div>


      </div> : <><h1 className="sm:text-3xl lg:text-4xl text-lg text-center mt-5">Fill the form bellow with your personal info, to help us give you better tax advice</h1><div className="border-2 rounded-xl border-primary p-5 text-center lg:w-1/2 sm:w-4/6  w-full mt-[5%]"><CreateForm /></div></>}</div>
  );
}
