"use client"
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

import { useTypewriter } from 'react-simple-typewriter'
import { Button } from './ui/button'

const LandingHero = () => {


    const isSignedIn = useAuth()
    
      const [text] = useTypewriter({
        words: ['Conversation', 'Ads Copy Generation', 'Text Summarizing', 'Language Translation' , 'Code Generation',],
        loop: 0
      })
    

  return (
    <div className='py-36 text-center space-y-5'>

  <h1 className= "font-black p-8 text-white lg:text-[40px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2"> All in one AI platfom for <br /> &nbsp; 
  <span className='text-[80px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>{text}</span></h1>
   
    <div className='text-sm md:text-xl font-light text-zinc-400'>
        Boost your productivity using different AI tools 
    </div>

    <Link  href={isSignedIn ? "/dashboard" : "/sign-up"}>
        <Button className='mt-14 font-bold md:text-lg p-4 md:p-6' variant="premium">Start Generating for free</Button>
    </Link>
    </div>
  )
}

export default LandingHero