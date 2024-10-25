import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';
import { LogoComponent } from './logo/logo.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

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
    SidebarMenuComponent,
  ],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isSmall$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width:767.98px)') // Breakpoints.Handset
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
