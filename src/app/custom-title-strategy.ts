import { inject, Injectable, isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  readonly title = inject(Title);

  //   titleSuffix = $localize`:@@app.title:Bootify.io`;
  // titleSuffix = `:@@app.title:Bootify.io`;
  titleSuffix = 'PROD';

  constructor() {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (!isDevMode) {
      if (title !== undefined) {
        this.title.setTitle(title + ' - ' + this.titleSuffix);
      } else {
        this.title.setTitle(this.titleSuffix);
      }
    }
  }
}
