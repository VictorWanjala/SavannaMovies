"use client";

import useAxios from "@/hooks/useAxios";
import React, { useState, useEffect } from "react";


type SearchProps<T> = {
  searchUrl: string;
  placeholder?: string;
  onResults?: (results: T[]) => void;
  debounceMs?: number;
};

const Search = <T,>({
  searchUrl,
  placeholder = "Search...",
  onResults,
  debounceMs = 400,
}: SearchProps<T>) => {
  const [query, setQuery] = useState("");
  const { request } = useAxios();

  useEffect(() => {
    if (!query.trim()) {
      if (onResults) onResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      const response = await request({
        method: "GET",
        url: searchUrl,
        params: { query },
        show_loading: false,
      });

      if (response?.error) return;

      const data = response;
      if (onResults) onResults(data.results || []);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [query, searchUrl, debounceMs, onResults, request]);

  return (
    <div className="flex flex-col items-center gap-2 max-md:w-full w-[730px]">
      <input
        type="text"
        className="flex-1 px-4 py-2 w-full rounded border border-secondary focus:outline-none focus:ring"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;

