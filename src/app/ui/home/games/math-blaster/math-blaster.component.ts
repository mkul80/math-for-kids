import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';

import { MathBlasterEntityService } from './services/math-blaster-entity.service';
import { MathBlasterCollisionService } from './services/math-blaster-collision.service';
import { Bullet, Enemy, DifficultyLevel } from './models/math-blaster.models';
import { MathBlasterMathProblemService } from './services/math-blaster-math-problem.service';
import { MathBlasterScoreManagerService } from './services/math-blaster-score-manager.service';
import { MathBlasterSoundService } from './services/math-blaster-sound.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-math-blaster',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './math-blaster.component.html',
  styleUrl: './math-blaster.component.scss',
})
export class MathBlasterComponent implements OnInit, OnDestroy {
  @ViewChild('gameBoard') gameBoard!: ElementRef;

  // Services
  private mathProblemService = inject(MathBlasterMathProblemService);
  private entityService = inject(MathBlasterEntityService);
  private collisionService = inject(MathBlasterCollisionService);
  private scoreManager = inject(MathBlasterScoreManagerService);
  private soundService = inject(MathBlasterSoundService);

  // Game state
  gameStarted: boolean = false;
  selectingDifficulty: boolean = false;
  score: number = 0;
  lives: number = 5;
  gameOver: boolean = false;
  levelComplete: boolean = false;
  currentTask: string = '';
  correctAnswer: number = 0;

  // Player state
  playerPosition: number = 50;
  isMovingLeft: boolean = false;
  isMovingRight: boolean = false;

  // Game entities
  enemies: Enemy[] = [];
  bullets: Bullet[] = [];

  // Timers for game loop
  moveTimer: any;
  enemyTimer: any;
  bulletTimer: any;

  // Add properties for explosion effects
  explosions: { x: number; y: number; isCorrectTarget: boolean; id: number }[] =
    [];
  private nextExplosionId = 1;

  ngOnInit(): void {
    // Don't start the game automatically - wait for button click
    // Just initialize score and lives
    this.score = 0;
    this.lives = 5;
  }

  ngOnDestroy(): void {
    this.clearTimers();
    if (this.gameStarted) {
      this.soundService.stopBackgroundMusic();
    }
  }

  startGameFromButton(): void {
    // Instead of starting the game immediately, show difficulty selection
    this.selectingDifficulty = true;
  }

  selectDifficulty(difficulty: DifficultyLevel): void {
    // Set the difficulty in the service
    this.mathProblemService.setDifficulty(difficulty);

    // Now start the actual game
    this.selectingDifficulty = false;
    this.gameStarted = true;
    this.startGame();

    // Play sound effects now that user has interacted
    this.soundService.startBackgroundMusic();

    // Start game loops
    this.moveTimer = setInterval(() => this.updateMovement(), 50);
    this.enemyTimer = setInterval(() => this.updateEnemies(), 50);
    this.bulletTimer = setInterval(() => this.updateBullets(), 50);
  }

  startGame(): void {
    // Reset game state
    this.scoreManager.reset();
    this.gameOver = false;
    this.levelComplete = false;

    // Reset entity state
    this.entityService.resetEntities();
    this.mathProblemService.resetEnemyIdCounter();

    // Setup new game level
    this.setupNewLevel();

    // Update component properties from services
    this.updateComponentState();
  }

  setupNewLevel(): void {
    // Generate new math problem
    const { currentTask, correctAnswer, enemies } =
      this.mathProblemService.setupNewProblem();
    this.currentTask = currentTask;
    this.correctAnswer = correctAnswer;

    // Set enemies in entity service
    this.entityService.setEnemies(enemies);
  }

  updateComponentState(): void {
    // Refresh component properties from services
    this.enemies = this.entityService.getEnemies();
    this.bullets = this.entityService.getBullets();
    this.playerPosition = this.entityService.getPlayerPosition();
    this.score = this.scoreManager.getScore();
    this.lives = this.scoreManager.getLives();
  }

  // Input handling methods
  moveLeft(): void {
    this.isMovingLeft = true;
  }

  moveRight(): void {
    this.isMovingRight = true;
  }

  stopMoving(): void {
    this.isMovingLeft = false;
    this.isMovingRight = false;
  }

  fire(): void {
    if (this.gameOver || this.levelComplete) return;
    this.entityService.addBullet();
    this.bullets = this.entityService.getBullets();

    // Play shooting sound
    this.soundService.playShootSound();
  }

