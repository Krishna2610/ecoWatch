
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
        <Link to="/">
        <img className='flex flex-wrap rounded-full h-20' src="/logo.png" alt="Logo" />
</Link>
          <Link to='/'>
            <h1 className="font-bold text-sm sm:text-4xl flex  flex-wrap font-custom" >
              <span className="text-tealc font-bold "style={{ fontFamily: 'Anton' }}>Nest</span>
              <span className="text-orangec font-thin"style={{ fontFamily: 'Dancing Script' }}>Connect</span>
            </h1>
          </Link>
          

          <form
            onSubmit={handleSubmit}
            className='bg-greyc  text-black p-4 rounded-lg flex items-center '
          >
            <input
              type='text'
              
              className=' focus:outline-none w-24 sm:w-64 bg-transparent text-tealc placeholder-brownc   font-bold ' placeholder="Search....."
              style={{ fontFamily: 'Poetsen One',fontSize:30 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-brownc' />
            </button>
          </form>
          <ul className='flex gap-4'>
            <Link to='/'>
              <li style={{ fontFamily: 'Anton',fontSize:30 }}
               className='hidden font-custom  text-2xl font-extrabold text-brownc sm:inline  hover:underline'>
                Home
              </li>
            </Link>
            <Link to='/about'>
              <li style={{ fontFamily: 'Anton',fontSize:30 }}
              className='hidden sm:inline font-custom  text-2xl  text-brownc   font-extrabold hover:underline'>
                About
              </li>
            </Link>
            <Link to='/profile'>
              {currentUser ? (
                <img
                // style={{ fontSize:30 }}
                  className='rounded-full h-9 w-9 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <li className='font-custom  text-2xl font-extrabold text-tealc text- hover:underline'> Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </header>
    );
  }