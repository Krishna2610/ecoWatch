import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import backgroundImage from './2.jpeg';
import backgroundImage2 from './image.png';
import Img1 from './eco1.jpeg';
import Img2 from './eco2.jpeg';
import Img3 from './eco3.jpeg';

import axios from 'axios'; // Import Axios
import moment from 'moment'; // Import Moment for date formatting

export default function Home() {
  const [waterPollutionListings, setWaterPollutionListings] = useState([]);
  const [deforestationListings, setDeforestationListings] = useState([]);
  const [news, setNews] = useState([]);
  const downloadedImages = [
    Img1,Img2,Img3
];
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchDeforestationListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=airpollution&limit=3');
        const data = await res.json();
        setDeforestationListings(data);
        fetchWaterPollutionListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchWaterPollutionListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=waterpollution&limit=3');
        const data = await res.json();
        setWaterPollutionListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    // const fetchNews = async () => {
    //   try {
    //     const response = await axios.get(
    //       'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=885a6a3dd2d34e72a5f7cf091b2052f4'
    //     );
    //     setNews(response.data.articles);
    //   } catch (error) {
    //     console.error('Error fetching news:', error);
    //   }
    // };

    fetchDeforestationListings();
    // fetchNews();
  }, []);

  return (
    <div className='bg-slate-100'>
      {/* top */}
      <div style={{ backgroundImage: `url(${backgroundImage})`, filter: 'grayscale(50%)' }} className='bg-cover bg-fixed flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-tealc font-bold text-3xl lg:text-6xl'>
          Tired of environmental issues going unnoticed?  
          <span className='text-black'> Take action with EcoWatch and make a difference in your community! </span>
          <span className="text-brownc text-extrabold" style={{ fontFamily: 'Dancing Script', fontWeight: 'bolder' }}>Eco Watch</span>
          <br />
        </h1>

        <Link
          to={'/search'}
          style={{ fontFamily: 'Jaro' }}
          className='text-xl sm:text-lg text-black font-bold hover:underline'
        >
          Let’s work together to protect and improve our planet!!
        </Link>
      </div>

      {/* swiper for deforestation and water pollution listings */}
      {/* <Swiper navigation>
        {deforestationListings.length > 0 && deforestationListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
            ></div>
          </SwiperSlide>
        ))}
        {waterPollutionListings.length > 0 && waterPollutionListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper> */}
   
   <Swiper navigation loop={true} className="h-[500px]">
  {downloadedImages.map((imageUrl, i) => (
    <SwiperSlide key={`image-${i}`}>
      <div
        style={{
          background: `url(${imageUrl}) center no-repeat`,
          backgroundSize: 'contain',
        }}
        className="h-[500px]"
      ></div>
    </SwiperSlide>
  ))}
</Swiper>


      <div style={{ backgroundImage: `url(${backgroundImage2})`, filter: 'grayscale(50%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {/* listing results for deforestation and water pollution */}
        <div className='max-w-full mx-auto p-3 flex flex-col gap-8 my-10'>
          {deforestationListings.length > 0 && (
            <div className='mx-auto max-w-full center'>
              <div className='my-3 text-center'>
                <h2 className='text-2xl font-semibold text-slate-600' style={{ fontFamily: 'Outfit' }}>Deforestation Issues</h2>
              </div>
              <div className='flex flex-wrap gap-4 center'>
                {deforestationListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {waterPollutionListings.length > 0 && (
            <div className='mx-auto max-w-full'>
              <div className='my-3 text-center'>
                <h2 className='text-2xl font-semibold text-slate-600' style={{ fontFamily: 'Outfit' }}>Water Pollution Issues</h2>
              </div>
              <div className='flex flex-wrap gap-4 items-center'>
                {waterPollutionListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* News Section */}
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {news.length > 0 && (
            <div className='overflow-x-auto'>
              <h2 className='text-2xl font-semibold text-slate-600 text-center' style={{ fontFamily: 'Outfit' }}>Top business headlines</h2>
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
