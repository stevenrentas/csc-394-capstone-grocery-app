import React, { createContext, useState } from "react";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const toggleSnackbar = () => {
    setSnackbarOpen((prevState) => !prevState);
  };

  return (
    <SnackbarContext.Provider value={{ snackbarOpen, toggleSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider };
export default SnackbarContext;
