const db = require('../config/db');

const getDb = () => (db.promise ? db.promise() : db);

exports.createOrder = async (req, res) => {
  try {
    const { id_user, nama_penerima, alamat_pengiriman, no_telepon, items } = req.body;

    if (!id_user || !nama_penerima || !alamat_pengiriman || !no_telepon || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Data pengiriman atau barang belanjaan tidak lengkap!'
      });
    }

    let total_harga = 0;
    const database = getDb();

    // Hitung total harga
    for (const item of items) {
      const [products] = await database.query(
        'SELECT harga FROM produk WHERE id_produk = ?',
        [item.id_produk]
      );

      if (products.length > 0) {
        total_harga += Number(products[0].harga) * item.jumlah;
      }
    }

    // Insert ke tabel orders
    const [orderResult] = await database.query(
      `INSERT INTO orders (id_user, nama_penerima, alamat_pengiriman, no_telepon, total_harga, status) 
       VALUES (?, ?, ?, ?, ?, 'PENDING')`,
      [id_user, nama_penerima, alamat_pengiriman, no_telepon, total_harga]
    );

    const orderId = orderResult.insertId;

    // Insert ke tabel order_details & Update Stok
    for (const item of items) {
      const [products] = await database.query(
        'SELECT harga FROM produk WHERE id_produk = ?',
        [item.id_produk]
      );
      const hargaSatuan = products.length > 0 ? products[0].harga : 0;

      await database.query(
        `INSERT INTO order_details (id_order, id_produk, jumlah, harga_satuan) 
         VALUES (?, ?, ?, ?)`,
        [orderId, item.id_produk, item.jumlah, hargaSatuan]
      );

      await database.query(
        'UPDATE produk SET stok = stok - ? WHERE id_produk = ?',
        [item.jumlah, item.id_produk]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Pesanan berhasil dibuat!',
      data: {
        id_pesanan: orderId,
        total_harga: total_harga,
        status: 'PENDING'
      }
    });

  } catch (error) {
    console.error('Error createOrder:', error);
    return res.status(500).json({
      success: false,
      message: error.sqlMessage || 'Terjadi kesalahan pada server saat memproses pesanan.'
    });
  }
};

// 2. GET ALL ORDERS (PANEL ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    const database = getDb();
    
    // Kueri yang disesuaikan dengan struktur tabel orders
    const [orders] = await database.query(
      `SELECT 
        * 
       FROM orders 
       ORDER BY 1 DESC` // Mengurutkan berdasarkan kolom pertama (ID) secara otomatis
    );

    return res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error getAllOrders:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data pesanan.',
      error: error.message
    });
  }
};

// 3. UPDATE STATUS (PANEL ADMIN)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusBaru } = req.body;
    const database = getDb();

    const [result] = await database.query(
      'UPDATE orders SET status = ? WHERE id_order = ?',
      [statusBaru, id]
    );

    return res.json({
      success: true,
      message: `Status pesanan #${id} berhasil diubah menjadi ${statusBaru}`
    });
  } catch (error) {
    console.error('Error updateOrderStatus:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal merubah status pesanan.'
    });
  }
};