import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart({ cart, setCart }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalBill = cart.reduce((acc, item) => {
            const itemPrice = item.selectedQuantity === 'full' ? item.price.full : item.price.half;
            return acc + itemPrice * item.quantity;
        }, 0);
        setTotal(totalBill);
    }, [cart]);

    const handleIncreaseQuantity = (foodId) => {
        setCart(cart.map(item =>
            item._id === foodId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecreaseQuantity = (foodId) => {
        setCart(cart.map(item =>
            item._id === foodId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0));
    };

    const handlePlaceOrder = () => {
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = { id: new Date().getTime(), items: cart, total };
        const updatedOrders = [...existingOrders, newOrder];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        setCart([]); // Clear the cart after placing the order
        alert('Order placed successfully!');
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Cart</h1>
            <div className="list-group mb-3">
                {cart.map(item => (
                    <div key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{item.name} - {item.selectedQuantity === 'full' ? item.price.full : item.price.half} ₹ x {item.quantity}</span>
                        <div>
                            <button className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                            <button className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                        </div>
                    </div>
                ))}
            </div>
            <h2>Total Bill: {total} ₹</h2>
            <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
}

export default Cart;
