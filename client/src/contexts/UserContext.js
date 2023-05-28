import React, { useContext, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [food, setFood] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const columns = [
    { field: "description", headerName: "Name", width: 300 },

    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      renderCell: (params) => (
        <div className="amountTableRow">
          <div>{params.row.amount}</div>
          <div>
            <span className="amountTag">{params.row.units}</span>
          </div>
        </div>
      ),
    },
    {
      field: "date_added",
      headerName: "Date Added",
      width: 160,
    },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      width: 160,
    },
  ];

  return (
    <UserContext.Provider
      value={{
        showModal,
        setShowModal,
        recipes,
        setRecipes,
        food,
        setFood,
        columns,
        ingredients,
        setIngredients,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
