"use client";

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

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      onResults && onResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`${searchUrl}?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("");
        const data = await res.json();
        setResults(data.results || data);
        onResults && onResults(data.results || data);
      } catch (err: any) {
        setResults([]);
        console.error("Search error:", err);
      } finally {
      }
    }, debounceMs);

    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [query, searchUrl]);

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
