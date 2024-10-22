import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({data}) => {

  
  return (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
        data.backdrop_path || data.profile_path
      })`, 
        
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }} 
    className='w-full h-[70vh] flex flex-col items-start justify-center p-[10%] font-["gilroy"] capitalize'>
        <h1 className='w-[70%] text-5xl font-extrabold text-white'>
        {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className='w-[70%] mt-3 mb-3 text-white font-medium'> 
        {data.overview?.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} 
        className="text-blue-400">more</Link>
        </p>
        <div className='flex gap-3 text-md'>
        <i className="text-pink-500 ri-megaphone-fill flex gap-1">
          <h3 className='font-["gilroy"]'>
            {data.release_date || "No Information"}
          </h3>
        </i> 
        <i className="text-pink-500 ri-disc-fill flex gap-1">
          <h3 className='font-["gilroy"]'> 
            {data.media_type ? data.media_type : "No Movies" || data.media_type.toUpperCase()}
          </h3>
        </i>
        </div>
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} 
         className='bg-blue-400 p-3 text-md duration-150 rounded-lg font-bold hover:text-white hover:scale-110 mt-20'>
        {" "}
        Watch Trailer
        </Link>
    </div>
  )
} 

export default Header