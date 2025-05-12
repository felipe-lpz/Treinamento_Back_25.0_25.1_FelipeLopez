import {
  validateCPF,
  validatePhone,
  formatCPF,
  formatPhone,
} from '../../../utils/validation';

describe('Validation Utils', () => {
  describe('CPF Validation', () => {
    it('should validate a correct CPF with formatting', () => {
      expect(validateCPF('123.456.789-09')).toBe(true);
    });

    it('should validate a correct CPF without formatting', () => {
      expect(validateCPF('12345678909')).toBe(true);
    });

    it('should reject CPF with invalid format', () => {
      expect(validateCPF('123.456.789')).toBe(false);
      expect(validateCPF('abc.def.ghi-jk')).toBe(false);
    });

    it('should reject CPF with all repeated digits', () => {
      expect(validateCPF('111.111.111-11')).toBe(false);
    });
  });

  describe('Phone Validation', () => {
    it('should validate a correct phone number', () => {
      expect(validatePhone('(11) 98765-4321')).toBe(true);
    });

    it('should reject phone with incorrect format', () => {
      expect(validatePhone('11 98765-4321')).toBe(false);
      expect(validatePhone('(11) 987654321')).toBe(false);
      expect(validatePhone('(11)98765-4321')).toBe(false);
    });
  });

  describe('CPF Formatting', () => {
    it('should format CPF correctly', () => {
      expect(formatCPF('12345678909')).toBe('123.456.789-09');
    });

    it('should return original if length is not 11', () => {
      expect(formatCPF('123456')).toBe('123456');
    });
  });

  describe('Phone Formatting', () => {
    it('should format phone correctly', () => {
      expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
    });

    it('should return original if length is not 11', () => {
      expect(formatPhone('1234')).toBe('1234');
    });
  });
});
