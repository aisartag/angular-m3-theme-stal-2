import {
  Component,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import {
  argbFromHex,
  Hct,
  rgbaFromArgb,
} from '@material/material-color-utilities';
import { JsonPipe } from '@angular/common';
import { HexColorValidatorDirective } from '../../directives/hexcolor-validator.directive';
import { MatIconModule } from '@angular/material/icon';
import { SeedManagerService } from '../../../core/services/seed-manager.service';
import { LoggerService } from '../../../core/services/logger.service';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface HtcValues {
  hue: number;
  chroma: number;
  tone: number;
}

@Component({
  selector: 'app-seed-tuning',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    JsonPipe,
    HexColorValidatorDirective,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './seed-tuning.component.html',
  styleUrl: './seed-tuning.component.scss',
})
export class SeedTuningComponent {
  readonly seed = inject(SeedManagerService);
  readonly #logger = inject(LoggerService);

  close = output<void>();

  hexValue!: string | null;
  htcValues: HtcValues = { hue: 0, chroma: 0, tone: 0 };
  isHtcVisible = false;

  seedForm = viewChild<NgForm>('seedForm');

  constructor() {
    effect(() => {
      this.loadColor(this.seed.seedColor());
    });
  }

  loadColor(color: string) {
    this.hexValue = color;
    this.#logger.debug('hex', this.hexValue);

    if (this.hexValue && this.isHtcVisible) {
      this.htcValues = this.getHctFromHex(this.hexValue);
      this.#logger.debug(JSON.stringify(this.htcValues, null, 2));
    }

    this.seed.generateThemeFromSeed(this.hexValue);
  }

  toggleHtcVisible() {
    this.#logger.debug('isHtcVisible', this.isHtcVisible);
    this.#logger.debug(
      'hex error: ',
      JSON.stringify(this.seedForm()?.controls['hex'].errors, null, 2)
    );
    this.#logger.debug('hexvalue: ', this.hexValue);
    // se il campo hex è in errore o hexValue non inizializzato
    if (this.seedForm()?.controls['hex'].errors || !this.hexValue) {
      this.#logger.debug('cacatece u cazze');
      return;
    }

    this.isHtcVisible = !this.isHtcVisible;
    if (this.isHtcVisible) {
      if (!this.seedForm()?.controls['hex'].errors && this.hexValue) {
        this.htcValues = this.getHctFromHex(this.hexValue);
      }
    }
  }

  changedHex(value: string) {
    this.#logger.debug('value', value);
    this.#logger.debug(this.seedForm()?.controls['hex'].errors);
    if (!this.seedForm()?.controls['hex'].errors) {
      this.loadColor(value);
    }
  }

  changedHue(value: string) {
    this.#logger.debug('value', value);
    this.htcValues.hue = +value;
    this.loadColor(this.seed.convertHctToRgb(this.htcValues));
  }

  changedChroma(value: string) {
    this.#logger.debug('value', value);
    this.htcValues.chroma = +value;
    this.loadColor(this.seed.convertHctToRgb(this.htcValues));
  }

  changedTone(value: string) {
    this.#logger.debug('value', value);
    this.htcValues.tone = +value;
    this.loadColor(this.seed.convertHctToRgb(this.htcValues));
  }

  changedSliderHue(value: string) {
    this.#logger.debug('hye value', value);
    this.htcValues.hue = +value;
    this.loadColor(this.seed.convertHctToRgb(this.htcValues));
  }

  changedSliderChroma(value: string) {
    this.#logger.debug('chroma value', value);
    this.htcValues.chroma = +value;
    this.loadColor(this.seed.convertHctToRgb(this.htcValues));
  }

  changedSliderTone(value: string) {
    this.#logger.debug('tone value', value);
    this.htcValues.tone = +value;
    this.loadColor(this.seed.convertHctToRgb(this.htcValues));
  }

  private getHctFromHex(hexColor: string): HtcValues {
    const hct = Hct.fromInt(argbFromHex(hexColor));

    return { hue: hct.hue, chroma: hct.chroma, tone: hct.tone };
  }

  onRandomColor() {
    this.loadColor(this.seed.randonSeed());
  }

  onClose() {
    this.close.emit();
  }
  onUndo() {
    this.loadColor(this.seed.seedColor());
  }
  onReset() {
    this.loadColor(this.seed.seedDefault);
  }
  onSave() {
    if (this.hexValue) {
      this.seed.changeSeed(this.hexValue);
    }
  }
}
