import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameOver } from './GameOver';
import { AppProvider } from '../contexts/AppContext';

beforeEach(() => {
  localStorage.clear();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('GameOver', () => {
  it('renders GAME OVER title', () => {
    render(<GameOver />, { wrapper: Wrapper });
    expect(screen.getByText('GAME OVER')).toBeInTheDocument();
  });

  it('renders CRITICAL FAILURE DETECTED subtitle', () => {
    render(<GameOver />, { wrapper: Wrapper });
    expect(screen.getByText('CRITICAL FAILURE DETECTED')).toBeInTheDocument();
  });

  it('displays final score from context', () => {
    render(<GameOver />, { wrapper: Wrapper });
    expect(screen.getByText('FINAL SCORE')).toBeInTheDocument();
    const scoreSection = screen.getByText('FINAL SCORE').parentElement;
    expect(scoreSection?.textContent).toContain('0');
  });

  it('displays level from context', () => {
    render(<GameOver />, { wrapper: Wrapper });
    expect(screen.getByText('LEVEL')).toBeInTheDocument();
    const levelSection = screen.getByText('LEVEL').parentElement;
    expect(levelSection?.textContent).toContain('1');
  });

  it('displays bricks destroyed from context', () => {
    render(<GameOver />, { wrapper: Wrapper });
    expect(screen.getByText('BRICKS')).toBeInTheDocument();
    const bricksSection = screen.getByText('BRICKS').parentElement;
    expect(bricksSection?.textContent).toContain('0');
  });

  it('displays play time from context', () => {
    render(<GameOver />, { wrapper: Wrapper });
    expect(screen.getByText('TIME')).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('renders PLAY AGAIN button', () => {
    render(<GameOver />, { wrapper: Wrapper });
    expect(screen.getByText('PLAY AGAIN')).toBeInTheDocument();
  });

  it('renders MAIN MENU button', () => {
    render(<GameOver />, { wrapper: Wrapper });
    expect(screen.getByText('MAIN MENU')).toBeInTheDocument();
  });

  it('calls play-again-1 action when play again button is clicked', () => {
    const playAgainAction = vi.fn();
    render(<GameOver actions={{ 'play-again-1': playAgainAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('PLAY AGAIN'));
    expect(playAgainAction).toHaveBeenCalledTimes(1);
  });

  it('calls main-menu-2 action when main menu button is clicked', () => {
    const menuAction = vi.fn();
    render(<GameOver actions={{ 'main-menu-2': menuAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('MAIN MENU'));
    expect(menuAction).toHaveBeenCalledTimes(1);
  });
});
