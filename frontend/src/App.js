import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CategoryPage from './components/CategoryPage';
import Cart from './components/Cart';
import MyOrders from './components/MyOrders';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <Router>
            <Navbar onSearchChange={handleSearchChange} />
            <Routes>
                <Route path="/" element={<Home search={search} />} />
                <Route path="/category/:categoryName" element={<CategoryPage cart={cart} setCart={setCart} />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Add a route for handling default or unknown paths */}
                <Route path="*" element={<Home search={search} />} />
            </Routes>
        </Router>
    );
}

export default App;
