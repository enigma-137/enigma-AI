"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ArrowRight, Code2, Image, Languages, MessageSquare, ShoppingBasket, SunMediumIcon, Video } from "lucide-react"

const tools = [
  {
    label: "Conversations",
    icon: MessageSquare,
    color: "text-violet-500",
    href: "/conversations",
    bgColor: "bg-violet-500/10"

  },
  {
    label: "Ads Copy Generation",
    icon: ShoppingBasket,
    color: "text-pink-500",
    href: "/adscopy",
    bgColor: "bg-violet-500/10"

  },

  {
    label: "Image Generation",
    icon: Image,
    color: "text-orange-700",
    href: "/image",
    bgColor: "bg-violet-500/10"

  },
  {
    label: "Language Translator",
    icon: Languages,
    color: "text-emerald-700",
    href: "/translator",
    bgColor: "bg-violet-500/10"

  },
  {
    label: "Text Summarizer",
    icon: SunMediumIcon,
    color: "text-yellow-700",
    href: "/summary",
    bgColor: "bg-violet-500/10"

  },
  {
    label: "Code Generation",
    icon: Code2,
    color: "text-blue-500",
    href: "/code",
    bgColor: "bg-violet-500/10"

  },
]



const DashboardPage = () => {

  const router = useRouter();
  return (
    <div>
    <div className="mb-4 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        An all in one AI platform
      </h2>


      <p className="text-muted-foreground font-light text-sm md:text-lg text-center "> Increase your productivity with AI</p>
    </div>
    <div className="px-4 md:px-20 lg:px-32 space-y-4">
       {
        tools.map((tool) => (
          <Card 
          onClick={()=> router.push(tool.href)}
          key={tool.href} 
         
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer ">
          <div className="flex items-center gap-x-4">
            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn("w-8 h-8", tool.color)} />
            </div>
           
            <div className="font-semibold"> {tool.label}</div>
          </div>
          <ArrowRight className="w-5 h-5"/>
          </Card>
          
     
        ))
       }

    </div>
    </div>
  )
}
export default DashboardPage