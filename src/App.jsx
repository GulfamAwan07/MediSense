import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import "./App.css";
import { ToastContainer } from "react-toastify";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
