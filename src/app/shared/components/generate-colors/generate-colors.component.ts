import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from '@material/material-color-utilities';
import { APP_ENV } from '../../../app.env';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-generate-colors',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './generate-colors.component.html',
  styleUrl: './generate-colors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateColorsComponent {
  picker = viewChild<ElementRef<HTMLInputElement>>('colorPickerInput');
  color = input.required<string>();
  changeColor = output<string>();
  reset = output<void>();
  saveColor = output<string>();

  constructor() {
    effect(() => {
      console.log(this.picker()?.nativeElement.value);
      console.log('----------------------------', this.color());
    });
  }

  changeTheme(ev: Event) {
    const inputElement = ev.target as HTMLInputElement;

    // this.color = inputElement.value;
    this.changeColor.emit(inputElement.value);
  }

  undo() {
    this.reset.emit();
  }

  save() {
    const value = this.picker()?.nativeElement.value;
    if (value) {
      this.saveColor.emit(value);
    }
  }
}
