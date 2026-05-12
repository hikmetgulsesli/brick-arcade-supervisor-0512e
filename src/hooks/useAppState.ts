import { useCallback, useEffect, useRef, useState } from 'react';
import type { Ball, Brick, GameMode, Paddle } from '../types/domain';
import {
  BALL_COLOR,
  BALL_RADIUS_RATIO,
  BG_COLOR,
  BRICK_COLORS,
  BRICK_PADDING,
  BRICK_TOP_OFFSET_RATIO,
  LEVELS,
  PADDLE_COLOR,
  PADDLE_HEIGHT_RATIO,
  PADDLE_WIDTH_RATIO,
} from '../types/domain';
import { getHighScore, saveHighScore } from '../utils/storage';

export interface AppState {
  mode: GameMode;
  score: number;
  lives: number;
  level: number;
  highScore: number;
  bricksDestroyed: number;
  playTimeMs: number;
}

export interface ScreenActions {
  'start-game-1'?: () => void;
  'how-to-play-2'?: () => void;
  'settings-3'?: () => void;
  'button-1-1'?: () => void;
  'button-2-2'?: () => void;
  'button-3-3'?: () => void;
  'button-4-4'?: () => void;
  'button-5-5'?: () => void;
  'button-6-6'?: () => void;
  'resume-1'?: () => void;
  'restart-2'?: () => void;
  'restart-1'?: () => void;
  'return-to-menu-3'?: () => void;
  'play-again-1'?: () => void;
  'main-menu-2'?: () => void;
  'next-level-2'?: () => void;
  'acknowledge-2'?: () => void;
}

function generateBricks(level: number, canvasWidth: number, canvasHeight: number): Brick[] {
  const config = LEVELS[Math.min(level - 1, LEVELS.length - 1)];
  const cols = config.cols;
  const rows = config.rows;
  const padding = BRICK_PADDING;
  const topOffset = canvasHeight * BRICK_TOP_OFFSET_RATIO;
  const availableWidth = canvasWidth - padding * 2;
  const brickWidth = (availableWidth - (cols - 1) * padding) / cols;
  const brickHeight = Math.max(14, canvasHeight * 0.035);

  const bricks: Brick[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const health = config.brickHealth[r % config.brickHealth.length] || 1;
      bricks.push({
        x: padding + c * (brickWidth + padding),
        y: topOffset + r * (brickHeight + padding),
        width: brickWidth,
        height: brickHeight,
        health,
        maxHealth: health,
        color: BRICK_COLORS[health] || BRICK_COLORS[1],
      });
    }
  }
  return bricks;
}

function resetBall(ball: Ball, paddle: Paddle, canvasWidth: number, canvasHeight: number): void {
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight * 0.7;
  ball.dx = 0;
  ball.dy = 0;
  ball.speed = 0;
}

function launchBall(ball: Ball, canvasWidth: number, _canvasHeight: number): void {
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
  const speed = Math.abs(ball.speed) || 300;
  ball.dx = Math.cos(angle) * speed;
  ball.dy = Math.sin(angle) * speed;
  ball.speed = speed;
}

function circleRectCollision(
  cx: number,
  cy: number,
  radius: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): { hit: boolean; side: 'left' | 'right' | 'top' | 'bottom' | 'none' } {
  const closestX = Math.max(rx, Math.min(cx, rx + rw));
  const closestY = Math.max(ry, Math.min(cy, ry + rh));
  const dx = cx - closestX;
  const dy = cy - closestY;
  const distSq = dx * dx + dy * dy;

  if (distSq > radius * radius) {
    return { hit: false, side: 'none' };
  }

  const overlapLeft = (cx + radius) - rx;
  const overlapRight = (rx + rw) - (cx - radius);
  const overlapTop = (cy + radius) - ry;
  const overlapBottom = (ry + rh) - (cy - radius);

  const minOverlap = Math.min(
    overlapLeft > 0 ? overlapLeft : Infinity,
    overlapRight > 0 ? overlapRight : Infinity,
    overlapTop > 0 ? overlapTop : Infinity,
    overlapBottom > 0 ? overlapBottom : Infinity
  );

  if (minOverlap === overlapLeft) return { hit: true, side: 'left' };
  if (minOverlap === overlapRight) return { hit: true, side: 'right' };
  if (minOverlap === overlapTop) return { hit: true, side: 'top' };
  return { hit: true, side: 'bottom' };
}

