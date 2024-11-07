import { Component, effect, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { LoggerService } from '../../../services/logger.service';

export interface Link {
  routerLink: string;
  title: string;
}

@Component({
  selector: 'app-toolbar-menu',
  standalone: true,
  imports: [RouterLink, MatListModule, MatButtonModule],
  templateUrl: './toolbar-menu.component.html',
  styleUrl: './toolbar-menu.component.scss',
})
export class ToolbarMenuComponent {
  readonly #logger = inject(LoggerService);

  links: Link[] = [
    { routerLink: 'login', title: 'Login' },
    { routerLink: 'register', title: 'Register' },
  ];

  vertical = input<boolean>(false);
  close = output<void>();

  constructor() {
    effect(() => {
      this.#logger.debug('is Vertical', this.vertical());
    });
  }
}
