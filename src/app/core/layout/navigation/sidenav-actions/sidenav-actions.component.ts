import { Component, output } from '@angular/core';

import { RouterPathTitle } from '../../../../types/router-link';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sidenav-actions',
  standalone: true,
  imports: [MatListModule, RouterLink, MatExpansionModule],
  templateUrl: './sidenav-actions.component.html',
  styleUrl: './sidenav-actions.component.scss',
})
export class SidenavActionsComponent {
  linkRouted = output();

  linksMaterial: RouterPathTitle[] = [
    { path: 'palettes', title: 'Mappe Colori' },
    { path: 'color-roles', title: 'Ruolo Colori' },
    { path: 'density-scale', title: 'Densità variabile' },
    { path: 'customs', title: 'Personalizzazioni' },
  ];

  linksAnimation: RouterPathTitle[] = [
    { path: 'animation-intro', title: 'Introduzione' },
  ];

  close() {
    this.linkRouted.emit();
  }
}
