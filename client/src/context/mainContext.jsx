import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axiosClient";

import ScreenLoaderComponent from "../components/ScreenLoaderComponent";
import { setUser, removeUser } from "../redux/slice/auth.slice";

const mainContext = createContext();

export const useMainContext = () => useContext(mainContext);

export const MainContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/login");
    toast.success("Logout successful");
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token") || "";

      // ✅ FIX HERE
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
      toast.error(error.message);
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
    <mainContext.Provider value={{ fetchUserProfile, logoutHandler }}>
      {children}
    </mainContext.Provider>
  );
};


