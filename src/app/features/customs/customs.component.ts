import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-customs',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule],
  templateUrl: './customs.component.html',
  styleUrl: './customs.component.scss',
})
export class CustomsComponent {}
