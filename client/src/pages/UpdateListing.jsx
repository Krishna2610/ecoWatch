import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    issue: '',
    description: '',
    address: '',
    type: 'other',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
// data fetching operation is performed only when the component initially renders.
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.sucess === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if(e.target.id==='airpollution'|| e.target.id==='waterpollution' || e.target.id==='deforestation' || e.target.id==='illegaldumping' || e.target.id==='energywaste' || e.target.id==='other'){
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

   

    if (
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
     setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.sucess === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-3 max-w-4xl mx-auto bg-cover bg-fixed ' style={{  backgroundImage: "url('data:image/jpeg;base64,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')"}} >
      <h1 style={{ fontFamily: 'Anton' }}
    className=' text-3xl text-center text-tealc  my-7 '>
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Issue'
            className='border-4 flex-col sm:flex-row border-tealc focus:outline-none p-3 rounded-lg placeholder-black'
            id='issue'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.issue}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border-4 flex-col sm:flex-row border-tealc focus:outline-none p-3 rounded-lg placeholder-black'            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border-4 flex-col sm:flex-row border-tealc focus:outline-none p-3 rounded-lg placeholder-black'            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
          <input type="checkbox" id="airpollution" className='w-5'onChange={handleChange} checked={formData.type==='airpollution'}/>                        
                        <span>airpollution</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="waterpollution" className='w-5 'onChange={handleChange} checked={formData.type==='waterpollution'}/>                        
                        <span>waterpollution</span>
            </div>
            <div className='flex gap-2'>
                        <input type="checkbox" id="deforestation" className='w-5 'onChange={handleChange} checked={formData.type==='deforestation'}/>                        
                        <span>deforestation</span>
            </div> 
            <div className='flex gap-2'>
                        <input type="checkbox" id="illegaldumping" className='w-5 'onChange={handleChange} checked={formData.type==='illegaldumping'}/>                        
                        <span>illegaldumping</span>
            </div> 
            <div className='flex gap-2'>
                        <input type="checkbox" id="energywaste" className='w-5 'onChange={handleChange} checked={formData.type==='energywaste'}/>                        
                        <span>energywaste</span>
            </div>  
            <div className='flex gap-2'>
                        <input type="checkbox" id="other" className='w-5 'onChange={handleChange} checked={formData.type==='other'}/>                        
                        <span>other</span>
            </div>             
        </div>
           
        </div>
        <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'style={{ fontFamily: 'Anton',fontSize:15 }}>Note :
          <span className='text-brownc'>     The first image will be the cover (Maximum 6)</span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
 className='border-4 border-tealc focus:outline-none p-3 rounded-lg text-semibold placeholder-black'              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-white  bg-green-700 border-green-700 border-4 rounded-lg uppercase hover:shadow-lg disabled:opacity-80 '            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p  style={{ fontFamily: 'Anton',fontSize:15 }}className='text-red-700 mt-3 text-extrabold sm:text-lg text-lg p-2 rounded'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border-4 border-black rounded-lg items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-white border-4 w-f bg-red-700 border-red-700 rounded-lg uppercase haover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700  text white rounded-lg uppercase hover:opcaity-95 disabled :opacity-80'
          >
            {loading ? 'Updating...' : 'Update issue'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}