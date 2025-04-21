import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exercises-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    TranslatePipe,
    MatButton,
    RouterLink,
  ],
  templateUrl: './exercises-summary.component.html',
  styleUrl: './exercises-summary.component.scss',
})
export class ExercisesSummaryComponent {
  @Input({ required: true }) errorCount!: number;
  @Input({ required: true }) correctCount!: number;
  @Input({ required: true }) score!: UserScore;

  get totalCount(): number {
    return this.errorCount + this.correctCount;
  }

  get successRate(): number {
    return this.totalCount ? (this.correctCount / this.totalCount) * 100 : 0;
  }
}
