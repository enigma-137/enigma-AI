"use client"

import { Heading } from "@/components/heading"
import { Copy, CopyCheck, Languages, SendHorizonalIcon, ShoppingBagIcon } from "lucide-react"
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



type ChatCompletionMessageParam = {
  role: string;
  content: string;
};



const Translator = () => {

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
      const response = await axios.post("/api/translator", {
        messages: newMessages,
      })
      // 6 setmessages carry and arrow function with current and array, carrying the current, userM, and response
      setMessages((curent) => [...curent, userMessage, response.data]);
      form.reset();
  
    }
    catch (error: any) {
      // pro model
      console.log(error)

    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading title="Language Translator" description=" Paste text in any language to translate" icon={Languages} iconColor="text-emerald-700" bgColor="bg-emerald-700/10" />
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
                      placeholder="per aspera ad astra to English  " {...field} />
                  </FormControl>

                </FormItem>
              )} />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} >
                {/* <SendHorizonalIcon /> */}
               Translate

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
              <Empty label="No text to be translated yet" />
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
                   
                      {copied ? <CopyCheck /> : <Copy />}
                    
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

export default Translator