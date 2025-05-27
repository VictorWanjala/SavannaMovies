"use client";

import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../../components/ui/movieCard";
import { upcomingMovies } from "../../components/data/upcoming";
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RelatedMovies = () => {
  const [movies, setMovies] = useState([]);

  const { id } = useParams();
  const { request } = useAxios();

  useEffect(() => {
    fetchRelatedMovies();
  }, []);

  async function fetchRelatedMovies() {
    const response = await request({
      method: "GET",
      url: `movie/${id}/recommendations`,
    });
    if (response.error) {
      return;
    }
    setMovies(response.results || []);
  }

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

  return (
    <div className="container mx-auto px-4 py-28 max-md:py-10">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">
        Related
      </h2>

      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-hidden w-full gap-6"
      >
        {movies.map((movie, i) => (
          <div key={i} className="w-[350px] mx-2">
            <MovieCard card={movie} />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 items-center gap-3">
        <button
          className="border border-primary p-2 text-white"
          onClick={handleScrollLeft}
        >
          <ChevronLeft />
        </button>
        <button
          className="border border-primary p-2 text-white"
          onClick={handleScrollRight}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default RelatedMovies;
