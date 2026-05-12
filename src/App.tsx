import { useEffect, useRef } from 'react';
import { useAppContext } from './contexts/AppContext';
import {
  MainMenu,
  GameBoard,
  PauseOverlay,
  GameOver,
  ProgressComplete,
  ControlsHelp,
} from './screens';
import './App.css';

export default function App() {
  const {
    mode,
    highScore,
    score,
    lives,
    level,
    canvasRef,
    actions,
  } = useAppContext();

  const gameWrapperRef = useRef<HTMLDivElement>(null);

  // Inject canvas into GameBoard's game container
  useEffect(() => {
    if (mode !== 'playing' && mode !== 'paused') return;

    const wrapper = gameWrapperRef.current;
    if (!wrapper) return;

    // Find the game container within GameBoard
    const container = wrapper.querySelector('.relative.overflow-hidden');
    if (!container) return;

    const el = container as HTMLElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = el.getBoundingClientRect();

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '25';
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    el.appendChild(canvas);
    canvasRef.current = canvas;

    // Handle resize
    function onResize() {
      const r = el.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      canvas.remove();
      canvasRef.current = null;
    };
  }, [mode, canvasRef]);

  const isPlaying = mode === 'playing' || mode === 'paused';

  return (
    <div className="min-h-screen bg-[#0e150e] text-[#dce5d9] relative overflow-hidden">
      {mode === 'menu' && (
        <div className="min-h-screen flex flex-col relative">
          <MainMenu actions={actions} />
        </div>
      )}

      {isPlaying && (
        <div ref={gameWrapperRef} className="min-h-screen relative">
          <GameBoard actions={actions} />
        </div>
      )}

      {mode === 'paused' && (
        <div className="fixed inset-0 z-50">
          <PauseOverlay actions={actions} />
        </div>
      )}

      {mode === 'gameover' && (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
          <GameOver actions={actions} />
        </div>
      )}

      {mode === 'levelcomplete' && (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
          <ProgressComplete actions={actions} />
        </div>
      )}

      {mode === 'controls' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
          <ControlsHelp actions={actions} />
        </div>
      )}
    </div>
  );
}
