import React from 'react'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs'
import { fetchUserByClerkUserId } from '@/utils/actions/actions'
import { User } from '@clerk/nextjs/dist/types/server'
import { IUserModel } from '@/models/user.Model'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Follow from '@/app/components/Follow'
import {BsArrowDownShort} from 'react-icons/bs'


async function Profile() {
  const user: User | null = await currentUser()
  let dbUser: IUserModel;
  if (user) {
    dbUser = await fetchUserByClerkUserId(user.id)
  } else {
    redirect('/sign-in')
  }

  return (
    <main className='container' >
      <section className='min-h-[90vh] w-full bg-gray-400 rounded-lg flex items-center flex-col py-2 gap-2'>
        <figure>
          {dbUser?.profileImg && <Image src={dbUser?.profileImg} width={150} height={150} className='rounded-full' alt='User_Image' />}
        </figure>
        <section className='text-2xl font-semibold'>
          {`${dbUser?.firstName} ${dbUser?.middleName} ${dbUser?.lastName} `}
        </section>
        <section className='flex flex-col items-center'>
          <span>{`Email : ${dbUser.email}`}</span>
          <span>{`Address : ${dbUser.address}`}</span>
        </section>
        <section className='flex flex-col flex-wrap w-full gap-1 rounded-md bg-gray-500'>
          {/* Followers section */}
          <section className='px-2 py-2 flex flex-col gap-2'>
          <h3 className="text-lg">Followers</h3>
          <Follow dbUser={dbUser} />
          <Follow dbUser={dbUser} />
          <Follow dbUser={dbUser} />
          <button className='w-full flex items-center justify-center'> <span className='animate-bounce'><BsArrowDownShort/></span> </button>
          </section>
          {/* Following section */}
          <section className='px-2 py-2 flex flex-col gap-2'>
          <h3 className='text-lg' >Following</h3>
          <Follow dbUser={dbUser} />
          <Follow dbUser={dbUser} />
          <Follow dbUser={dbUser} />
          <button className='w-full flex items-center justify-center'> <span className='animate-bounce'><BsArrowDownShort/></span> </button>
          </section>

        </section>
      </section>
    </main>
  )
}

export default Profile