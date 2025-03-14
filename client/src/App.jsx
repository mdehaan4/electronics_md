import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // ✅ Import Dashboard
import Header from './components/Header'; 
import './App.css';

function App() {
  return (
    <div>
      {/* ✅ Header is part of layout, not a route */}
      <Header />  

      <h1>My E-commerce App</h1>

      {/* ✅ Navigation links */}
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/Products">Products</Link> | 
        <Link to="/Register">Register</Link> | 
        <Link to="/Login">Login</Link> | 
        <Link to="/Dashboard">Dashboard</Link> 
      </nav>

      {/* ✅ Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} /> {/* ✅ Dashboard route */}
      </Routes>
    </div>
  );
}

export default App;
