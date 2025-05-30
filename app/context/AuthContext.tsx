import { createContext } from "react";
import useAuth from "@/hooks/useAuth";

const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

export default AuthContext;