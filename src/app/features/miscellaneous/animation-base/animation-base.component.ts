import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PageContentComponent } from './page-content/page-content.component';
import { PageMenuComponent } from './page-menu/page-menu.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-animation-base',
  standalone: true,
  imports: [PageContentComponent, PageMenuComponent, MatButtonModule],
  templateUrl: './animation-base.component.html',
  styleUrl: './animation-base.component.scss',
  animations: [
    trigger('openClose', [
      state('closed', style({ transform: 'translate(120%' })),
      state('open', style({ transform: 'translate(0%' })),
      transition('closed <=> open', [animate('1s ease-in')]),
    ]),
  ],
})
export class AnimationBaseComponent {
  protected menuState: 'open' | 'closed' = 'closed';
}
