// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Progress Complete
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowRight, Circle } from "lucide-react";


export type ProgressCompleteActionId = "restart-1" | "next-level-2" | "return-to-menu-3";

export interface ProgressCompleteProps {
  actions?: Partial<Record<ProgressCompleteActionId, () => void>>;
}

export function ProgressComplete({ actions }: ProgressCompleteProps) {
  return (
    <>
      <main className="flex-1 flex items-center justify-center p-margin-mobile md:p-margin-desktop z-10 relative">
      <div className="max-w-2xl w-full mx-auto flex flex-col gap-8">
      <div className="text-center space-y-4">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} className="text-[64px] text-primary" aria-hidden={true} focusable="false" />
      <h1 className="font-hud-lg text-hud-lg text-primary uppercase neon-glow p-4 border border-primary bg-surface inline-block">Level Complete</h1>
      <p className="font-hud-sm text-hud-sm text-on-surface-variant uppercase">Sector Cleared - Awaiting Next Protocol</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-surface border border-outline-variant p-4 flex flex-col gap-2">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">Base Score</span>
      <span className="font-label-bold text-label-bold text-on-surface text-2xl">45,200</span>
      </div>
      <div className="bg-surface border border-outline-variant p-4 flex flex-col gap-2">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">Time Bonus</span>
      <span className="font-label-bold text-label-bold text-secondary text-2xl">+12,500</span>
      </div>
      <div className="bg-surface border border-outline-variant p-4 flex flex-col gap-2">
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">Accuracy</span>
      <span className="font-label-bold text-label-bold text-on-surface text-2xl">94%</span>
      </div>
      <div className="bg-surface border border-primary p-4 flex flex-col gap-2 neon-glow">
      <span className="font-hud-sm text-hud-sm text-primary">Total Rating</span>
      <span className="font-hud-lg text-hud-lg text-primary">57,700</span>
      </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
      <button className="h-touch-target px-8 bg-surface border border-outline-variant text-on-surface font-label-bold text-label-bold hover:border-primary transition-colors duration-200 uppercase flex items-center justify-center gap-2" type="button" data-action-id="restart-1" onClick={actions?.["restart-1"]}>
      <Circle className="text-[18px]" aria-hidden={true} focusable="false" />
                          Restart
                      </button>
      <button className="h-touch-target px-8 bg-surface border-2 border-primary text-primary font-label-bold text-label-bold hover:bg-primary hover:text-surface transition-colors duration-200 uppercase neon-glow flex items-center justify-center gap-2" type="button" data-action-id="next-level-2" onClick={actions?.["next-level-2"]}>
                          Next Level
                          <ArrowRight className="text-[18px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      <div className="text-center mt-4">
      <button className="text-on-surface-variant hover:text-primary font-hud-sm text-hud-sm transition-colors duration-200" type="button" data-action-id="return-to-menu-3" onClick={actions?.["return-to-menu-3"]}>Return to Menu</button>
      </div>
      </div>
      </main>
    </>
  );
}
