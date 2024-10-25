import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_ENV } from './app.env';

import { NavigationComponent } from './core/layout/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-m3-theme-stal-2';
  environment = inject(APP_ENV);
  constructor() {
    console.log(this.environment);
  }
}
