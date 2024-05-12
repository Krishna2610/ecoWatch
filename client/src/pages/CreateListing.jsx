import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text"className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black' placeholder='Name' id='name' maxLength='62' minLength='10' required ></input>
            <textarea type="text"className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black' placeholder='Description' id='description' required ></textarea>
            <input type="text"className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black' placeholder='Address' id='address'  required ></input>
        <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
                        <input type="checkbox" id="sale" className='w-5'/>                        
                        <span>Sell</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="rent" className='w-5'/>                        
                        <span>Rent</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="parking" className='w-5'/>                        
                        <span>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="furnished" className='w-5'/>                        
                        <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="offer" className='w-5'/>                        
                        <span>Offer</span>
            </div>
        </div>
        <div className='flex flex-wrap gap-6'>
             <div className='flex items-center gap-2'>
                    <input className='border-4 border-tealc focus:outline-none p-3 rounded-lg' type="number" id="bedrooms" min='1' max='10' required></input>
                    <p >Beds</p>
             </div>
             <div className='flex items-center gap-2'>
                    <input className='border-4 border-tealc focus:outline-none p-3 rounded-lg' type="number" id="bathrooms" min='1' max='10' required></input>
                    <p >Baths</p>
             </div>             
             <div className='flex items-center gap-2'>
                    <input className='border-4 border-tealc focus:outline-none p-3 rounded-lg' type="number" id="regularPrice" min='1' max='10' required></input>
                    <div className='flex flex-col items-center'>
                    <p >Regula Price</p>
                    <span className='textxs'>(Rs /month)</span>
                    </div>
             </div>
             <div className='flex items-center gap-2'>
                    <input className='border-4 border-tealc focus:outline-none p-3 rounded-lg' type="number" id="discountPrice" min='1' max='10' required></input>
                    <div className='flex flex-col items-center'>
                    <p >Discount Price </p>
                    <span className='textxs'>(Rs /month)</span>
                    </div>
             </div>
        </div>
        </div>
        {/* right side */}

        <div  className='flex flex-col gap-4 flex-1'> 
          <p className='font-semibold'>Images:
          <span className='text-brownc'>The first image will be the cover (Maximum 6)</span>
          </p>
          <div>
            <input className='p-3 border-gray-300 rounded w-full' type="file" id="images" accepst="image/*">
            </input>
            <button className='p-3 text-green-700 border rounded uppercase hover:shadow-lg disabled:opacity-80 '>
                    Upload
            </button>
          </div>
          <button className='p-3 bg-slate-700  text white rounded-lg uppercase hover:opcaity-95 disabled :opacity-80'>Create Lising</button>
        </div>
       
    </form>  
    </main>
  )
}
