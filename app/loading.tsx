import React from 'react'
import loading from '@/public/loading.svg'
import Image from 'next/image'

function Loading() {
  return (
    <div className='w-full min-h-[90vh] flex items-center justify-center'>
        <Image src={loading} width={75} height={75} alt='loading....' />
    </div>
  )
}

export default Loading