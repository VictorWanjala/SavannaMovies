"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import useAxios from "@/hooks/useAxios";

const heroMovieId = "1232546";

const HeroSection: FC = () => {
  const { request } = useAxios();
  const [heroMovieTrailer, setHeroMovieTrailer] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroMovieTrailer();
  }, []);

  async function fetchHeroMovieTrailer() {
    const response = await request({
      method: "GET",
      url: `movie/${heroMovieId}/videos`,
      show_loading: false,
    });

    if (response.error) {
      return;
    }

    const trailer = response.results.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer?.key) {
      setHeroMovieTrailer(trailer.key);
    }
  }

  return (
    <div className="relative w-full flex flex-col justify-center items-start text-white overflow-auto">
      <div className="absolute inset-y-0 left-0 w-full bg-black/70 z-10 to-transparent"></div>

      <div className="w-full h-[80vh] max-md:h-[70vh] relative z-0">
        {heroMovieTrailer ? (
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${heroMovieTrailer}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroMovieTrailer}`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <Image
            src={"/hero.jpg"}
            width={800}
            height={400}
            alt="Hero Image"
            className="w-screen h-[80vh] max-md:h-[70vh] object-cover"
          />
        )}
      </div>

      <div className="absolute text-left left-[10%] max-w-6xl max-md:w-[90%] px-4 sm:px-8 top-[40%] max-md:left-0 z-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Unlimited <span className="text-primary">Entertainment</span>,
        </h1>
        <p className="text-lg sm:text-xl lg:text-4xl mt-4 max-w-3xl">
          All Your Favorite Movies, TV Shows & More!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
