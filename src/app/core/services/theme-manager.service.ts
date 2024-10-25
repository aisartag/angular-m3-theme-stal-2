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

@Injectable({
  providedIn: 'root',
})
export class ThemeManager {
  readonly #document = inject(DOCUMENT);
  readonly #browserStorage = inject(BrowserStorage);
  readonly #window = this.#document.defaultView;
  readonly #logger = inject(LoggerService);
  readonly #storageKey = inject(APP_ENV).name;

  // signal writable
  public preferred = signal<PreferredType>({ themeType: 'auto' });

  // signal computed not writable
  public isDark = computed(() =>
    this.preferred().themeType === 'auto'
      ? this.#matchDark()
      : this.preferred().themeType === 'dark'
  );

  readonly #matchDark = (): boolean => {
    if (this.#window !== null && this.#window.matchMedia) {
      return this.#window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  constructor() {
    this.#setDataThemeFromPreference(this.#getPreference());
    if (this.#window !== null && this.#window.matchMedia) {
      this.#window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          const storedTheme = this.#getStoredPreference();
          if (storedTheme !== 'light' && storedTheme !== 'dark') {
            this.#setDataThemeFromPreference(this.#getPreference());
          }
        });
    }
  }

  readonly #getStoredPreference = (): any => {
    try {
      return JSON.parse(this.#browserStorage.get(this.#storageKey) ?? '{}')
        .color.themeType;
    } catch (e: any) {
      return undefined;
    }
  };

  readonly #setStoredPreference = (preference: PreferenceType): void => {
    this.#logger.debug(preference);

    let meta;
    try {
      const value = JSON.parse(
        this.#browserStorage.get(this.#storageKey) ?? '{}'
      );
      if (typeof value === 'object') {
        meta = value;
      } else {
        throw '';
      }
    } catch (e: any) {
      meta = {};
    }

    this.#logger.debug(meta);

    // change themeType preference on common localStorage
    meta.color = { ...meta.color, themeType: preference };
    this.#logger.debug(meta.color);
    meta = { ...meta, color: meta.color };
    this.#logger.debug(meta);
    this.#browserStorage.set(this.#storageKey, JSON.stringify(meta));
  };

  readonly #getPreference = (): PreferenceType => {
    const storedPreference = this.#getStoredPreference();
    this.#logger.debug('getStoredPreference', storedPreference);
    if (storedPreference) {
      this.#logger.debug('return getStoredPreference', storedPreference);
      return storedPreference;
    }

    return 'auto';
  };

  readonly #setDataThemeFromPreference = (preference: PreferenceType): void => {
    this.#logger.debug('setDataThemeFromPreference', preference);
    if (this.#window !== null) {
      if (
        preference === 'auto' &&
        this.#window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.#document.documentElement.setAttribute('data-pkm-theme', 'dark');
      } else {
        this.#document.documentElement.setAttribute(
          'data-pkm-theme',
          preference
        );
      }

      // this.preferred.set({ themeType: preference });
      // sembra ridondante : property unica
      this.preferred.update((t) => ({ ...t, themeType: preference }));
    }

    this.#setMaterialTheme();
  };

  readonly #setMaterialTheme = (): void => {
    this.#logger.debug('setMaterialTheme isDark', this.isDark());
    if (this.isDark()) {
      this.#document.documentElement.classList.add('dark-theme');
    } else {
      this.#document.documentElement.classList.remove('dark-theme');
    }
  };

  public changePreference = (preference: PreferenceType): void => {
    this.#logger.debug('changePreference', preference);
    this.#setStoredPreference(preference);
    this.#setDataThemeFromPreference(preference);
  };
}
