"use client";

import { tvShowCardType } from "@/app/types/movieCardTypes";
import RelatedMovies from "@/components/moviePage/RelatedMovies";
import RelatedTVshows from "@/components/tvPage/RelatedTv";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { getImageUrl } from "@/lib/getImageUrl";
import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const TvShowDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const { request } = useAxios();

 

  const [movie, setMovie] = useState<tvShowCardType | null>(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  async function fetchMovieDetails() {
    if (!id) return;
    const response = await request({
      method: "GET",
      url: `tv/${id}`,
    });


    if (response.error) {
      return;
    }
    setMovie(response);
  }

 


  const imageUrl = getImageUrl({ path: movie?.poster_path });

  return (
    <div className="container mx-auto px-4 py-28 max-md:py-10">
      <p
        className="flex gap-1 text-white cursor-pointer mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        <span>Back</span>
      </p>

      <div className="flex gap-20 items-center max-md:flex-col mt-8 max-md:gap-8 w-full">
        <div className="w-1/3 h-[500px] max-md:w-full">
          <Image
            src={imageUrl ?? "/hero.jpg"}
            alt={movie?.name ?? "Movie image"}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 w-1/2 max-md:w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl text-white">{movie?.name}</h3>
            <Button className="rounded-full">Add To Favorite</Button>
          </div>
          <div className="flex gap-5 max-md:flex-wrap">
            <div className="flex gap-3 max-md:flex-wrap">
              {movie?.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-900 bg-white px-3 py-2 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex gap-5 items-center">
              <p className="flex gap-1 text-white items-center">
                <Calendar className="" size={16} />
                <span className="text-sm">{movie?.first_air_date}</span>
              </p>

         

              <p className="flex gap-1 text-white items-center">
                <Star className="" size={16} />
                <span className="text-sm">{movie?.vote_average}</span>
              </p>
            </div>
          </div>
          <p className="text-white my-6">{movie?.overview}</p>
          <div className="my-2 text-white flex gap-4">
            <div className="flex-flex-col">
              <p className="text-right max-md:text-left">Genre</p>
              <p className="text-right max-md:text-left">Date Released</p>
              <p className="text-right max-md:text-left">Production</p>
            </div>
            <div className="flex-flex-col">
              <p className="text-left">
                {movie?.genres?.map((genre, i) => (
                  <span key={i}>
                    {genre?.name}
                    {i < (movie.genres?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="text-left">{movie?.first_air_date}</p>
              <p className="text-left">
                {movie?.production_companies?.map((company, i) => (
                  <span key={i}>
                    {typeof company === "string"
                      ? company
                      : company?.name}
                    {i < (movie.production_companies?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <RelatedTVshows />
    </div>
  );
};

export default TvShowDetails;
