import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ColorPickerComponent],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
})
export class SidenavMenuComponent {}
