import { OverlayModule } from '@angular/cdk/overlay';
import { Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { seedManagerAnimations } from './seed-manager-animations';
import { Subject } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { ThemeManager } from '../../../core/services/theme-manager.service';

import { MatTooltipModule } from '@angular/material/tooltip';
import { SeedManagerService } from '../../../core/services/seed-manager.service';
import { SeedTuningComponent } from '../seed-tuning/seed-tuning.component';

@Component({
  selector: 'app-seed-manager',
  standalone: true,
  imports: [
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SeedTuningComponent,
  ],
  templateUrl: './seed-manager.component.html',
  styleUrl: './seed-manager.component.scss',
  animations: [seedManagerAnimations.transformSeedManager],
})
export class SeedManagerComponent {
  readonly theme = inject(ThemeManager);
  readonly seed = inject(SeedManagerService);

  currentSeed!: string | null;

  constructor() {
    effect(() => {
      this.currentSeed = this.seed.seedColor();
      this.seed.generateThemeFromSeed();
    });
  }

  updateSeed(seed: string) {
    const prevSeed = this.currentSeed;
    this.currentSeed = seed;
    if (this.currentSeed !== prevSeed) {
      this.seed.generateThemeFromSeed();
    }
  }

  save() {
    if (this.currentSeed) {
      this.seed.changeSeed(this.currentSeed);
    }
  }

  reset() {
    const prevSeed = this.currentSeed;
    this.currentSeed = this.theme.seedDefault;
    if (this.currentSeed !== prevSeed) {
      this.seed.generateThemeFromSeed();
    }
  }

  undo() {
    this.currentSeed = this.seed.seedColor();
  }

  /*********************************************************
   *
   *  Area gestione animation
   *
   ********************************************************/
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
    // this._panelAnimationState = 'void';
  }

  _isAnimating!: boolean;

  /** Emits whenever an animation on the menu completes. */
  readonly _animationDone = new Subject<AnimationEvent>();

  /** Callback that is invoked when the panel animation completes. */
  _onAnimationDone(event: AnimationEvent) {
    // console.log(' _onAnimationDone', event);
    this._animationDone.next(event);
    this._isAnimating = false;
  }

  _onAnimationStart(event: AnimationEvent) {
    // console.log(' _onAnimationStart', event);
    this._isAnimating = true;

    //   // Scroll the content element to the top as soon as the animation starts. This is necessary,
    //   // because we move focus to the first item while it's still being animated, which can throw
    //   // the browser off when it determines the scroll position. Alternatively we can move focus
    //   // when the animation is done, however moving focus asynchronously will interrupt screen
    //   // readers which are in the process of reading out the menu already. We take the `element`
    //   // from the `event` since we can't use a `ViewChild` to access the pane.
    //   // if (event.toState === 'enter' && this._keyManager.activeItemIndex === 0) {
    //   //   event.element.scrollTop = 0;
    //   // }
  }
}
