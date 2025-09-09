import React from 'react'

const Footer = () => {
  return (
    <div className='h-10 fixed bottom-0 text-white text-center w-full bg-slate-800'>
        <div>
             © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
    </div>
  )
}

export default Footer
