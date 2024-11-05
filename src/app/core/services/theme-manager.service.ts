import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BrowserStorage } from './browser-storage.service';

import { LoggerService } from './logger.service';
import { APP_ENV } from '../../app.env';
import { BehaviorSubject, take } from 'rxjs';

export type ThemeType = 'light' | 'dark' | 'auto';

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
  readonly seedDefault = this.#appEnv.themeSeed;

  // signals writable
  public favoriteTheme = signal<ThemeType>('auto');

  // signal computed not writable
  public isDark = computed(() =>
    this.favoriteTheme() === 'auto'
      ? this.#matchDark()
      : this.favoriteTheme() === 'dark'
  );

  // private _isDarkSub = new BehaviorSubject(false);
  // isDark$ = this._isDarkSub.asObservable();

  public changeTheme = (theme: ThemeType): void => {
    this.#logger.debug('changeTheme', theme);
    this.#setTheme(theme);
    this.#setStoredTheme(theme);
  };

  constructor() {
    this.#setTheme(this.#getPreferredTheme());
    this.#logger.debug('seedDefault', this.seedDefault);

    if (this.#window !== null && this.#window.matchMedia) {
      this.#window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          const theme = this.#getStoredTheme();
          if (theme !== 'light' && theme !== 'dark') {
            this.#setTheme(theme ?? 'auto');
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

  readonly #getPreferredTheme = (): ThemeType => {
    const storedTheme = this.#getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return 'auto';
  };

  readonly #getStoredTheme = (): ThemeType | undefined => {
    try {
      return JSON.parse(this.#browserStorage.get(this.#storageKey) ?? '{}')
        .theme;
    } catch (e: any) {
      return undefined;
    }
  };

  readonly #setStoredTheme = (theme: ThemeType) => {
    const meta = JSON.parse(this.#browserStorage.get(this.#storageKey) ?? '{}');
    meta.theme = theme;
    this.#browserStorage.set(this.#storageKey, JSON.stringify(meta));
  };

  readonly #setTheme = (theme: ThemeType): void => {
    this.favoriteTheme.set(theme);
    if (this.isDark()) {
      this.#document.documentElement.classList.add('dark-theme');
    } else {
      this.#document.documentElement.classList.remove('dark-theme');
    }
  };

  //#endregion
}
