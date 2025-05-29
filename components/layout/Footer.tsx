import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center text-white p-6'>
      © {new Date().getFullYear()} SavannaMovies. All rights reserved.
    </div>
  )
}

export default Footer
