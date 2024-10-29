import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-content',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
})
export class PageContentComponent {
  menuClick = output<void>();
}
