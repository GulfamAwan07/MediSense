import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import "./App.css";
import { ToastContainer } from "react-toastify";
import SignIn from "./components/SignIn";
function App() {
  return(
    <div>
       <ToastContainer />
        <BrowserRouter>
           <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
        </BrowserRouter>
    </div>
  ) 
}

export default App;
