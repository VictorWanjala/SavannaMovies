"use client";

import React, { useState } from "react";
import MovieCard from "../../components/ui/movieCard";
import { upcomingMovies } from "../../components/data/upcoming";
import Search from "../../components/ui/search"; 

const Movies = () => {
  const [filteredMovies, setFilteredMovies] = useState(upcomingMovies);

  return (
    <div className="container mx-auto px-4 py-28 max-md:py-10">
      <div className="flex items-center justify-between max-md:flex-col">
        <h2 className="text-3xl font-bold mb-4 text-white">Movies</h2>
        <div>
          <Search
            searchUrl="/api/search/movies" 
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
