import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { AppProvider } from './contexts/AppContext';

beforeEach(() => {
  localStorage.clear();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('App', () => {
  it('renders main menu initially', () => {
    render(<App />, { wrapper: Wrapper });
    expect(screen.getByText('START GAME')).toBeInTheDocument();
    expect(screen.getByText(/BRICK ARCADE/)).toBeInTheDocument();
    expect(screen.getByText(/SUPERVISOR/)).toBeInTheDocument();
  });

  it('switches to game board when start game is clicked', () => {
    render(<App />, { wrapper: Wrapper });
    const startBtn = screen.getByText('START GAME');
    fireEvent.click(startBtn);
    expect(screen.getByText('SUPERVISOR_OS_V1')).toBeInTheDocument();
  });

  it('shows controls help when how to play is clicked', () => {
    render(<App />, { wrapper: Wrapper });
    const helpBtn = screen.getByText('HOW TO PLAY');
    fireEvent.click(helpBtn);
    expect(screen.getByText('SYSTEM_MANUAL')).toBeInTheDocument();
  });

  it('returns to menu from controls', () => {
    render(<App />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('HOW TO PLAY'));
    fireEvent.click(screen.getByText('ACKNOWLEDGE'));
    expect(screen.getByText('START GAME')).toBeInTheDocument();
  });
});
