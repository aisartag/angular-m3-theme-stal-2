import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { ColorsSurfaceInverseComponent } from './colors-surface-inverse/colors-surface-inverse.component';

export interface RoleColor {
  name: string;
  background: string;
  color: string;
}

export interface GroupRole {
  id: number;
  roleColors: RoleColor[];
}

@Component({
  selector: 'app-color-roles',
  standalone: true,
  imports: [MatGridListModule, TitleCasePipe, ColorsSurfaceInverseComponent],
  templateUrl: './color-roles.component.html',
  styleUrl: './color-roles.component.scss',
})
export class ColorRolesComponent {
  groupRoles: GroupRole[] = [
    {
      id: 1,

      roleColors: [
        {
          name: 'primary',
          background: 'var(--sys-primary)',
          color: 'var(--sys-on-primary)',
        },
      ],
    },
    {
      id: 2,

      roleColors: [
        {
          name: 'secondary',
          background: 'var(--sys-secondary)',
          color: 'var(--sys-on-secondary)',
        },
      ],
    },

    {
      id: 3,

      roleColors: [
        {
          name: 'tertiary',
          background: 'var(--sys-tertiary)',
          color: 'var(--sys-on-tertiary)',
        },
      ],
    },

    {
      id: 4,

      roleColors: [
        {
          name: 'error',
          background: 'var(--sys-error)',
          color: 'var(--sys-on-error)',
        },
      ],
    },

    // containers
    {
      id: 5,

      roleColors: [
        {
          name: 'primary-container',
          background: 'var(--sys-primary-container)',
          color: 'var(--sys-on-primary-container)',
        },
      ],
    },

    {
      id: 6,

      roleColors: [
        {
          name: 'secondary-container',
          background: 'var(--sys-secondary-container)',
          color: 'var(--sys-on-secondary-container)',
        },
      ],
    },

    {
      id: 7,

      roleColors: [
        {
          name: 'tertiary-container',
          background: 'var(--sys-tertiary-container)',
          color: 'var(--sys-on-tertiary-container)',
        },
      ],
    },

    {
      id: 8,

      roleColors: [
        {
          name: 'error-container',
          background: 'var(--sys-error-container)',
          color: 'var(--sys-on-error-container)',
        },
      ],
    },

    {
      id: 9,

      roleColors: [
        {
          name: 'primary-fixed',
          background: 'var(--sys-primary-fixed)',
          color: 'var(--sys-on-primary-fixed)',
        },
        {
          name: 'primary-fixed-dim',
          background: 'var(--sys-primary-fixed-dim)',
          color: 'var(--sys-on-primary-fixed-variant)',
        },
      ],
    },

    {
      id: 10,

      roleColors: [
        {
          name: 'secondary-fixed',
          background: 'var(--sys-secondary-fixed)',
          color: 'var(--sys-on-secondary-fixed)',
        },
        {
          name: 'secondary-fixed-dim',
          background: 'var(--sys-secondary-fixed-dim)',
          color: 'var(--sys-on-secondary-fixed-variant)',
        },
      ],
    },

    {
      id: 11,

      roleColors: [
        {
          name: 'tertiary-fixed',
          background: 'var(--sys-tertiary-fixed)',
          color: 'var(--sys-on-tertiary-fixed)',
        },
        {
          name: 'tertiary-fixed-dim',
          background: 'var(--sys-tertiary-fixed-dim)',
          color: 'var(--sys-on-tertiary-fixed-variant)',
        },
      ],
    },
  ];
}
