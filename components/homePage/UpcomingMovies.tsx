import React from "react";
import MovieCard from "../ui/movieCard";
import { Button } from "../ui/button";

const UpcomingMovies = () => {
  const upcomingMovies = [
    { 
      id: 1, 
      title: "Movie 1", 
      image: "/hero.jpg",
      releaseDate: "2025",
      rating: 8.2,
      duration: "130m",
      href: "/movies/1",
      tagline: "HD"
    },
    { 
      id: 2, 
      title: "Movie 2", 
      image: "/hero.jpg",
      releaseDate: "2025",
      rating: 7.9,
      duration: "115m",
      href: "/movies/2",
      tagline: "CAM"
    },
    { 
      id: 3, 
      title: "Movie 3", 
      image: "/hero.jpg",
      releaseDate: "2025",
      rating: 8.5,
      duration: "125m",
      href: "/movies/3",
      tagline: "HD"
    },
    { 
      id: 4, 
      title: "Movie 4", 
      image: "/hero.jpg",
      releaseDate: "2025",
      rating: 7.4,
      duration: "120m",
      href: "/movies/4",
      tagline: "HD"
    },
    { 
      id: 5, 
      title: "Movie 5", 
      image: "/hero.jpg",
      releaseDate: "2025",
      rating: 8.0,
      duration: "135m",
      href: "/movies/5",
      tagline: "CAM"
    },
    { 
      id: 6, 
      title: "Movie 6", 
      image: "/hero.jpg",
      releaseDate: "2025",
      rating: 7.8,
      duration: "110m",
      href: "/movies/6",
      tagline: "HD"
    },
    { 
      id: 7, 
      title: "Movie 7", 
      image: "/hero.jpg",
      releaseDate: "2025",
      rating: 8.1,
      duration: "140m",
      href: "/movies/7",
      tagline: "HD"
    },
  ];
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
