import { Component, Input } from '@angular/core';
import { BoardGeneratorService } from './board-generator.service';
import { MoveCommand } from './models/path-finder.models';
import { TranslatePipe } from '@ngx-translate/core';
import { Board } from './models/board';
import { Robot } from './models/robot';

@Component({
  selector: 'app-path-finder',
  imports: [TranslatePipe],
  templateUrl: './path-finder.component.html',
  styleUrl: './path-finder.component.scss',
})
export class PathFinderComponent {
  @Input({ required: true }) boardSize = 5;
  board: Board;
  robot: Robot;
  commands: MoveCommand[] = [];
  isAnimating = false;

  constructor() {
    this.board = BoardGeneratorService.generateBoard(this.boardSize);
    this.robot = new Robot(this.board.start, this.board);
  }

  async executeCommands(): Promise<void> {
    if (this.isAnimating) return; // Prevent multiple executions
    this.isAnimating = true;

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    for (const command of this.commands) {
      if (this.robot.validateCommand(command)) {
        this.robot.performMovement(command);
      } else {
        alert('Invalid path');
        break;
      }

      // Add delay between commands for visual feedback
      await delay(500); // 500ms delay between commands
    }
    this.commands = [];
    this.isAnimating = false;
  }

  containsRobot(row: number, column: number) {
    if (
      row === this.robot.currentPosition.row &&
      column === this.robot.currentPosition.column
    ) {
      return true;
    }
    return false;
  }

  addCommand(command: MoveCommand): void {
    this.commands.push(command);
  }

  removeCommand(index: number): void {
    this.commands.splice(index, 1);
  }

  getCommandIcon(command: MoveCommand): string {
    switch (command) {
      case 'moveUp':
        return '⬆️';
      case 'moveDown':
        return '⬇️';
      case 'moveLeft':
        return '⬅️';
      case 'moveRight':
        return '➡️';
      default:
        return '';
    }
  }
}
