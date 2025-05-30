"use client";

import { createContext } from "react";


export type RootContextType = {
  loading: boolean;
  setLoading: (open: boolean) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
};

const UIContext = createContext<RootContextType | undefined>(undefined);


export default UIContext;