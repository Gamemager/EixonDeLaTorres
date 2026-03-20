import {
  Component, AfterViewInit, OnDestroy,
  Inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  private isBrowser: boolean;
  private dot:  HTMLDivElement | null = null;
  private ring: HTMLDivElement | null = null;
  private moveHandler?: (e: MouseEvent) => void;
  private rafId = 0;
 
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
 
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;  // ← guarda SOLO aquí
    setTimeout(() => this.initCursor(), 0);
  }
 
  private initCursor(): void {
    // Guarda adicional dentro del setTimeout por si acaso
    if (typeof document === 'undefined') return;
 
    this.dot = this.makeEl('eixon-dot', {
      width: '10px', height: '10px',
      background: '#00ffc8', borderRadius: '50%',
      zIndex: '99999', mixBlendMode: 'difference',
    });
 
    this.ring = this.makeEl('eixon-ring', {
      width: '32px', height: '32px',
      border: '1.5px solid #00ffc8', borderRadius: '50%',
      opacity: '0.55', zIndex: '99998',
      transition: 'transform 0.18s ease',
    });
 
    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);
 
    this.moveHandler = (e: MouseEvent) => {
      cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        const x = e.clientX + 'px';
        const y = e.clientY + 'px';
        if (this.dot)  { this.dot.style.left  = x; this.dot.style.top  = y; }
        if (this.ring) { this.ring.style.left = x; this.ring.style.top = y; }
      });
    };
 
    document.addEventListener('mousemove', this.moveHandler);
    document.addEventListener('mouseover', this.onOver);
    document.addEventListener('mouseout',  this.onOut);
  }
 
  private onOver = (e: MouseEvent): void => {
    if (!(e.target as HTMLElement).closest('a, button, [role="button"]')) return;
    if (this.dot)  this.dot.style.transform  = 'translate(-50%,-50%) scale(2.2)';
    if (this.ring) this.ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
  };
 
  private onOut = (e: MouseEvent): void => {
    if (!(e.target as HTMLElement).closest('a, button, [role="button"]')) return;
    if (this.dot)  this.dot.style.transform  = 'translate(-50%,-50%) scale(1)';
    if (this.ring) this.ring.style.transform = 'translate(-50%,-50%) scale(1)';
  };
 
  private makeEl(id: string, extra: Partial<CSSStyleDeclaration>): HTMLDivElement {
    document.getElementById(id)?.remove();
    const el = document.createElement('div');
    el.id = id;
    Object.assign(el.style, {
      position: 'fixed', top: '0', left: '0',
      pointerEvents: 'none', transform: 'translate(-50%,-50%)',
      willChange: 'left, top', ...extra,
    });
    return el;
  }
 
  ngOnDestroy(): void {
    // Guarda en ngOnDestroy — también se ejecuta en SSR
    if (!this.isBrowser || typeof document === 'undefined') return;
    if (this.moveHandler) document.removeEventListener('mousemove', this.moveHandler);
    document.removeEventListener('mouseover', this.onOver);
    document.removeEventListener('mouseout',  this.onOut);
    cancelAnimationFrame(this.rafId);
    this.dot?.remove();
    this.ring?.remove();
  }
}