const login = (req, res) => {
  const { username, password } = req.body;

  // 1. Validasi Field Kosong
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Field kosong! Username/Email dan Password wajib diisi."
    });
  }

  const userInput = username.trim().toLowerCase();

  // 2. Akun Statis untuk Admin
  if (userInput === "admin@heels.com" || userInput === "admin") {
    if (password === "admin123") {
      return res.status(200).json({
        success: true,
        message: "Login Berhasil!",
        data: { username: "Administrator", role: "admin" }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Login gagal! Password salah."
      });
    }
  }

  // 3. Akun Pengguna / Customer
  if (password.length >= 3) {
    return res.status(200).json({
      success: true,
      message: "Login Berhasil!",
      data: { username: username.trim(), role: "customer" }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Login gagal! Data yang dimasukkan salah (Password min 3 karakter)."
    });
  }
};

module.exports = { login };