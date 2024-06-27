import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  return (
    <header className="navbar" style={{ backgroundColor: "#B42B4D" }}>
      <h1 className="logo">GoFood</h1>
      {/* Removed the search bar */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/myorders">My Orders</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
  );
}

export default Navbar;
