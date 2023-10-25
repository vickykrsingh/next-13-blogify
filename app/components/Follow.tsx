import { IUserModel } from '@/models/user.Model'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
interface Props {
    dbUser:IUserModel
}

function Follow(props:Props) {
  return (
    <div className='flex flex-col w-full' >
            <section className='flex flex-row justify-between gap-1 items-center bg-zinc-600 rounded-md w-full p-2' >
              <div className='flex gap-2'>
                <Image className='rounded-full' src={props.dbUser.profileImg} width={50} height={50} alt='User_img' />
                <div className='flex flex-col gap-0 text-gray-400'>
                  <span className='text-sm'>{props.dbUser?.email}</span>
                  <span className='text-sm'>{props.dbUser?.firstName} {props.dbUser?.middleName} {props.dbUser?.lastName}</span>
                </div>
              </div>
                <Button>UnFollow</Button>
            </section>
          </div>
  )
}

export default Follow