import { OverlayModule } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColorDynamicComponent } from '../color-dynamic/color-dynamic.component';

@Component({
  selector: 'app-overlay-theme-change',
  standalone: true,
  imports: [
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    ColorDynamicComponent,
  ],
  templateUrl: './overlay-theme-change.component.html',
  styleUrl: './overlay-theme-change.component.scss',
})
export class OverlayThemeChangeComponent {
  // @HostBinding('@enterLeaveAnimation') animate = true;
  isOpen = false;
}
