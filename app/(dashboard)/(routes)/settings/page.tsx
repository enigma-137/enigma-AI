import { Heading } from "@/components/heading"
import { Settings } from "lucide-react"
import Link from "next/link"

const SettingPage =()=> {
    return (
        <div>
        <Heading  title="Settings" icon={Settings} description="Manage Account settings" iconColor="text-gray-700" bg-bgColor="text-gray-700/10"/>

        <h1 className="text-center justify-center"> Your free Trial is expired  Please contact us via <span className="font-bold text-green-700"><Link href="https://wa.me/2349053386778" target="_blank">+234-9053386778</Link>  </span> on whatsapp</h1>
        </div>
    )
}

export default SettingPage