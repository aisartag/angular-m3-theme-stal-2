import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeManager } from '../../../../services/theme-manager.service';
import { LoggerService } from '../../../../services/logger.service';

@Component({
  selector: 'app-theme-manager',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIcon],
  templateUrl: './theme-manager.component.html',
  styleUrl: './theme-manager.component.scss',
})
export class ThemeManagerComponent {
  theme = inject(ThemeManager);
  readonly #logger = inject(LoggerService);

  constructor() {
    effect(() => {
      this.#logger.debug(
        'ThemeManagerComponent effect:isDark',
        this.theme.isDark()
      );
    });
  }
}
