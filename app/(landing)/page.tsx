import { Button } from '@/components/ui/button'
import React from 'react'
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { BotIcon } from 'lucide-react'

const landingPage = () => {
  return (
    <div className=''>
      <nav className="sticky h-14 mt-3 inset-0 top-0 z-30 w-full border-gray-200 bg-white/75 bg-blur-lg transition-all ">
       <MaxWidthWrapper>
       <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href='/' className="flex z-40 font-semibold">
            <span>Enigma</span> <BotIcon className='ml-1.5 h-5 w-5' /> </Link>

          {/* Mobile Navbar */}
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link href='/pricing' className={buttonVariants({
                variant: "ghost",
                size: "sm"
              })}>Pricing</Link>
              <Link href="/sign-in">
                <Button variant="default">Sign In</Button>
              </Link>

              <Link href="/sign-up">
                <Button variant="default">Register</Button>
              </Link>
            </>
          </div>
        </div>
       </MaxWidthWrapper>
       
        {/* <ArrowRight className="ml-1.5 h-5 w-5 animate-out"/> */}
      </nav>

      <div aria-hidden='true' className="pointer-event-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 ">
            <div style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 50.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%    )"
            }} className="relative left-[cal(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[cal(50%-30rem)] sm:w-[72.187rem]" />
        
          </div>
    </div>

  )
}

export default landingPage