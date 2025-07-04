import { validateStartPageInput, validateSolution } from './validation';
import { describe, it, expect } from 'vitest';

describe('validateStartPageInput', () => {
  it('should return error if topic is empty', () => {
    const result = validateStartPageInput('', 'beginner', 10);
    expect(result.isValid).toBe(false);
    expect(result.errors.topic).toBe('Topic is required');
  });

  it('should return error if topic is less than 3 characters', () => {
    const result = validateStartPageInput('ab', 'beginner', 10);
    expect(result.isValid).toBe(false);
    expect(result.errors.topic).toBe('Topic must be at least 3 characters');
  });

  it('should return error if topic is more than 100 characters', () => {
    const longTopic = 'a'.repeat(101);
    const result = validateStartPageInput(longTopic, 'beginner', 10);
    expect(result.isValid).toBe(false);
    expect(result.errors.topic).toBe('Topic must be less than 100 characters');
  });

  it('should return error if level is missing', () => {
    const result = validateStartPageInput('Valid Topic', '', 10);
    expect(result.isValid).toBe(false);
    expect(result.errors.level).toBe('Level is required');
  });

  it('should return error if timeLimit is missing', () => {
    const result = validateStartPageInput('Valid Topic', 'beginner', '');
    expect(result.isValid).toBe(false);
    expect(result.errors.timeLimit).toBe('Time limit must be between 5 and 120 minutes');
  });

  it('should return error if timeLimit is less than 5', () => {
    const result = validateStartPageInput('Valid Topic', 'beginner', 4);
    expect(result.isValid).toBe(false);
    expect(result.errors.timeLimit).toBe('Time limit must be between 5 and 120 minutes');
  });

  it('should return error if timeLimit is more than 120', () => {
    const result = validateStartPageInput('Valid Topic', 'beginner', 121);
    expect(result.isValid).toBe(false);
    expect(result.errors.timeLimit).toBe('Time limit must be between 5 and 120 minutes');
  });

  it('should be valid for correct input', () => {
    const result = validateStartPageInput('Valid Topic', 'beginner', 30);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
  // add a test for the case where topic is a string with only spaces
  it('should return error if topic is only spaces', () => {
    const result = validateStartPageInput('   ', 'beginner', 10);
    expect(result.isValid).toBe(false);
    expect(result.errors.topic).toBe('Topic is required');
  });

  // add a test for the case where topic is a string with special characters
  it('should escape  special characters', () => {
    const result = validateStartPageInput('Escapes &', 'beginner', 10);
    expect(result.topic).toBe('Escapes &amp;');
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});

describe('validateSolution', () => {
  it('should return error if solution is empty', () => {
    const result = validateSolution('');
    expect(result.isValid).toBe(false);
    expect(result.errors.solution).toBe('Solution is required');
  });

  it('should return error if solution is less than 10 characters', () => {
    const result = validateSolution('short');
    expect(result.isValid).toBe(false);
    expect(result.errors.solution).toBe('Solution must be at least 10 characters');
  });

  it('should be valid for correct solution', () => {
    const result = validateSolution('This is a valid solution.');
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should trim whitespace from solution', () => {
    const result = validateSolution('   Valid solution with spaces   ');
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  })
});