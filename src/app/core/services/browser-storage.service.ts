import { inject, Injectable, InjectionToken } from '@angular/core';

/**************************************************************************
 *  copied from https://angular.dev/guide/di/di-in-action
 *
 * Ref:
 *  Storage API : https://developer.mozilla.org/en-US/docs/Web/API/Storage
 *
 **************************************************************************/

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class BrowserStorage {
  // old versions
  // constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}
  // # javascript private
  readonly #storage = inject(BROWSER_STORAGE);

  get(key: string) {
    return this.#storage.getItem(key);
  }

  set(key: string, value: string) {
    this.#storage.setItem(key, value);
  }

  remove(key: string) {
    this.#storage.removeItem(key);
  }

  clear() {
    this.#storage.clear();
  }
}
