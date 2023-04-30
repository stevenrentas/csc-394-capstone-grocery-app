import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login/Login";
import Auth from "./auth/Auth";
import App from "./App";
import ProtectedRoute from "./util/ProtectedRoute";
import Home from "./portal/home/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<App />}>
          <Route
            path=""
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
