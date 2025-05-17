export interface Position {
  x: number;
  y: number;
}

export interface Enemy {
  id: number;
  x: number;
  y: number;
  value: number;
  isTarget: boolean;
}

export interface Bullet {
  id: number;
  x: number;
  y: number;
}

export interface Player {
  position: number; // percentage from left
  speed: number;
}

export enum DifficultyLevel {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export interface GameState {
  currentTask: string;
  correctAnswer: number;
  enemies: Enemy[];
}
