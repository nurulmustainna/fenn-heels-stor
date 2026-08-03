const { validateStatusTransition, ALLOWED_TRANSITIONS, VALID_STATUSES } = require('../utils/orderStatusValidator');

describe('TDD - Validasi Aturan Transisi Status Pesanan', () => {

  // -----------------------------------------------------------------------
  // 1. Status awal pesanan harus DRAFT
  // -----------------------------------------------------------------------
  describe('Status Awal Pesanan', () => {
    test('Status pesanan baru harus dimulai dari DRAFT', () => {
      expect(VALID_STATUSES).toContain('DRAFT');
      expect(ALLOWED_TRANSITIONS).toHaveProperty('DRAFT');
    });
  });

  // -----------------------------------------------------------------------
  // 2. Transisi yang DIIZINKAN
  // -----------------------------------------------------------------------
  describe('Transisi Status yang Diizinkan', () => {
    test('DRAFT dapat berubah menjadi CONFIRMED', () => {
      const hasil = validateStatusTransition('DRAFT', 'CONFIRMED');
      expect(hasil.valid).toBe(true);
    });

    test('CONFIRMED dapat berubah menjadi COMPLETED', () => {
      const hasil = validateStatusTransition('CONFIRMED', 'COMPLETED');
      expect(hasil.valid).toBe(true);
    });

    test('DRAFT dapat berubah menjadi CANCELLED', () => {
      const hasil = validateStatusTransition('DRAFT', 'CANCELLED');
      expect(hasil.valid).toBe(true);
    });

    test('CONFIRMED dapat berubah menjadi CANCELLED', () => {
      const hasil = validateStatusTransition('CONFIRMED', 'CANCELLED');
      expect(hasil.valid).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Transisi yang DITOLAK — COMPLETED adalah status final
  // -----------------------------------------------------------------------
  describe('Pesanan COMPLETED Tidak Dapat Dibatalkan', () => {
    test('COMPLETED tidak dapat berubah menjadi CANCELLED', () => {
      const hasil = validateStatusTransition('COMPLETED', 'CANCELLED');
      expect(hasil.valid).toBe(false);
      expect(hasil.message).toMatch(/COMPLETED/);
    });

    test('COMPLETED tidak dapat berubah menjadi DRAFT', () => {
      const hasil = validateStatusTransition('COMPLETED', 'DRAFT');
      expect(hasil.valid).toBe(false);
    });

    test('COMPLETED tidak dapat berubah menjadi CONFIRMED', () => {
      const hasil = validateStatusTransition('COMPLETED', 'CONFIRMED');
      expect(hasil.valid).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // 4. Transisi yang DITOLAK — CANCELLED tidak dapat diaktifkan kembali
  // -----------------------------------------------------------------------
  describe('Pesanan CANCELLED Tidak Dapat Diaktifkan Kembali', () => {
    test('CANCELLED tidak dapat berubah menjadi DRAFT', () => {
      const hasil = validateStatusTransition('CANCELLED', 'DRAFT');
      expect(hasil.valid).toBe(false);
      expect(hasil.message).toMatch(/CANCELLED/);
    });

    test('CANCELLED tidak dapat berubah menjadi CONFIRMED', () => {
      const hasil = validateStatusTransition('CANCELLED', 'CONFIRMED');
      expect(hasil.valid).toBe(false);
    });

    test('CANCELLED tidak dapat berubah menjadi COMPLETED', () => {
      const hasil = validateStatusTransition('CANCELLED', 'COMPLETED');
      expect(hasil.valid).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // 5. Transisi yang DITOLAK — loncat status tidak diizinkan
  // -----------------------------------------------------------------------
  describe('Loncat Status Tidak Diizinkan', () => {
    test('DRAFT tidak dapat langsung menjadi COMPLETED', () => {
      const hasil = validateStatusTransition('DRAFT', 'COMPLETED');
      expect(hasil.valid).toBe(false);
      expect(hasil.message).toMatch(/tidak dapat/);
    });
  });

  // -----------------------------------------------------------------------
  // 6. Status yang tidak dikenal harus ditolak
  // -----------------------------------------------------------------------
  describe('Validasi Status Tidak Dikenal', () => {
    test('Status saat ini yang tidak valid harus ditolak', () => {
      const hasil = validateStatusTransition('MENUNGGU', 'CONFIRMED');
      expect(hasil.valid).toBe(false);
      expect(hasil.message).toMatch(/tidak dikenal/);
    });

    test('Status tujuan yang tidak valid harus ditolak', () => {
      const hasil = validateStatusTransition('DRAFT', 'PROSES');
      expect(hasil.valid).toBe(false);
      expect(hasil.message).toMatch(/tidak valid/);
    });
  });

  // -----------------------------------------------------------------------
  // 7. Status yang sama tidak perlu diubah
  // -----------------------------------------------------------------------
  describe('Transisi ke Status yang Sama Ditolak', () => {
    test('DRAFT ke DRAFT harus ditolak', () => {
      const hasil = validateStatusTransition('DRAFT', 'DRAFT');
      expect(hasil.valid).toBe(false);
      expect(hasil.message).toMatch(/sudah/);
    });

    test('CONFIRMED ke CONFIRMED harus ditolak', () => {
      const hasil = validateStatusTransition('CONFIRMED', 'CONFIRMED');
      expect(hasil.valid).toBe(false);
    });
  });
});
