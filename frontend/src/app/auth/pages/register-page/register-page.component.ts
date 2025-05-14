import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-register-page',
    imports: [ReactiveFormsModule],
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
    
    private fb = inject(FormBuilder);

    activeTab = signal<'empresa' | 'alumno'>('alumno');

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

    currentForm = computed(() => this.activeTab() === 'empresa' ? this.empresaForm : this.alumnoForm);

    submit() {
        if (this.currentForm().invalid) {
            this.currentForm().markAllAsTouched();
            console.log('invalid');
        }
        console.log('valid!');
    }

}
