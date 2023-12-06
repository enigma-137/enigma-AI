"use client"

import { useProModal } from "@/hooks/use-pro-model"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge";
import { Check, CheckCircle, Code2, Image, Languages, MessageSquare, Music2, ShoppingBasket, SunMediumIcon, Video, Zap } from "lucide-react"
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const tools = [
  {
    label: "Conversations",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"

  },
  {
    label: "Ads Copy Generation",
    icon: ShoppingBasket,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"

  },

  {
    label: "Image Generation",
    icon: Image,
    color: "text-orange-700",
    bgColor: "bg-orange-500/10"

  },
  {
    label: "Language Translator",
    icon: Languages,
    color: "text-emerald-700",
    bgColor: "bg-emerald-500/10"

  },
  {
    label: "Text Summarizer",
    icon: SunMediumIcon,
    color: "text-yellow-700",
    bgColor: "bg-yellow-500/10"

  },
  {
    label: "Code Generation",
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"

  },
]

export const ProModal = ()=> {

    const proModal = useProModal();

    return (
       <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
<DialogContent>
    <DialogHeader>
        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
      <div className="flex items-center gap-x-2 py-1">
      Upgrade to Pro
        <Badge variant="premium" className="uppercase rounded-lg text-sm py-1 ">
        Pro
       </Badge>
        </div> 
        </DialogTitle>
        <DialogDescription className="text-center p-2 space-y-2 text-zinc-900 font-medium">
      {tools.map((tool)=> (
        <Card key={tool.label} className="flex items-center justify-between border-black/5">
            <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)}/>
                  
                </div>
                <div className="font-semibod text-sm"> {tool.label}</div>
               
                 </div>
                 <Check className="text-primary h-5 w-5" />
             </Card>
      ))}
        </DialogDescription>
    </DialogHeader>
    <DialogFooter> 
        <Button variant="premium" size="lg" className="w-full"> Upgrade <Zap className="ml-2 fill-white h-5 w-5" /></Button>
    </DialogFooter>
</DialogContent>
       </Dialog>
    )
}