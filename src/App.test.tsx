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
  it('renders game board initially', () => {
    render(<App />, { wrapper: Wrapper });
    expect(screen.getByText('SUPERVISOR_OS_V1')).toBeInTheDocument();
  });

  it('shows pause overlay when Escape is pressed', () => {
    render(<App />, { wrapper: Wrapper });
    fireEvent.keyDown(window, { code: 'Escape' });
    expect(screen.getByText('GAME PAUSED')).toBeInTheDocument();
    expect(screen.getByText('RESUME')).toBeInTheDocument();
  });

  it('switches to main menu from pause overlay', () => {
    render(<App />, { wrapper: Wrapper });
    fireEvent.keyDown(window, { code: 'Escape' });
    fireEvent.click(screen.getByText('RETURN TO MENU'));
    expect(screen.getByText('START GAME')).toBeInTheDocument();
    expect(screen.getByText(/BRICK ARCADE/)).toBeInTheDocument();
  });

  it('shows controls help when how to play is clicked', () => {
    render(<App />, { wrapper: Wrapper });
    fireEvent.keyDown(window, { code: 'Escape' });
    fireEvent.click(screen.getByText('RETURN TO MENU'));
    const helpBtn = screen.getByText('HOW TO PLAY');
    fireEvent.click(helpBtn);
    expect(screen.getByText('SYSTEM_MANUAL')).toBeInTheDocument();
  });

  it('returns to menu from controls', () => {
    render(<App />, { wrapper: Wrapper });
    fireEvent.keyDown(window, { code: 'Escape' });
    fireEvent.click(screen.getByText('RETURN TO MENU'));
    fireEvent.click(screen.getByText('HOW TO PLAY'));
    fireEvent.click(screen.getByText('ACKNOWLEDGE'));
    expect(screen.getByText('START GAME')).toBeInTheDocument();
  });
});
