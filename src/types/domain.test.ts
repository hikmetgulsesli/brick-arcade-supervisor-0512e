import { describe, it, expect } from 'vitest';
import { LEVELS, BRICK_COLORS } from './domain';

describe('domain constants', () => {
  it('has at least 5 levels defined', () => {
    expect(LEVELS.length).toBeGreaterThanOrEqual(5);
  });

  it('each level has rows, cols, brickHealth, and ballSpeed', () => {
    for (const level of LEVELS) {
      expect(level.rows).toBeGreaterThan(0);
      expect(level.cols).toBeGreaterThan(0);
      expect(level.brickHealth.length).toBeGreaterThan(0);
      expect(level.ballSpeed).toBeGreaterThan(0);
    }
  });

  it('has brick colors for health 1, 2, 3', () => {
    expect(BRICK_COLORS[1]).toBeDefined();
    expect(BRICK_COLORS[2]).toBeDefined();
    expect(BRICK_COLORS[3]).toBeDefined();
  });
});
