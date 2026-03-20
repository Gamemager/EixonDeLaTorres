import {
  Component, OnInit, OnDestroy,
  Inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private isBrowser: boolean;
  private typeInterval?: ReturnType<typeof setTimeout>;
 
  readonly stack = [
    'Angular 20+ SSR', 'Node.js', 'TypeScript', 'PostgreSQL',
    'Express.js', 'Bootstrap', 'Angular Material', 'REST API',
  ];
 
  readonly stats = [
    { num: '5+', label: 'Proyectos'   },
    { num: '3+', label: 'Tecnologías' },
    { num: '∞',  label: 'Compromiso'  },
  ];
 
  private readonly codeLines = [
    '// desarrollador.ts',
    'const dev = {',
    '  nombre: "Eixon De la Torres",',
    '  rol: "Fullstack Developer",',
    '  stack: ["Angular","Node.js","PostgreSQL"],',
    '  disponible: true,',
    '  elite: "Elicitor certificado"',
    '}',
    '',
    '// Listo para construir contigo',
    'dev.iniciarProyecto() ▌',
  ];
 
  displayedLines: string[] = [];
 
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
 
  ngOnInit(): void {
    if (this.isBrowser) {
      // Navegador: efecto typewriter animado
      this.startTyping();
    } else {
      // SSR/prerendering: mostrar todas las líneas de inmediato
      this.displayedLines = [...this.codeLines];
    }
  }
 
  private startTyping(): void {
    let lineIdx = 0;
    const addLine = () => {
      if (lineIdx < this.codeLines.length) {
        this.displayedLines = [...this.codeLines.slice(0, lineIdx + 1)];
        lineIdx++;
        this.typeInterval = setTimeout(addLine, 120);
      }
    };
    this.typeInterval = setTimeout(addLine, 400);
  }
 
  ngOnDestroy(): void {
    if (this.typeInterval) clearTimeout(this.typeInterval);
  }
}