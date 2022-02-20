import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";

const TokenContent = React.createContext({
  token: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  name: "",
});

export const TokenContentProvider = (props) => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [token, setToken] = useState(null);
  const [name, setName] = useState(""); //test
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const login = async (data) => {
    console.log(data);
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
      console.log(responseData);

      if (responseData && !error) {
        setName("Lia");
        setToken(true);
        localStorage.setItem("token", true);
        navigate("/welcome");
      }
    } catch (e) {}
  };

  const logout = (data) => {
    // console.log("logout", data);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  const signup = async (data) => {
    console.log(data.file);
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
        setName("Lia");
        console.log(responseData);
        setToken(true);
        localStorage.setItem("token", true);
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
    name,
  };

  return (
    <TokenContent.Provider value={tokenData}>
      {props.children}
    </TokenContent.Provider>
  );
};

export default TokenContent;
