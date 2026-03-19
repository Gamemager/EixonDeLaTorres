import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
 
interface Project {
  num:   string;
  title: string;
  desc:  string;
  tags:  string[];
  repo?: string;
  live?: string;
  featured: boolean;
}
 
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  readonly projects: Project[] = [
    {
      num: '001',
      title: 'Portfolio + ELITE',
      desc:  'Sitio personal con módulo de elicitación de requisitos avanzado y Angular SSR para SEO optimizado.',
      tags:  ['Angular', 'SSR', 'Node.js', 'PostgreSQL', 'Express'],
      featured: true,
    },
    {
      num: '002',
      title: 'API REST Escalable',
      desc:  'Backend modular con autenticación JWT, documentación Swagger, manejo de errores y tests con Jest.',
      tags:  ['Node.js', 'Express', 'JWT', 'Swagger', 'Jest'],
      featured: false,
    },
    {
      num: '003',
      title: 'Dashboard Analytics',
      desc:  'Panel de control con visualización de datos en tiempo real, gráficas interactivas y exportación a PDF.',
      tags:  ['Angular', 'Material', 'Charts.js', 'PostgreSQL'],
      featured: false,
    },
  ];
}