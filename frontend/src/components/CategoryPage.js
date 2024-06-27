import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

function CategoryPage({ cart, setCart }) {
    const { categoryName } = useParams();
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            const response = await axios.get(`http://localhost:5000/api/foods?category=${categoryName}`);
            setFoods(response.data);
        };

        if (categoryName === 'all') {
            axios.get('http://localhost:5000/api/foods')
                .then(response => setFoods(response.data));
        } else {
            fetchFoods();
        }
    }, [categoryName]);

    const handleQuantityChange = (foodId, event) => {
        const newFoods = foods.map(food => {
            if (food._id === foodId) {
                return { ...food, selectedQuantity: event.target.value };
            }
            return food;
        });
        setFoods(newFoods);
    };

    const handleAddToCart = (food) => {
        const existingItem = cart.find(item => item._id === food._id);
        if (existingItem) {
            setCart(cart.map(item =>
                item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...food, quantity: 1, selectedQuantity: food.selectedQuantity || 'half' }]);
        }
    };

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

    return (
        <div className="category-page">
            <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
            <div className="food-items">
                {foods.map(food => (
                    <div className="food-card" key={food._id}>
                        <img className="food-image" src={food.imageUrl} alt={food.name} />
                        <h2 className="food-name">{food.name}</h2>
                        <p className="food-price">
                            {food.selectedQuantity === 'full' ? food.price.full : food.price.half} ₹
                        </p>
                        <select className="food-quantity" value={food.selectedQuantity || 'half'} onChange={(event) => handleQuantityChange(food._id, event)}>
                            <option value="half">Half</option>
                            <option value="full">Full</option>
                        </select>
                        {cart.find(item => item._id === food._id) ? (
                            <div className="quantity-controls">
                                <button className="quantity-button" onClick={() => handleDecreaseQuantity(food._id)}>-</button>
                                <span className="quantity-display">{cart.find(item => item._id === food._id).quantity}</span>
                                <button className="quantity-button" onClick={() => handleIncreaseQuantity(food._id)}>+</button>
                            </div>
                        ) : (
                            <button className="add-to-cart" onClick={() => handleAddToCart(food)}>Add to Cart</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
