import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-generate-colors',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './generate-colors.component.html',
  styleUrl: './generate-colors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateColorsComponent {
  picker = viewChild<ElementRef<HTMLInputElement>>('colorPickerInput');
  color = input.required<string>();
  changeColor = output<string>();
  undo = output<void>();
  reset = output<void>();
  save = output<string>();

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

  onUndo() {
    this.undo.emit();
  }

  onReset() {
    this.reset.emit();
  }

  onSave() {
    const value = this.picker()?.nativeElement.value;
    if (value) {
      this.save.emit(value);
    }
  }
}
