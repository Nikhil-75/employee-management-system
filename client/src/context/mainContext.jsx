import React, { createContext, useContext } from "react";

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainContextProvider = ({ children }) => {
  return (
    <MainContext.Provider value={{}}>
      {children}
    </MainContext.Provider>
  );
};
