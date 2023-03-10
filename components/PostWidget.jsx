import React, { useState, useEffect } from 'react'
import moment from 'moment/moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
        .then((result) => setRelatedPosts(result))
    } else {
      getRecentPosts()
        .then((result) => setRelatedPosts(result))
    }
  }, [slug])
  console.log(relatedPosts)
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Post' : 'Recent Post'}
      </h3>
      {relatedPosts.map((post, index) => {
        <div key={index} className='flex items-center w-full mb-8'>
          <div className='w-16 flex-none'>
            <img alt={post.title}
              height="60px"
              width='60px'
              unoptimized
              src={post.featuredImage.url}
              className='align-middle rounded-full'
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 font-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={index} className='text-md'>
            {post.title}
            </Link>
            </div>
        </div>
      })}
    </div>
  )
}

export default PostWidget