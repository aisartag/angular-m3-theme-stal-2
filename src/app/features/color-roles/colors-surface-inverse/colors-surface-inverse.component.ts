import { Component } from '@angular/core';
import { ColorsInverseComponent } from '../colors-inverse/colors-inverse.component';
import { ColorsSurfaceContainerComponent } from '../colors-surface-container/colors-surface-container.component';
import { ColorsOnSurfaceOutlineComponent } from '../colors-on-surface-outline/colors-on-surface-outline.component';

@Component({
  selector: 'app-colors-surface-inverse',
  standalone: true,
  imports: [
    ColorsInverseComponent,
    ColorsSurfaceContainerComponent,
    ColorsOnSurfaceOutlineComponent,
  ],
  templateUrl: './colors-surface-inverse.component.html',
  styleUrl: './colors-surface-inverse.component.scss',
})
export class ColorsSurfaceInverseComponent {}
