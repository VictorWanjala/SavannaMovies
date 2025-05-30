"use client";

import React, { useState } from "react";
import AppContext from "../context/UIContext";

const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      <main>{children}</main>

    </AppContext.Provider>
  );
};

export default UIProvider;
