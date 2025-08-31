import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Prescription from "./Prescription";

// Function to check if user is authenticated
const isAuthenticated = () => localStorage.getItem("token") !== null;

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};


function App() {
  return (

    <div style={{ backgroundColor: "rgb(37, 80, 142)"}}>
      <BrowserRouter>
        <Header />
          <Routes>
              <Route path='/' element={<ProtectedRoute element={<Home />} />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/prescription' element={<Prescription />}></Route>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
