import { Component } from '@angular/core';
import { ToolbarMenuComponent } from '../toolbar-menu/toolbar-menu.component';
import { ThemeManagerComponent } from '../../../../shared/components/theme-manager/theme-manager.component';

@Component({
  selector: 'app-toolbar-actions',
  standalone: true,
  imports: [ToolbarMenuComponent, ThemeManagerComponent],
  templateUrl: './toolbar-actions.component.html',
  styleUrl: './toolbar-actions.component.scss',
})
export class ToolbarActionsComponent {}
