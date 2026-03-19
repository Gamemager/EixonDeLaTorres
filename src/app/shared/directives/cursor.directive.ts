import { Directive, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
 
@Directive({ selector: '[appCursor]', standalone: true })
export class CursorDirective implements OnInit, OnDestroy {
  private dot!: HTMLDivElement;
  private ring!: HTMLDivElement;
  private listeners: (() => void)[] = [];
 
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}
 
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
 
    this.dot  = this.createEl('cursor-dot');
    this.ring = this.createEl('cursor-ring');
    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);
 
    const moveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      this.dot.style.left  = `${e.clientX - 5}px`;
      this.dot.style.top   = `${e.clientY - 5}px`;
      this.ring.style.left = `${e.clientX - 16}px`;
      this.ring.style.top  = `${e.clientY - 16}px`;
    });
 
    this.listeners.push(moveListener);
  }
 
  private createEl(className: string): HTMLDivElement {
    const el = document.createElement('div');
    el.className = className;
    return el;
  }
 
  ngOnDestroy(): void {
    this.listeners.forEach(fn => fn());
    this.dot?.remove();
    this.ring?.remove();
  }
}