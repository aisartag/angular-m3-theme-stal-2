import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-content-intro',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './page-content-intro.component.html',
  styleUrl: './page-content-intro.component.scss',
})
export class PageContentIntroComponent {
  menuClick = output<void>();
}
