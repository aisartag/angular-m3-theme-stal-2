import { Component } from '@angular/core';

@Component({
  selector: 'app-palettes',
  standalone: true,
  imports: [],
  templateUrl: './palettes.component.html',
  styleUrl: './palettes.component.scss',
})
export class PalettesComponent {
  palettes = [
    'primary',
    'secondary',
    'tertiary',
    'neutral',
    'neutral-variant',
    'error',
  ];
  hues = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
}
