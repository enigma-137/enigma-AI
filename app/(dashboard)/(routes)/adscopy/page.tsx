"use client"

import { Heading } from "@/components/heading"
import { Copy, CopyCheck, SendHorizonalIcon, ShoppingBagIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import axios from "axios"
import { ChatCompletionMessageParam as ImportedMessageParam } from "openai/resources/index.mjs"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { UseAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useProModal } from "@/hooks/use-pro-model"
import toast from "react-hot-toast"



type ChatCompletionMessageParam = {
  role: string;
  content: string;
};



const Adscopy = () => {

  const proModal = useProModal()

  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    // Set the copied state to true for a brief moment to provide user feedback
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])
  // 1. Create a form, assign its type z.infer of the schema with an object default values of a prompt
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  //  2 create the loading state and create the onSubmit function
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // 3. Create an Object with the type completion message with some keyV pairs role & value content
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,  //user message
      }
      // 4. create an array using all existing messages and then the new user message
      const newMessages = [...messages, userMessage];

      //5 create the post api request and assign an object messages to be new messages
      const response = await axios.post("/api/adscopy", {
        messages: newMessages,
      })
      // 6 setmessages carry and arrow function with current and array, carrying the current, userM, and response
      setMessages((curent) => [...curent, userMessage, response.data]);
  
    }
    catch (error: any) {
      // pro model
      if(error?.response?.status === 403){
        proModal.onOpen()
               }else{
                toast.error("Something went wrong")
               }

    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading title="Ads Copy Generation" description=" Generate Advertising Copy from your product name and description  " icon={ShoppingBagIcon} iconColor="text-pink-700" bgColor="bg-pink-700/10" />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg px-3 border w-full md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField name="prompt" render={({ field }) => (
                // field > item > control > input 
                <FormItem className=" col-span-12 lg:col-span-10" >
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent  "
                      disabled={isLoading}
                      placeholder="Fashion Walks, Best grade shoes and sneakers  " {...field} />
                  </FormControl>

                </FormItem>
              )} />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} >
                {/* <SendHorizonalIcon /> */}
               {messages.length > 1 && !isLoading ? "Regenerate" : "Generate"}

              </Button>
            </form>

          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className=" p-8 rounded-lg w-full items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No Copy generated yet" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4 ">
            {
              messages.map((message) => (
                <div
                  key={message.content}
                  className={cn("p-8 w-full flex gap-x-8 items-start rounded-lg",
                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                  )} >
                  {message.role === "user" ? <UseAvatar /> : <BotAvatar />}



                  <p className="text-sm text-muted-foreground">
                    {message.content}</p>


                  <CopyToClipboard text={message.content} onCopy={handleCopyToClipboard}>
                   
                      {copied ? <CopyCheck className="h-24 w-24" /> : <Copy className="h-24 w-24" />}
                    
                  </CopyToClipboard>
                </div>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Adscopy