import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login/Login";
import UserHome from "./auth/home/UserHome";
import Auth from "./auth/Auth";
import App from "./App";
import ProtectedRoute from "./util/ProtectedRoute";
import Home from "./portal/adminPages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<UserHome />}></Route>
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
);
