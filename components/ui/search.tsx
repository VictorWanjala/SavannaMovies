"use client";

import useAxios from "@/hooks/useAxios";
import React, { useState, useEffect } from "react";


type SearchProps = {
  searchUrl: string;
  placeholder?: string;
  onResults?: (results: any[]) => void;
  debounceMs?: number;
};

const Search: React.FC<SearchProps> = ({
  searchUrl,
  placeholder = "Search...",
  onResults,
  debounceMs = 400,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const {baseUrl, request} = useAxios()

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      onResults && onResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      
        const response = await request({
          method: "GET",
          url: searchUrl,
          params: { query },
        });
        if (response.error) return;
        const data = response;
        setResults(data.results || []);
        onResults && onResults(data.results || []);
    
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [query, searchUrl]);

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
