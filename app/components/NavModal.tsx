import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { UserButton, useAuth } from '@clerk/nextjs'
import { IoMdArrowDropdown } from 'react-icons/io'
import CreatePostDialogue from './CreatePostDialogue'
const authenticatedLink = [
    {
        href: '/profile',
        name: 'Profile'
    },
    {
        href: '/',
        name: 'Home'
    },
    {
        href: '/my-blog',
        name: 'My-blog'
    }
]
const unAuthenticatedLink = [
    {
        href: '/sign-in',
        name: 'Sign in'
    },
    {
        href: '/sign-out',
        name: 'Sign out'
    }
]


function NavModal() {
    const { userId } = useAuth()
    return (
        <section className='md:hidden flex gap-2 items-center'>
            <CreatePostDialogue />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <IoMdArrowDropdown size={30} color='#c2410c' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                        userId ? (
                            authenticatedLink.map((item) => (
                                <DropdownMenuItem key={item.href} >
                                    <section>
                                        <Link href={item.href}>{item.name}</Link>
                                    </section>
                                </DropdownMenuItem>
                            ))
                        ) : (
                            unAuthenticatedLink.map((item) => (
                                <DropdownMenuItem key={item.href}>
                                    <section>
                                        <Link href={item.href}>{item.name}</Link>
                                    </section>
                                </DropdownMenuItem>
                            ))
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <UserButton afterSwitchSessionUrl='/' />
        </section>
    )
}

export default NavModal