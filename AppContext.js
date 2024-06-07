// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [regNo, setRegNo] = useState(null);

  return (
    <AppContext.Provider value={{ regNo, setRegNo }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

