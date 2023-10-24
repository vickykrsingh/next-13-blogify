"use client";
import React from 'react'
import NavMenu from './NavMenu';
import NavModal from './NavModal';

function NavBar() {
  return (
    <nav className='container flex items-center justify-between h-[8vh]'>
      {/* Logo */}
      <section className='font-bold xl:text-3xl lg:text-2xl text-xl'>
        <h1><span className='text-orange-500'>Blog</span>Ify</h1>
      </section>
      {/* Menubar */}
      <NavMenu />
      <NavModal />
    </nav>
  )
}

export default NavBar