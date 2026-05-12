// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Controls Help
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, MousePointerClick, X } from "lucide-react";


export type ControlsHelpActionId = "button-1-1" | "acknowledge-2";

export interface ControlsHelpProps {
  actions?: Partial<Record<ControlsHelpActionId, () => void>>;
}

export function ControlsHelp({ actions }: ControlsHelpProps) {
  return (
    <>
      {/* Playfield / Canvas */}
      <main className="w-full max-w-4xl bg-[#111827] border border-[#334155] rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.1)] overflow-hidden flex flex-col relative">
      {/* Header / Top Bar for modal */}
      <header className="flex items-center justify-between p-gutter border-b border-[#334155] bg-[#0e150e]">
      <h1 className="font-hud-lg text-hud-lg text-primary tracking-tighter uppercase">SYSTEM_MANUAL</h1>
      <button className="h-touch-target w-touch-target flex items-center justify-center bg-[#111827] border border-[#334155] text-on-surface hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
      <X  data-icon="close" aria-hidden={true} focusable="false" />
      </button>
      </header>
      {/* Content Area */}
      <div className="p-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-margin-desktop overflow-y-auto max-h-[819px]">
      {/* Controls Column */}
      <section className="space-y-gutter">
      <h2 className="font-label-bold text-label-bold uppercase text-primary border-b border-[#334155] pb-unit mb-gutter">INPUT_PROTOCOLS</h2>
      {/* Keyboard Controls */}
      <div className="bg-surface-container border border-[#334155] p-gutter rounded">
      <h3 className="font-hud-sm text-hud-sm text-on-surface-variant mb-unit">HARDWARE_INTERFACE</h3>
      <div className="flex items-center space-x-gutter mt-unit">
      <div className="flex flex-col items-center gap-unit">
      <div className="flex gap-unit">
      <div className="w-10 h-10 bg-[#111827] border border-[#334155] rounded flex items-center justify-center text-on-surface font-label-bold">A</div>
      <div className="w-10 h-10 bg-[#111827] border border-[#334155] rounded flex items-center justify-center text-on-surface font-label-bold">D</div>
      </div>
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">MOVE_PADDLE</span>
      </div>
      <div className="flex flex-col items-center gap-unit">
      <div className="w-24 h-10 bg-[#111827] border border-[#334155] rounded flex items-center justify-center text-on-surface font-label-bold">SPACE</div>
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">LAUNCH/ACTION</span>
      </div>
      </div>
      </div>
      {/* Touch Controls */}
      <div className="bg-surface-container border border-[#334155] p-gutter rounded">
      <h3 className="font-hud-sm text-hud-sm text-on-surface-variant mb-unit">HAPTIC_INTERFACE</h3>
      <div className="flex items-center space-x-gutter mt-unit">
      <div className="flex flex-col items-center gap-unit">
      <Circle  data-icon="swipe" className="text-primary text-3xl" aria-hidden={true} focusable="false" />
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">DRAG_TO_MOVE</span>
      </div>
      <div className="flex flex-col items-center gap-unit">
      <MousePointerClick  data-icon="touch_app" className="text-primary text-3xl" aria-hidden={true} focusable="false" />
      <span className="font-hud-sm text-hud-sm text-on-surface-variant">TAP_TO_LAUNCH</span>
      </div>
      </div>
      </div>
      </section>
      {/* Entities Column */}
      <section className="space-y-gutter">
      <h2 className="font-label-bold text-label-bold uppercase text-primary border-b border-[#334155] pb-unit mb-gutter">ENTITY_ANALYSIS</h2>
      {/* Bricks */}
      <div className="bg-surface-container border border-[#334155] p-gutter rounded space-y-unit">
      <h3 className="font-hud-sm text-hud-sm text-on-surface-variant mb-unit">TARGET_BLOCKS</h3>
      <div className="flex items-center gap-gutter">
      <div className="w-12 h-6 bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      <span className="font-body-md text-body-md text-on-surface">Standard Target - 1 Hit</span>
      </div>
      <div className="flex items-center gap-gutter">
      <div className="w-12 h-6 bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
      <span className="font-body-md text-body-md text-on-surface">Reinforced Target - 2 Hits</span>
      </div>
      <div className="flex items-center gap-gutter">
      <div className="w-12 h-6 bg-[#334155] border border-[#475569]"></div>
      <span className="font-body-md text-body-md text-on-surface">Indestructible Obstacle</span>
      </div>
      </div>
      {/* Power-ups */}
      <div className="bg-surface-container border border-[#334155] p-gutter rounded space-y-unit">
      <h3 className="font-hud-sm text-hud-sm text-on-surface-variant mb-unit">MODIFIERS</h3>
      <div className="flex items-center gap-gutter border border-[#334155] p-2 rounded bg-[#111827]">
      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-surface-container-lowest font-label-bold text-xs">E</div>
      <span className="font-body-md text-body-md text-on-surface flex-1">Expand Paddle</span>
      </div>
      <div className="flex items-center gap-gutter border border-[#334155] p-2 rounded bg-[#111827]">
      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-surface-container-lowest font-label-bold text-xs">M</div>
      <span className="font-body-md text-body-md text-on-surface flex-1">Multi-Ball Module</span>
      </div>
      <div className="flex items-center gap-gutter border border-[#334155] p-2 rounded bg-[#111827]">
      <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center text-surface-container-lowest font-label-bold text-xs">L</div>
      <span className="font-body-md text-body-md text-on-surface flex-1">Laser Defense</span>
      </div>
      </div>
      </section>
      </div>
      {/* Footer Action */}
      <footer className="p-gutter border-t border-[#334155] flex justify-end bg-[#0e150e]">
      <button className="h-touch-target px-margin-desktop bg-[#111827] border border-[#334155] text-on-surface hover:border-primary hover:text-primary hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded font-label-bold uppercase" type="button" data-action-id="acknowledge-2" onClick={actions?.["acknowledge-2"]}>
                      ACKNOWLEDGE
                  </button>
      </footer>
      </main>
    </>
  );
}
