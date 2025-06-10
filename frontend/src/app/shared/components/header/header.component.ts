import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    
    @ViewChild('cbResponsiveNavbar')
    cbResponsiveNavbar!: ElementRef; // checkbox (oculto) de la barra de navegación lateral

    authService = inject(AuthService);
    userId = signal<string>('');
    type = signal<'alumno' | 'empresa' | null>(null);

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userId.set(user?._id ?? '');
                this.type.set(this.authService.getUserType(user));
            }
        });
    }

    // Animar barras del botón de la barra lateral (se aplica cuando la pantalla es pequeña)
    animateBars(div: HTMLDivElement) {
        div.classList.toggle('anim-bar');
        const checkbox = this.cbResponsiveNavbar.nativeElement as HTMLInputElement;
        checkbox.checked = !checkbox.checked;
    }

}
