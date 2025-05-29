"use client";

import React, { useEffect, useState } from "react";
import Search from "../../components/ui/search";
import useAxios from "../../hooks/useAxios";
import Pagination from "../../components/ui/pagination";
import TvShowCard from "../../components/ui/tvShowCard";
import { tvShowCardType } from "../types/movieCardTypes";

const TvShows = () => {
  const [filteredMovies, setFilteredMovies] = useState<tvShowCardType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [originalMovies, setOriginalMovies] = useState<tvShowCardType[]>([]);

  const { request } = useAxios();

  useEffect(() => {
    fetchTvShows();
  }, [page]);

  async function fetchTvShows() {
    const response = await request({
      method: "GET",
      url: `tv/popular`,
      params: { page },
    });
    if (response) {
      setFilteredMovies(response.results || []);
      setOriginalMovies(response.results || []);
      setTotalPages(response.total_pages || 1);
      setTotalResults(response.total_results || 0);
    }
  }

  console.log(totalResults)

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-28 max-md:py-10">
      <div className="flex items-center justify-between max-md:flex-col">
        <h2 className="text-3xl font-bold mb-4 text-secondary">TV Shows</h2>
        <div className="pr-7 max-md:pr-3">
          <Search<tvShowCardType>
            searchUrl="search/tv"
            placeholder="Search TV Shows..."
            onResults={(results) =>
              setFilteredMovies(results.length ? results : originalMovies)
            }
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-6">
        {filteredMovies.map((movie, i) => (
          <TvShowCard key={i} card={movie} />
        ))}
      </div>
      <div className="my-12 ">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      </div>
    </div>
  );
};

export default TvShows;
