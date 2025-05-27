import React from 'react'
import HeroSection from '@/components/homePage/Hero'
import UpcomingMovies from '@/components/homePage/UpcomingMovies'
import Trending from '@/components/homePage/TrendingMovies'

const Home = () => {
  return (
    <div className=' '>
      <div className="">
        <HeroSection /> 
      </div>
     <Trending />
       <UpcomingMovies />
    
     
     
    </div>
  )
}

export default Home
