import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Register from './components/Register';
import Login from './components/Login'; // Import the Login component
import './App.css';

function App() {
  return (
    <div>
      <h1>My E-commerce App</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/Products">Products</Link> | 
        <Link to="/Register">Register</Link> | 
        <Link to="/Login">Login</Link> 
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} /> 
      </Routes>
    </div>
  );
}

export default App;
