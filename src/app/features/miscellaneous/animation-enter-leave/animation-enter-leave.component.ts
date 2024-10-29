import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MatButtonModule } from '@angular/material/button';
import { PageMenuEnterLeaveComponent } from '../animation-base/page-menu/page-menu-enter-leave.component';
import { PageContentEnterLeaveComponent } from '../animation-base/page-content/page-content-enter-leave.component';

@Component({
  selector: 'app-animation-enter-leave',
  standalone: true,
  imports: [
    PageContentEnterLeaveComponent,
    PageMenuEnterLeaveComponent,
    MatButtonModule,
  ],
  templateUrl: './animation-enter-leave.component.html',
  styleUrl: './animation-enter-leave.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ transform: 'translate(120%)' }),
        animate('1s ease-in', style({ transform: 'translate(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translate(0%)' }),
        animate('1s ease-in', style({ transform: 'translate(120%)' })),
      ]),
    ]),
  ],
})
export class AnimationEnterLeaveComponent {
  menuOpen = false;
}
