import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(0); // Assume this is tracked via a global state

  useEffect(() => {
    // Check if the user is logged in (e.g., check a session or token)
    const currentUser = JSON.parse(localStorage.getItem('user')); // Or use a global state
    setUser(currentUser);

    // Check if the user has items in their cart (this can also be stored in global state)
    const currentCart = JSON.parse(localStorage.getItem('cart')); // Or use a global state
    setCartItems(currentCart ? currentCart.length : 0);
  }, []);

  const handleLogout = () => {
    // Clear user session and cart
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
    setCartItems(0);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">MyApp</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li>Hello, {user.name}</li>
              <li>
                <Link to="/cart">Cart ({cartItems})</Link>
              </li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
