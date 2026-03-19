import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.HomeComponent),
    title: 'Eixon De la Torres — Desarrollador Web',
  },
  {
    path: 'sobre-mi',
    loadComponent: () =>
      import('./features/about/about').then(m => m.AboutComponent),
    title: 'Sobre mí — Eixon De la Torres',
  },
  {
    path: 'proyectos',
    loadComponent: () =>
      import('./features/projects/projects').then(m => m.ProjectsComponent),
    title: 'Proyectos — Eixon De la Torres',
  },
  {
    path: 'recursos',
    loadComponent: () =>
      import('./features/resources/resources').then(m => m.ResourcesComponent),
    title: 'Recursos — Eixon De la Torres',
  },
     {
     path: 'elite',
     loadComponent: () =>
       import('./features/elite/elite').then(m => m.EliteComponent),
     title: 'ELITE — Módulo de Elicitación',
   },
  {
    path: '**',
    redirectTo: '',
  },
];