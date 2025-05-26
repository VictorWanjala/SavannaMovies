"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "../../components/ui/movieCard";
import { upcomingMovies } from "../../components/data/upcoming";
import Search from "../../components/ui/search"; 
import useAxios from "../../hooks/useAxios";

const Movies = () => {
  const [filteredMovies, setFilteredMovies] = useState(upcomingMovies);
  const [page, setPage] = useState(1);

  const {request} = useAxios();

  useEffect(() => { 
    fetchMovies();
   }
, [page]);

async function fetchMovies() {
  const response = await request({
    method: "GET",
    url: `movie/popular`,
    params: { page},
  })
  if (response) {
    setFilteredMovies(response.results || []);
  }
}

  return (
    <div className="container mx-auto px-4 py-28 max-md:py-10">
      <div className="flex items-center justify-between max-md:flex-col">
        <h2 className="text-3xl font-bold mb-4 text-white">Movies</h2>
        <div className="pr-7 max-md:pr-3">
          <Search
            searchUrl="search/movie" 
            placeholder="Search movies..."
            onResults={results => setFilteredMovies(results.length ? results : upcomingMovies)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {filteredMovies.map((movie, i) => (
          <MovieCard key={movie.id || i} card={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