  // Game loop methods
  updateMovement(): void {
    if (this.gameOver || this.levelComplete) return;

    if (this.isMovingLeft) {
      this.entityService.movePlayerLeft();
    }

    if (this.isMovingRight) {
      this.entityService.movePlayerRight();
    }

    this.playerPosition = this.entityService.getPlayerPosition();
  }

  updateBullets(): void {
    if (this.gameOver || this.levelComplete) return;

    // Update bullet positions
    this.bullets = this.entityService.updateBullets();

    // Check for collisions
    this.checkBulletCollisions();
  }

  updateEnemies(): void {
    if (this.gameOver || this.levelComplete) return;

    // Update enemy positions
    this.enemies = this.entityService.updateEnemies();

    // Check if any enemies reached the bottom
    const enemiesAtBottom = this.entityService.getEnemiesReachedBottom();
    if (enemiesAtBottom.length > 0) {
      // Check if the correct answer (target) is among the enemies that reached the bottom
      const targetReachedBottom = enemiesAtBottom.some(enemy => enemy.isTarget);

      // Only reduce lives if the correct answer reached the bottom
      if (targetReachedBottom) {
        this.scoreManager.decreaseLife();
        this.soundService.playWrongHitSound();

        // Check if game over
        if (this.scoreManager.isGameOver()) {
          this.gameOver = true;
          this.soundService.playGameOverSound();
          // Stop background music when game is over
          this.soundService.stopBackgroundMusic();
        } else {
          // Start a new level immediately when target is missed - don't wait for other enemies
          this.setupNewLevel();
        }
      }

      // Remove all enemies that reached the bottom
      this.entityService.removeEnemiesReachedBottom();
    }

    // If no enemies left (all shot down), level complete
    if (this.entityService.getEnemies().length === 0 && !this.gameOver) {
      this.levelComplete = true;
      this.soundService.playLevelCompleteSound();
      setTimeout(() => {
        this.levelComplete = false;
        this.setupNewLevel();
      }, 2000);
    }

    // Update component state
    this.updateComponentState();
  }

  checkBulletCollisions(): void {
    // Get collisions
    const collisions = this.collisionService.detectCollisions(
      this.entityService.getBullets(),
      this.entityService.getEnemies()
    );

    for (const collision of collisions) {
      // Create explosion at the collision point
      this.createExplosion(
        collision.enemy.x,
        collision.enemy.y,
        collision.enemy.isTarget
      );

      // Remove bullet
      this.entityService.removeBullet(collision.bullet.id);

      // Remove enemy
      this.entityService.removeEnemy(collision.enemy.id);

      // Play appropriate sound based on whether it was correct or wrong answer
      if (collision.enemy.isTarget) {
        this.soundService.playCorrectHitSound();
      } else {
        this.soundService.playWrongHitSound();
      }

      // Update score
      this.scoreManager.addPoints(collision.enemy);

      if (collision.enemy.isTarget) {
        // Create new enemies after a short delay if hit correct target
        setTimeout(() => {
          if (!this.gameOver && !this.levelComplete) {
            this.setupNewLevel();
          }
        }, 1500);
      }
    }

    // Update component state
    this.updateComponentState();
  }

  // Create explosion effect
  createExplosion(x: number, y: number, isCorrectTarget: boolean): void {
    const explosionId = this.nextExplosionId++;
    this.explosions.push({ x, y, isCorrectTarget, id: explosionId });

    // Remove explosion after animation completes
    setTimeout(
      () => {
        this.explosions = this.explosions.filter(exp => exp.id !== explosionId);
      },
      isCorrectTarget ? 1000 : 700
    );
  }

  // Add a method to reset the game
  resetGame(): void {
    // Clear existing game state
    this.clearTimers();
    this.gameOver = false;
    this.levelComplete = false;
    this.gameStarted = false;

    // Show difficulty selection immediately instead of requiring another button press
    this.selectingDifficulty = true;

    // Reset score and lives (although these will be reset again in startGame)
    this.score = 0;
    this.lives = 5;

    // Clear any existing enemies and bullets
    this.enemies = [];
    this.bullets = [];

    // Note: The background music will be restarted when selectDifficulty is called
  }

  // Input event handlers
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case ' ': // Space bar
        this.fire();
        event.preventDefault(); // Prevent page scrolling
        break;
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        this.stopMoving();
        break;
    }
  }

  clearTimers(): void {
    if (this.moveTimer) clearInterval(this.moveTimer);
    if (this.enemyTimer) clearInterval(this.enemyTimer);
    if (this.bulletTimer) clearInterval(this.bulletTimer);
  }
}
