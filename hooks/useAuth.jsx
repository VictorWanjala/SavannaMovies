import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let storedUser = Cookies.get("user") || localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        Cookies.remove("user");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const saveUser = (userData, tokenData) => {
    setUser(userData);

    // Store in Cookies
    Cookies.set("user", JSON.stringify(userData || {}), { expires: 7 });
    Cookies.set("token", tokenData, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    // Store in localStorage as a backup
    localStorage.setItem("user", JSON.stringify(userData || {}));
    localStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("token");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return {
    user,
    saveUser,
    logout,
  };
};

export default useAuth;
