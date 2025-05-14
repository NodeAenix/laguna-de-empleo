import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register-page',
    imports: [ReactiveFormsModule],
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
    
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    activeTab = signal<'empresas' | 'alumnos'>('alumnos');

    // Formulario del alumno
    alumnoForm = this.fb.group({
        nif: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: ['', Validators.required],
        ciclos_formativos: ['', Validators.required],
        tecnologias: ['', Validators.required],
        idiomas: [''],
        cv: ['']
    });

    alumnoFieldKeys = Object.keys(this.alumnoForm.controls);

    alumnoLabels: Record<string, string> = {
        nif: 'NIF',
        email: 'Email',
        password: 'Contraseña',
        nombre: 'Nombre',
        apellidos: 'Apellidos',
        telefono: 'Teléfono',
        ciclos_formativos: 'Ciclos Formativos',
        tecnologias: 'Tecnologías',
        idiomas: 'Idiomas',
        cv: 'CV',
    };

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

    empresaFieldKeys = Object.keys(this.empresaForm.controls);

    empresaLabels: Record<string, string> = {
        cif: 'CIF',
        email: 'Email',
        password: 'Contraseña',
        nombre: 'Nombre',
        razon_social: 'Razón Social',
        direccion_fiscal: 'Dirección Fiscal',
        persona_contacto: 'Persona de Contacto',
        telefono: 'Teléfono',
        descripcion: 'Descripción',
    };

    currentForm = computed(() => this.activeTab() === 'alumnos' ? this.alumnoForm : this.empresaForm);

    submit() {
        const type = this.activeTab();
        const form = this.currentForm();

        if (form.invalid) {
            form.markAllAsTouched();
            //return;
        }

        this.authService.register(type, form.value).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (error) => {
                console.error('Error al hacer el registro', error);
            }
        });

        console.log('valid!');
    }

}
