import { Component, effect, inject, viewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';
import { LogoComponent } from './logo/logo.component';
import { SidenavActionsComponent } from './sidenav-actions/sidenav-actions.component';

import { LoggerService } from '../../services/logger.service';
import { ChangeSeedComponent } from '../../../shared/components/change-seed/change-seed.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    ToolbarActionsComponent,
    LogoComponent,
    SidenavActionsComponent,
    ChangeSeedComponent,
  ],
})
export class NavigationComponent {
  readonly #breakpointObserver = inject(BreakpointObserver);
  readonly #logger = inject(LoggerService);

  drawer = viewChild.required(MatSidenav);

  isSmall$: Observable<boolean> = this.#breakpointObserver
    .observe('(max-width:767.98px)') // Breakpoints.Handset
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor() {
    effect(() => {
      this.#logger.debug(this.drawer().mode);
    });
  }

  closeSidenav() {
    if (this.drawer() && this.drawer().mode === 'over') {
      this.drawer().close();
    }
  }
}
