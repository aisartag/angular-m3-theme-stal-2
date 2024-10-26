import {
  Component,
  effect,
  inject,
  input,
  output,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
} from '@material/material-color-utilities';
import { Color } from '../../../core/services/theme-manager.service';
import { APP_ENV } from '../../../app.env';

// const FALLBACK_COLOR = '#6750a4';
const FALLBACK_COLOR = '#ff0000';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  colorOriginal = inject(APP_ENV).themeSeed;
  isDark = input<boolean>();
  themeSeed = input<string>();
  color = this.themeSeed();

  changeColor = output<string>();

  constructor() {
    effect(() => {
      console.log(
        'ColorPickerComponent effect:isDark themeseed ',

        this.isDark()
      );

      this.generateDynamicTheme();
    });
  }

  changeTheme(ev: Event) {
    const inputElement = ev.target as HTMLInputElement;

    if (this.color) {
      this.color = inputElement.value;
      this.changeColor.emit(inputElement.value);
    }
  }

  generateDynamicTheme() {
    if (!this.color) return;
    let argb;
    try {
      argb = argbFromHex(this.color);
    } catch (error) {
      // falling to default color if it's invalid color
      argb = argbFromHex(FALLBACK_COLOR);
    }

    const targetElement = document.documentElement; // html tag

    // Get the theme from a hex color
    const theme = themeFromSourceColor(argb);

    // Apply theme to root element
    applyTheme(theme, {
      target: targetElement,
      dark: this.isDark(),
      brightnessSuffix: true,
    });

    // Print out the theme as JSON
    console.log(JSON.stringify(theme, null, 2));

    const styles = targetElement.style;

    for (const key in styles) {
      if (Object.hasOwn(styles, key)) {
        const propName = styles[key];
        // console.log(propName);

        // color utilities generate variables with --md-sys- prefix, we need to change it to --sys
        if (propName.indexOf('--md-sys') === 0) {
          const sysPropName = '--sys' + propName.replace('--md-sys-color', '');
          targetElement.style.setProperty(
            sysPropName,
            targetElement.style.getPropertyValue(propName)
          );
        }
      }
    }
  }
}
