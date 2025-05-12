import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
})
export class DashboardComponent implements OnInit {
  #http = inject(HttpClient);
  version: string = '';

  ngOnInit() {
    this.#http
      .get<{ version: string }>('assets/version.json')
      .pipe(
        take(1),
        map(data => data.version)
      )
      .subscribe(version => (this.version = version));
  }
}
