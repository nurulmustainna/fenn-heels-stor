const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Melayani file frontend HTML & Gambar dari folder public
app.use(express.static('public'));

// RESTful API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Jalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server API Marketplace Heels berjalan di http://localhost:${PORT}`);
});

module.exports = app;