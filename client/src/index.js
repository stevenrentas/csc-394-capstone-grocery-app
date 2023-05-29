import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./unauthed/admin/Login";
import UserLogin from "./unauthed/user/Login";
import SignUp from "./unauthed/user/SignUp";
import MyFood from "./authed/userPortal/MyFood";
import MyRecipes from "./authed/userPortal/MyRecipes";
import Auth from "./unauthed/Auth";
import App from "./App";
import ProtectedRoute from "./util/ProtectedRoute";
import Home from "./authed/adminPortal/Home";
import { UserProvider } from "./contexts/UserContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import Profile from "./unauthed/user/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider>
    <UserProvider>
      <React.StrictMode>
        <BrowserRouter basename={"/"}>
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<UserLogin />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
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
              <Route
                path="/myfood"
                element={
                  <ProtectedRoute>
                    <MyFood />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myrecipes"
                element={
                  <ProtectedRoute>
                    <MyRecipes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </UserProvider>
  </SnackbarProvider>
);
