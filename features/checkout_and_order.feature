Feature: Checkout Produk dan Manajemen Status Pesanan FENN Heels Store
  Sebagai pengguna / admin web
  Saya ingin melakukan checkout dan mengelola status pesanan
  Agar transaksi pembelian sepatu heels berjalan sesuai aturan bisnis

  # 1) Skenario Positif
  Scenario: Checkout produk berhasil dengan data lengkap
    Given Pelanggan memilih produk "Classic Nude Heels" dengan stok tersisa 5
    When Pelanggan memasukkan kuantitas pemesanan sebanyak 2 pasang
    Then Sistem harus menerima proses checkout

  # 2) Skenario Negatif & Validasi Batas (Boundary Value)
  Scenario: Checkout gagal karena kuantitas membeli melebihi batas stok
    Given Pelanggan memilih produk "Diamond Strap Heels" dengan stok tersisa 2
    When Pelanggan memasukkan kuantitas pemesanan sebanyak 3 pasang
    Then Sistem harus membatalkan proses checkout

  # 3) Skenario Perubahan Status & Scenario Outline dengan Examples
  Scenario Outline: Validasi transisi status pesanan oleh Admin
    Given Pesanan berada pada status awal "<status_awal>"
    When Admin mencoba mengubah status pesanan menjadi "<status_tujuan>"
    Then Hasil validasi transisi status harus "<hasil_ekspektasi>"

    Examples:
      | status_awal | status_tujuan | hasil_ekspektasi |
      | DRAFT       | CONFIRMED     | VALID            |
      | DRAFT       | COMPLETED     | INVALID          |
      | CONFIRMED   | COMPLETED     | VALID            |
      | CONFIRMED   | CANCELLED     | VALID            |
      | COMPLETED   | CANCELLED     | INVALID          |