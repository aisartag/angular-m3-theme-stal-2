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
  #seed = this.seedDefault;
  public getSeed() {
    return this.#seed;
  }

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

  public changSeed = (seed: string): void => {
    this.#logger.debug('changeThemeSeed', seed);
    this.#seed = seed;
    this.#setStoredSeed(seed);
  };

  constructor() {
    this.#setTheme(this.#getPreferredTheme());
    this.#seed = this.#getPreferredSeed();

    this.#logger.debug('seedDefault', this.seedDefault);
    this.#logger.debug('seed', this.#seed);

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

    return this.seedDefault;
  };

  readonly #setStoredSeed = (seed: string) => {
    const meta = JSON.parse(this.#browserStorage.get(this.#storageKey) ?? '{}');
    meta.seed = seed;
    this.#browserStorage.set(this.#storageKey, JSON.stringify(meta));
  };

  readonly #setTheme = (theme: ThemeType): void => {
    // if (this.#window !== null && this.#window.matchMedia) {

    //     theme === 'auto' &&
    //     this.#window.matchMedia('(prefers-color-scheme: dark)').matches
    //   ) {
    //     console.log('setTheme auto dark', true);
    //     this._isDarkSub.next(true);
    //   } else {
    //     console.log('setTheme no auto isdark', theme === 'dark');
    //     this._isDarkSub.next(theme === 'dark');
    //   }
    //   this.#setMaterialTheme();
    // }

    this.favoriteTheme.set(theme);
    if (this.isDark()) {
      this.#document.documentElement.classList.add('dark-theme');
    } else {
      this.#document.documentElement.classList.remove('dark-theme');
    }
  };

  // readonly #setMaterialTheme = () => {
  //   this.isDark$.pipe(take(1)).subscribe((isDark) => {
  //     console.log('setMaterialTheme isdark', isDark);
  //     if (isDark) {
  //       this.#document.documentElement.classList.add('dark-theme');
  //     } else {
  //       this.#document.documentElement.classList.remove('dark-theme');
  //     }
  //   });
  // };

  //#endregion
}
