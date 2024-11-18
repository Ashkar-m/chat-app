import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Chat from "../Pages/Chat/Chat";

const MyRoutes = () => {
  return (
    <Router>

        <Routes>
            <Route element={<Home />} path="/home" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Chat />} path="/chat" />
        </Routes>
      
    </Router>
  )
}

export default MyRoutes
