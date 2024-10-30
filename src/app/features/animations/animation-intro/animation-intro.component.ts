import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageContentIntroComponent } from './page-content-intro/page-content-intro.component';
import { PageMenuIntroComponent } from './page-menu-intro/page-menu-intro.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-animation-intro',
  standalone: true,
  imports: [MatCardModule, PageContentIntroComponent, PageMenuIntroComponent],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ width: '0px', height: '0px', opacity: 0 }),
        animate(
          '1s ease-in',
          style({ width: '240px', height: '100%', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ width: '240px', height: '100%', opacity: 1 }),
        animate(
          '0.2s ease-out',
          style({ width: '0px', height: '0px', opacity: 0 })
        ),
      ]),
    ]),
  ],
  templateUrl: './animation-intro.component.html',
  styleUrl: './animation-intro.component.scss',
})
export class AnimationIntroComponent {
  // :enter :leave si sostityusce con menuOpen
  // menuState: 'closed' | 'open' = 'closed';
  menuOpen = false;
}

/**
 * PROVA 1
 * 
 * Funziona ma problematica translate visibile fuori content
 * 
 *  animations: [
    trigger('openClose', [
      state('closed', style({ transform: 'translateX(150%)', opacity: 0 })),
      state('open', style({ transform: 'translateX(0%)', opacity: 1 })),
      transition('closed <=> open', [animate('1s ease-in')]),
    ]),
  ],
 *  
 */

/**
   * PROVA 2
   * 
   *animations: [
    trigger('openClose', [
      state('closed', style({ width: '0px', height: '0px', opacity: 0 })),
      state('open', style({ width: '240px', height: '100%', opacity: 1 })),
      transition('closed <=> open', [animate('.7s ease-in')]),
    ]),
  ], 
   * 
   */

/**
   *  PROVA 3 da stato qualsiasi
   animations: [
    trigger('openClose', [
      state('closed', style({ width: '0px', height: '0px', opacity: 0 })),
      state('open', style({ width: '240px', height: '100%', opacity: 1 })),
      transition('* <=> open', [animate('1s ease-in')]),
      transition('* <=> closed', [animate('0.2s ease-out')]),
    ]),
  ],
   * 
   */
