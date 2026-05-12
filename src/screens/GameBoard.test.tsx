import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameBoard } from './GameBoard';
import { AppProvider } from '../contexts/AppContext';

beforeEach(() => {
  localStorage.clear();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('GameBoard', () => {
  it('renders game board header', () => {
    render(<GameBoard />, { wrapper: Wrapper });
    expect(screen.getByText('SUPERVISOR_OS_V1')).toBeInTheDocument();
  });

  it('renders score and level from context', () => {
    render(<GameBoard />, { wrapper: Wrapper });
    expect(screen.getByText('SCORE')).toBeInTheDocument();
    expect(screen.getByText('00000')).toBeInTheDocument();
    expect(screen.getByText('LVL')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('has aria-label on icon-only buttons', () => {
    render(<GameBoard />, { wrapper: Wrapper });
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Pause game')).toBeInTheDocument();
    expect(screen.getByLabelText('Restart game')).toBeInTheDocument();
    expect(screen.getByLabelText('Move left')).toBeInTheDocument();
    expect(screen.getByLabelText('Move right')).toBeInTheDocument();
  });

  it('calls pause action when pause button clicked', () => {
    const pauseAction = vi.fn();
    render(<GameBoard actions={{ 'button-3-3': pauseAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByLabelText('Pause game'));
    expect(pauseAction).toHaveBeenCalledTimes(1);
  });

  it('calls restart action when restart button clicked', () => {
    const restartAction = vi.fn();
    render(<GameBoard actions={{ 'button-4-4': restartAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByLabelText('Restart game'));
    expect(restartAction).toHaveBeenCalledTimes(1);
  });

  it('calls left move action when left button clicked', () => {
    const leftAction = vi.fn();
    render(<GameBoard actions={{ 'button-5-5': leftAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByLabelText('Move left'));
    expect(leftAction).toHaveBeenCalledTimes(1);
  });

  it('calls right move action when right button clicked', () => {
    const rightAction = vi.fn();
    render(<GameBoard actions={{ 'button-6-6': rightAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByLabelText('Move right'));
    expect(rightAction).toHaveBeenCalledTimes(1);
  });
});
