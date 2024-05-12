import React, { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
export default function CreateListing() {
  
  const[files,setFiles]= useState([])
  const [formData,setFormData]=useState({
    imageUrls:[],

  })

  // to see if any error is tehre while uploading 
  const [imageUploadError,setImageUploadError]=useState(false)
  const [uploading,setuploading]=useState(false)
  console.log(formData)
  
  const handleImageSubmit =(e) =>{
  if(files.length>0 && files.length+formData.imageUrls.length<7 ){
    setuploading(true)
    setImageUploadError(false)
    // as more than 1 image is uplaoded more than 1 promise  // 
    const promises =[];
    for (let i=0 ;i<files.length; i++){
       promises.push(storeImage(files[i]))
        //all download URL in this promises 
      }
      Promise.all(promises).then((urls)=>{
        setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
        // if error is there it is removed 
      setImageUploadError(false);
      setuploading(false)

    
      }).catch((err)=>{
        setImageUploadError('Image upload failed(2 mb max per image)')
        setuploading(false)
      })
    }else{
      setImageUploadError('You can upload 6 images per listing')
      setuploading(false)
    }

  }
  const storeImage =async(file)=>{
    return new Promise((resolve,reject)=>{
      const storage =getStorage(app);
      const fileName=new Date().getTime() + file.name
      const storageRef=ref(storage,fileName)
      const uploadTask=uploadBytesResumable(storageRef,file);
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
          console.log(`Upload is ${progress}% done'`);
        },
        (error)=>reject(error),
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL)
          })
        }

      )
    })
  }
  console.log(files)

  const handleRemoveImage= (index)=>{
    // keep the urls that doesnt match the index 
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_,i)=>i !==index),

      });
  }
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
                    <p >Regular Price</p>
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
            <input  onChange={(e)=> setFiles(e.target.files)} className='p-3 border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple>
            </input>
            <button type='button'
            disabled={uploading}
             onClick={handleImageSubmit} className='p-3 text-green-700 border rounded uppercase hover:shadow-lg disabled:opacity-80 '>
                  {uploading ? 'Uploading...':'Upload' }  
            </button>
          </div>
          <p className='text-red-700'>{imageUploadError&& imageUploadError}
            </p>
          {
            formData.imageUrls.length >0 &&  formData.imageUrls.map((url,index)=>(
              // <img src={url} alt='listing image' className='w-40 h-40 object-cover rounded-lg'/>
              <div key={url}className='flex justify-between p-3 border items-center'>
                <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                <button type='button' onClick={()=>handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase haover:opacity-75'>Delete</button>
                </div>
              
            ))
          }
          <button className='p-3 bg-slate-700  text white rounded-lg uppercase hover:opcaity-95 disabled :opacity-80'>Create Listing</button>
        </div>
    </form>  
    </main>
  )
}
