import Link from 'next/link'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import CreatePostDialogue from './CreatePostDialogue';

function NavMenu() {
    const { userId } = useAuth()

    return (
        <ul className='md:flex md:flex-row md:items-center md:gap-2 font-semibold text-md md:h-full hidden w-92 h-auto'>
            <li className='px-2 h-full flex items-center justify-center'>
                <Link href={'/'} className='navlink' >Home</Link>
            </li>
            {userId ?
                <>
                    <li>
                        <CreatePostDialogue/>
                    </li>
                    <li className='px-2 h-full flex items-center justify-center'>
                        <Link href={'/my-blog'} className='navlink'>My Blog</Link>
                    </li>
                    <li className='px-2 h-full flex items-center justify-center'>
                        <Link href={'/profile'} className='navlink'>Profile</Link>
                    </li>
                    <li className='px-2 h-full flex items-center justify-center'>
                        <UserButton afterSignOutUrl='/' />
                    </li>
                </> :
                <>
                    <li className='px-2 h-full flex items-center justify-center'>
                        <Link href={'/sign-in'} className='navlink'>SignIn</Link>
                    </li>
                    <li className='px-2 h-full flex items-center justify-center'>
                        <Link href={'/sign-up'} className='navlink'>SignUp</Link>
                    </li>
                </>}
        </ul>
    )
}

export default NavMenu