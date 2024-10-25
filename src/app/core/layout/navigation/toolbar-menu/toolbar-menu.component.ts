import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

export interface Link {
  routerLink: string;
  title: string;
}

@Component({
  selector: 'app-toolbar-menu',
  standalone: true,
  imports: [RouterLink, MatListModule],
  templateUrl: './toolbar-menu.component.html',
  styleUrl: './toolbar-menu.component.scss',
})
export class ToolbarMenuComponent {
  links: Link[] = [{ routerLink: 'login', title: 'Login' }];
}
