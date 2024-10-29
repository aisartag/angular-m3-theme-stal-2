import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './page-menu.component.html',
  styleUrl: './page-menu.component.scss',
})
export class PageMenuComponent {
  close = output<void>();
}
