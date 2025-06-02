"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TvShowCard from "../ui/tvShowCard";

const RelatedTVshows = () => {
  const [movies, setMovies] = useState([]);

  const { id } = useParams();
  const { request } = useAxios();

  useEffect(() => {
    fetchRelatedMovies();
  }, []);

  async function fetchRelatedMovies() {
    const response = await request({
      method: "GET",
      url: `tv/${id}/recommendations`,
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
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6 text-secondary text-center">
        Related TV Shows
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-1 snap-x snap-mandatory"
      >
        {movies.map((movie, i) => (
          <div
            key={i}
            className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px] xl:min-w-[350px] flex-shrink-0 snap-start"
          >
            <TvShowCard card={movie} />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 items-center gap-3 px-2">
        <button
          className="border border-primary p-2 text-white rounded-md bg-black/50 hover:bg-primary transition"
          onClick={handleScrollLeft}
        >
          <ChevronLeft />
        </button>
        <button
          className="border border-primary p-2 text-white rounded-md bg-black/50 hover:bg-primary transition"
          onClick={handleScrollRight}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default RelatedTVshows;
