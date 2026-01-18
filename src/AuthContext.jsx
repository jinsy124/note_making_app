import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode  from "jwt-decode";
import api from "./api";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );
  const [loading, setLoading] = useState(true);

  const loginUser = async (email,password,setError) => {
    
    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      const authData = {
      access: response.data.access_token,
      refresh: response.data.refresh_token,
      };
      setAuthTokens(authData);
      setUser(jwtDecode(authData.access));
      localStorage.setItem("authTokens", JSON.stringify(authData));
      navigate("/notes");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const updateToken = async () => {
    try {
      const response = await api.post("/auth/refresh-token", {
        refresh: authTokens?.refresh,
      });
      const updatedTokens = {
      ...authTokens,
      access: response.data.access_token,
      };
      setAuthTokens(updatedTokens);
      setUser(jwtDecode(updatedTokens.access));
      localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
    } catch (error) {
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only refresh if we have tokens
    if (authTokens) {
      updateToken();
    } else {
      setLoading(false);
    }

    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 4);

    return () => clearInterval(interval);
  }, []);

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};