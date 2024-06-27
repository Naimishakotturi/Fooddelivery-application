const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/gofood', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const foodSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: {
        half: Number,
        full: Number
    },
    imageUrl: String
});

const Food = mongoose.model('Food', foodSchema);
const cartSchema = new mongoose.Schema({
    items: [{
        foodId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: String,
        price: Number,
        imageUrl: String
    }],
    total: Number
});

const Cart = mongoose.model('Cart', cartSchema);


const foods = [
    { _id: '1', name: 'crispy corn', category: 'starter', price: { half: 100, full: 200 }, imageUrl: 'https://www.cookclickndevour.com/wp-content/uploads/2017/08/crispy-corn-recipe-c-683x1024.jpg' },
    { _id: '2', name: 'chicken Tikka', category: 'starter', price: { half: 100, full: 200 }, imageUrl: 'https://t4.ftcdn.net/jpg/05/85/17/03/360_F_585170352_7D9PjNXOvU3PAB4ynMRWpEavhBNuLG3J.jpg' },
    { _id: '3', name: 'chilli paneer', category: 'starter', price: { half: 100, full: 200 }, imageUrl: 'https://www.cookwithmanali.com/wp-content/uploads/2016/01/Chilli-Paneer-Restaurant-Style.jpg' },
    { _id: '4', name: 'Salmon fish', category: 'starter', price: { half: 100, full: 200 }, imageUrl: 'https://media.istockphoto.com/id/1214416414/photo/barbecued-salmon-fried-potatoes-and-vegetables-on-wooden-background.jpg?s=612x612&w=0&k=20&c=Y8RYbZFcvec-FXMMuoU-qkprC3TUFNiw3Ysoe8Drn6g=' },
    { _id: '5', name: 'Margherita Pizza', category: 'pizza', price: { half: 100, full: 200 }, imageUrl: 'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=' },
    { _id: '6', name: 'Pepperoni Pizza', category: 'pizza', price: { half: 100, full: 200 }, imageUrl: 'https://img.freepik.com/premium-photo/aesthetic-dripping-tasty-pizza-slice-generative-ai_863013-2003.jpg' },
    { _id: '7', name: 'Chiken Pizza', category: 'pizza', price: { half: 100, full: 200 }, imageUrl: 'https://media.istockphoto.com/id/1340589333/photo/homemade-indian-chicken-tikka-masala-pizza.jpg?s=612x612&w=0&k=20&c=QetWD3UJeCFoTq6OYNJehauw7Utc8MxH6B90Cb9zvLw=' },
    { _id: '8', name: 'Panner Pizza', category: 'pizza', price: { half: 100, full: 200 }, imageUrl: 'https://media.istockphoto.com/id/1341905666/photo/chinese-food-veg-pizza.jpg?s=612x612&w=0&k=20&c=ZMNxcRhL9uGV8zebXg5wGCh-5GzVBRHsu-lz7Sc06V4=' },
    { _id: '9', name: 'cheese Burger', category: 'burger', price: { half: 100, full: 200 }, imageUrl: 'https://www.oliveandmango.com/images/uploads/2021_06_21_classic_grilled_cheeseburger_0.jpg' },
    { _id: '10', name: 'chicken Burger', category: 'burger', price: { half: 100, full: 200 }, imageUrl: 'https://www.licious.in/blog/wp-content/uploads/2022/08/shutterstock_574607542.jpg' },
    { _id: '11', name: 'Chicken Biryani', category: 'biryani', price: { half: 100, full: 200 }, imageUrl: 'https://st2.depositphotos.com/5653638/48017/i/450/depositphotos_480177894-stock-photo-dum-handi-chicken-biryani-prepared.jpg' },
    { _id: '12', name: 'Mutton Biryani', category: 'biryani', price: { half: 100, full: 200 }, imageUrl: 'https://www.shutterstock.com/image-photo/spicy-delicious-mutton-biryani-260nw-790330249.jpg' },
    { _id: '13', name: 'Prawn Biryani', category: 'biryani', price: { half: 100, full: 200 }, imageUrl: 'https://i.pinimg.com/736x/b8/0b/ef/b80bef4880ab2f36be6098e75ea51e0f.jpg' },
    { _id: '14', name: 'Apricot delight', category: 'dessert', price: { half: 100, full: 200 }, imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1a/6a/47/1a/in-house-made-apricot.jpg' },
    { _id: '15', name: 'Tres Leches', category: 'dessert', price: { half: 100, full: 200 }, imageUrl: 'https://thedessertedgirl.com/wp-content/uploads/2023/02/StrawberryTresLeches3.jpg' },
    { _id: '16', name: 'Turkish milkcake', category: 'dessert', price: { half: 100, full: 200 }, imageUrl: 'https://images.slurrp.com/prod/articles/0trxihgfa1yk.webp' },
    { _id: '17', name: 'Cheese cake', category: 'dessert', price: { half: 100, full: 200 }, imageUrl: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Creamy-Cherry-Cheesecake_EXPS_TOHcom23_2669_P2_MD_03_22_3b-1.jpg?fit=700%2C1024' },
];

app.get('/api/foods', (req, res) => {
    const category = req.query.category;
    if (category && category !== 'all') {
        const filteredFoods = foods.filter(food => food.category === category);
        res.json(filteredFoods);
    } else {
        res.json(foods);
    }
});

app.post('/api/orders', (req, res) => {
    // Handle order placement logic
    res.send('Order placed successfully!');
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send('User signed up successfully!');
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    if (user) {
        res.send('Login successful!');
    } else {
        res.send('Invalid credentials!');
    }
});
app.post('/api/cart', async (req, res) => {
    const { foodId, quantity } = req.body;
    const foodItem = foods.find(food => food._id === foodId);
    if (!foodItem) {
        return res.status(404).send('Food item not found');
    }

    const price = foodItem.price[quantity];
    const cartItem = {
        foodId: foodItem._id,
        name: foodItem.name,
        quantity: quantity,
        price: price,
        imageUrl: foodItem.imageUrl
    };

    let cart = await Cart.findOne({});
    if (!cart) {
        cart = new Cart({ items: [], total: 0 });
    }

    cart.items.push(cartItem);
    cart.total += price;
    await cart.save();

    res.json({ message: 'Item added to cart', cart });
});
app.get('/api/cart', async (req, res) => {
    const cart = await Cart.findOne({});
    if (!cart) {
        return res.status(404).send('Cart is empty');
    }
    res.json(cart);
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
});

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
});
