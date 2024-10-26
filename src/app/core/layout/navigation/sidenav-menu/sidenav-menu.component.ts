import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerComponent } from '../../../../shared/components/color-picker/color-picker.component';
import { ThemeManager } from '../../../services/theme-manager.service';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ColorPickerComponent],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
})
export class SidenavMenuComponent {
  readonly theme = inject(ThemeManager);
  // isDark = this.#theme.isDark();
  // themeSeed = this.#theme.themeSeed();
  // color = this.themeSeed;
  color!: string;

  constructor() {
    effect(() => {
      console.log('isDark ', this.theme.isDark());
    });
  }

  onChangeColor(color: string) {
    if (this.color) {
      this.color = color;
      console.log('color ', color);
    }
  }
}
