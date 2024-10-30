import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customs',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './customs.component.html',
  styleUrl: './customs.component.scss',
})
export class CustomsComponent {}
