import AuthContext from "../context/AuthContext";
import useAuth from "@/hooks/useAuth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <main>{children}</main>
    </AuthContext.Provider>
  );
}
export default AuthProvider;