import React, { createContext, useState } from "react";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState([]);

  const toggleSnackbar = () => {
    setSnackbarOpen((prevState) => !prevState);
  };

  const addSnackbarData = (data) => {
    setSnackbarData(() => [data]);
  };

  const removeSnackbarData = () => {
    setSnackbarData([]);
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarOpen,
        toggleSnackbar,
        snackbarData,
        addSnackbarData,
        removeSnackbarData,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider };
export default SnackbarContext;
