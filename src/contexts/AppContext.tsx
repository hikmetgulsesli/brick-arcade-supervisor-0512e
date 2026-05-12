import { createContext, useContext, type ReactNode } from 'react';
import { useAppState, type ScreenActions, type AppState as AppStateType } from '../hooks/useAppState';

interface AppContextValue extends AppStateType {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  actions: ScreenActions;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  goToMenu: () => void;
  showControls: () => void;
  nextLevel: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const state = useAppState();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
