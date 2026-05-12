// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Over
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Menu, TriangleAlert } from "lucide-react";


export type GameOverActionId = "play-again-1" | "main-menu-2";

export interface GameOverProps {
  actions?: Partial<Record<GameOverActionId, () => void>>;
}

export function GameOver({ actions }: GameOverProps) {
  return (
    <>
      {/* Background Tonal Layering */}
      <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-surface-container-lowest"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-error/5 via-surface/10 to-surface-container-lowest/80"></div>
      {/* Distressed Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(#3d4a3d 1px, transparent 1px), linear-gradient(90deg, #3d4a3d 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
      </div>
      {/* Main Canvas */}
      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8">
      {/* Title Section */}
      <div className="text-center space-y-4">
      <h1 className="font-hud-lg text-hud-lg md:text-[64px] md:leading-none text-error tracking-tighter uppercase" style={{textShadow: "0 0 16px rgba(255, 180, 171, 0.4)"}}>
              GAME OVER
            </h1>
      <div className="font-hud-sm text-hud-sm text-on-surface-variant flex items-center justify-center gap-2">
      <TriangleAlert className="text-[16px]" aria-hidden={true} focusable="false" />
              CRITICAL FAILURE DETECTED
              <TriangleAlert className="text-[16px]" aria-hidden={true} focusable="false" />
      </div>
      </div>
      {/* Stats Dashboard - Bento Grid Style */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-unit">
      {/* Final Score */}
      <div className="col-span-2 md:col-span-3 bg-surface-container border border-outline-variant rounded flex flex-col items-center justify-center p-6 gap-2">
      <div className="font-hud-sm text-hud-sm text-on-surface-variant uppercase">FINAL SCORE</div>
      <div className="font-hud-lg text-hud-lg md:text-[48px] text-primary" style={{textShadow: "0 0 8px rgba(75, 226, 119, 0.3)"}}>
                042,980
              </div>
      </div>
      {/* Level Reached */}
      <div className="col-span-1 bg-surface-container border border-outline-variant rounded flex flex-col items-center justify-center p-4 gap-2">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} className="text-secondary text-[24px]" aria-hidden={true} focusable="false" />
      <div className="font-hud-sm text-hud-sm text-on-surface-variant uppercase text-center">LEVEL</div>
      <div className="font-label-bold text-label-bold text-on-surface text-xl">12</div>
      </div>
      {/* Bricks Destroyed */}
      <div className="col-span-1 bg-surface-container border border-outline-variant rounded flex flex-col items-center justify-center p-4 gap-2">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} className="text-primary text-[24px]" aria-hidden={true} focusable="false" />
      <div className="font-hud-sm text-hud-sm text-on-surface-variant uppercase text-center">BRICKS</div>
      <div className="font-label-bold text-label-bold text-on-surface text-xl">342</div>
      </div>
      {/* Playtime (Desktop Only for asymmetry) */}
      <div className="hidden md:flex col-span-1 bg-surface-container border border-outline-variant rounded flex-col items-center justify-center p-4 gap-2">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} className="text-tertiary text-[24px]" aria-hidden={true} focusable="false" />
      <div className="font-hud-sm text-hud-sm text-on-surface-variant uppercase text-center">TIME</div>
      <div className="font-label-bold text-label-bold text-on-surface text-xl">08:45</div>
      </div>
      </div>
      {/* Actions */}
      <div className="w-full flex flex-col md:flex-row gap-4 mt-8">
      {/* Primary Action */}
      <button className="flex-1 h-touch-target bg-surface-container border border-primary text-primary font-label-bold text-label-bold uppercase rounded flex items-center justify-center gap-2 hover:bg-primary-container/10 focus:outline-none focus:border-2 focus:border-primary transition-colors shadow-[0_0_8px_rgba(75,226,119,0.2)]" type="button" data-action-id="play-again-1" onClick={actions?.["play-again-1"]}>
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
              PLAY AGAIN
            </button>
      {/* Secondary Action */}
      <button className="flex-1 h-touch-target bg-surface-container border border-outline-variant text-on-surface font-label-bold text-label-bold uppercase rounded flex items-center justify-center gap-2 hover:border-primary hover:text-primary focus:outline-none focus:border-2 focus:border-primary transition-colors" type="button" data-action-id="main-menu-2" onClick={actions?.["main-menu-2"]}>
      <Menu aria-hidden={true} focusable="false" />
              MAIN MENU
            </button>
      </div>
      </main>
    </>
  );
}
