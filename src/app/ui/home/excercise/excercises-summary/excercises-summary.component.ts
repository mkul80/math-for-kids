import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-excercises-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule], // Add CommonModule to imports
  templateUrl: './excercises-summary.component.html',
  styleUrl: './excercises-summary.component.scss',
})
export class ExcercisesSummaryComponent {
  @Input() errorCount!: number;
  @Input() correctCount!: number;

  get totalCount(): number {
    return this.errorCount + this.correctCount;
  }

  get successRate(): number {
    return this.totalCount ? (this.correctCount / this.totalCount) * 100 : 0;
  }
}
