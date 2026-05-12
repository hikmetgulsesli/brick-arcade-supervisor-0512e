import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAppState } from './useAppState';

beforeEach(() => {
  localStorage.clear();
  (window as unknown as Record<string, unknown>).app = undefined;
  (window as unknown as Record<string, unknown>).render_game_to_text = undefined;
  (window as unknown as Record<string, unknown>).advanceTime = undefined;
});

describe('useAppState', () => {
  it('starts in menu mode', () => {
    const { result } = renderHook(() => useAppState());
    expect(result.current.mode).toBe('menu');
  });

  it('transitions from menu to playing on startGame', () => {
    const { result } = renderHook(() => useAppState());
    act(() => {
      result.current.startGame();
    });
    expect(result.current.mode).toBe('playing');
    expect(result.current.score).toBe(0);
    expect(result.current.lives).toBe(3);
    expect(result.current.level).toBe(1);
  });

  it('pauses and resumes game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    expect(result.current.mode).toBe('playing');

    act(() => result.current.pauseGame());
    expect(result.current.mode).toBe('paused');

    act(() => result.current.resumeGame());
    expect(result.current.mode).toBe('playing');
  });

  it('restarts game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    act(() => result.current.restartGame());
    expect(result.current.mode).toBe('playing');
    expect(result.current.score).toBe(0);
    expect(result.current.lives).toBe(3);
  });

  it('returns to menu', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    act(() => result.current.goToMenu());
    expect(result.current.mode).toBe('menu');
  });

  it('shows controls screen', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.showControls());
    expect(result.current.mode).toBe('controls');
  });

  it('exposes actions for all screen components', () => {
    const { result } = renderHook(() => useAppState());
    expect(result.current.actions['start-game-1']).toBeDefined();
    expect(result.current.actions['how-to-play-2']).toBeDefined();
    expect(result.current.actions['settings-3']).toBeDefined();
    expect(result.current.actions['resume-1']).toBeDefined();
    expect(result.current.actions['restart-2']).toBeDefined();
    expect(result.current.actions['restart-1']).toBeDefined();
    expect(result.current.actions['return-to-menu-3']).toBeDefined();
    expect(result.current.actions['play-again-1']).toBeDefined();
    expect(result.current.actions['main-menu-2']).toBeDefined();
    expect(result.current.actions['next-level-2']).toBeDefined();
    expect(result.current.actions['acknowledge-2']).toBeDefined();
  });

  it('exposes window.app after starting game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());

    const app = (window as unknown as Record<string, unknown>).app as Record<string, unknown>;
    expect(app).toBeDefined();
    expect(app.mode).toBe('playing');
    expect(app.score).toBe(0);
    expect(app.lives).toBe(3);
    expect(app.level).toBe(1);
  });

  it('exposes window.render_game_to_text', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());

    const renderFn = (window as unknown as Record<string, unknown>).render_game_to_text as () => string;
    expect(renderFn).toBeDefined();
    const text = renderFn();
    const state = JSON.parse(text);
    expect(state.mode).toBe('playing');
    expect(state.score).toBe(0);
    expect(state.lives).toBe(3);
    expect(state.level).toBe(1);
    expect(state.ball).toBeDefined();
    expect(state.paddle).toBeDefined();
  });

  it('exposes window.advanceTime', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());

    const advanceFn = (window as unknown as Record<string, unknown>).advanceTime as (ms: number) => void;
    expect(advanceFn).toBeDefined();
    // Should not throw
    advanceFn(100);
  });

  it('start-game-1 action starts the game', () => {
    const { result } = renderHook(() => useAppState());
    act(() => {
      result.current.actions['start-game-1']?.();
    });
    expect(result.current.mode).toBe('playing');
  });

  it('return-to-menu-3 action goes to menu', () => {
    const { result } = renderHook(() => useAppState());
    act(() => result.current.startGame());
    act(() => {
      result.current.actions['return-to-menu-3']?.();
    });
    expect(result.current.mode).toBe('menu');
  });
});
