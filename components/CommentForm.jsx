import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services';

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false })

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    setFormData(initialFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
  }

  const handleCommentSubmission = () => {
    setError(false);

    const { name, email, comment, storeData } = formData;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug, };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj)
      .then((res) => {
        if (res.createComment) {
          if (!storeData) {
            formData.name = ' ';
            formData.email = ' ';
          }
          formData.comment = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }))

          setShowSuccessMessage(true);

          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      })

  }
  return (
    <div className='bg-white shadow-lg rounded-lg pb-12 mb-8 p-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'> Leave a Comment </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className='p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          name='comment'
          placeholder='Comment' />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          value={formData.name}
          onChange={onInputChange}
          type='text'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          name='name'
          placeholder='Name' />
        <input
          value={formData.email}
          onChange={onInputChange}
          type='email'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          name='email'
          placeholder='Email' />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type='checkbox'
            id='storeData'
            name='storeData'
            value='true' />
          <label htmlFor='storeData' className='text-gray-500 cursor-pointer'> Save my name & email for later </label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button type='button' onClick={handleCommentSubmission} className='transition duration-500 ease hover:bg-[#343434] inline-block bg-none text-lg font-medium rounded-full border border-[#343434] hover:text-white text-[#343434] px-8 py-3 cursor-pointer'>
          Post Comment
        </button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment is on review</span>}
      </div>
    </div>
  )
}

export default CommentForm