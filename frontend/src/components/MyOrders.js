import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">My Orders</h1>
            {orders.length === 0 ? (
                <p className="text-muted">No orders placed yet.</p>
            ) : (
                <div className="list-group">
                    {orders.map(order => (
                        <div key={order.id} className="list-group-item">
                            <h2 className="h5">Order ID: {order.id}</h2>
                            <ul className="list-group mb-2">
                                {order.items.map(item => (
                                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {item.name} - {item.selectedQuantity === 'full' ? item.price.full : item.price.half} ₹ x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <p className="font-weight-bold">Total: {order.total} ₹</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;
