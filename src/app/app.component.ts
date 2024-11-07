import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_ENV } from './app.env';

import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { LoggerService } from './core/services/logger.service';
import { SeedManager } from './core/services/seed-manager.service';
import { ThemeManager } from './core/services/theme-manager.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly #logger = inject(LoggerService);
  readonly #seed = inject(SeedManager);

  title = 'angular-m3-theme-stal-2';

  constructor() {
    effect(() => {
      this.#logger.debug('seed Color', this.#seed.seedColor());
      if (this.#seed.seedColor()) {
        this.#seed.generateThemeFromSeed(this.#seed.seedColor());
      }
    });
  }
}
