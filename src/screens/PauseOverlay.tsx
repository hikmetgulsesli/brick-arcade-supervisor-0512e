// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Pause Overlay
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Play } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

export type PauseOverlayActionId = "resume-1" | "restart-2" | "return-to-menu-3";

export interface PauseOverlayProps {
  actions?: Partial<Record<PauseOverlayActionId, () => void>>;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function formatLevel(n: number): string {
  return String(n).padStart(2, "0");
}

export function PauseOverlay({ actions }: PauseOverlayProps) {
  const { score, level, resumeGame, restartGame, goToMenu } = useAppContext();

  const handleResume = () => {
    const action = actions?.["resume-1"];
    if (action) {
      action();
    } else {
      resumeGame();
    }
  };

  const handleRestart = () => {
    const action = actions?.["restart-2"];
    if (action) {
      action();
    } else {
      restartGame();
    }
  };

  const handleReturnToMenu = () => {
    const action = actions?.["return-to-menu-3"];
    if (action) {
      action();
    } else {
      goToMenu();
    }
  };

  return (
    <>
      {/* Mock Background Game State */}
      <div className="absolute inset-0 z-0 bg-surface-container-lowest opacity-40 blur-sm pointer-events-none flex flex-col justify-center items-center gap-4">
      <div className="w-64 h-16 bg-surface border border-outline-variant rounded flex justify-center items-center">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">GAME ENTITY</span>
      </div>
      <div className="w-16 h-16 bg-primary-container rounded-full glow-primary"></div>
      <div className="grid grid-cols-5 gap-unit">
      <div className="w-12 h-6 bg-primary-container"></div>
      <div className="w-12 h-6 bg-error"></div>
      <div className="w-12 h-6 bg-primary-container"></div>
      <div className="w-12 h-6 bg-primary-container"></div>
      <div className="w-12 h-6 bg-secondary"></div>
      </div>
      </div>
      {/* Pause Overlay Canvas */}
      <div className="relative z-50 w-full h-screen flex flex-col items-center justify-center bg-surface-dim/80 backdrop-blur-md px-margin-mobile">
      {/* Pause Menu Container */}
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-2">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} className="text-4xl text-primary" aria-hidden={true} focusable="false" />
      <h1 className="font-hud-lg text-hud-lg text-primary uppercase tracking-widest drop-shadow-[0_0_8px_rgba(75,226,119,0.8)]">GAME PAUSED</h1>
      <p className="font-hud-sm text-hud-sm text-on-surface-variant uppercase mt-2">SYSTEM STANDBY</p>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col w-full gap-4 mt-8">
      {/* Primary Action: Resume */}
      <button className="h-touch-target w-full bg-primary-container/20 border-2 border-primary text-primary font-label-bold text-label-bold uppercase flex items-center justify-center gap-2 hover:bg-primary-container/30 hover:shadow-[0_0_12px_rgba(75,226,119,0.6)] transition-colors duration-200 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-dim group cursor-pointer" type="button" data-action-id="resume-1" onClick={handleResume}>
      <Play className="group-hover:scale-110 transition-transform" aria-hidden={true} focusable="false" />
                          RESUME
                      </button>
      {/* Secondary Action: Restart */}
      <button className="h-touch-target w-full bg-surface border border-outline-variant text-on-surface font-label-bold text-label-bold uppercase flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors duration-200 outline-none focus:border-primary focus:text-primary cursor-pointer" type="button" data-action-id="restart-2" onClick={handleRestart}>
      <Circle aria-hidden={true} focusable="false" />
                          RESTART
                      </button>
      {/* Secondary Action: Return to Menu */}
      <button className="h-touch-target w-full bg-surface border border-outline-variant text-on-surface font-label-bold text-label-bold uppercase flex items-center justify-center gap-2 hover:border-error hover:text-error transition-colors duration-200 outline-none focus:border-error focus:text-error mt-4 cursor-pointer" type="button" data-action-id="return-to-menu-3" onClick={handleReturnToMenu}>
      <Circle aria-hidden={true} focusable="false" />
                          RETURN TO MENU
                      </button>
      </div>
      {/* HUD Data Snippet */}
      <div className="flex gap-4 mt-8 border-t border-outline-variant pt-8 w-full justify-center">
      <div className="flex flex-col items-center justify-center border border-outline-variant bg-surface px-4 py-2 rounded-sm min-w-[80px]">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant mb-1">SCORE</span>
      <span className="font-label-bold text-label-bold text-primary">{formatNumber(score)}</span>
      </div>
      <div className="flex flex-col items-center justify-center border border-outline-variant bg-surface px-4 py-2 rounded-sm min-w-[80px]">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant mb-1">LEVEL</span>
      <span className="font-label-bold text-label-bold text-secondary">{formatLevel(level)}</span>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}
