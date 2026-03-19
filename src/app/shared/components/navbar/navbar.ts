import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit {
  scrolled = signal(false);
  menuOpen = signal(false);
 
  readonly navLinks = [
    { label: 'Home',      path: '/'          },
    { label: 'Sobre mí',  path: '/sobre-mi'  },
    { label: 'Proyectos', path: '/proyectos' },
    { label: 'Recursos',  path: '/recursos'  },
  ];
 
  ngOnInit(): void {}
 
  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }
 
  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }
 
  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
 
 
 
 
 