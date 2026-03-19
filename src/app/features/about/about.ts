import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
 
interface Experience {
  period:   string;
  role:     string;
  company:  string;
  desc:     string;
  current:  boolean;
}
 
interface Skill {
  name: string;
}
 
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  readonly skills: Skill[] = [
    { name: 'Angular + SSR' },    { name: 'Node.js + Express' },
    { name: 'TypeScript' },       { name: 'PostgreSQL / MySQL' },
    { name: 'Bootstrap 5' },      { name: 'Angular Material' },
    { name: 'REST API Design' },  { name: 'Git + GitHub' },
    { name: 'Elicitación Requerimientos' },{ name: 'UML / Diagramas' },
  ];
 
  readonly experiences: Experience[] = [
    {
      period:  '2024 — presente',
      role:    'Desarrollador Web Fullstack',
      company: 'Freelance · Barranquilla, CO',
      desc:    'Desarrollo de aplicaciones web modernas con Angular SSR, Node.js y bases de datos relacionales. gestión de requisitos de software.',
      current: true,
    },
  ];
}