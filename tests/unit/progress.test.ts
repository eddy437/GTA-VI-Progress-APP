import { describe, it, expect } from 'vitest';
import { calculatePercentage, clamp, formatCurrency, formatNumber } from '@/lib/utils';

describe('Progress Calculations', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(0, 100)).toBe(0);
    expect(calculatePercentage(100, 100)).toBe(100);
    expect(calculatePercentage(75, 100)).toBe(75);
  });

  it('should handle zero total', () => {
    expect(calculatePercentage(0, 0)).toBe(0);
    expect(calculatePercentage(10, 0)).toBe(0);
  });

  it('should clamp percentage to 100', () => {
    expect(calculatePercentage(150, 100)).toBe(100);
    expect(calculatePercentage(200, 100)).toBe(100);
  });

  it('should round to nearest integer', () => {
    expect(calculatePercentage(1, 3)).toBe(33);
    expect(calculatePercentage(2, 3)).toBe(67);
  });
});

describe('Clamp Function', () => {
  it('should clamp values to range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should handle equal min and max', () => {
    expect(clamp(5, 5, 5)).toBe(5);
  });
});

describe('Format Functions', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(1000000)).toBe('$1.0M');
    expect(formatCurrency(1500000)).toBe('$1.5M');
    expect(formatCurrency(1000)).toBe('$1.0K');
    expect(formatCurrency(500)).toBe('$500');
  });

  it('should format numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1000000)).toBe('1,000,000');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });
});