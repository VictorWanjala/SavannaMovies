"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "../ui/movieCard";
import useAxios from "../../hooks/useAxios";
import Pagination from "../ui/pagination";
import TvShowCard from "../ui/tvShowCard";

const UpcomingMovies = () => {
  const { request } = useAxios();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTVPages, setTotalTVPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalTVResults, setTotalTVResults] = useState(0);
  const tabs = ["Movies", "TV Shows"];
  const [activeTab, setActiveTab] = useState("Movies");

  useEffect(() => {
    fetchUpcomingMovies();
    fetchTVMovies();
  }, [page]);

  async function fetchUpcomingMovies() {
    const response = await request({
      method: "GET",
      url: `movie/upcoming`,
      params: { page },
      show_loading: false,
    });

    if (response && response.results) {
      setMovies(response.results);
      setTotalPages(response.total_pages || 1);
      setTotalResults(response.total_results || 0);
    }
  }

  async function fetchTVMovies() {
    const response = await request({
      method: "GET",
      url: `tv/airing_today`,
      params: { page },
      show_loading: false,
    });

    if (response && response.results) {
      setShows(response.results);
      setTotalTVPages(response.total_pages || 1);
      setTotalTVResults(response.total_results || 0);
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

  const handleTVNextPage = () => {
    if (tvPage < totalPages) {
      setTvPage(tvPage + 1);
    }
  };
  const handleTVPreviousPage = () => {
    if (tvPage > 1) {
      setTvPage(tvPage - 1);
    }
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-md:py-10">
      <div className="flex items-center justify-between max-md:flex-col">
        <h2 className="text-3xl font-bold mb-4 text-secondary">
          Upcoming {activeTab === "Movies" ? "Movies" : "TV Shows"}
        </h2>
        <div className="flex gap-4 pr-7">
          {tabs?.map((tab, i) => (
            <button
              key={i}
              onClick={() => handleTabChange(tab)}
              className={`rounded-full text-white px-4 py-2 ${
                activeTab === tab
                  ? "bg-secondary"
                  : "bg-none border border-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Movies" ? (
        <div className="flex flex-wrap gap-6 mt-8">
          {movies.map((movie, i) => (
            <MovieCard key={i} card={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 mt-8">
          {shows.map((show, i) => (
            <TvShowCard key={i} card={show} />
          ))}
        </div>
      )}

      <div className="my-12 ">
        <Pagination
          currentPage={activeTab === "Movies" ? page : tvPage}
          totalPages={activeTab === "Movies" ? totalPages : totalTVPages}
          onNext={activeTab === "Movies" ? handleNextPage : handleTVNextPage}
          onPrevious={
            activeTab === "Movies" ? handlePreviousPage : handleTVPreviousPage
          }
        />
      </div>
    </div>
  );
};

export default UpcomingMovies;
