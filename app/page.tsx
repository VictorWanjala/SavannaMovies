"use client";

import React, { useEffect } from 'react'
import HeroSection from '@/components/homePage/Hero'
import UpcomingMovies from '@/components/homePage/UpcomingMovies'
import Trending from '@/components/homePage/TrendingMovies'
import useAxios from '@/hooks/useAxios';

const Home = () => {

  // const { saveSessionId} = useAuth()
  const {request} = useAxios()

  const token = localStorage.getItem("token")

 

  useEffect(() => {
    if(!token) return;
    createSession()
  } ,[token])


  const createSession = async () => {
    const res = await request({
      method: "POST",
      url: "authentication/session/new",
      body: {
        request_token: token
      }
    })

   
    if(res?.error) {
      return;
    }

    localStorage.setItem("session_id", res?.session_id || "");
    // saveSessionId(res?.session_id);
  }

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
