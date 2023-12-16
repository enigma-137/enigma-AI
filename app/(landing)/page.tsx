import LandingContent from "@/components/landing-content"
import LandingHero from "@/components/landing-hero"
import { LandingNavbar } from "@/components/landing-navbar"


const landingPage = () => {
  return (
    <div className='h-full max-h-screen'>
       <LandingNavbar />
       <LandingHero />
       <LandingContent />

       <div className="bottom-0 text-center lg:text-center pt-4">
        <p className="pb-0 mb-0  text-sm text-center">
          An Experiment by <a href='https://twitter.com/enigma137x' target="_blank" className='font-bold text-purple-500'>Enigma</a>
        </p>
      </div>
    </div>

  )
}

export default landingPage