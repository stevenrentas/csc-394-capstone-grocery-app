import React, { useContext, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false);

    return(
        <UserContext.Provider value = {{
            showModal, setShowModal
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);