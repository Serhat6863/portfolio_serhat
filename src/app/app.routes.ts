import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/hero/hero').then(m => m.Hero),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About),
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills').then(m => m.Skills),
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then(m => m.Projects),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
