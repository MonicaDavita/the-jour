import React, { useState, useEffect, useRef } from 'react'

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  const handleCommentSubmission = () => {
    setError(false);

    const { calue: comment } = commentEl.current;
    const { calue: name } = nameEl.current;
    const { calue: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if(storeData){
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    }else{
      localStorage.removeItem('name', name);
      localStorage.removeItem('email', email);
    }

  }
  return (
    <div className='bg-white shadow-lg rounded-lg pb-12 mb-8 p-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'> Leave a Comment </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={commentEl}
          className='p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          name='comment'
          placeholder='Comment' />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          ref={nameEl}
          type='text'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          name='name'
          placeholder='Name' />
        <input
          ref={emailEl}
          type='email'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          name='email'
          placeholder='Email' />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            ref={storeDataEl}
            type='checkbox'
            id='storeData'
            name='storeData'
            value='true' />
            <label htmlFor='storeData' className='text-gray-500 cursor-pointer'> Save my name & email for later </label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button type='button' onClick={handleCommentSubmission} className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
          Post Comment
        </button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment is on review</span>}
      </div>
    </div>
  )
}

export default CommentForm