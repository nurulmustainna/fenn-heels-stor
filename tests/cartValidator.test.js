const { validateQuantity } = require('../utils/cartValidator');

describe('TDD - Validasi Batas Jumlah Pembelian Keranjang', () => {
  test('Harus menolak nilai kurang dari 1', () => {
    expect(validateQuantity(0)).toBe(false);
    expect(validateQuantity(-5)).toBe(false);
  });

  test('Harus menolak nilai lebih dari 10', () => {
    expect(validateQuantity(11)).toBe(false);
    expect(validateQuantity(15)).toBe(false);
  });

  test('Harus menerima nilai valid (1 - 10)', () => {
    expect(validateQuantity(1)).toBe(true);
    expect(validateQuantity(5)).toBe(true);
    expect(validateQuantity(10)).toBe(true);
  });

  test('Harus menolak nilai pecahan atau tipe non-integer', () => {
    expect(validateQuantity(2.5)).toBe(false);
    expect(validateQuantity("5")).toBe(false);
  });
});