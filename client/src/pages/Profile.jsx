import { useRef ,useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage ,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserFailure,updateUserSuccess,updateUserStart,deleteUserFailure,deleteUserStart,deleteUserSuccess, signoutUserStart, signoutUserFailure, signoutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import backgroundImage from './profileb.png'; // Import your image file

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser,loading,error} = useSelector((state) => state.user);
  const [file ,setFile ]=useState(undefined)
  console.log(file)
  const [filePerc,setFilePerc] =useState(0);
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false)
  const [ShowListingsError,setShowListingsError]=useState(false)
  const [userListings,setUserListings]=useState([])
  const dispatch=useDispatch()
  console.log(formData)
  console.log(filePerc)
  console.log(fileUploadError)
  // if there is a file then this function is called 
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])
  const handleFileUpload =(file) =>{
  const storage =getStorage(app);
  const fileName=new Date().getTime()+file.name;
  const storageRef =ref(storage,fileName);
  // to use porgress of upload 
  const uploadTask =uploadBytesResumable(storageRef,file);
  uploadTask.on('state_changed',
  (snapshot)=>{
    const progress =(snapshot.bytesTransferred / snapshot.totalBytes)*100;
    // console.log('Upload is '+progress + '% done')
    setFilePerc(Math.round(progress))
  },
  (error)=> {setFileUploadError(true)},
()=>{
  getDownloadURL(uploadTask.snapshot.ref).then
  ((downloadURL)=>
    setFormData({...formData,avatar:downloadURL})
  );
}
  );
};
// based on teh id of input  thechanges in  data will be stored in formdata
const handleChange=(e) =>{
  setFormData({...formData,[e.target.id]:e.target.value})
}
const handleSubmit= async (e) =>{
  e.preventDefault();
  try {
    dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.sucess===false) {
        dispatch(updateUserFailure(data.message))
        return
  } 
  dispatch(updateUserSuccess(data));
  setUpdateSuccess(true)
}catch (error) {
    dispatch(updateUserFailure(error.message))
  }
};

const handleDeleteUser= async (e)=>{
  try {
    dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.sucess===false) {
        dispatch(deleteUserFailure(data.message))
        return
  } 
  dispatch(deleteUserSuccess(data));
  
}catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}

const handleSignOut= async (e)=>{
  try {
    dispatch(signoutUserStart())
      const res = await fetch(`/api/auth/signout`)
      const data = await res.json();
      if (data.sucess===false) {
        dispatch(signoutUserFailure(data.message))
        return
  } 
  dispatch(signoutUserSuccess(data));
  
}catch (error) {
   dispatch(signoutUserFailure(error.message))
  }
}

const handleShowListings=async()=>{
  try {
    setShowListingsError(false)
    const res =await fetch(`/api/user/listings/${currentUser._id}`)
    const data =await res.json()
    if (data.sucess=== false){
      setShowListingsError(true);
      return
    }
    setUserListings(data)
  } catch (error) {
    setShowListingsError(true)
  }

}
const handleListingDelete = async (listingId) => {
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  } catch (error) {
    console.log(error.message);
  }
};


  return (
    <div style={{ backgroundImage: `url(${backgroundImage}`, backgroundSize: 'cover',   backgroundAttachment: 'fixed',
  }}>
<div
      className='p-3 max-w-lg mx-auto'
      
    >      <h1           style={{ fontFamily: 'Anton' }}
    className=' text-3xl text-center text-tealc  my-7 '>Profile</h1>
      <form onSubmit= {handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=> setFile(e.target.files[0] )}
        type="file" 
        ref={fileRef}
         hidden 
         accept='image/*'/>

        <img 
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} 
          alt="profile" 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-extrabold self-center text-lg'>
          {fileUploadError ? (
            <span style={{ fontFamily: 'Anton',fontSize:20 }}className='text-red-200 mt-3 text-extrabold text-lg p-2 rounded'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span style={{ fontFamily: 'Anton',fontSize:20 }}className='text-green-200 mt-3 text-extrabold text-lg p-2 rounded'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text"className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black'  placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email"className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black'  placeholder='Email' id='email' defaultValue={currentUser.email}onChange={handleChange} />
        <input type="password"className='border-4 border-tealc focus:outline-none p-3 rounded-lg placeholder-black'  placeholder='Password' id='password'onChange={handleChange} />
        <button disabled ={loading}className='bg-slate-700 text-white text-bold rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading?'Loading....' :'Update'}
        
        </button>
        <Link className='bg-brownc p-3 text-bold text-black-700 rounded-lg uppercase text-center hover:opacity:75' to={"/create-listing"}>
        Create listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser}className='border-4 bg-red-700 border-red-700 focus:outline-none p-3 font-semibold rounded-lg text-white cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='border-4 bg-red-700 border-red-700 focus:outline-none p-3 font-semibold rounded-lg text-white cursor-pointer'>Sign Out</span>
      </div>
      <p style={{ fontFamily: 'Anton',fontSize:20 }}className='text-red-200 mt-3 text-extrabold text-lg p-2 rounded'>{error ? error:' ' }</p>
      <p style={{ fontFamily: 'Anton',fontSize:20 }}className='text-green-200 mt-3 text-extrabold text-lg p-2 rounded'>{updateSuccess ? "User is updated Successfully!!!":' ' }</p>
      <button onClick={handleShowListings}className='text-white  bg-teal-700 rounded-lg p-3 border-greeen-700 w-full font-semibold'>Show Listings</button>
      <p style={{ fontFamily: 'Anton',fontSize:20 }}className='text-red-200 mt-3 text-extrabold text-lg p-2 rounded'>{ShowListingsError?"Error showing Listings":" " }</p>
     {userListings && userListings.length>0 &&(
     <div className='flex flex-col gap-4'>
     <h1  style={{ fontFamily: 'Anton' }}
    className=' text-3xl text-center text-tealc  my-7 '>
       Your Listings
     </h1>
     {userListings.map((listing) => (
       <div
         key={listing._id}
         className=' border-4 border-solid border-black rounded-lg p-3 flex justify-between items-center gap-4'
       >
         <Link to={`/listing/${listing._id}`}>
           <img
             src={listing.imageUrls[0]}
             alt='listing cover'
             className='h-20 w-30 object-contain '
           />
         </Link>
         <Link
         style={{ fontFamily: 'Anton' }}
           className='text-slate-700 text-xl hover:underline truncate flex-1'
           to={`/listing/${listing._id}`}
         >
           <p >{listing.name}</p>
         </Link>

         <div className='flex flex-col item-center gap-2'>
           <button
             onClick={() => handleListingDelete(listing._id)}
             className='border-4 bg-red-700 border-red-700 w-full focus:outline-none p-3 font-semibold rounded-lg text-white cursor-pointer'
           >Delete</button>
            <Link to={`/update-listing/${listing._id}`}>
             <button className='border-4 bg-green-700 w-full border-green-700 focus:outline-none p-3 font-semibold rounded-lg text-white cursor-pointer'>Edit</button>
             </Link>
         </div>
       </div>
     ))}
   </div>
 )}
</div>
 </div>
  );
}

