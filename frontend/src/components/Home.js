import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import './Home.css';

function Home({ search }) {
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/foods')
            .then(response => setFoods(response.data));
    }, []);

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="home-container">
            <Carousel>
                <div>
                    <img src="https://t3.ftcdn.net/jpg/02/09/77/52/360_F_209775206_lKDQpFottlBFixQRFudJYCOvI34RsanU.jpg" alt="Food 1" />
                </div>
                <div>
                    <img src="https://i.pinimg.com/originals/24/16/85/2416852ecd4499cda91de41e17140909.jpg" alt="Food 2" />
                </div>
                <div>
                    <img src="https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8yM190aGVfcGljdHVyZV9vZl9jaGlja2VuX2JyaXlhbmlfbm9fbG9nb3NfdG9wX185YzUwMjY0NS03OGE2LTRjMDgtYjUwMi1kZmE1Y2EyOWIyYzQtMDAyLWMuanBn.jpg" alt="Food 3" />
                </div>
            </Carousel>
            <main>
                <div className="category-buttons">
                    <button className="btn btn-success" onClick={() => navigate('/category/all')}>All</button>
                    <button className="btn btn-success" onClick={() => navigate('/category/starter')}>Starters</button>
                    <button className="btn btn-success" onClick={() => navigate('/category/pizza')}>Pizza</button>
                    <button className="btn btn-success" onClick={() => navigate('/category/burger')}>Burgers</button>
                    <button className="btn btn-success" onClick={() => navigate('/category/biryani')}>Biryanis</button>
                    <button className="btn btn-success" onClick={() => navigate('/category/dessert')}>Desserts</button>
                </div>
                {/* <div className="food-items">
                    {filteredFoods.map(food => (
                        <div className="food-card" key={food._id}>
                            <img className="food-image" src={food.imageUrl} alt={food.name} />
                            <h2 className="food-name">{food.name}</h2>
                            <p className="food-price">
                                {food.selectedQuantity === 'full' ? food.price.full : food.price.half} ₹
                            </p>
                            <select className="food-quantity">
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    ))}
                </div> */}
            </main>
        </div>
    );
}

export default Home;
