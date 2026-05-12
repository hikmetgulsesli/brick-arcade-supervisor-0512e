import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainMenu } from './MainMenu';
import { AppProvider } from '../contexts/AppContext';

beforeEach(() => {
  localStorage.clear();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('MainMenu', () => {
  it('renders title and start button', () => {
    render(<MainMenu />, { wrapper: Wrapper });
    expect(screen.getByText(/BRICK ARCADE/)).toBeInTheDocument();
    expect(screen.getByText('START GAME')).toBeInTheDocument();
  });

  it('displays high score from context', () => {
    localStorage.setItem('brick-arcade-high-score', '94200');
    render(<MainMenu />, { wrapper: Wrapper });
    expect(screen.getByText('94,200')).toBeInTheDocument();
  });

  it('displays zero high score when no stored value', () => {
    render(<MainMenu />, { wrapper: Wrapper });
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('calls start-game-1 action when start button clicked', () => {
    const startAction = vi.fn();
    render(<MainMenu actions={{ 'start-game-1': startAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('START GAME'));
    expect(startAction).toHaveBeenCalledTimes(1);
  });

  it('calls how-to-play-2 action when help button clicked', () => {
    const helpAction = vi.fn();
    render(<MainMenu actions={{ 'how-to-play-2': helpAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('HOW TO PLAY'));
    expect(helpAction).toHaveBeenCalledTimes(1);
  });

  it('renders how to play and settings buttons', () => {
    render(<MainMenu />, { wrapper: Wrapper });
    expect(screen.getByText('HOW TO PLAY')).toBeInTheDocument();
    expect(screen.getByText('SETTINGS')).toBeInTheDocument();
  });
});
