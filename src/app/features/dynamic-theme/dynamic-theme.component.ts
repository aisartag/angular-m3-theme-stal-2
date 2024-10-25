import { Component } from '@angular/core';
import { ColorPickerComponent } from '../../shared/components/color-picker/color-picker.component';

@Component({
  selector: 'app-dynamic-theme',
  standalone: true,
  imports: [ColorPickerComponent],
  templateUrl: './dynamic-theme.component.html',
  styleUrl: './dynamic-theme.component.scss',
})
export class DynamicThemeComponent {}
