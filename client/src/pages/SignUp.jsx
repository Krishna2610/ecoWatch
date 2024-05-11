import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
  <div className='p-3 max-w-lg mx-auto'>
    {/* my-7 for margin  */}
    <h1 className='text-3xl text-center font-bold font-custom my-7'>SignUp</h1>
    <form className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' className='border-4 border-tealc tealc shadow-lg focus:outline-none   p-3 rounded-lg placeholder-black ' id='username' />
        <input type='email' placeholder='Email' className='border-4  border-tealc focus:outline-none p-3 rounded-lg placeholder-black' id='email' />
        <input type='password' placeholder='Password' className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black' id='password' />
        <button className='bg-orangec text-black font-extrabold  p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>
        Already have an account?
      </p>
      <Link to={'/sign-in'}>
      <span className='text-blue-700 text-bold'>Sign In</span>
      </Link>
    </div>
</div>



  )
}
