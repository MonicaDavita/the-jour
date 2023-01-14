import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
      <div className='absolute left-0 right-0 -top-14 flex items-center justify-center'>
        <Image 
          unoptimized
          alt={author.name}
          height="100"
          width="100"
          className='flex items-center justify-center rounded-full'
          src={author.picture.url}
        />
      </div>
      <h3 className='text-white my-4 text-xl font-bold'>{author.bold}</h3>
      <p className='text-white text-ls'>{author.bio}</p>
    </div>
  )
}

export default Author