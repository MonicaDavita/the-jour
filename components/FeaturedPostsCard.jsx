import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedPosts = ({ post }) => {
    return (
        <div className='relative h-72 hover:scale-105 ease-in duration-300'>
            <div className='absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72 bg bg-black/70 bg-blend-overlay ' style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
            <div className='flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full'>
                <p className='text-white mb-4 text-shadow font-semibold text-xs'>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                <p className='text-white mb-4 text-shadow font-semibolld text-2xl text-center'>{post.title}</p>
                <div className='flex items-center absolute bottom-5 w-full justify-center'>
                    <Image
                        className='align-middle drop-shadow-lg rounded-full'
                        unoptimized
                        alt={post.author.name}
                        height="30"
                        width="30"
                        src={post.author.picture.url}
                    />
                    <p className='inline allign-middle text-white text-shadow ml-2 font-medium'>{post.author.name}</p>
                </div>

            </div>
            <Link href={`/post/${post.slug}`}>
                <span className='cursor-pointer absolute w-full h-full'></span>
            </Link>
        </div>
    )
}

export default FeaturedPosts