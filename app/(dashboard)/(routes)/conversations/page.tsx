"use client"

import { Heading } from "@/components/heading"
import { MessageSquare, SendHorizonalIcon } from "lucide-react"
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
import { useProModal } from "@/hooks/use-pro-model"
import toast from "react-hot-toast"

type ChatCompletionMessageParam = {
  role: string;
  content: string;
};



const Conversation = () => {

  const proModal = useProModal()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])
  // 1. Create a form, assign its type z.infer of the schema with an object default values of a prompt
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  //  create the loading state and create the onSubmit function
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //  Create an Object with the type completion message with some keyV pairs role & value content
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,  //user message
      }
      // . create an array using all existing messages and then the new user message
      const newMessages = [...messages, userMessage];

      // create the post api request and assign an object messages to be new messages
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      })
      //  setmessages carry and arrow function with current and array, carrying the current, userM, and response
      setMessages((curent) => [...curent, response.data, userMessage,]);
      form.reset();
    }
    catch (error: any) {
      // pro modal
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error("Something went wrong")
      }

    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading title="Conversations" description="Feel free to ask me any question" icon={MessageSquare} iconColor="text-violet-500" bgColor="bg-violet-500/10" />
      <div className="px-4 lg:px-8">
       
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className=" p-8 rounded-lg w-full items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No Conversation started yet" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4 ">
            {
              messages.map((message) => (
                <div
                  key={message.content}
                  className={cn("p-8 w-full flex gap-x-8 items-start rounded-lg",
                    message.role === "user" ? "bg-purple-200 font-medium border border-black/10" : "bg-muted font-medium"
                  )}

                >
                  {message.role === "user" ? <UseAvatar /> : <BotAvatar />}
                  <p className="text-sm" >
                    {message.content}
                  </p>
                </div>
              ))
            }

          </div>
        </div>

        <div className="py-9 sticky">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg px-3 border w-full md:px-6 focus-within:shadow-sm flex justify-between gap-2"
            >
              <FormField name="prompt" render={({ field }) => (
                // field > item > control > input 
                <FormItem className=" col-span-12 lg:col-span-12 w-full" >
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full  "
                      disabled={isLoading}
                      placeholder="How do I calculate the area of a trapezium? " {...field} />
                  </FormControl>

                </FormItem>
              )} />
              <div>
              <Button variant="default" className="lg:col-span-12 lg:w-full w-full   " disabled={isLoading} >
              <SendHorizonalIcon className="ml-2 h-6 w-6" />

              </Button>

              </div>
            
            </form>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default Conversation