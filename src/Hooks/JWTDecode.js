import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token); // JWT expiry in seconds
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
};

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      const decoded = jwtDecode(token);
      setIsLoggedIn(true);
      setUser(decoded);
    } else {
      logout();
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, logout };
};
export default useAuth;
