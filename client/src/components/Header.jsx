import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className='bg-greyc shadow-md'>
       <div className='flex justify-between items-center max-w-6xl mx-auto'>
       <Link to='/'>
        <h1 className="font-bold text-sm sm:text-4xl flex  flex-wrap font-custom" >
            <span className="text-tealc font-bold ">Nest</span>
            <span className="text-orangec font-thin">Connect</span>
        </h1>
        </Link>
        <form className='bg-greyc  text-black p-4 rounded-lg flex items-center '>
            <input type='text'  className='focus:outline-none w-24 sm:w-64 bg-transparent text-black placeholder-black ' placeholder="Search....." />
            <FaSearch className="text-slate-600"/>
        </form>
    <ul className='flex gap-4'>
        <Link to='/'>
        <li className='hidden sm:inline text-tealc font-bold hover:underline'>Home</li>
        </Link>
        <Link to='/about'>
        <li className='hidden sm:inline text-tealc font-bold hover:underline'>About</li>
        </Link>
        <Link to='/sign-in'>
        <li  className=' text-tealc font-bold hover:underline'>Sign In</li>
        </Link>
    </ul>
            </div>
    </header>
  )
}
