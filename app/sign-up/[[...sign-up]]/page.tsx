import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpPage() {
  return (
    <section className='w-full min-h-[92vh] flex items-center justify-center'>
        <SignUp/>
    </section>
  )
}

export default SignUpPage