import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlsHelp } from './ControlsHelp';
import { AppProvider } from '../contexts/AppContext';

beforeEach(() => {
  localStorage.clear();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('ControlsHelp', () => {
  it('renders the SYSTEM_MANUAL title', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByText('SYSTEM_MANUAL')).toBeInTheDocument();
  });

  it('renders INPUT_PROTOCOLS section', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByText('INPUT_PROTOCOLS')).toBeInTheDocument();
  });

  it('renders keyboard controls', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByText('HARDWARE_INTERFACE')).toBeInTheDocument();
    expect(screen.getByText('MOVE_PADDLE')).toBeInTheDocument();
    expect(screen.getByText('LAUNCH/ACTION')).toBeInTheDocument();
  });

  it('renders touch controls', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByText('HAPTIC_INTERFACE')).toBeInTheDocument();
    expect(screen.getByText('DRAG_TO_MOVE')).toBeInTheDocument();
    expect(screen.getByText('TAP_TO_LAUNCH')).toBeInTheDocument();
  });

  it('renders ENTITY_ANALYSIS section', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByText('ENTITY_ANALYSIS')).toBeInTheDocument();
  });

  it('renders brick type descriptions', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByText('TARGET_BLOCKS')).toBeInTheDocument();
    expect(screen.getByText('Standard Target - 1 Hit')).toBeInTheDocument();
    expect(screen.getByText('Reinforced Target - 2 Hits')).toBeInTheDocument();
    expect(screen.getByText('Indestructible Obstacle')).toBeInTheDocument();
  });

  it('renders power-up descriptions', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByText('MODIFIERS')).toBeInTheDocument();
    expect(screen.getByText('Expand Paddle')).toBeInTheDocument();
    expect(screen.getByText('Multi-Ball Module')).toBeInTheDocument();
    expect(screen.getByText('Laser Defense')).toBeInTheDocument();
  });

  it('calls button-1-1 action when close button is clicked', () => {
    const closeAction = vi.fn();
    render(<ControlsHelp actions={{ 'button-1-1': closeAction }} />, { wrapper: Wrapper });
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(closeAction).toHaveBeenCalledTimes(1);
  });

  it('calls acknowledge-2 action when acknowledge button is clicked', () => {
    const acknowledgeAction = vi.fn();
    render(<ControlsHelp actions={{ 'acknowledge-2': acknowledgeAction }} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('ACKNOWLEDGE'));
    expect(acknowledgeAction).toHaveBeenCalledTimes(1);
  });

  it('renders close button with aria-label', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('renders acknowledge button', () => {
    render(<ControlsHelp />, { wrapper: Wrapper });
    expect(screen.getByText('ACKNOWLEDGE')).toBeInTheDocument();
  });
});
