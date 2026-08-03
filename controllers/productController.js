const db = require('../config/db');

const getProducts = async (req, res) => {
  try {
    const query = "SELECT id_produk, nama_produk, harga, stok, kategori, deskripsi FROM products";
    const [results] = await db.query(query);

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil daftar produk",
      data: results
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data produk dari database",
      error: err.message
    });
  }
};

module.exports = { getProducts };