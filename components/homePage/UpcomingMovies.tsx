"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "../ui/movieCard";
import { Button } from "../ui/button";
import { upcomingMovies } from "../data/upcoming";
import useAxios from "../../hooks/useAxios";


const UpcomingMovies = () => {
  const { request, imageUrl } = useAxios();
  const [movies, setMovies] = useState(upcomingMovies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUpcomingMovies();
  }, [page]);

  async function fetchUpcomingMovies() {
    const response = await request({
      method: "GET",
      url: `movie/upcoming`,
      params: { page },
    });
   
    if (response && response.results) {
      setMovies(response.results);
    }
  }

  return (
    <div className="container mx-auto px-4 py-28 max-md:py-10">
      <div className="flex items-center justify-between max-md:flex-col">
        <h2 className="text-3xl font-bold mb-4 text-white">Upcoming Movies</h2>
        <div className="flex gap-4 pr-7">
          <Button className="rounded-full">Movies</Button>
          <Button className="rounded-full">TV Shows</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {movies.map((movie, i) => (
          <MovieCard key={movie.id || i} card={movie} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
