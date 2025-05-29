"use client";

import React, { useState } from "react";
import AppContext from "../app/RootContext";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      <main>{children}</main>

    </AppContext.Provider>
  );
};

export default Provider;
