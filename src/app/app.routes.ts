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
    path: 'density-scale',
    loadComponent: () =>
      import('./features/density-scale/density-scale.component').then(
        (c) => c.DensityScaleComponent
      ),
  },

  {
    path: 'customs',
    loadComponent: () =>
      import('./features/customs/customs.component').then(
        (c) => c.CustomsComponent
      ),
  },

  // miscellaneous

  {
    path: 'animation-intro',
    loadComponent: () =>
      import(
        './features/animations/animation-intro/animation-intro.component'
      ).then((c) => c.AnimationIntroComponent),
  },

  { path: '**', component: NotFoundComponent },
];
