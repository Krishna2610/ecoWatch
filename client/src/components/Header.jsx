import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
// className='hidden sm:inline text-tealc font-bold hover:underline
export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);
    return (
        <header className='bg-greyc shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to='/'>
            <h1 className="font-bold text-sm sm:text-4xl flex  flex-wrap font-custom" >
              <span className="text-tealc font-bold ">Nest</span>
              <span className="text-orangec font-thin">Connect</span>
            </h1>
          </Link>
          <form
            onSubmit={handleSubmit}
            className='bg-greyc  text-black p-4 rounded-lg flex items-center '
          >
            <input
              type='text'
              
              className=' focus:outline-nonew-24 sm:w-64 bg-transparent text-black placeholder-black ' placeholder="Search....."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-slate-600' />
            </button>
          </form>
          <ul className='flex gap-4'>
            <Link to='/'>
              <li className='hidden sm:inline text-slate-700 hover:underline'>
                Home
              </li>
            </Link>
            <Link to='/about'>
              <li className='hidden sm:inline text-slate-700 hover:underline'>
                About
              </li>
            </Link>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <li className=' text-slate-700 hover:underline'> Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </header>
    );
  }