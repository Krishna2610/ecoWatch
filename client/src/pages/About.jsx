
import React from 'react';

export default function About() {
  return (
    <div className='bg-cover bg-fixed ' style={{  backgroundImage: "url('data:image/jpeg;base64,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')" }}>
      <div className='py-20 px-4 max-w-6xl mx-auto'>
        <div className="bg-opacity-50">
          <h1 className='text-4xl md:text-5xl lg:text-3xl text-center font-extrabold font-serif text-teal-700 my-7 md:my-10 lg:my-12'style={{fontFamily: "Dancing Script ",fontSize:50}}>About Nest Connect </h1>
          <p className='mb-4 font-semibold lg:text-xl text-center text-brown' style={{fontFamily: "Anton ",}}>Welcome to Nest Connect, your premier destination for all your real estate needs!!</p>
          <p className='mb-4 font-semibold text-teal-700'>
            Whether you're selling, or renting, our dedicated team of professionals is here to guide you every step of the way. With our extensive listings, personalized service, and commitment to excellence, we strive to make your real estate journey seamless and stress-free. Discover your dream property with Nest Connect today!
          </p>
          <p className='mb-4 font-semibold text-orange-500'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
        </div>
      </div>
    </div>
  );
}
