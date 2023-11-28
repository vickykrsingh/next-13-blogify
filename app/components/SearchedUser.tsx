import React from 'react'
import avatar from '../../public/image-icon.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IUserModel } from '@/models/user.Model'
import FollowButton from './FollowButton'

interface IParams {
  user:string
}

function SearchedUser(params:IParams) {
  const users:IUserModel[]=JSON.parse(params.user)
  console.log(params.user)
  return (
    users ? users.map((e)=>(
      <section className='flex items-center justify-between bg-neutral-300 text-neutral-700 px-2 py-2 rounded-md' >
        <div className='flex gap-2'>
            <Image alt='user' src={e.profileImg} width={75} height={75} className='rounded-full' />
            <div className='flex flex-col gap-1 justify-center font-semibold' >
              <span>{`${e.firstName} ${e.middleName} ${e.lastName}`}</span>
              <span>{`${e.email}`}</span>
            </div>
        </div>
        <FollowButton dbUserId={e._id} />
    </section> 
    )):(
      <div>No user found</div>
    )
     )
}

export default SearchedUser