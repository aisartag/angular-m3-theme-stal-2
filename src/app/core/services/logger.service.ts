import { Injectable, isDevMode } from '@angular/core';

const VOID_FUNCTION = (..._: any[]) => {};

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log = console.log;
  error = console.error;
  warn = console.warn;
  debug = isDevMode() ? console.debug.bind(console) : VOID_FUNCTION;
}
