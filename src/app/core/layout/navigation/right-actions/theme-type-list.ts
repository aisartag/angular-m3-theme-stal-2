import { ThemeType } from '../../../services/theme-manager.service';

export interface ThemeView {
  value: ThemeType;
  icon: string;
}

export const THEME_VIEW_LIST: ThemeView[] = [
  { value: 'light', icon: 'light_mode' },
  { value: 'dark', icon: 'dark_mode' },
  { value: 'system', icon: 'monitor' },
];
