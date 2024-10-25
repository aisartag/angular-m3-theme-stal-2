import { Component } from '@angular/core';

import { RouterPathTitle } from '../../../../types/router-link';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MatListModule, RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
})
export class SidebarMenuComponent {
  linksMaterial: RouterPathTitle[] = [
    { path: 'palettes', title: 'Mappe Colori' },
    { path: 'color-roles', title: 'Ruolo Colori' },
    { path: 'dynamic-theme', title: 'Tema dinamico' },
  ];
}
