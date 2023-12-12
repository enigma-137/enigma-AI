import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
  
const testimonials = [
    {
        name: "Akofe", 
        avatar: "A",
        title: "Student",
        description: "Worked really great, it helped me answered questions fast"
    },
    {
        name: "Olajumoke", 
        avatar: "O",
        title: "Student",
        description: "It helped me in generating answers for my homework and explained some concepts for me"
    },
    {
        name: "Chef Emex", 
        avatar: "E",
        title: "Chef",
        description: "I have been using the ads copy generator to generate ads seamlessly for my products and it has been awesome"
    },
    {
        name: "Itunu", 
        avatar: "I",
        title: "Trader",
        description: "As a trader, I used the Ai to generate sales content "
    }

]
const LandingContent = () => {
  return (
    <div className=" px-10 pb-20  text-white py-36">
      <div> 
      <h1 className="text-center py-24 lg:text-[40px]"> Frequently <span className="font-bold bg-gradient-to-r from-pink-600 to-purple-900">Asked Questions</span> </h1>
        </div>  
  <div className="px-24">
  <Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-sm lg:text-lg text-left">Is it Free?</AccordionTrigger>
    <AccordionContent>
      Yeah you have free Generations upon sign up.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger className="text-sm lg:text-lg text-left">Can I download or copy the generated items?</AccordionTrigger>
    <AccordionContent>
      Yeah items generated are free to use anywhere.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-sm lg:text-lg text-left">Do I need to add my credited card?</AccordionTrigger>
    <AccordionContent>
      No, you can use Enigma without adding your card
    </AccordionContent>
  </AccordionItem>
</Accordion>
  </div>
     

     <div className="px-10 py-36"> 
     <h2 className="text-center text-4xl text-white font-semibold mb-10"><span className="bg-gradient-to-r from-pink-600 to-purple-900 ">Testi</span>monials</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {testimonials.map((testimonial) => (
            <Card key={testimonial.description} className="bg-[#192339] border-none text-white">
                <CardHeader>
                    <CardTitle className=" flex items-center gap-x-2">
                      <div>
                        <p className="text-lg" >{testimonial.name}</p>
                        <p className="text-sm text-zinc-400">{testimonial.title}</p>
                       
                      </div>
                      <p className="text-right ml-24 font-extrabold rounded-full bg-gradient-to-r from-pink-600 to-purple-900 ">{testimonial.avatar}</p>
                    </CardTitle>
                    <CardContent className="pt-4 px-0"> 
                        {testimonial.description}
                    </CardContent>
                </CardHeader>

            </Card>
         ))}
      </div>
     </div>

    </div>
  )
}

export default LandingContent