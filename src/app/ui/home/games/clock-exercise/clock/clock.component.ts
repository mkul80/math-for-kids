import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
})
export class ClockComponent implements OnChanges {
  @Input() hour: number = 0;
  @Input() minutes: number = 0;

  hourAngle: number = 0;
  minuteAngle: number = 0;

  ngOnChanges(): void {
    this.hourAngle = ((this.hour % 12) + this.minutes / 60) * 30;
    this.minuteAngle = this.minutes * 6;
  }
}
