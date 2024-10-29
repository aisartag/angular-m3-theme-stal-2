import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BrowserStorage } from './browser-storage.service';

import { LoggerService } from './logger.service';
import { APP_ENV } from '../../app.env';

// const LOCAL_STORAGE_KEY = 'angular-m3-course';

export type PreferenceType = 'light' | 'dark' | 'auto';

export type PreferredType = {
  themeType: PreferenceType;
};

export type Color = {
  themeType: PreferenceType;
  themeSeed: string;
};

@Injectable({
  providedIn: 'root',
})
export class ThemeManager {
  readonly #document = inject(DOCUMENT);
  readonly #browserStorage = inject(BrowserStorage);
  readonly #window = this.#document.defaultView;
  readonly #logger = inject(LoggerService);

  readonly #appEnv = inject(APP_ENV);
  readonly #storageKey = this.#appEnv.name;
  readonly #themeSeedDefault = this.#appEnv.themeSeed;

  // signals writable
  public currentThemeType = signal<PreferenceType>('auto');
  public currentThemeSeed = this.#themeSeedDefault;

  // signals computed not writable
  public isDark = computed(() =>
    this.currentThemeType() === 'auto'
      ? this.#matchDark()
      : this.currentThemeType() === 'dark'
  );

  public changeThemeType = (themeType: PreferenceType): void => {
    this.#logger.debug('changeThemeType', themeType);
    this.setThemeOnDocument(themeType);
    this.currentThemeType.set(themeType);
    this.#setMaterialTheme();
    this.#setStoredColor();
  };

  public changeThemeSeed = (themeSeed: string): void => {
    this.#logger.debug('changeThemeSeed', themeSeed);
    this.currentThemeSeed = themeSeed;
    this.#setStoredColor();
  };

  public changeAll = (color: Color) => {
    this.#logger.debug('changeAll', color);
    this.currentThemeType.set(color.themeType);
    this.currentThemeSeed = color.themeSeed;
    this.setThemeOnDocument(color.themeType);
    this.#setMaterialTheme();
  };

  constructor() {
    this.#logger.debug(this.currentThemeSeed);
    const color = this.#getColor();
    this.#logger.debug(color);
    this.changeAll(color);

    if (this.#window !== null && this.#window.matchMedia) {
      this.#window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          const themeType = this.currentThemeType();
          if (themeType !== 'light' && themeType !== 'dark') {
            this.setThemeOnDocument(themeType);
          }
        });
    }
  }

  //#region readonly  private javascript(#)
  readonly #matchDark = (): boolean => {
    if (this.#window !== null && this.#window.matchMedia) {
      return this.#window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  readonly #getColor = (): Color => {
    const storedColor = this.#getStoredColor();
    this.#logger.debug('storedColor', storedColor);
    if (storedColor) {
      if (!Object.hasOwn(storedColor, 'themeType')) {
        storedColor.themeType = 'auto';
      }
      if (!Object.hasOwn(storedColor, 'themeSeed')) {
        storedColor.themeSeed = this.#themeSeedDefault;
      }
      this.#logger.debug('storedColor', storedColor);
      return storedColor;
    }
    return { themeType: 'auto', themeSeed: this.#themeSeedDefault };
  };

  readonly #getStoredColor = (): Color | undefined => {
    try {
      return JSON.parse(this.#browserStorage.get(this.#storageKey) ?? '{}')
        .color;
    } catch (e: any) {
      return undefined;
    }
  };

  readonly #setStoredColor = () => {
    const color = {
      color: {
        themeType: this.currentThemeType(),
        themeSeed: this.currentThemeSeed,
      },
    };
    this.#logger.debug(color);
    this.#browserStorage.set(this.#storageKey, JSON.stringify(color));
  };

  readonly setThemeOnDocument = (themeType: PreferenceType): void => {
    this.#logger.debug('setThemeOnDocument', themeType);
    if (this.#window !== null) {
      if (
        themeType === 'auto' &&
        this.#window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.#document.documentElement.setAttribute('data-pkm-theme', 'dark');
      } else {
        this.#document.documentElement.setAttribute(
          'data-pkm-theme',
          themeType
        );
      }
    }
  };

  readonly #setMaterialTheme = (): void => {
    this.#logger.debug('setMaterialTheme isDark', this.isDark());
    if (this.isDark()) {
      this.#document.documentElement.classList.add('dark-theme');
    } else {
      this.#document.documentElement.classList.remove('dark-theme');
    }
  };
  //#endregion
}
