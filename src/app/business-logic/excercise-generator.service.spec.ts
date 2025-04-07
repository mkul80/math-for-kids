import { TestBed } from '@angular/core/testing';

import { ExcerciseGeneratorService } from './excercise-generator.service';

describe('ExcerciseGeneratorService', () => {
  describe('generateNonPrimeNumber', () => {
    const isPrime = (num: number): boolean => {
      if (num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };

    it('should generate number within the given range', () => {
      const max = 100;
      const result = ExcerciseGeneratorService.generateNonPrimeNumber(max);
      expect(result).toBeLessThanOrEqual(max);
      expect(result).toBeGreaterThanOrEqual(2);
    });

    it('should generate non-prime number', () => {
      const max = 100;
      const result = ExcerciseGeneratorService.generateNonPrimeNumber(max);
      expect(isPrime(result)).toBeFalse();
    });

    it('should work with different max values', () => {
      const testCases = [10, 20, 50, 100];

      testCases.forEach((max) => {
        const result = ExcerciseGeneratorService.generateNonPrimeNumber(max);
        expect(result).toBeLessThanOrEqual(max);
        expect(result).toBeGreaterThanOrEqual(2);
        expect(isPrime(result)).toBeFalse();
      });
    });

    it('should be able to generate different numbers', () => {
      const max = 100;
      const numbers = new Set<number>();

      // Generate 20 numbers
      for (let i = 0; i < 20; i++) {
        numbers.add(ExcerciseGeneratorService.generateNonPrimeNumber(max));
      }

      // With 20 attempts, we should get at least 3 different numbers
      // This is a probabilistic test that should pass consistently
      expect(numbers.size).toBeGreaterThanOrEqual(3);
    });
  });
});
