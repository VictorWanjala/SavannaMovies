"use client";

import React, { useState } from "react";
import AppContext from "../app/RootContext";
import LoadingModal from "./modals/LoadingModal";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      <main>{children}</main>

      {loading && <LoadingModal loading={loading} setLoading={setLoading} />}
    </AppContext.Provider>
  );
};

export default Provider;
