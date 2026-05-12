import { describe, it, expect, beforeEach } from 'vitest';
import { getHighScore, saveHighScore } from './storage';

beforeEach(() => {
  localStorage.clear();
});

describe('storage', () => {
  it('returns 0 when no high score is saved', () => {
    expect(getHighScore()).toBe(0);
  });

  it('saves and retrieves high score', () => {
    saveHighScore(12345);
    expect(getHighScore()).toBe(12345);
  });

  it('returns 0 for invalid stored value', () => {
    localStorage.setItem('brick-arcade-high-score', 'not-a-number');
    expect(getHighScore()).toBe(0);
  });

  it('updates high score when higher', () => {
    saveHighScore(5000);
    saveHighScore(10000);
    expect(getHighScore()).toBe(10000);
  });

  it('does not decrease high score on lower save', () => {
    saveHighScore(10000);
    saveHighScore(5000);
    expect(getHighScore()).toBe(5000);
  });
});
