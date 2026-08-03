function validateCart(product, quantity) {
  if (!product || typeof quantity !== 'number' || quantity <= 0) {
    return { isValid: false, message: 'Kuantitas tidak valid' };
  }
  if (quantity > product.stock) {
    return { isValid: false, message: 'Kuantitas melebihi stok' };
  }
  return { isValid: true, message: 'Checkout valid' };
}

module.exports = validateCart;