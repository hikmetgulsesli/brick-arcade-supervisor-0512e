// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Board
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowLeft, ArrowRight, Circle, Pause, Play, RefreshCw, Settings } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

export type GameBoardActionId = "button-1-1" | "button-2-2" | "button-3-3" | "button-4-4" | "button-5-5" | "button-6-6";

export interface GameBoardProps {
  actions?: Partial<Record<GameBoardActionId, () => void>>;
}

function padScore(n: number): string {
  return String(n).padStart(5, "0");
}

function padLevel(n: number): string {
  return String(n).padStart(2, "0");
}

export function GameBoard({ actions }: GameBoardProps) {
  const { score, lives, level } = useAppContext();

  const filledLives = Math.max(0, Math.min(lives, 3));
  const emptyLives = 3 - filledLives;

  return (
    <>
      {/* SideNavBar (Desktop Only) */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 z-40 bg-surface-container dark:bg-surface-container border-r border-outline-variant">
      <div className="p-margin-desktop border-b border-outline-variant">
      <h1 className="font-hud-lg text-hud-lg text-primary tracking-tighter">CONSOLE</h1>
      <p className="font-hud-sm text-hud-sm text-on-surface-variant mt-2">ARCADE_PROT_04</p>
      </div>
      <div className="flex-1 py-margin-desktop flex flex-col gap-unit">
      {/* Active Tab: DASHBOARD (Since this is the main game board) */}
      <a className="flex items-center px-margin-desktop h-touch-target text-primary border-r-2 border-primary bg-surface-container-highest font-label-bold text-label-bold uppercase translate-x-1 transition-transform" href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} className="mr-gutter" aria-hidden={true} focusable="false" />
                      DASHBOARD
                  </a>
      <a className="flex items-center px-margin-desktop h-touch-target text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors font-label-bold text-label-bold uppercase" href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      <Circle className="mr-gutter" aria-hidden={true} focusable="false" />
                      MODIFIERS
                  </a>
      <a className="flex items-center px-margin-desktop h-touch-target text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors font-label-bold text-label-bold uppercase" href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      <Circle className="mr-gutter" aria-hidden={true} focusable="false" />
                      ANALYTICS
                  </a>
      <a className="flex items-center px-margin-desktop h-touch-target text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors font-label-bold text-label-bold uppercase" href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      <Circle className="mr-gutter" aria-hidden={true} focusable="false" />
                      LOGS
                  </a>
      </div>
      </nav>
      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative pb-[80px] md:pb-0">
      {/* TopAppBar (Universal Header) */}
      <header className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-touch-target bg-surface dark:bg-surface border-b border-outline-variant dark:border-outline-variant">
      <div className="font-hud-lg text-hud-lg font-black text-primary dark:text-primary uppercase tracking-tighter">SUPERVISOR_OS_V1</div>
      <div className="flex items-center gap-gutter">
      <button aria-label="Settings" className="text-on-surface-variant hover:border-primary transition-colors duration-200 h-touch-target w-touch-target flex items-center justify-center rounded border border-transparent" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="Profile" className="text-on-surface-variant hover:border-primary transition-colors duration-200 h-touch-target w-touch-target flex items-center justify-center rounded border border-transparent" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
      <Circle aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Playfield Area */}
      <div className="flex-1 mt-[44px] flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop">
      {/* Game Container */}
      <div className="w-full max-w-4xl aspect-[4/3] md:aspect-[16/9] bg-[#111827] border border-[#334155] rounded-lg relative overflow-hidden flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* In-Game HUD */}
      <div className="h-12 w-full border-b border-[#334155] bg-[#0F172A]/80 flex justify-between items-center px-gutter backdrop-blur-sm z-10">
      <div className="flex gap-gutter">
      <div className="border border-[#334155] bg-[#111827] px-3 py-1 flex items-center gap-2">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">SCORE</span>
      <span className="font-hud-sm text-hud-sm text-primary">{padScore(score)}</span>
      </div>
      <div className="border border-[#334155] bg-[#111827] px-3 py-1 flex items-center gap-2">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">LVL</span>
      <span className="font-hud-sm text-hud-sm text-inverse-surface">{padLevel(level)}</span>
      </div>
      </div>
      <div className="flex gap-unit">
      {/* Lives */}
      {Array.from({ length: filledLives }).map((_, i) => (
        <Circle key={`live-${i}`} style={{fontVariationSettings: "'FILL' 1"}} className="text-primary text-[18px]" aria-hidden={true} focusable="false" />
      ))}
      {Array.from({ length: emptyLives }).map((_, i) => (
        <Circle key={`empty-${i}`} className="text-outline-variant text-[18px]" aria-hidden={true} focusable="false" />
      ))}
      </div>
      </div>
      {/* Bricks Grid */}
      <div className="absolute top-16 left-0 w-full px-[5%] grid grid-cols-8 gap-[4px] z-0">
      {/* Row 1 */}
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-[#f59e0b] glow-warning"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-[#f59e0b] glow-warning"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      {/* Row 2 */}
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-[#f59e0b] glow-warning"></div>
      <div className="h-6 bg-transparent border border-outline-variant opacity-20"></div> {/* Destroyed */}
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-[#f59e0b] glow-warning"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-transparent border border-outline-variant opacity-20"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      {/* Row 3 */}
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-transparent border border-outline-variant opacity-20"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      <div className="h-6 bg-primary-container glow-success"></div>
      </div>
      {/* Ball */}
      <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-inverse-surface rounded-full glow-ball z-20"></div>
      {/* Paddle */}
      <div className="absolute bottom-6 left-[40%] w-[20%] h-4 bg-primary glow-paddle rounded-sm z-20"></div>
      {/* Quick Controls (Overlay bottom right) */}
      <div className="absolute bottom-4 right-4 flex gap-unit z-30">
      <button aria-label="Pause game" className="h-10 w-10 bg-[#111827] border border-[#334155] text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center justify-center" type="button" data-action-id="button-3-3" onClick={actions?.["button-3-3"]}>
      <Pause className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="Restart game" className="h-10 w-10 bg-[#111827] border border-[#334155] text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center justify-center" type="button" data-action-id="button-4-4" onClick={actions?.["button-4-4"]}>
      <RefreshCw className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      {/* Mobile Touch Controls (Visible only on small screens) */}
      <div className="mt-margin-mobile flex w-full max-w-md justify-between md:hidden gap-gutter">
      <button aria-label="Move left" className="flex-1 h-14 bg-[#111827] border border-[#334155] active:border-primary active:text-primary flex items-center justify-center rounded transition-colors focus:border-primary focus:outline-none" type="button" data-action-id="button-5-5" onClick={actions?.["button-5-5"]}>
      <ArrowLeft className="text-[32px]" aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="Move right" className="flex-1 h-14 bg-[#111827] border border-[#334155] active:border-primary active:text-primary flex items-center justify-center rounded transition-colors focus:border-primary focus:outline-none" type="button" data-action-id="button-6-6" onClick={actions?.["button-6-6"]}>
      <ArrowRight className="text-[32px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      </main>
      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-16 md:hidden bg-surface-container-low dark:bg-surface-container-low border-t border-outline-variant">
      {/* Active Tab: PLAY (Matches game board intent) */}
      <a className="flex flex-col items-center justify-center text-primary bg-primary-container/10 rounded-xl p-unit min-w-[64px] scale-90 transition-transform font-hud-sm text-hud-sm uppercase" href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      <Play  style={{fontVariationSettings: "'FILL' 1"}} className="mb-1" aria-hidden={true} focusable="false" />
                  PLAY
              </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity min-w-[64px] font-hud-sm text-hud-sm uppercase" href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      <Circle className="mb-1" aria-hidden={true} focusable="false" />
                  GEAR
              </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity min-w-[64px] font-hud-sm text-hud-sm uppercase" href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      <Circle className="mb-1" aria-hidden={true} focusable="false" />
                  STATS
              </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity min-w-[64px] font-hud-sm text-hud-sm uppercase" href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
      <Circle className="mb-1" aria-hidden={true} focusable="false" />
                  EXIT
              </a>
      </nav>
    </>
  );
}
