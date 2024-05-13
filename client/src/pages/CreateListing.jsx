import {  useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'

import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function CreateListing() {
  const {currentUser}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const[files,setFiles]= useState([])
  const [formData,setFormData]=useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:50,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,

  })

  // to see if any error is tehre while uploading 
  const [imageUploadError,setImageUploadError]=useState(false)
  const [uploading,setuploading]=useState(false)
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
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
      setError(false)

    
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

const handleChange= (e)=>{
  if(e.target.id==='sale'|| e.target.id==='rent'){
    setFormData({
      ...formData,
      type: e.target.id
  });
  }

if(e.target.id==='parking'|| e.target.id==='furnished'||e.target.id==='offer'){
  setFormData({
    ...formData,
    [e.target.id]:e.target.checked
  })
}
if(e.target.type==='number'||e.target.type==='text'||e.target.type==='textarea'){
  setFormData({
    ...formData,
    [e.target.id]:e.target.value
    
  })
}
};
const handleSubmit= async (e)=>{
  e.preventDefault();
  try {
    setLoading(true)
    setError(false)
     if(formData.imageUrls.length<1) { setLoading(false);return setError('You must upload at least one image !!')}
      // converting both to number by adding plus
      setLoading(true);
      setError(false);

      if(+formData.regularPrice<+formData.discountPrice){ setLoading(false); return setError("Discount Price must be less than regular Price ")}
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef:currentUser._id})
          
      });
      const data = await res.json();
      setLoading(false)

      if (data.sucess===false) {
       setError(data.message)
        return
  } 
  navigate(`/listing/${data._id}`)
}catch (error) {
    setError(error.message)
    setLoading(false)
  }
};




  return (
<body className=' bg-fixed bg-greyc'>   
 <main className='p-3 max-w-4xl mx-auto  '>
      <h1 style={{ fontFamily: 'Anton' }}
    className=' text-3xl text-center text-tealc  my-7 '>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit}className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text"
            className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black'
            placeholder='Name' 
            id='name' maxLength='62' 
            minLength='10' 
            required onChange={handleChange}
            value={formData.name} ></input>
            
            <textarea type="text"
           className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black'
            placeholder='Description' id='description' required 
            onChange={handleChange}
            value={formData.description}></textarea>

            <input type="text"
            className='border-4 flex-col sm:flex-row border-tealc focus:outline-none p-3 rounded-lg placeholder-black' 
            placeholder='Address' id='address'  required 
            onChange={handleChange}
            value={formData.address} ></input>
        <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
          <input type="checkbox" id="sale" className='w-5'onChange={handleChange} checked={formData.type==='sale'}/>                        
                        <span>Sale</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="rent" className='w-5 'onChange={handleChange} checked={formData.type==='rent'}/>                        
                        <span>Rent</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="parking" className='w-5'onChange={handleChange} checked={formData.parking}/>                        
                        <span>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="furnished" className='w-5'onChange={handleChange} checked={formData.furnished}/>                        
                        <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="offer" className='w-5'onChange={handleChange} checked={formData.offer}/>                        
                        <span>Offer</span>
            </div>
        </div>
        <div className='flex flex-wrap gap-6'>
             <div className='flex items-center gap-2'>
                    <input className='border-4 border-tealc flex-col sm:flex-row focus:outline-none p-3 rounded-lg placeholder-black'type="number" id="bedrooms" min='1' max='10' required onChange={handleChange}
            value={formData.bedrooms}></input>
                    <p >Beds</p>
             </div>
             <div className='flex flex-wrap items-center gap-2'>
                    <input className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black' type="number" id="bathrooms" min='1' max='10' required  onChange={handleChange}
            value={formData.bathrooms}></input>
                    <p >Baths</p>
             </div>             
             <div className='flex flex-wrap items-center gap-2'>
                    <input className='border-4 border-tealc flex-col sm:flex-row focus:outline-none p-3 rounded-lg placeholder-black' type="number" id="regularPrice" min='1' max='100000' required  onChange={handleChange}
            value={formData.regularPrice}></input>
                    <div className='flex flex-col items-center'>
                    <p >Regular Price</p>
                    <span className='textxs'>(Rs /month)</span>
                    </div>
             </div>
             {formData.offer&&(
              <div className='flex flex-wrap items-center gap-2'>
                    <input className='border-4 border-tealc focus:outline-none p-3 rounded-lg' type="number" id="discountPrice" min='0' max='100000' required onChange={handleChange}
            value={formData.discountPrice}></input>
                    <div className='flex flex-col items-center'>
                    <p >Discount Price </p>
                    <span className='textxs'>(Rs /month)</span>
                    </div>
             </div>
             )
             }
             
        </div>
        </div>
        {/* right side */}

        <div  className='flex flex-col gap-4 flex-1'> 
          <p className='font-semibold'style={{ fontFamily: 'Anton',fontSize:15 }}>Note :
          <span className='text-brownc'>     The first image will be the cover (Maximum 6)</span>
          </p>
          <div className=' flex  gap-3'> 
            <input  onChange={(e)=> setFiles(e.target.files)} className='border-4 border-tealc focus:outline-none p-3 rounded-lg text-semibold placeholder-black' type="file" id="images" accept='image/*' multiple>
            </input>
            <button type='button'
            disabled={uploading}
             onClick={handleImageSubmit} className='p-3 text-white  bg-green-700 border-green-700 border-4 rounded-lg uppercase hover:shadow-lg disabled:opacity-80 '>
                  {uploading ? 'Uploading...':'Upload' }  
            </button>
          </div>
          <p style={{ fontFamily: 'Anton',fontSize:15 }}className='text-red-700 mt-3 text-extrabold text-lg p-2 rounded'>{imageUploadError&& imageUploadError}
            </p>
          {
            formData.imageUrls.length >0 &&  formData.imageUrls.map((url,index)=>(
              // <img src={url} alt='listing image' className='w-40 h-40 object-cover rounded-lg'/>
              <div key={url}className='flex justify-between p-3 border-4 border-black rounded-lg items-center'>
                <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                <button type='button' onClick={()=>handleRemoveImage(index)} className='p-3 text-white border-4 w-f bg-red-700 border-red-700 rounded-lg uppercase haover:opacity-75'>Delete</button>
                </div>
              
            ))
          }
          <button disabled={loading|| uploading}   className='p-3 bg-slate-700  text white rounded-lg uppercase hover:opcaity-95 disabled :opacity-80'>
            {loading?'Creating... ' :"Create Listing"}</button>
            {error && <p style={{ fontFamily: 'Anton',fontSize:15 }}className='text-red-700 mt-3 text-extrabold text-lg p-2 rounded'>{error}</p>}
        </div>
    </form>  
    </main>
    </body>
  )
}
