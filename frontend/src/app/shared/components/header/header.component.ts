import { Component, computed, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    
    @ViewChild('cbResponsiveNavbar')
    cbResponsiveNavbar!: ElementRef; // checkbox (oculto) de la barra de navegación lateral

    authService = inject(AuthService);
    userId = computed(() => this.authService.user()?._id);

    // Animar barras del botón de la barra lateral (se aplica cuando la pantalla es pequeña)
    animateBars(div: HTMLDivElement) {
        div.classList.toggle('anim-bar');
        const checkbox = this.cbResponsiveNavbar.nativeElement as HTMLInputElement;
        checkbox.checked = !checkbox.checked;
    }

}
