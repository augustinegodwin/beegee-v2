import React from 'react'

export default function MaxWidthContainer({children}:any) {
  return (
    <div className="w-full flex justify-center px-4 sm:px-5 items-center">
        <div className='w-full max-w-150 lg:max-w-300 '>
            {children}
        </div>
    </div>
  )
}
  