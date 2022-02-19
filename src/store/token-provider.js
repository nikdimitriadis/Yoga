import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";

const TokenContent = React.createContext({
  token: "",
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export const TokenContentProvider = (props) => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    console.log("login", data);
    setToken("1");
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/login",
        "POST",
        JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        { "Content-Type": "application/json" }
      );

      if (responseData && !error) {
        navigate("/welcome");
      }
    } catch (e) {}
  };

  const logout = (data) => {
    console.log("logout", data);
    setToken(null);
  };
  const signup = async (data) => {
    console.log("signup", data);
    setToken("1");
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/login",
        "POST",
        JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
        }),
        { "Content-Type": "application/json" }
      );

      if (responseData && !error) {
        navigate("/welcome");
      }
    } catch (e) {}
  };

  const tokenData = {
    isLoading,
    error,
    token,
    login,
    logout,
    signup,
  };

  return (
    <TokenContent.Provider value={tokenData}>
      {props.children}
    </TokenContent.Provider>
  );
};

export default TokenContent;
