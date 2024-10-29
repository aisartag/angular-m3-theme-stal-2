import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-menu-intro',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './page-menu-intro.component.html',
  styleUrl: './page-menu-intro.component.scss',
})
export class PageMenuIntroComponent {
  close = output<void>();
}
