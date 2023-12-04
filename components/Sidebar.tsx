"use client"

import Image from "next/image"
import Link from "next/link"
import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Code, ImageIcon, Languages, LayoutDashboard, MessageSquare, Music2, Settings, ShoppingBasket, SunIcon, VideoIcon } from "lucide-react"

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",

  },
  {
    label: "Conversation",
    href: "/conversations",
    icon: MessageSquare,
    color: "text-violet-500",

  },
  {
    label: "Ads Copy Generator",
    href: "/adscopy",
    icon: ShoppingBasket,
    color: "text-pink-500",

  },
  {
    label: "Image Generator",
    href: "/image",
    icon: ImageIcon,
    color: "text-orange-700",

  },
  {
    label: "Language Translator",
    href: "/translator",
    icon: Languages,
    color: "text-emerald-700",

  },
  {
    label: "Text Summarizer",
    href: "/summary",
    icon: SunIcon,
    color: "text-yellow-700",

  },
  {
    label: "Code Generator",
    href: "/code",
    icon: Code,
    color: "text-blue-700",

  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings

  },
]

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <div className="space-y-4 py-4 flex flex-col text-white h-full bg-[#111827] ">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image alt="logo" className="rounded-full" width={110} height={118} src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>Enigma</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link href={route.href} key={route.href} className={cn("rounded-lg text-sm p-3 group flex justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition", pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
              <div className="flex items-center">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Sidebar