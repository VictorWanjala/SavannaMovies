import { createContext } from "react";


export type RootContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const RootContext = createContext<RootContextType | undefined>(undefined);


export default RootContext;