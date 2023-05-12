import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./unauthed/admin/Login";
import UserLogin from "./unauthed/user/Login";
import SignUp from "./unauthed/user/SignUp";
import MyFood from "./unauthed/user/MyFood";
import MyRecipes from "./unauthed/user/MyRecipes";
import Auth from "./unauthed/Auth";
import App from "./App";
import ProtectedRoute from "./util/ProtectedRoute";
import Home from "./authed/adminPortal/Home";
import { UserProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter basename={"/"}>
        <Routes>
          <Route path="/" element={<Auth />} >
            <Route path="/login" element={<UserLogin />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/myfood" element={<MyFood />}></Route>
            <Route path="/myrecipes" element={<MyRecipes />}></Route>
            <Route path="admin" element={<Login />} />
          </Route>
          <Route element={<App />}>
            <Route
              path="/admin/portal"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserProvider>
);
