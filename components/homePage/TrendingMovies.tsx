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

      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-hidden w-full gap-4"
      >
        {movies.map((movie, i) => (
          <div key={i} className="w-[350px] mx-2">
            <MovieCard card={movie} />
          </div>
        ))}
      </div>

      <div className="flex justify-between  mt-4 items-center gap-3">
        <button
          className="border p-2 border-primary text-white"
          onClick={handleScrollLeft}
        >
          <ChevronLeft />
        </button>
        <button
          className="border p-2 border-primary text-white"
          onClick={handleScrollRight}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Trending;
