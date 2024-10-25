import { Component, output } from '@angular/core';

import { RouterPathTitle } from '../../../../types/router-link';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-actions',
  standalone: true,
  imports: [MatListModule, RouterLink],
  templateUrl: './sidenav-actions.component.html',
  styleUrl: './sidenav-actions.component.scss',
})
export class SidenavActionsComponent {
  linkRouted = output();

  linksMaterial: RouterPathTitle[] = [
    { path: 'palettes', title: 'Mappe Colori' },
    { path: 'color-roles', title: 'Ruolo Colori' },
    { path: 'dynamic-theme', title: 'Tema dinamico' },
  ];

  close() {
    this.linkRouted.emit();
  }
}
