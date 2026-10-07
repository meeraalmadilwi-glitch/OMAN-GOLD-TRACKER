import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  // 'dark' or 'light'
  isDarkMode = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('gold_theme');
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === 'dark');
      } else {
        // No saved choice yet: start with the light theme
        this.isDarkMode.set(false);
      }

      this.applyTheme(this.isDarkMode());

      effect(() => {
        const dark = this.isDarkMode();
        this.applyTheme(dark);
        localStorage.setItem('gold_theme', dark ? 'dark' : 'light');
      });
    }
  }

  toggleTheme() {
    this.isDarkMode.update((current) => !current);
  }

  private applyTheme(dark: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      if (dark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    }
  }
}
