"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "../../components/ui/movieCard";
import Pagination from "../../components/ui/pagination";
import useAxios from "../../hooks/useAxios";
import TvShowCard from "@/components/ui/tvShowCard";
import { movieCardType, tvShowCardType } from "../types/movieCardTypes";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<movieCardType[]>([]);

  const [favoriteTvShows, setFavoriteTvShows] = useState<tvShowCardType[]>([]);

  const [page, setPage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTVPages, setTotalTVPages] = useState(1);

  const [totalResults, setTotalResults] = useState(0);
  const [totalTVResults, setTotalTVResults] = useState(0);

  const tabs = ["Favorite Movies", "Favorite TV Shows"];
  const [activeTab, setActiveTab] = useState("Favorite Movies");

  const sessionId = localStorage.getItem("session_id");

  const { request } = useAxios();

  useEffect(() => {
    fetchFavoriteMovies();
  }, [page]);

  useEffect(() => {
    fetchFavoriteTvShows();
  }, [tvPage]);

  async function fetchFavoriteMovies() {
    const response = await request({
      method: "GET",
      url: `account/21681798/favorite/movies`,
      params: {
        session_id: sessionId,
        page,
      },
    });
    if (!response?.error) {
      setFavoriteMovies(response.results || []);
      setTotalPages(response.total_pages || 1);
      setTotalResults(response.total_results || 0);
    }
  }

  async function fetchFavoriteTvShows() {
    const response = await request({
      method: "GET",
      url: `account/21681798/favorite/tv`,
      params: {
        session_id: sessionId,
        page: tvPage,
      },
    });


    console.log(totalResults, totalTVResults)

    if (!response?.error) {
      setFavoriteTvShows(response.results || []);
      setTotalTVPages(response.total_pages || 1);
      setTotalTVResults(response.total_results || 0);
    }
  }

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setPage(1);
    setTvPage(1);
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

  const handleTVNextPage = () => {
    if (tvPage < totalTVPages) setTvPage(tvPage + 1);
  };
  const handleTVPreviousPage = () => {
    if (tvPage > 1) setTvPage(tvPage - 1);
  };

  return (
    <div className="container mx-auto px-4 py-28 max-md:py-10">
      <div className="flex items-center justify-between max-md:flex-col">
        <h2 className="text-3xl font-bold mb-4 text-secondary">{activeTab}</h2>
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

      {sessionId ? (
        <>
          {activeTab === "Favorite Movies" ? (
            <div className="flex flex-wrap gap-6 mt-6">
              {favoriteMovies.map((movie, i) => (
                <MovieCard key={i} card={movie} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 mt-6">
              {favoriteTvShows.map((movie, i) => (
                <TvShowCard key={i} card={movie} />
              ))}
            </div>
          )}
          <div className="mt-16">
            <Pagination
              currentPage={activeTab === "Favorite Movies" ? page : tvPage}
              totalPages={
                activeTab === "Favorite Movies" ? totalPages : totalTVPages
              }
              onNext={
                activeTab === "Favorite Movies"
                  ? handleNextPage
                  : handleTVNextPage
              }
              onPrevious={
                activeTab === "Favorite Movies"
                  ? handlePreviousPage
                  : handleTVPreviousPage
              }
            />
          </div>
        </>
      ) : (
        <div className="flex justify-start text-center mt-4">
          <p className="text-white text-xl">
            Please{" "}
            <span className="text-secondary">
              <a
                href="/login"
                className="text-white hover:text-secondary underline underline-offset-4"
              >
                Login
              </a>
            </span>{" "}
            to view your favorites.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
