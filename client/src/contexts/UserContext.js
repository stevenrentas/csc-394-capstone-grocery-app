import React, { useContext, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [food, setFood] = useState([]);
  return (
    <UserContext.Provider
      value={{
        showModal,
        setShowModal,
        food,
        setFood,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
