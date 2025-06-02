"use client";

import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../ui/movieCard";
import useAxios from "../../hooks/useAxios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { movieCardType } from "@/app/types/movieCardTypes";

const Trending = () => {
  const { request } = useAxios();
  const [movies, setMovies] = useState<movieCardType[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByAmount = 280 + 16;

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollByAmount,
        behavior: "smooth",
      });
    }
  };
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollByAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  async function fetchTrending() {
    const response = await request({
      method: "GET",
      url: `trending/all/day`,
      params: { page: 1 },
      show_loading: false,
    });

    if (response && response.results) {
      setMovies(response.results);
    }
  }

  return (
   <div className="container mx-auto px-4 py-12 max-md:py-10">
      <div className="flex items-center justify-between max-md:flex-col">
        <h2 className="text-3xl font-bold mb-4 text-secondary">Trending</h2>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory px-1"
        >
          {movies.map((movie, i) => (
            <div
              key={i}
              className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px] xl:min-w-[350px] flex-shrink-0 snap-start"
            >
              <MovieCard card={movie} />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 items-center gap-3 px-2">
          <button
            className="border p-2 border-primary text-white rounded-md bg-black/50 hover:bg-primary transition"
            onClick={handleScrollLeft}
          >
            <ChevronLeft />
          </button>
          <button
            className="border p-2 border-primary text-white rounded-md bg-black/50 hover:bg-primary transition"
            onClick={handleScrollRight}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trending;
