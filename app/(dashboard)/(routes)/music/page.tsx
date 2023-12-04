"use client"

import { Heading } from "@/components/heading"
import { Music4Icon, SendHorizonalIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import axios from "axios"
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


const Music = () => {

  const router = useRouter()
  const [music, setMusic] = useState<string>()
  // 1. Create a form, assign its type z.infer of the schema with an object default values of a prompt
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined)

      const response = await axios.post("/api/music", { values })
      setMusic(response.data.audio)
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
      <Heading title="Music Generation " description="Generate your own music by just describing it" icon={Music4Icon} iconColor="text-emerald-500" bgColor="bg-emerald-500/10" />
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
                      placeholder="Piano Solo " {...field} />
                  </FormControl>

                </FormItem>
              )} />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} >

                Generate

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
          {!music && !isLoading && (
            <div>
              <Empty label="No Music generated yet, start by typing a prompt" />
            </div>
          )}
          

             {music && (
              <audio controls className="w-full mt-8">
            <source src={music} />
             </audio>
             )}
        </div>
      </div>
    </div>
  )
}

export default Music