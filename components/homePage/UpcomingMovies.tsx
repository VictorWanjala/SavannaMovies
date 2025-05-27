"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "../ui/movieCard";
import { Button } from "../ui/button";
import { upcomingMovies } from "../data/upcoming";
import useAxios from "../../hooks/useAxios";
import Pagination from "../ui/pagination";

const UpcomingMovies = () => {
  const { request } = useAxios();
  const [movies, setMovies] = useState(upcomingMovies);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchUpcomingMovies();
  }, [page]);

  async function fetchUpcomingMovies() {
    const response = await request({
      method: "GET",
      url: `movie/upcoming`,
      params: { page },
    });

    if (response && response.results) {
      setMovies(response.results);
      setTotalPages(response.total_pages || 1);
      setTotalResults(response.total_results || 0);
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
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
    <div className="container mx-auto px-4 py-12 max-md:py-10">
      <div className="flex items-center justify-between max-md:flex-col">
        <h2 className="text-3xl font-bold mb-4 text-secondary">
          Upcoming Movies
        </h2>
        <div className="flex gap-4 pr-7">
          <Button className="rounded-full">Movies</Button>
          <Button className="rounded-full">TV Shows</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-8">
        {movies.map((movie, i) => (
          <MovieCard key={movie.id || i} card={movie} />
        ))}
      </div>

      <div className="my-12 ">
       <Pagination currentPage={page} totalPages={totalPages} onNext={handleNextPage} onPrevious={handlePreviousPage} />
      </div>
    </div>
  );
};

export default UpcomingMovies;
