import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeManager } from '../../../core/services/theme-manager.service';
import { LoggerService } from '../../../core/services/logger.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-theme-manager',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIcon, AsyncPipe],
  templateUrl: './theme-manager.component.html',
  styleUrl: './theme-manager.component.scss',
})
export class ThemeManagerComponent {
  theme = inject(ThemeManager);
  readonly #logger = inject(LoggerService);
}
