import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home/Home';

const MyRoutes = () => {
  return (
    <Router>

        <Routes>
            <Route element={<Home />} path="/home" />
        </Routes>
      
    </Router>
  )
}

export default MyRoutes
