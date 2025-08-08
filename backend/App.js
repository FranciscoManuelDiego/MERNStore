const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Information processing CORS
require('dotenv').config();


const categoriesRoutes = require("./routes/Categories")
const productsRoutes = require("./routes/Products")
const cartRoutes = require("./routes/Cart")
const auth = require("./routes/Auth")

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3001', // This takes the origin of the React App
    credentials: true // Allow cookies if needed
  }
));
app.use(cookieParser()); // Middleware to parse cookies

//Writing api to routes
app.use('/api/auth', auth);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes)


const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` Server is runnning on port: ${port}` ));

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
