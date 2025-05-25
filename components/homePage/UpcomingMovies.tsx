import React from "react";
import MovieCard from "../ui/movieCard";
import { Button } from "../ui/button";
import { upcomingMovies } from "../data/upcoming";

const UpcomingMovies = () => {

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
        {upcomingMovies.map((movie, i) => (
          <MovieCard key={movie.id || i} card={movie} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
