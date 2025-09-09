import React from 'react'

const Navbar = () => {
  return (
    <nav className='md:mycontainer sticky top-0 text-white bg-slate-500 r'>
      <div className='w-screen flex justify-between items-center'>
        <div className='Logo px-40 text-2xl font-semibold md:mx-auto md:w-full text-white'>
          <span className='text-green-900'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-900'>OP/&gt;</span>
        </div>
        <ul className='  md:flex md:gap-10 md:pr-80 md:text-lg'>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>

        </ul>
      </div>
    </nav>
  )
}

export default Navbar
