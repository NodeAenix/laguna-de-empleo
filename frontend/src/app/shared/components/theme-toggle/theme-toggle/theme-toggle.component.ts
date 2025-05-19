import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'theme-toggle-button',
    imports: [],
    templateUrl: './theme-toggle.component.html',
    styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent implements OnInit {
    
    isDarkMode = false;
    private renderer = inject(Renderer2);

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }

    ngOnInit(): void {
        if (this.isBrowser()) {
            const theme = localStorage.getItem('theme') || 'light';
            if (theme === 'dark') {
                this.renderer.addClass(document.body, 'theme-dark');
                this.isDarkMode = true;
            }
        }
    }

    toggleTheme() {
        if (this.isBrowser()) {
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
            if (this.isDarkMode) {
                this.renderer.addClass(document.body, 'theme-dark');
            } else {
                this.renderer.removeClass(document.body, 'theme-dark');
            }
        }
    }

}
