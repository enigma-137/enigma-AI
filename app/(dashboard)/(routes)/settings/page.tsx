import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { PhoneCall, Settings } from "lucide-react"
import Link from "next/link"

const SettingPage =()=> {
    return (
        <div className="">
        <Heading  title="Settings" icon={Settings} description="Manage Account settings" iconColor="text-gray-700" bg-bgColor="text-gray-700/10"/>

        <div className="text-xl font-medium px-9 flex justify-center py-28 ">If your free Trial is expired  Please contact us via  
         <span className="font-medium">
            <Button className="mx-4"> 
            
            <Link href="https://wa.me/2349053386778" target="_blank"><PhoneCall className="h-4 w-5" />   </Link> 
           
            </Button>
           
            on whatsapp
         </span> 
         </div>
        </div>
    )
}

export default SettingPage