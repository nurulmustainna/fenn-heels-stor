const db = require('../config/db');

// Data cadangan agar Vercel tetap menampilkan produk jika MySQL lokal terputus
const mockProducts = [
  {
    id_produk: 1,
    nama_produk: "Stiletto Classic Nude",
    harga: 350000,
    stok: 12,
    kategori: "Stiletto",
    deskripsi: "Heels elegan dengan kenyamanan ekstra untuk acara formal."
  },
  {
    id_produk: 2,
    nama_produk: "Block Heels Crystal White",
    harga: 420000,
    stok: 8,
    kategori: "Block Heels",
    deskripsi: "Tampil mewah dengan aksen kristal nan anggun."
  },
  {
    id_produk: 3,
    nama_produk: "Kitten Heels Glam Gold",
    harga: 290000,
    stok: 15,
    kategori: "Kitten Heels",
    deskripsi: "Sangat nyaman dipakai seharian tanpa bikin pegal."
  }
];

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
    // Jika koneksi MySQL gagal (misal di Vercel), tampilkan data cadangan
    return res.status(200).json({
      success: true,
      message: "Menggunakan data produk cadangan (Cloud Mode)",
      data: mockProducts
    });
  }
};

module.exports = { getProducts };