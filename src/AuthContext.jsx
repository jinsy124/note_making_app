import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import api from "./api"

const AuthContext = createContext();
export default AuthContext;



export const AuthProvider = ({ children }) =>{
    const navigate = useNavigate();
    const [authTokens,setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user,setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
            : null
    );
    const[loading,setLoading] = useState(true);
    

    const loginUser = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post("/auth/login",{
                username: e.target.username.value,
                password: e.target.password.value,
            });
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem("authTokens",JSON.stringify(response.data));
            
        } catch (error) {
            alert("Invalid credentials");
        }
    };
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        
    };
    const updateToken = async () => {
        try {
            const response = await api.post("/auth/refresh-token",{
                refresh: authTokens?.refresh,
            });
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem("authTokens",JSON.stringify(response.data));
        } catch (error) {
            logoutUser();
        }
        if (loading) {
            setLoading(false);
        }
    };
// auto refesh on load
    useEffect(() => {
        if (loading) {
            updateToken();
        }
        const interval = setInterval(() => {
            if(authTokens) {
                updateToken();
            }
        }, 1000 * 60* 4);
        return () => clearInterval(interval);
    }, [authTokens,loading]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };
   return (
  <AuthContext.Provider value={contextData}>
    {!loading && <Outlet />}
  </AuthContext.Provider>
);
};