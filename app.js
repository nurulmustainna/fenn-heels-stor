const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Melayani file frontend HTML & Gambar dari folder public (Path Mutlak)
app.use(express.static(path.join(__dirname, 'public')));

// RESTful API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Rute Fallback ke Frontend (Solusi Utama Error 404 Vercel)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan Server Lokal (Hanya saat tidak di Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server API Marketplace Heels berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;