"use client";

import React, { useState } from "react";
import MovieCard from "../../components/ui/movieCard";
import { upcomingMovies } from "../../components/data/upcoming";

const RelatedMovies = () => {
  const [filteredMovies, setFilteredMovies] = useState(upcomingMovies);

  return (
    <div className="container mx-auto px-4 py-28 max-md:py-10">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Related Movies</h2>
        

      <div className="flex flex-wrap gap-6">
        {filteredMovies.map((movie, i) => (
          <MovieCard key={movie.id || i} card={movie} />
        ))}
      </div>
    </div>
  );
};

export default RelatedMovies;
