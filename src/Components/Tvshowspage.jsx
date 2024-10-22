import { useNavigate } from "react-router-dom"
import axios from "../Utils/Axios"
import { useEffect, useState } from "react"
import Topnav from './Templates/Topnav'
import Dropdown from './Templates/Dropdown'
import Cards from './Templates/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "./Loader"


const Tvshowspage = () => {

  
    document.title = "WebFlix | Tv Shows"
    const Navigate = useNavigate()
    const [category, setcategory] = useState("airing_today")
    const [gettvshows, setgettvshows] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)


    const TvshowsHandler = async() => {
        try {
          const {data} = await axios.get(`/tv/${category}?page=${page}`)
    
         if(data.results.length > 0){
          setgettvshows((prevState) => [...prevState, ...data.results])
          setpage(page+1)
         } else{
          sethasMore(false)
         }
      
        }catch (error) {
          console.log("Error:", error)
        }
      }
    
      const refreshHandler = () => {
          if(gettvshows === 0){
            TvshowsHandler()
          } else{
             setpage(1)
             setgettvshows([])
             TvshowsHandler()
        
          }
      }
    
    
      useEffect(() => {
         refreshHandler()
      }, [category])
      
 

  return gettvshows.length > 0 ? ( 
  
  <div className='w-screen h-screen overflow-hidden overflow-y-auto bg-gradient-to-r from-blue-400 via-pink-500 to-white flex flex-col gap-1 items-center'>

  <div className='px-[5%] mt-4 border-[1px] border-[#FEB8E7] h-[15%] w-[100%] bg-black rounded-md flex items-center justify-center'>
    <div className='w-full flex items-center'>
      <h1 className='text-2xl font-normal text-zinc-100 w-[30%]'>
      <i onClick={() => Navigate(-1)} className="hover:text-[#FEB8E7] hover:scale-x-90 cursor-pointer font-semibold ri-arrow-left-s-line"></i>
      Tv Shows<small className="ml-2 text-lg text-zinc-700">({category})</small>
      </h1>

      <div className='flex items-center justify-center w-[90%]'>
      <Topnav />
      <Dropdown title="Category" options={["ON_THE_AIR", "POPULAR", "TOP_RATED", "AIRING_TODAY"]} func={(e) => setcategory(e.target.value)} />
      </div>
      
    </div>

  </div>

  <div className='border-[1px] border-[#FEB8E7] w-[100%] bg-black rounded-md'>

     <InfiniteScroll loader={<h1>Loading...</h1>} dataLength={gettvshows.length} next={TvshowsHandler} hasMore={hasMore}>
     <Cards data={gettvshows} title="tv" />
     </InfiniteScroll>

  </div>
</div>

  ):(
    <Loader />
  )
}

export default Tvshowspage