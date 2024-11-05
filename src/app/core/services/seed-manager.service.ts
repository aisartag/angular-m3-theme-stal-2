import { inject, Injectable, signal } from '@angular/core';
import { BrowserStorage } from './browser-storage.service';
import { LoggerService } from './logger.service';
import { APP_ENV } from '../../app.env';
import { ThemeManager } from './theme-manager.service';
import {
  applyTheme,
  argbFromHex,
  Hct,
  rgbaFromArgb,
  themeFromSourceColor,
} from '@material/material-color-utilities';
import { DOCUMENT } from '@angular/common';

export interface HtcValues {
  hue: number;
  chroma: number;
  tone: number;
}

@Injectable({
  providedIn: 'root',
})
export class SeedManagerService {
  readonly #document = inject(DOCUMENT);
  readonly #browserStorage = inject(BrowserStorage);
  readonly #logger = inject(LoggerService);
  readonly #theme = inject(ThemeManager);

  readonly #appEnv = inject(APP_ENV);
  readonly #storageKey = this.#appEnv.name;
  readonly seedDefault = this.#appEnv.themeSeed;

  public seedColor = signal<string>(this.seedDefault);

  public changeSeed = (seed: string): void => {
    this.#logger.debug('changeThemeSeed', seed);
    this.seedColor.set(seed);
    this.generateThemeFromSeed();
    this.#setStoredSeed(seed);
  };

  public generateThemeFromSeed(color?: string) {
    if (!color) {
      color = this.seedColor();
    }

    this.#logger.debug('color is:', color);

    this.#logger.debug('seed is:', this.seedColor());
    this.#logger.debug('isDark: ', this.#theme.isDark());

    const argb = argbFromHex(color);
    const targetElement = this.#document.documentElement;

    // Get the theme from a hex color
    const theme = themeFromSourceColor(argb);

    // Apply theme to root element
    applyTheme(theme, {
      target: targetElement,
      dark: this.#theme.isDark(),
      brightnessSuffix: true,
    });

    const styles = targetElement.style;

    for (const key in styles) {
      if (Object.hasOwn(styles, key)) {
        const propName = styles[key];

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

  public randonSeed() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 255;
    return this.#rgbToHex({ r, g, b, a });
  }

  // convertHctToRgb
  convertHctToRgb(hctValues: HtcValues) {
    this.#logger.debug('hctValues', JSON.stringify(hctValues, null, 2));

    const hctArgb = Hct.from(
      hctValues.hue,
      hctValues.chroma,
      hctValues.tone
    ).toInt();
    this.#logger.debug('hctArgb', JSON.stringify(hctArgb, null, 2));

    const rgba = rgbaFromArgb(hctArgb);
    return this.#rgbToHex(rgba);
  }

  constructor() {
    const seed = this.#getPreferredSeed();
    this.seedColor.set(seed);
    this.generateThemeFromSeed();
  }

  readonly #getPreferredSeed = (): string => {
    const storedSeed = this.#getStoredSeed();
    if (storedSeed) {
      return storedSeed;
    }
    return this.seedDefault;
  };

  readonly #getStoredSeed = (): string | undefined => {
    try {
      return JSON.parse(this.#browserStorage.get(this.#storageKey) ?? '{}')
        .seed;
    } catch (e: any) {
      return undefined;
    }
  };

  readonly #setStoredSeed = (seed: string) => {
    const meta = JSON.parse(this.#browserStorage.get(this.#storageKey) ?? '{}');
    meta.seed = seed;
    this.#browserStorage.set(this.#storageKey, JSON.stringify(meta));
  };

  readonly #rgbToHex = (rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  }): string => {
    this.#logger.debug(rgba);
    const red = rgba.r.toString(16).padStart(2, '0');
    const green = rgba.g.toString(16).padStart(2, '0');
    const blue = rgba.b.toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  };
}