export function useAppState() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<GameMode>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(getHighScore());
  const [bricksDestroyed, setBricksDestroyed] = useState(0);
  const [playTimeMs, setPlayTimeMs] = useState(0);

  const ballRef = useRef<Ball>({
    x: 0, y: 0, dx: 0, dy: 0, radius: 8, speed: 0,
  });
  const paddleRef = useRef<Paddle>({
    x: 0, y: 0, width: 100, height: 10,
  });
  const bricksRef = useRef<Brick[]>([]);
  const keysRef = useRef<Record<string, boolean>>({});
  const playTimeRef = useRef(0);
  const animFrameRef = useRef(0);
  const launchedRef = useRef(false);
  const touchXRef = useRef<number | null>(null);

  const initLevel = useCallback((lvl: number, canvasW: number, canvasH: number) => {
    const config = LEVELS[Math.min(lvl - 1, LEVELS.length - 1)];
    const paddleWidth = canvasW * PADDLE_WIDTH_RATIO;
    const paddleHeight = Math.max(8, canvasH * PADDLE_HEIGHT_RATIO);
    const ballRadius = Math.max(4, canvasW * BALL_RADIUS_RATIO);

    paddleRef.current = {
      x: (canvasW - paddleWidth) / 2,
      y: canvasH - paddleHeight - 16,
      width: paddleWidth,
      height: paddleHeight,
    };

    ballRef.current = {
      x: canvasW / 2,
      y: canvasH * 0.7,
      dx: 0,
      dy: 0,
      radius: ballRadius,
      speed: config.ballSpeed,
    };

    bricksRef.current = generateBricks(lvl, canvasW, canvasH);
    launchedRef.current = false;
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setBricksDestroyed(0);
    setPlayTimeMs(0);
    playTimeRef.current = 0;
    setMode('playing');
  }, []);

  const pauseGame = useCallback(() => {
    setMode('paused');
  }, []);

  const resumeGame = useCallback(() => {
    setMode('playing');
  }, []);

  const restartGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setBricksDestroyed(0);
    setPlayTimeMs(0);
    playTimeRef.current = 0;
    setMode('playing');
  }, []);

  const goToMenu = useCallback(() => {
    setMode('menu');
  }, []);

  const showControls = useCallback(() => {
    setMode('controls');
  }, []);

  const nextLevel = useCallback(() => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    setMode('playing');
  }, [level]);

  const update = useCallback((dt: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    playTimeRef.current += dt * 1000;
    setPlayTimeMs(Math.floor(playTimeRef.current));

    const ball = ballRef.current;
    const paddle = paddleRef.current;
    const keys = keysRef.current;

    // Paddle movement
    const paddleSpeed = canvasW * 0.6;
    if (keys['ArrowLeft'] || keys['KeyA']) {
      paddle.x -= paddleSpeed * dt;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
      paddle.x += paddleSpeed * dt;
    }
    if (touchXRef.current !== null) {
      paddle.x = touchXRef.current - paddle.width / 2;
    }
    paddle.x = Math.max(0, Math.min(canvasW - paddle.width, paddle.x));

    // Launch ball
    if (!launchedRef.current && (keys['Space'] || keys['Enter'])) {
      launchedRef.current = true;
      launchBall(ball, canvasW, canvasH);
    }

    if (!launchedRef.current) {
      ball.x = paddle.x + paddle.width / 2;
      ball.y = paddle.y - ball.radius - 2;
      return;
    }

    // Move ball
    ball.x += ball.dx * dt;
    ball.y += ball.dy * dt;

    // Wall collisions
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.dx = Math.abs(ball.dx);
    }
    if (ball.x + ball.radius > canvasW) {
      ball.x = canvasW - ball.radius;
      ball.dx = -Math.abs(ball.dx);
    }
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.dy = Math.abs(ball.dy);
    }

    // Ball lost
    if (ball.y - ball.radius > canvasH) {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        const finalScore = score;
        const currentHigh = getHighScore();
        if (finalScore > currentHigh) {
          saveHighScore(finalScore);
          setHighScore(finalScore);
        }
        setMode('gameover');
        return;
      }
      resetBall(ball, paddle, canvasW, canvasH);
      launchedRef.current = false;
      return;
    }

    // Paddle collision
    const paddleHit = circleRectCollision(
      ball.x, ball.y, ball.radius,
      paddle.x, paddle.y, paddle.width, paddle.height
    );
    if (paddleHit.hit && ball.dy > 0) {
      const hitPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
      const angle = -Math.PI / 2 + hitPoint * (Math.PI / 3);
      const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
      ball.dx = Math.cos(angle) * speed;
      ball.dy = Math.sin(angle) * speed;
      ball.y = paddle.y - ball.radius - 1;
    }

    // Brick collisions
    const bricks = bricksRef.current;
    for (let i = 0; i < bricks.length; i++) {
      const b = bricks[i];
      if (b.health <= 0) continue;
      const hit = circleRectCollision(
        ball.x, ball.y, ball.radius,
        b.x, b.y, b.width, b.height
      );
      if (hit.hit) {
        if (hit.side === 'left' || hit.side === 'right') {
          ball.dx = -ball.dx;
        } else {
          ball.dy = -ball.dy;
        }
        b.health -= 1;
        if (b.health <= 0) {
          const points = b.maxHealth * 10;
          setScore((s) => s + points);
          setBricksDestroyed((d) => d + 1);
        }
        break;
      }
    }

    // Check level complete
    const remaining = bricksRef.current.filter((b) => b.health > 0).length;
    if (remaining === 0) {
      setMode('levelcomplete');
    }
  }, [lives, score]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, w, h);

    // Draw bricks
    for (const b of bricksRef.current) {
      if (b.health <= 0) continue;
      ctx.fillStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(b.x, b.y, b.width, b.height);
      ctx.shadowBlur = 0;

      if (b.health > 1) {
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(b.x + 2, b.y + 2, b.width - 4, b.height - 4);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(b.health), b.x + b.width / 2, b.y + b.height / 2);
      }
    }

    // Draw paddle
    const p = paddleRef.current;
    ctx.fillStyle = PADDLE_COLOR;
    ctx.shadowColor = PADDLE_COLOR;
    ctx.shadowBlur = 12;
    ctx.fillRect(p.x, p.y, p.width, p.height);
    ctx.shadowBlur = 0;

    // Draw ball
    const ball = ballRef.current;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = BALL_COLOR;
    ctx.shadowColor = BALL_COLOR;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.closePath();

    // HUD
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, w, 36);
    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(0, 36);
    ctx.lineTo(w, 36);
    ctx.stroke();

    ctx.font = '12px JetBrains Mono';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#869585';
    ctx.fillText('SCORE', 12, 18);
    ctx.fillStyle = '#4BE277';
    ctx.fillText(String(score).padStart(5, '0'), 60, 18);

    ctx.fillStyle = '#869585';
    ctx.fillText('LVL', w * 0.45, 18);
    ctx.fillStyle = '#DCE5D9';
    ctx.fillText(String(level).padStart(2, '0'), w * 0.45 + 30, 18);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#869585';
    ctx.fillText('LIVES', w - 60, 18);
    for (let i = 0; i < lives; i++) {
      ctx.beginPath();
      ctx.arc(w - 44 + i * 18, 18, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#4BE277';
      ctx.fill();
      ctx.closePath();
    }
    for (let i = lives; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(w - 44 + i * 18, 18, 5, 0, Math.PI * 2);
      ctx.strokeStyle = '#334155';
      ctx.stroke();
      ctx.closePath();
    }

    // Launch hint
    if (!launchedRef.current && mode === 'playing') {
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(220, 229, 217, 0.6)';
      ctx.font = '14px JetBrains Mono';
      ctx.fillText('PRESS SPACE OR TAP TO LAUNCH', w / 2, h * 0.55);
    }
  }, [mode, score, lives, level]);

  // Game loop
  useEffect(() => {
    if (mode !== 'playing' && mode !== 'paused') return;

    let animId = 0;
    let lastTime = 0;

    function loop(timestamp: number) {
      if (lastTime === 0) lastTime = timestamp;
      const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;

      if (mode === 'playing') {
        update(dt);
      }
      render();
      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [mode, update, render]);

  // Initialize level when entering playing mode or level changes
  useEffect(() => {
    if (mode !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    initLevel(level, canvas.width, canvas.height);
  }, [mode, level, initLevel]);

  // Keyboard input
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      keysRef.current[e.code] = true;
      if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (mode === 'playing') pauseGame();
        else if (mode === 'paused') resumeGame();
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      keysRef.current[e.code] = false;
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [mode, pauseGame, resumeGame]);

  // Touch input
  useEffect(() => {
    function onTouchMove(e: TouchEvent) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return;
      const x = touch.clientX - rect.left;
      const scaleX = canvas.width / rect.width;
      touchXRef.current = x * scaleX;
    }
    function onTouchEnd() {
      touchXRef.current = null;
    }
    function onTouchStart(e: TouchEvent) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return;
      const x = touch.clientX - rect.left;
      const scaleX = canvas.width / rect.width;
      touchXRef.current = x * scaleX;

      if (!launchedRef.current && mode === 'playing') {
        launchedRef.current = true;
        launchBall(ballRef.current, canvas.width, canvas.height);
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [mode]);

  // Mouse input for desktop
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const scaleX = canvas.width / rect.width;
      touchXRef.current = x * scaleX;
    }
    function onMouseDown(e: MouseEvent) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (!launchedRef.current && mode === 'playing') {
        launchedRef.current = true;
        launchBall(ballRef.current, canvas.width, canvas.height);
      }
    }
    function onMouseUp() {
      touchXRef.current = null;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mouseup', onMouseUp);
      }
    };
  }, [mode]);

  // Expose game state for smoke tests
  useEffect(() => {
    const app = {
      mode,
      score,
      lives,
      level,
      highScore,
      bricksDestroyed,
      playTimeMs,
      ball: ballRef.current,
      paddle: paddleRef.current,
      bricks: bricksRef.current,
    };
    (window as unknown as Record<string, unknown>).app = app;
  }, [mode, score, lives, level, highScore, bricksDestroyed, playTimeMs]);

  useEffect(() => {
    (window as unknown as Record<string, unknown>).render_game_to_text = () => {
      return JSON.stringify({
        mode,
        score,
        lives,
        level,
        highScore,
        bricksDestroyed,
        playTimeMs,
        ball: { x: ballRef.current.x, y: ballRef.current.y, dx: ballRef.current.dx, dy: ballRef.current.dy },
        paddle: { x: paddleRef.current.x, y: paddleRef.current.y },
        bricksAlive: bricksRef.current.filter((b) => b.health > 0).length,
        launched: launchedRef.current,
      });
    };

    (window as unknown as Record<string, unknown>).advanceTime = (ms: number) => {
      const steps = Math.max(1, Math.round(ms / (1000 / 60)));
      for (let i = 0; i < steps; i++) {
        update(1 / 60);
      }
      render();
    };
  }, [mode, score, lives, level, highScore, bricksDestroyed, playTimeMs, update, render]);

  const actions: ScreenActions = {
    'start-game-1': startGame,
    'how-to-play-2': showControls,
    'settings-3': () => {},
    'button-1-1': () => {},
    'button-2-2': () => {},
    'button-3-3': pauseGame,
    'button-4-4': restartGame,
    'button-5-5': () => {
      keysRef.current['ArrowLeft'] = true;
      setTimeout(() => { keysRef.current['ArrowLeft'] = false; }, 100);
    },
    'button-6-6': () => {
      keysRef.current['ArrowRight'] = true;
      setTimeout(() => { keysRef.current['ArrowRight'] = false; }, 100);
    },
    'resume-1': resumeGame,
    'restart-2': restartGame,
    'return-to-menu-3': goToMenu,
    'play-again-1': startGame,
    'main-menu-2': goToMenu,
    'restart-1': restartGame,
    'next-level-2': nextLevel,
    'acknowledge-2': goToMenu,
  };

  return {
    mode,
    score,
    lives,
    level,
    highScore,
    bricksDestroyed,
    playTimeMs,
    canvasRef,
    actions,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    goToMenu,
    showControls,
    nextLevel,
  };
}
