import React, { useContext, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <UserContext.Provider value = {{
            showFoodModal, setShowFoodModal, isLoggedIn, setIsLoggedIn
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);