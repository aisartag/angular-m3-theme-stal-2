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

  // miscellaneous
  {
    path: 'buttons',
    loadComponent: () =>
      import('./features/miscellaneous/buttons/buttons.component').then(
        (c) => c.ButtonsComponent
      ),
  },
  {
    path: 'animation-base',
    loadComponent: () =>
      import(
        './features/miscellaneous/animation-base/animation-base.component'
      ).then((c) => c.AnimationBaseComponent),
  },

  {
    path: 'animation-enter-leave',
    loadComponent: () =>
      import(
        './features/miscellaneous/animation-enter-leave/animation-enter-leave.component'
      ).then((c) => c.AnimationEnterLeaveComponent),
  },

  {
    path: 'animation-intro',
    loadComponent: () =>
      import(
        './features/miscellaneous/animation-intro/animation-intro.component'
      ).then((c) => c.AnimationIntroComponent),
  },

  { path: '**', component: NotFoundComponent },
];
