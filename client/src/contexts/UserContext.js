import React, { useContext, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [food, setFood] = useState([
    {
      id: 1,
      name: "Chicken Breast",
      amount: "4/lb",
      dateAdded: "4/28/2023",
      expiryDate: "5/02/2023",
    },
    {
      id: 2,
      name: "Gala Apples",
      amount: "12/each",
      dateAdded: "4/21/2023",
      expiryDate: "5/21/2023",
    },
    {
      id: 3,
      name: "Broccoli Rabe",
      amount: "5/cup",
      dateAdded: "3/14/2023",
      expiryDate: "N/A",
    },
    {
      id: 4,
      name: "Goldfish",
      amount: "2/container",
      dateAdded: "4/28/2023",
      expiryDate: "5/14/2025",
    },
  ]);
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
