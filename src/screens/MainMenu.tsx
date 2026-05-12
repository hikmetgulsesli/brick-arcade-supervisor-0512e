// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Main Menu
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Play, Settings } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

export type MainMenuActionId = "start-game-1" | "how-to-play-2" | "settings-3";

export interface MainMenuProps {
  actions?: Partial<Record<MainMenuActionId, () => void>>;
}

function formatScore(n: number): string {
  return n.toLocaleString("en-US", { minimumIntegerDigits: 1 });
}

export function MainMenu({ actions }: MainMenuProps) {
  const { highScore } = useAppContext();

  return (
    <>
      {/* Playfield Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop z-10">
      <div className="max-w-2xl w-full flex flex-col items-center gap-8">
      {/* Branding / Title */}
      <div className="text-center space-y-2 mb-8">
      <p className="font-hud-sm text-hud-sm text-primary uppercase">System Ready</p>
      <h1 className="font-hud-lg text-hud-lg md:text-5xl lg:text-6xl text-on-surface uppercase tracking-tighter">
                          BRICK ARCADE <span className="text-primary">SUPERVISOR</span>
      </h1>
      <div className="w-full h-px bg-outline-variant mt-4 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-8 h-2 bg-primary"></div>
      </div>
      </div>
      {/* Main Menu Options */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
      {/* Primary Action */}
      <button className="bg-[#111827] border border-[#334155] hover:border-primary text-on-surface hover:text-primary transition-colors duration-200 h-16 flex items-center justify-center gap-3 relative overflow-hidden group" type="button" data-action-id="start-game-1" onClick={actions?.["start-game-1"]}>
      <Play className="text-primary group-hover:scale-110 transition-transform" aria-hidden={true} focusable="false" />
      <span className="font-label-bold text-label-bold uppercase">START GAME</span>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
      {/* Help Action */}
      <button className="bg-[#111827] border border-[#334155] hover:border-primary text-on-surface hover:text-primary transition-colors duration-200 h-12 flex items-center justify-center gap-3 group" type="button" data-action-id="how-to-play-2" onClick={actions?.["how-to-play-2"]}>
      <Circle className="text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden={true} focusable="false" />
      <span className="font-label-bold text-label-bold uppercase text-on-surface-variant group-hover:text-primary transition-colors">HOW TO PLAY</span>
      </button>
      {/* Settings Action */}
      <button className="bg-[#111827] border border-[#334155] hover:border-primary text-on-surface hover:text-primary transition-colors duration-200 h-12 flex items-center justify-center gap-3 group" type="button" data-action-id="settings-3" onClick={actions?.["settings-3"]}>
      <Settings className="text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden={true} focusable="false" />
      <span className="font-label-bold text-label-bold uppercase text-on-surface-variant group-hover:text-primary transition-colors">SETTINGS</span>
      </button>
      </div>
      </div>
      </main>
      {/* Metadata / Bottom Bar */}
      <footer className="w-full flex justify-between items-end p-margin-mobile md:p-margin-desktop z-10 border-t border-outline-variant bg-[#111827]/80 backdrop-blur-sm">
      {/* High Score HUD Chip */}
      <div className="border border-[#334155] bg-[#111827] px-3 py-2 flex flex-col items-start min-w-[120px]">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant uppercase mb-1">HIGH SCORE</span>
      <span className="font-label-bold text-label-bold text-primary">{formatScore(highScore)}</span>
      </div>
      {/* Version Metadata */}
      <div className="text-right flex flex-col items-end opacity-70">
      <span className="font-hud-sm text-hud-sm text-on-surface uppercase">v2.4.1-rc</span>
      <span className="font-hud-sm text-hud-sm text-on-surface-variant uppercase mt-1">OS_V1_CORE</span>
      </div>
      </footer>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-10">
      <div className="w-full h-full border border-primary/20 absolute m-margin-desktop hidden md:block"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary rounded-full blur-[100px] bg-primary/20"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-secondary rounded-full blur-[120px] bg-secondary/10"></div>
      </div>
    </>
  );
}
