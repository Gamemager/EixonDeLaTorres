import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-logo">EDT</div>
 
        <p class="footer-copy">
          © {{ year }} Eixon De la Torres &mdash; Barranquilla, CO
        </p>
 
        <ul class="footer-links">
          <li><a href="https://github.com/gamemager" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/eixondelatorres" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a routerLink="/elite">ELITE</a></li>
        </ul>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      border-top: 1px solid var(--border);
      background: var(--bg);
      padding: 32px 40px;
    }
    .footer-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }
    .footer-logo {
      font-family: var(--font-display);
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--text);
    }
    .footer-copy {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-muted);
      letter-spacing: 0.04em;
    }
    .footer-links {
      display: flex;
      gap: 24px;
      list-style: none;
    }
    .footer-links a {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-muted);
      letter-spacing: 0.05em;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--accent); }
  `],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}