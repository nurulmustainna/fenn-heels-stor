const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

const validateCart = require('../../utils/cartValidator');
const isValidTransition = require('../../utils/orderStatusValidator');

let currentProduct = {};
let cartResult = {};
let currentStatus = '';
let transitionResult = false;

// Step Definitions: Checkout & Boundary
Given('Pelanggan memilih produk {string} dengan stok tersisa {int}', function (name, stock) {
  currentProduct = { name, stock };
});

When('Pelanggan memasukkan kuantitas pemesanan sebanyak {int} pasang', function (qty) {
  cartResult = validateCart(currentProduct, qty);
});

Then('Sistem harus menerima proses checkout', function () {
  assert.strictEqual(cartResult.isValid, true);
});

Then('Sistem harus membatalkan proses checkout', function () {
  assert.strictEqual(cartResult.isValid, false);
});

// Step Definitions: Status Transition
Given('Pesanan berada pada status awal {string}', function (statusAwal) {
  currentStatus = statusAwal;
});

When('Admin mencoba mengubah status pesanan menjadi {string}', function (statusTujuan) {
  transitionResult = isValidTransition(currentStatus, statusTujuan);
});

Then('Hasil validasi transisi status harus {string}', function (expectedResult) {
  const isExpectedValid = expectedResult === 'VALID';
  assert.strictEqual(transitionResult, isExpectedValid);
});