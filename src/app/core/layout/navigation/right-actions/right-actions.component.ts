import { Component, inject, output } from '@angular/core';
import { ToolbarMenuComponent } from '../toolbar-menu/toolbar-menu.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { THEME_VIEW_LIST } from './theme-type-list';
import {
  ThemeManager,
  ThemeType,
} from '../../../services/theme-manager.service';
import { TitleCasePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LoggerService } from '../../../services/logger.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-right-actions',
  standalone: true,
  imports: [
    ToolbarMenuComponent,
    MatFormFieldModule,
    MatSelectModule,
    TitleCasePipe,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './right-actions.component.html',
  styleUrl: './right-actions.component.scss',
})
export class RightActionsComponent {
  close = output<void>();
  readonly #logger = inject(LoggerService);
  theme = inject(ThemeManager);
  themeViews = THEME_VIEW_LIST;

  onSelectionChange(themeValue: ThemeType) {
    this.#logger.debug(themeValue);
  }

  onClose() {
    this.close.emit();
  }
}
