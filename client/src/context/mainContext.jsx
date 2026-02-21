import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ScreenLoaderComponent from "../components/ScreenLoaderComponent";
import { axiosClient } from "../utils/axiosClient";
import { setUser, removeUser } from "../slice/auth.slice";

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logout successful");
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token") || "";
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axiosClient.get("/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      dispatch(setUser(response.data));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <ScreenLoaderComponent />;
  }

  return (
    <MainContext.Provider value={{ fetchUserProfile, logoutHandler }}>
      {children}
    </MainContext.Provider>
  );
};
 