import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },

  {
    path: 'palettes',
    loadComponent: () =>
      import('./features/palettes/palettes.component').then(
        (c) => c.PalettesComponent
      ),
  },

  {
    path: 'color-roles',
    loadComponent: () =>
      import('./features/color-roles/color-roles.component').then(
        (c) => c.ColorRolesComponent
      ),
  },

  {
    path: 'dynamic-theme',
    loadComponent: () =>
      import('./features/dynamic-theme/dynamic-theme.component').then(
        (c) => c.DynamicThemeComponent
      ),
  },

  { path: '**', component: NotFoundComponent },
];
