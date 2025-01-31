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
        <Link to="/products">Products</Link> | 
        <Link to="/register">Register</Link> | 
        <Link to="/login">Login</Link> {/* Add the Login link */}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Add the Login route */}
      </Routes>
    </div>
  );
}

export default App;
