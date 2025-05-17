import { Injectable } from '@angular/core';
import { Bullet, Enemy } from '../models/math-blaster.models';

@Injectable({
  providedIn: 'root',
})
export class MathBlasterCollisionService {
  constructor() {}

  /**
   * Check for collisions between bullets and enemies
   * Returns array of collision objects with bullet and enemy that collided
   */
  detectCollisions(
    bullets: Bullet[],
    enemies: Enemy[]
  ): Array<{ bullet: Bullet; enemy: Enemy }> {
    const collisions: Array<{ bullet: Bullet; enemy: Enemy }> = [];

    for (const bullet of bullets) {
      for (const enemy of enemies) {
        if (this.isCollision(bullet, enemy)) {
          collisions.push({ bullet, enemy });
        }
      }
    }

    return collisions;
  }

  /**
   * Check if a specific bullet and enemy are colliding
   */
  private isCollision(bullet: Bullet, enemy: Enemy): boolean {
    // Simple collision detection
    const hitX = Math.abs(bullet.x + 1 - (enemy.x + 5)) < 6;
    const hitY = Math.abs(bullet.y + 2.5 - enemy.y) < 7.5;

    return hitX && hitY;
  }

  /**
   * Check if any enemies have reached the bottom of the screen
   */
  checkEnemiesReachedBottom(enemies: Enemy[]): boolean {
    return enemies.some(enemy => enemy.y > 90);
  }
}
