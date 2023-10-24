import React from 'react'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs'

async function Profile() {
  const user = await currentUser()
  return (
    <main className='container' >
      <section className='min-h-[90vh] w-full bg-gray-400 rounded-lg'>
        <figure>
          {user?.imageUrl && <Image src={user?.imageUrl} width={100} height={100} alt='User_Image' />}
        </figure>
        <section>
          <h3>{user?.firstName}{" "}{user?.lastName}</h3>
        </section>
      </section>
    </main>
  )
}

export default Profile