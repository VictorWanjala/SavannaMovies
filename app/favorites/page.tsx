"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "../../components/ui/movieCard";
import Pagination from "../../components/ui/pagination";
import useAxios from "../../hooks/useAxios";

const Favorites = () => {
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const { request } = useAxios();

  useEffect(() => {
    fetchFavoriteMovies();
  }, [page]);

  async function fetchFavoriteMovies() {
    const response = await request({
      method: "GET",
      url: `account/21681798/favorite/movies`,
      params: {
        session_id: localStorage.getItem("session_id"),
        page,
      },
    });
    if (response) {
      setFilteredMovies(response.results || []);
      setFavoriteMovies(response.results || []);
      setTotalPages(response.total_pages || 1);
      setTotalResults(response.total_results || 0);
    }
  }

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
        <h2 className="text-3xl font-bold mb-4 text-secondary">Favorites</h2>
        <div className="pr-7 max-md:pr-3">
          
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-6">
        {filteredMovies.map((movie, i) => (
          <MovieCard key={i} card={movie} />
        ))}
      </div>
      <div className="mt-16">
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

export default Favorites;
