import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
 
interface Resource {
  icon:     string;
  title:    string;
  desc:     string;
  cta:      string;
  href:     string;
  external: boolean;
  primary:  boolean;
}
 
@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [NgFor],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
})
export class ResourcesComponent {
  readonly resources: Resource[] = [
    {
      icon:     '↓',
      title:    'Currículum Vitae',
      desc:     'Descarga mi CV actualizado con experiencia, habilidades técnicas y proyectos destacados en formato PDF.',
      cta:      'Descargar CV',
      href:     '/assets/cv-eixon-de-la-torres.pdf',
      external: false,
      primary:  true,
    },
    {
      icon:     'in',
      title:    'LinkedIn',
      desc:     'Conéctate conmigo profesionalmente y revisa mi trayectoria, recomendaciones y actividad reciente.',
      cta:      'Ver perfil →',
      href:     'https://www.linkedin.com/in/eixondelatorres',
      external: true,
      primary:  false,
    },
    {
      icon:     '</>',
      title:    'GitHub',
      desc:     'Explora mi código, contribuciones open source y proyectos personales en mi repositorio público.',
      cta:      'Ver GitHub →',
      href:     'https://github.com/gamemager',
      external: true,
      primary:  false,
    },
  ];
}