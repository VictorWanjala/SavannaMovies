"use client";

import { upcomingMovies } from "@/components/data/upcoming";
import RelatedMovies from "@/components/moviePage/RelatedMovies";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useParams();

  const movie = upcomingMovies.find((movie) => movie.id === Number(id));

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
            src={movie?.image ?? "/placeholder.jpg"}
            alt={movie?.title ?? "Movie image"}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 w-1/2 max-md:w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl text-white">{movie?.title}</h3>
            <Button className="rounded-full">Add To Favorite</Button>
          </div>
          <div className="flex gap-5 max-md:flex-wrap">
            <div className="flex gap-3 max-md:flex-wrap">
              {movie?.genres.map((genre, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-900 bg-white px-3 py-2 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex gap-5 items-center">
              <p className="flex gap-1 text-white items-center">
                <Calendar className="" size={16} />
                <span className="text-sm">{movie?.releaseDate}</span>
              </p>

              <p className="flex gap-1 text-white items-center">
                <Clock className="" size={16} />
                <span className="text-sm">{movie?.duration}</span>
              </p>

              <p className="flex gap-1 text-white items-center">
                <Star className="" size={16} />
                <span className="text-sm">{movie?.rating}</span>
              </p>
            </div>
          </div>
          <p className="text-white my-6">{movie?.overview}</p>
          <div className="my-2 text-white flex gap-4">
            <div className="flex-flex-col">
              <p className="text-right max-md:text-left">Country</p>
              <p className="text-right max-md:text-left">Genre</p>
              <p className="text-right max-md:text-left">Date Released</p>
              <p className="text-right max-md:text-left">Production</p>
            </div>
            <div className="flex-flex-col">
              <p className="text-left">{movie?.country}</p>
              <p className="text-left">
                {movie?.genres?.map((genre, i) => (
                  <span key={i}>
                    {genre}
                    {i < (movie.genres?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="text-left">{movie?.releaseDate}</p>
              <p className="text-left">
                {movie?.production_companies?.map((company, i) => (
                  <span key={i}>
                    {company}
                    {i < (movie.production_companies?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <RelatedMovies />
    </div>
  );
};

export default MovieDetails;
