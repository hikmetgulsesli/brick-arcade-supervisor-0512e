export type GameMode = 'menu' | 'playing' | 'paused' | 'gameover' | 'levelcomplete' | 'controls';

export interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  speed: number;
}

export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  color: string;
}

export interface GameState {
  mode: GameMode;
  score: number;
  lives: number;
  level: number;
  highScore: number;
  bricksDestroyed: number;
  playTimeMs: number;
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[];
  keys: Record<string, boolean>;
  canvasWidth: number;
  canvasHeight: number;
}

export interface LevelConfig {
  rows: number;
  cols: number;
  brickHealth: number[];
  ballSpeed: number;
}

export const LEVELS: LevelConfig[] = [
  { rows: 3, cols: 8, brickHealth: [1, 1, 1], ballSpeed: 300 },
  { rows: 4, cols: 8, brickHealth: [1, 1, 2, 1], ballSpeed: 340 },
  { rows: 5, cols: 9, brickHealth: [1, 2, 2, 1, 1], ballSpeed: 380 },
  { rows: 5, cols: 10, brickHealth: [1, 2, 2, 2, 1], ballSpeed: 420 },
  { rows: 6, cols: 10, brickHealth: [2, 2, 3, 2, 2, 1], ballSpeed: 460 },
];

export const BRICK_COLORS: Record<number, string> = {
  1: '#22C55E',
  2: '#F59E0B',
  3: '#EF4444',
};

export const PADDLE_COLOR = '#4BE277';
export const BALL_COLOR = '#DCE5D9';
export const BG_COLOR = '#111827';

export const PADDLE_WIDTH_RATIO = 0.18;
export const PADDLE_HEIGHT_RATIO = 0.025;
export const BALL_RADIUS_RATIO = 0.012;
export const BRICK_PADDING = 4;
export const BRICK_TOP_OFFSET_RATIO = 0.12;
