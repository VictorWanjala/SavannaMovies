"use client";

import { createContext } from "react";


export type RootContextType = {
  loading: boolean;
  setLoading: (open: boolean) => void;
};

const RootContext = createContext<RootContextType | undefined>(undefined);


export default RootContext;