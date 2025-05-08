import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BoardGeneratorService } from './board-generator.service';
import { MoveCommand, Position } from './models/path-finder.models';
import { TranslatePipe } from '@ngx-translate/core';
import { Board } from './models/board';
import { Robot } from './models/robot';
import { MatDialog } from '@angular/material/dialog';
import { OkCancelDialogComponent } from '../../../dialogs/ok-cancel.dialog.component';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-path-finder',
  imports: [TranslatePipe],
  templateUrl: './path-finder.component.html',
  styleUrl: './path-finder.component.scss',
})
export class PathFinderComponent implements OnInit, AfterViewInit {
  @ViewChild('boardRef') boardRef!: ElementRef<HTMLDivElement>;
  #dialog = inject(MatDialog);
  #route = inject(ActivatedRoute);
  boardSize!: number;
  board!: Board;
  robot!: Robot;
  commands: MoveCommand[] = [];
  cellSize = 0;
  robotStuck = false;
  isWalking = false;
  collisionCell: Position | null = null;

  ngOnInit(): void {
    if (this.#route.snapshot.params['boardSize']) {
      this.boardSize = +this.#route.snapshot.params['boardSize'];
    } else {
      throw new Error('Board size is not provided');
    }
    this.initializeBoardAndRobot();
  }

  private initializeBoardAndRobot() {
    this.board = BoardGeneratorService.generateBoard(this.boardSize);
    this.robot = new Robot(this.board.start, this.board);
  }

  ngAfterViewInit() {
    this.updateCellSize();
    window.addEventListener('resize', () => this.updateCellSize());
  }

  updateCellSize() {
    const boardWidth = this.boardRef.nativeElement.offsetWidth;
    this.cellSize = boardWidth / this.boardSize;
  }

  async executeCommands(): Promise<void> {
    const delay = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));

    this.collisionCell = null;

    for (const command of this.commands) {
      if (this.robot.validateCommand(command)) {
        this.isWalking = true;
        this.robot.performMovement(command);
        await delay(500); // Duration of walking animation
        this.isWalking = false;

        await delay(300); // Additional delay between steps
      } else {
        this.collisionCell = this.getCollisionCell(command);
        this.robotStuck = true;
        await delay(700);
        this.robotStuck = false;
        this.collisionCell = null;

        this.#dialog.open(OkCancelDialogComponent, {
          data: {
            header: 'path_finder.invalid_path_dialog.header',
            content: 'path_finder.invalid_path_dialog.content',
            hideCancelButton: true,
          },
        });
        this.robot.resetPosition();
        return;
      }
    }
    if (!this.robot.currentPosition.equals(this.board.end)) {
      this.#dialog.open(OkCancelDialogComponent, {
        data: {
          header: 'path_finder.incomplete_path_dialog.header',
          content: 'path_finder.incomplete_path_dialog.content',
          hideCancelButton: true,
        },
      });
      this.robot.resetPosition();
      return;
    }
    this.#dialog
      .open(OkCancelDialogComponent, {
        data: {
          header: 'path_finder.success_dialog.header',
          content: 'path_finder.success_dialog.content',
          okButtonTitle: 'path_finder.success_dialog.ok_button',
          cancelButtonTitle: 'path_finder.success_dialog.cancel_button',
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (!!result) {
          this.initializeBoardAndRobot()
          this.commands = [];
        }
      });

    this.robot.resetPosition();
    this.commands = [];
  }

  // Helper method to get the position of the collision cell based on the invalid command
  getCollisionCell(command: MoveCommand): Position {
    const pos = { ...this.robot.currentPosition };

    switch (command) {
      case 'moveUp':
        return new Position(pos.row - 1, pos.column);
      case 'moveDown':
        return new Position(pos.row + 1, pos.column);
      case 'moveLeft':
        return new Position(pos.row, pos.column - 1);
      case 'moveRight':
        return new Position(pos.row, pos.column + 1);
      default:
        return new Position(pos.row, pos.column);
    }
  }

  // Helper method to check if a cell is the collision cell
  isCollisionCell(row: number, column: number): boolean {
    return (
      !!this.collisionCell &&
      this.collisionCell.row === row &&
      this.collisionCell.column === column
    );
  }

  get gameFinished(): boolean {
    return this.robot.currentPosition.equals(this.board.end);
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
  getCommandTranslationKey(command: MoveCommand): string {
    switch (command) {
      case 'moveUp':
        return 'path_finder.move_up';
      case 'moveDown':
        return 'path_finder.move_down';
      case 'moveLeft':
        return 'path_finder.move_left';
      case 'moveRight':
        return 'path_finder.move_right';
      default:
        return '';
    }
  }
}
