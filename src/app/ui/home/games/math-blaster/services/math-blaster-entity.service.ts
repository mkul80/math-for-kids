import { Injectable } from '@angular/core';
import { Bullet, Enemy, Player } from '../models/math-blaster.models';

@Injectable({
  providedIn: 'root',
})
export class MathBlasterEntityService {
  private nextBulletId = 1;
  private playerEntity: Player = {
    position: 50, // percentage from left
    speed: 5,
  };
  private bullets: Bullet[] = [];
  private enemies: Enemy[] = [];
  private lastUpdateTime: number = Date.now();

  constructor() {}

  // Player methods
  getPlayerPosition(): number {
    return this.playerEntity.position;
  }

  setPlayerPosition(position: number): void {
    this.playerEntity.position = position;
  }

  movePlayerLeft(): void {
    if (this.playerEntity.position > 5) {
      this.playerEntity.position -= this.playerEntity.speed;
    }
  }

  movePlayerRight(): void {
    if (this.playerEntity.position < 95 - this.playerEntity.speed) {
      this.playerEntity.position += this.playerEntity.speed;
    }
  }

  // Bullet methods
  getBullets(): Bullet[] {
    return [...this.bullets];
  }

  addBullet(): Bullet {
    // Calculate the center position of the player ship
    const shipCenterX = this.playerEntity.position + 10;

    // Position the bullet at the top of the player ship
    const shipTopY = 75;

    const bullet: Bullet = {
      id: this.nextBulletId++,
      x: shipCenterX,
      y: shipTopY,
    };

    this.bullets.push(bullet);
    return bullet;
  }

  updateBullets(): Bullet[] {
    this.bullets = this.bullets
      .map(bullet => ({
        ...bullet,
        y: bullet.y - 2, // Move upward by 2%
      }))
      .filter(bullet => bullet.y > 0);

    return [...this.bullets];
  }

  removeBullet(id: number): void {
    this.bullets = this.bullets.filter(b => b.id !== id);
  }

  // Enemy methods
  getEnemies(): Enemy[] {
    return [...this.enemies];
  }

  setEnemies(enemies: Enemy[]): void {
    this.enemies = [...enemies];
  }

  updateEnemies(): Enemy[] {
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Time since last update in seconds
    this.lastUpdateTime = currentTime;

    // Ensure deltaTime is reasonable (avoid huge jumps if browser tab was inactive)
    const safeDeltaTime = Math.min(deltaTime, 0.1);

    // Base speed values (units are percentage of screen per second)
    const verticalSpeed = 2; // Reduced from 10 to 5 for smoother vertical movement
    const horizontalAmplitude = 5; // Maximum horizontal movement

    this.enemies = this.enemies.map(enemy => {
      // Add unique oscillation pattern to each enemy based on its ID
      const frequency = 0.5 + (enemy.id % 5) * 0.1; // Different frequencies for variety

      // Calculate horizontal movement using sine wave for smooth oscillation
      const oscillationOffset =
        Math.sin(currentTime * 0.001 * frequency) * 0.5 * safeDeltaTime;

      // Add some slight variation between enemies
      const individualFactor = enemy.id % 2 === 0 ? 1 : -1;

      // Add vertical variation based on a slower frequency
      const verticalOffset =
        Math.sin(currentTime * 0.0003 * (frequency * 0.5)) *
        0.2 *
        safeDeltaTime;

      return {
        ...enemy,
        // Smooth horizontal oscillation
        x: enemy.x + oscillationOffset * horizontalAmplitude * individualFactor,
        // Smooth vertical movement with a slight wave pattern
        y:
          enemy.y +
          verticalSpeed * safeDeltaTime +
          verticalOffset * individualFactor,
      };
    });

    // Ensure enemies stay within boundaries
    this.enemies = this.enemies.map(enemy => ({
      ...enemy,
      x: Math.max(5, Math.min(95 - 10, enemy.x)), // Keep within screen bounds (5% to 85%)
    }));

    return [...this.enemies];
  }

  removeEnemy(id: number): void {
    this.enemies = this.enemies.filter(e => e.id !== id);
  }

  getEnemiesReachedBottom(): Enemy[] {
    return this.enemies.filter(enemy => enemy.y > 90);
  }

  removeEnemiesReachedBottom(): void {
    this.enemies = this.enemies.filter(enemy => enemy.y <= 90);
  }

  resetEntities(): void {
    this.playerEntity.position = 50;
    this.bullets = [];
    this.nextBulletId = 1;
  }
}
