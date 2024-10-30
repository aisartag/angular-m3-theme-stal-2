import { OverlayModule } from '@angular/cdk/overlay';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { chageSeedAnimations } from './change-seed-animations';
import { Subject } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { ThemeManager } from '../../../core/services/theme-manager.service';
import { GenerateColorsComponent } from '../generate-colors/generate-colors.component';
import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from '@material/material-color-utilities';
import { APP_ENV } from '../../../app.env';

@Component({
  selector: 'app-change-seed',
  standalone: true,
  imports: [
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    GenerateColorsComponent,
  ],
  templateUrl: './change-seed.component.html',
  styleUrl: './change-seed.component.scss',
  animations: [chageSeedAnimations.transformChangeSeed],
})
export class ChangeSeedComponent {
  readonly theme = inject(ThemeManager);
  colorEnvironment = inject(APP_ENV).themeSeed;
  currentColor!: string | null;

  constructor() {
    effect(() => {
      console.log(
        '*******************************',
        this.theme.isDark(),
        this.theme.getSeed() == this.currentColor
      );

      this.generateDynamicTheme(this.theme.getSeed(), this.theme.isDark());
    });
  }

  getCurrentColor() {
    return this.currentColor ? this.currentColor : this.theme.getSeed();
  }

  colorChanged(color: string) {
    this.currentColor = color;
    this.generateDynamicTheme(color, this.theme.isDark());
  }

  saveColor(color: string) {
    this.theme.changSeed(color);
    this.currentColor = null;
  }

  reset() {
    console.log('reset color theme.seed', this.theme.getSeed());
    this.currentColor = null;
  }

  generateDynamicTheme(color: string, isDark?: boolean) {
    let argb;
    try {
      argb = argbFromHex(color);
    } catch (error) {
      // falling to default color if it's invalid color
      console.log('+++++++++++++++++++++++++++++++++++', error);
      argb = argbFromHex(this.colorEnvironment);
    }

    const targetElement = document.documentElement; // html tag

    // Get the theme from a hex color
    const theme = themeFromSourceColor(argb);

    // Apply theme to root element
    applyTheme(theme, {
      target: targetElement,
      dark: isDark,
      brightnessSuffix: true,
    });

    // Print out the theme as JSON
    // this.#logger.debug(JSON.stringify(theme, null, 2));

    const styles = targetElement.style;

    for (const key in styles) {
      if (Object.hasOwn(styles, key)) {
        const propName = styles[key];
        // this.#logger.debug(propName);

        // color utilities generate variables with --md-sys- prefix, we need to change it to --sys
        if (propName.indexOf('--md-sys') === 0) {
          const sysPropName = '--sys' + propName.replace('--md-sys-color', '');
          // this.#logger.debug(sysPropName);
          targetElement.style.setProperty(
            sysPropName,
            targetElement.style.getPropertyValue(propName)
          );
        }
      }
    }
  }

  // @HostBinding('@enterLeaveAnimation') animate = true;
  isOpen = false;

  /** Current state of the panel animation. */
  _panelAnimationState: 'void' | 'enter' = 'void';

  /** Starts the enter animation. */
  _startAnimation() {
    // @breaking-change 8.0.0 Combine with _resetAnimation.
    this._panelAnimationState = 'enter';
  }

  /** Resets the panel animation to its initial state. */
  _resetAnimation() {
    // @breaking-change 8.0.0 Combine with _startAnimation.
    this._panelAnimationState = 'void';
  }

  _isAnimating!: boolean;

  /** Emits whenever an animation on the menu completes. */
  readonly _animationDone = new Subject<AnimationEvent>();

  /** Callback that is invoked when the panel animation completes. */
  _onAnimationDone(event: AnimationEvent) {
    console.log(' _onAnimationDone', event);
    this._animationDone.next(event);
    this._isAnimating = false;
  }

  _onAnimationStart(event: AnimationEvent) {
    console.log(' _onAnimationStart', event);
    this._isAnimating = true;

    // Scroll the content element to the top as soon as the animation starts. This is necessary,
    // because we move focus to the first item while it's still being animated, which can throw
    // the browser off when it determines the scroll position. Alternatively we can move focus
    // when the animation is done, however moving focus asynchronously will interrupt screen
    // readers which are in the process of reading out the menu already. We take the `element`
    // from the `event` since we can't use a `ViewChild` to access the pane.
    // if (event.toState === 'enter' && this._keyManager.activeItemIndex === 0) {
    //   event.element.scrollTop = 0;
    // }
  }
}
