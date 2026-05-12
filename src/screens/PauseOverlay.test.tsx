import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PauseOverlay } from './PauseOverlay';
import { AppProvider } from '../contexts/AppContext';

beforeEach(() => {
  localStorage.clear();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('PauseOverlay', () => {
  it('renders GAME PAUSED title', () => {
    render(<PauseOverlay />, { wrapper: Wrapper });
    expect(screen.getByText('GAME PAUSED')).toBeInTheDocument();
  });

  it('renders SYSTEM STANDBY subtitle', () => {
    render(<PauseOverlay />, { wrapper: Wrapper });
    expect(screen.getByText('SYSTEM STANDBY')).toBeInTheDocument();
  });

  it('renders RESUME button', () => {
    render(<PauseOverlay />, { wrapper: Wrapper });
    expect(screen.getByText('RESUME')).toBeInTheDocument();
  });

  it('renders RESTART button', () => {
    render(<PauseOverlay />, { wrapper: Wrapper });
    expect(screen.getByText('RESTART')).toBeInTheDocument();
  });

  it('renders RETURN TO MENU button', () => {
    render(<PauseOverlay />, { wrapper: Wrapper });
    expect(screen.getByText('RETURN TO MENU')).toBeInTheDocument();
  });

  it('displays score from context', () => {
    render(<PauseOverlay />, { wrapper: Wrapper });
    expect(screen.getByText('SCORE')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays level from context', () => {
    render(<PauseOverlay />, { wrapper: Wrapper });
    expect(screen.getByText('LEVEL')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('calls resume-1 action when resume button is clicked', () => {
    const resumeAction = vi.fn();
    render(<PauseOverlay actions={{ 'resume-1': resumeAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('RESUME'));
    expect(resumeAction).toHaveBeenCalledTimes(1);
  });

  it('calls restart-2 action when restart button is clicked', () => {
    const restartAction = vi.fn();
    render(<PauseOverlay actions={{ 'restart-2': restartAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('RESTART'));
    expect(restartAction).toHaveBeenCalledTimes(1);
  });

  it('calls return-to-menu-3 action when return to menu button is clicked', () => {
    const menuAction = vi.fn();
    render(<PauseOverlay actions={{ 'return-to-menu-3': menuAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('RETURN TO MENU'));
    expect(menuAction).toHaveBeenCalledTimes(1);
  });
});
