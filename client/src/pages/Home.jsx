// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import SwiperCore from 'swiper';
// import 'swiper/css/bundle';
// import ListingItem from '../components/ListingItem';
// import backgroundImage from './2.png'
// export default function Home() {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);
//   SwiperCore.use([Navigation]);
//   console.log(offerListings);
//   useEffect(() => {
//     const fetchOfferListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?offer=true&limit=4');
//         const data = await res.json();
//         setOfferListings(data);
//         fetchRentListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const fetchRentListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?type=rent&limit=4');
//         const data = await res.json();
//         setRentListings(data);
//         fetchSaleListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchSaleListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?type=sale&limit=4');
//         const data = await res.json();
//         setSaleListings(data);
//       } catch (error) {
//         log(error);
//       }
//     };
//     fetchOfferListings();
//   }, []);
//   return (
//     <div className='bg-slate-100'>
//       {/* top */}
//       <div style={{ backgroundImage: `url(${backgroundImage})`, filter: 'grayscale(50%)' }} className='bg-cover bg-fixed flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>


//         <h1 className='text-tealc  font-bold text-3xl lg:text-6xl'>
//           Tired of searching for your Dream Property?? <span className='text-black'>Find your perfect Spot with </span>
//           <span className="text-red-700 text-extrabold" style={{ fontFamily: 'Dancing Script',fontWeight:'bolder' }}>Nest Connect</span>
//           <br />
          
//         </h1>
//         <div style={{ fontFamily: 'Jaro' ,fontSize:20}} className=' text-neutral-800 text-lg sm:text-lg font-extrabold  sm:text-extrabold'>
//           Come and Join the Family of Nest Connect!!
//           <br />
//           We Offer you wide range of options then why go Anywhere Else?
//         </div>
//         <Link
//           to={'/search'} style={{ fontFamily: 'Jaro'}}
//           className='text-xl sm:text-lg text-black font-bold hover:underline'
//         >
//           Let's Find you your Home !!
//         </Link>
//       </div>

//       {/* swiper */}
//       <Swiper navigation>
//         {offerListings &&
//           offerListings.length > 0 &&
//           offerListings.map((listing) => (
//             <SwiperSlide>
//               <div
//                 style={{
//                   background: `url(${listing.imageUrls[0]}) center no-repeat`,
//                   backgroundSize: 'cover',
//                 }}
//                 className='h-[500px]'
//                 key={listing._id}
//               ></div>
//             </SwiperSlide>
//           ))}
//       </Swiper>

      
//       {/* listing results for offer, sale and rent */}

//       <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
//         {offerListings && offerListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'style={{ fontFamily: 'Outfit'}}>Recent offers</h2>
//               <Link className='text-sm text-blue-800 hover:underline'style={{ fontFamily: 'Anton'}} to={'/search?offer=true'}>Show more offers</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {offerListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {rentListings && rentListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'style={{ fontFamily: 'Outfit'}}>Recent places for rent</h2>
//               <Link className='text-sm text-blue-800 hover:underline'style={{ fontFamily: 'Anton'}} to={'/search?type=rent'}>Show more places for rent</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {rentListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {saleListings && saleListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
//               <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {saleListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import backgroundImage from './2.png';
import backgroundImage2 from './image.png';

import axios from 'axios'; // Import Axios
import moment from 'moment'; // Import Moment for date formatting

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [news, setNews] = useState([]);
  
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get(
          // 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=885a6a3dd2d34e72a5f7cf091b2052f4'
          // 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=885a6a3dd2d34e72a5f7cf091b2052f4'
          'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=885a6a3dd2d34e72a5f7cf091b2052f4'
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchOfferListings();
    fetchNews();
  }, []);

  return (
    <div className='bg-slate-100'>
      {/* top */}
      <div style={{ backgroundImage: `url(${backgroundImage})`, filter: 'grayscale(50%)' }} className='bg-cover bg-fixed flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-tealc font-bold text-3xl lg:text-6xl'>
          Tired of searching for your Dream Property?? <span className='text-black'>Find your perfect Spot with </span>
          <span className="text-red-700 text-extrabold" style={{ fontFamily: 'Dancing Script',fontWeight:'bolder' }}>Nest Connect</span>
          <br />
        </h1>
        <div style={{ fontFamily: 'Jaro' ,fontSize:20}} className='text-neutral-800 text-lg sm:text-lg font-extrabold  sm:text-extrabold'>
          Come and Join the Family of Nest Connect!!
          <br />
          We Offer you wide range of options then why go Anywhere Else?
        </div>
        <Link
          to={'/search'} style={{ fontFamily: 'Jaro'}}
          className='text-xl sm:text-lg text-black font-bold hover:underline'
        >
          Let's Find you your Home !!
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation   >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px] '
                key={listing._id}
              ></div>

            </SwiperSlide>
          ))}
      </Swiper>
     <div style={{ backgroundImage: `url(${backgroundImage2})`, filter: 'grayscale(50%)',  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',}}>
      {/* listing results for offer, sale and rent */}
      <div className='max-w-full mx-auto p-3 flex flex-col gap-8 my-10   '>
        {offerListings && offerListings.length > 0 && (
          <div className='mx-auto max-w-full center   '>
            <div className='my-3 text-center '>
              <h2 className='text-2xl font-semibold  text-slate-600'style={{ fontFamily: 'Outfit'}}>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline'style={{ fontFamily: 'Anton'}} to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div  className='mx-auto max-w-full     '>
            <div className='my-3  text-center   '>
              <h2 className='text-2xl font-semibold text-slate-600'style={{ fontFamily: 'Outfit'}}>Recent places for Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline'style={{ fontFamily: 'Anton'}} to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div  className='mx-auto max-w-full items-center   '>
            <div className='my-3 text-center '>
              <h2 className='text-2xl font-semibold text-slate-600'style={{ fontFamily: 'Outfit'}}>Recent places for Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' style={{ fontFamily: 'Anton'}}to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* News Section */}
      {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {news.length > 0 && (
          <div>
            <h2 className='text-2xl font-semibold text-slate-600'>Top business headlines </h2>
            <div className='flex flex-col gap-4'>
              {news.map((article, index) => (
                <div key={index} className='border border-gray-200 p-4 rounded-lg'>
                  <h3 className='text-xl font-semibold'>{article.title}</h3>
                  <p className='text-gray-600'>{moment(article.publishedAt).format('MMMM DD, YYYY')}</p>
                  <p className='text-gray-800'>{article.description}</p>
                  <a href={article.url} target='_blank' rel='noopener noreferrer' className='text-blue-700 hover:underline'>
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
  {news.length > 0 && (
    <div className='overflow-x-auto'>
      <h2 className='text-2xl font-semibold text-slate-600 text-center'style={{ fontFamily: 'Outfit'}}>Top business headlines</h2>
      <div className='flex gap-4'>
        {news.map((article, index) => (
          <div key={index} className='flex-shrink-0 border p-4 rounded-lg'>
            <h3 className='text-xl font-semibold'>{article.title}</h3>
            <p className='text-gray-600'>{moment(article.publishedAt).format('MMMM DD, YYYY')}</p>
            <p className='text-gray-800'>{article.description}</p>
            <a href={article.url} target='_blank' rel='noopener noreferrer' className='text-blue-700 hover:underline'>
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
</div>
    </div>
  );
}
