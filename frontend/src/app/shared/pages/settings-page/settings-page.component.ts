import { Component, inject, OnInit, Renderer2, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Alumno } from '../../../interfaces/alumno.interface';
import { Empresa } from '../../../interfaces/empresa.interface';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings-page',
    imports: [],
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent implements OnInit {
    
    private renderer = inject(Renderer2);
    private authService = inject(AuthService);
    private fb = inject(FormBuilder);
    private router = inject(Router);

    isDarkMode = false;
    currentUser = signal<Alumno | Empresa | null>(null);
    userType = signal<'alumno' | 'empresa' | null>(null);

    // Formulario del alumno
    alumnoForm = this.fb.group({
        nif: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: [0, Validators.required],
        ciclos_formativos: this.fb.array<FormControl<string>>([], Validators.required),
        tecnologias: this.fb.array<FormControl<string>>([], Validators.required),
        idiomas: this.fb.array<FormControl<string>>([], Validators.required)
    });

    // Formulario de la empresa
    empresaForm = this.fb.group({
        cif: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        nombre: ['', Validators.required],
        razon_social: ['', Validators.required],
        direccion_fiscal: ['', Validators.required],
        persona_contacto: ['', Validators.required],
        telefono: ['', Validators.required],
        descripcion: ['', Validators.required]
    });

    ngOnInit(): void {
        if (this.isBrowser()) {
            const theme = localStorage.getItem('theme') || 'light';
            if (theme === 'dark') {
                this.renderer.addClass(document.body, 'theme-dark');
                this.isDarkMode = true;
            }
        }
        
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userType.set(this.authService.getUserType(user));
                if (this.userType() === 'alumno') {
                    this.currentUser.set(user as Alumno);
                    this.alumnoForm.patchValue(user as Alumno);
                } else if (this.userType() === 'empresa') {
                    this.currentUser.set(user as Empresa);

                }
            }
        });
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

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('iniciar-sesion');
    }
    
    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }
    
}
