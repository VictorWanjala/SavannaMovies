"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UserType } from "../app/types/UserTypes";

const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let storedUser = Cookies.get("user") || localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: UserType = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        Cookies.remove("user");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const saveUser = (userData: UserType, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);

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

  const saveSessionId = (sessionId: string) => {
    localStorage.setItem("session_id", sessionId);
    setSessionId(sessionId);
    Cookies.set("session_id", sessionId, { expires: 7 });
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
    saveSessionId,
    sessionId,
    token,
  };
};

export default useAuth;
