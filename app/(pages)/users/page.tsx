import SearchUser from '@/app/components/searchUser'
import React from 'react'

function User() {


  return (
    <div className='container bg-neutral-400 w-full min-h-[90vh] rounded-lg'>
        <h2 className='text-lg font-semibold pt-4'>Search user : - </h2>
        <section>
            <SearchUser/>
        </section>
    </div>
  )
}

export default User