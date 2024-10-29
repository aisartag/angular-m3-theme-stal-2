import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-density-scale',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './density-scale.component.html',
  styleUrl: './density-scale.component.scss',
})
export class DensityScaleComponent {
  changeFlatButtonFontSize(ev: Event) {
    const size = (ev.target as HTMLInputElement).value ?? '14';
    const targetElement = document.documentElement;
    targetElement.style.setProperty('--sys-label-large-size', size + 'px');
  }

  changeHeadingFontSize(ev: Event) {
    const size = (ev.target as HTMLInputElement).value ?? '56.992';

    const targetElement = document.documentElement;
    targetElement.style.setProperty('--sys-display-large-size', size + 'px');

    // setting the line-height relationally
    targetElement.style.setProperty('--sys-display-large-line-height', '1.25');

    // <h1> (and display-large) uses --sys-display-large, hence we also need to update that variable to see the changes
    targetElement.style.setProperty(
      '--sys-display-large',
      '400 var(--sys-display-large-size) / var(--sys-display-large-line-height) Roboto, sans-serif'
    );
  }
}
