const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Endpoint POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Cek jika yang login adalah ADMIN
    if (username === 'admin' && password === 'admin123') {
      return res.json({
        success: true,
        message: 'Login Admin Berhasil!',
        data: { 
          username: 'Admin Store', 
          role: 'admin' 
        }
      });
    }

    // 2. Cek jika pembeli/user biasa yang login
    if (username && password) {
      return res.json({
        success: true,
        message: 'Login User Berhasil!',
        data: { 
          username: username, 
          role: 'user' 
        }
      });
    }

    return res.status(400).json({ 
      success: false, 
      message: 'Username dan password wajib diisi!' 
    });

  } catch (err) {
    console.error('Error Auth:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server saat login.' 
    });
  }
});

module.exports = router;