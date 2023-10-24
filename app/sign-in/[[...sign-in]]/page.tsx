import { SignIn } from '@clerk/nextjs'

import React from 'react'

function SignInPage() {
  return (
    <section className='flex items-center justify-center w-full min-h-[92vh]'>
      <SignIn/>
    </section>
  )
}

export default SignInPage