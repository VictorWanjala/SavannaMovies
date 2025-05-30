"use client";

import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../../components/ui/movieCard";
import Search from "../../components/ui/search";
import UIContext from "../context/UIContext";
import useAxios from "../../hooks/useAxios";
import Pagination from "../../components/ui/pagination";
import { movieCardType } from "../types/movieCardTypes";

const Movies = () => {
  const [originalMovies, setOriginalMovies] = useState<movieCardType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const { request } = useAxios();
  const context = useContext(UIContext);
  const {searchResults, setSearchResults} = context ?? {}

  useEffect(() => {
    fetchMovies();
    if (searchResults && setSearchResults) {
      setSearchResults([]);
    }
  }, [page]);

  async function fetchMovies() {
    const response = await request({
      method: "GET",
      url: `movie/popular`,
      params: { page },
    });
    if (response) {
      setOriginalMovies(response.results || []);
      setTotalPages(response.total_pages || 1);
      setTotalResults(response.total_results || 0);
    }
  }

  console.log("Total Results:", totalResults);

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
      <div className="flex items-center justify-between flex-wrap max-md:gap-3">
        <h2 className="text-3xl font-bold mb-4 text-secondary">Movies</h2>
        <div className="pr-7 max-md:pr-3">
          <Search<movieCardType>
            searchUrl="search/movie"
            placeholder="Search movies..."
            onResults={(results) =>{
              if (searchResults && setSearchResults) {
                setSearchResults((results.length ? results : originalMovies));
              }
            }
              
            }
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-6">
        {(searchResults ?? []).map((movie, i) => (
          <MovieCard key={i} card={movie as movieCardType} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
    </div>
  );
};

export default Movies;
