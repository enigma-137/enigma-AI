import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { PhoneCall, Settings, Twitter } from "lucide-react"
import Link from "next/link"

const SettingPage =()=> {
    return (
        <div className="">
        <Heading  title="Settings" icon={Settings} description="Manage Account settings" iconColor="text-gray-700" bg-bgColor="text-gray-700/10"/>

        <div className="text-xl font-medium px-9 flex justify-center py-28 ">If your free Trial is expired  Please contact us via  Whatsapp or Twitter
         <span className="font-medium">
          
           
       
         </span> 
         </div>
         <div className="flex text-center justify-center ">
         <Button className="mx-4 bg-blue-600" size="lg"> 
            
            <Link href="https://wa.me/2349053386778" target="_blank"><Twitter className=" h-4 w-5" />   </Link> 
           
            </Button>
            <Button className="mx-4 bg-green-800" size="lg"> 
            
            <Link href="https://twitter.com/enigma137x" target="_blank"><PhoneCall className="h-4 w-5" />   </Link> 
           
            </Button>
         </div>
        
        </div>
    )
}

export default SettingPage