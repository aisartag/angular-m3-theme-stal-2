import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

interface AppEnv {
  name: string;
  version: string;
}

export const APP_ENV = new InjectionToken<AppEnv>('app.env');

export const provideAppEnv = () => ({
  provide: APP_ENV,
  useFactory: () => environment,
});
