"use client";

import React, { useState } from "react";
import AppContext from "../context/UIContext";

const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  return (
    <AppContext.Provider value={{ loading, setLoading,searchResults, setSearchResults }}>
      <main>{children}</main>

    </AppContext.Provider>
  );
};

export default UIProvider;
