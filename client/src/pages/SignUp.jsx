

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl md:text-5xl lg:text-6xl text-center font-bold font-custom text-teal-700 my-7 md:my-10 lg:my-12'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-orangec text-black font-extrabold  p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth></OAuth>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to='/sign-in' className='text-blue-700 font-bold'>Sign in</Link>
      </div>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
