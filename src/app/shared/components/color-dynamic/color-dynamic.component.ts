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
import {
  Color,
  ThemeManager,
} from '../../../core/services/theme-manager.service';
import { APP_ENV } from '../../../app.env';

// const FALLBACK_COLOR = '#6750a4';
// const FALLBACK_COLOR = '#ff0000';

@Component({
  selector: 'app-color-dynamic',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './color-dynamic.component.html',
  styleUrl: './color-dynamic.component.scss',
})
export class ColorDynamicComponent {
  theme = inject(ThemeManager);
  colorEnvironment = inject(APP_ENV).themeSeed;
  color = this.theme.currentThemeSeed;

  constructor() {
    effect(() => {
      console.log(
        'ColorPickerComponent effect:isDark themeseed ',
        this.theme.isDark()
      );

      this.generateDynamicTheme();
    });
  }

  save() {
    this.theme.changeThemeSeed(this.color);
  }

  undo() {
    this.color = this.theme.currentThemeSeed;
    this.generateDynamicTheme();
  }

  changeTheme(ev: Event) {
    const inputElement = ev.target as HTMLInputElement;

    this.color = inputElement.value;

    this.generateDynamicTheme();
  }

  generateDynamicTheme() {
    let argb;
    try {
      argb = argbFromHex(this.color);
    } catch (error) {
      // falling to default color if it's invalid color
      argb = argbFromHex(this.colorEnvironment);
    }

    const targetElement = document.documentElement; // html tag

    // Get the theme from a hex color
    const theme = themeFromSourceColor(argb);

    // Apply theme to root element
    applyTheme(theme, {
      target: targetElement,
      dark: this.theme.isDark(),
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
