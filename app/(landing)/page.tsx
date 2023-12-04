import { Button } from '@/components/ui/button'
import React from 'react'
import Link from "next/link"

const landingPage = () => {
  return (
    <div>
      <div> landingPage (not protected)</div>

      <Link href="/sign-in">
        <Button variant="default">Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="default">Register</Button>
      </Link>
    </div>

  )
}

export default landingPage