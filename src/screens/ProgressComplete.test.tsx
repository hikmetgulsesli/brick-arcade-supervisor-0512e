import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressComplete } from './ProgressComplete';
import { AppProvider } from '../contexts/AppContext';

beforeEach(() => {
  localStorage.clear();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('ProgressComplete', () => {
  it('renders level complete title', () => {
    render(<ProgressComplete />, { wrapper: Wrapper });
    expect(screen.getByText('Level Complete')).toBeInTheDocument();
    expect(screen.getByText('Sector Cleared - Awaiting Next Protocol')).toBeInTheDocument();
  });

  it('displays base score from context', () => {
    render(<ProgressComplete />, { wrapper: Wrapper });
    expect(screen.getByText('Base Score')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays accuracy percentage', () => {
    render(<ProgressComplete />, { wrapper: Wrapper });
    expect(screen.getByText('Accuracy')).toBeInTheDocument();
    expect(screen.getByText(/%$/)).toBeInTheDocument();
  });

  it('displays total rating', () => {
    render(<ProgressComplete />, { wrapper: Wrapper });
    expect(screen.getByText('Total Rating')).toBeInTheDocument();
  });

  it('calls restart action when restart button clicked', () => {
    const restartAction = vi.fn();
    render(<ProgressComplete actions={{ 'restart-1': restartAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Restart'));
    expect(restartAction).toHaveBeenCalledTimes(1);
  });

  it('calls next-level-2 action when next level button clicked', () => {
    const nextAction = vi.fn();
    render(<ProgressComplete actions={{ 'next-level-2': nextAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Next Level'));
    expect(nextAction).toHaveBeenCalledTimes(1);
  });

  it('calls return-to-menu-3 action when return to menu clicked', () => {
    const menuAction = vi.fn();
    render(<ProgressComplete actions={{ 'return-to-menu-3': menuAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Return to Menu'));
    expect(menuAction).toHaveBeenCalledTimes(1);
  });
});
