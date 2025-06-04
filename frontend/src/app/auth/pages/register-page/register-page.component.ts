import { Component, computed, inject, Renderer2, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Router, RouterLink } from '@angular/router';
import { FormUtils } from '../../../utils/form-utils';
import { commonDatalist } from '../../../utils/datalist-options';

@Component({
    selector: 'app-register-page',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
    
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    activeTab = signal<'alumnos' | 'empresas'>('alumnos');
    formUtils = FormUtils;

    // Formulario del alumno
    alumnoForm = this.fb.group({
        nif: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
        password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
        confirm_password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
        nombre: ['', [Validators.required, FormUtils.notBlank]],
        apellidos: ['', [Validators.required, FormUtils.notBlank]],
        telefono: ['', [Validators.required, Validators.pattern(FormUtils.phonePattern)]],
        ciclos_formativos: this.fb.array<FormControl<string>>([], Validators.required),
        tecnologias: this.fb.array<FormControl<string>>([], Validators.required),
        idiomas: this.fb.array<FormControl<string>>([], Validators.required),
        cv: ['']
    }, {
        validators: FormUtils.passwordMatchValidatorFn('password', 'confirm_password')
    });

    alumnoFieldKeys = Object.keys(this.alumnoForm.controls);

    alumnoLabels: Record<string, string> = {
        nif: 'NIF',
        email: 'Email',
        password: 'Contraseña',
        confirm_password: 'Confirmar contraseña',
        nombre: 'Nombre',
        apellidos: 'Apellidos',
        telefono: 'Teléfono',
        ciclos_formativos: 'Ciclos Formativos',
        tecnologias: 'Tecnologías',
        idiomas: 'Idiomas',
        cv: 'CV',
    };

    alumnoDatalistLabels = commonDatalist;

    // Formulario de la empresa
    empresaForm = this.fb.group({
        cif: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
        password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
        confirm_password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
        nombre: ['', [Validators.required, FormUtils.notBlank]],
        razon_social: ['', [Validators.required, FormUtils.notBlank]],
        direccion_fiscal: ['', [Validators.required, FormUtils.notBlank]],
        persona_contacto: ['', [Validators.required, FormUtils.notBlank]],
        telefono: ['', [Validators.required, Validators.pattern(FormUtils.phonePattern)]],
        descripcion: ['', [Validators.required, FormUtils.notBlank]]
    }, {
        validators: FormUtils.passwordMatchValidatorFn('password', 'confirm_password')
    });

    empresaFieldKeys = Object.keys(this.empresaForm.controls);

    empresaLabels: Record<string, string> = {
        cif: 'CIF',
        email: 'Email',
        password: 'Contraseña',
        confirm_password: 'Confirmar contraseña',
        nombre: 'Nombre',
        razon_social: 'Razón Social',
        direccion_fiscal: 'Dirección Fiscal',
        persona_contacto: 'Persona de Contacto',
        telefono: 'Teléfono',
        descripcion: 'Descripción',
    };

    currentForm = computed(() => this.activeTab() === 'alumnos' ? this.alumnoForm : this.empresaForm);

    addElement(key: string, value: string) {
        const formArray = this.alumnoForm.get(key) as FormArray;
        const existingValues = formArray.value as string[];

        if (existingValues.includes(value.trim())) {
            this.messageService.showMessage({ text: 'Valor ya añadido', type: 'error' });
            return;
        }

        if (!this.alumnoDatalistLabels[key].includes(value.trim())) {
            this.messageService.showMessage({ text: 'Valor no admitido', type: 'error' });
            return;
        }

        formArray.push(new FormControl(value));
    }

    getElementList(key: string): FormArray {
        return this.alumnoForm.get(key) as FormArray;
    }

    removeElement(key: string, index: number) {
        this.getElementList(key).removeAt(index);
    }

    submit() {
        const type = this.activeTab();
        const form = this.currentForm();

        if (form.errors?.['passwordMismatch']) {
            this.messageService.showMessage({ text: 'Las contraseñas no coinciden', type: 'error' });
            return;
        }

        if (form.invalid) {
            form.markAllAsTouched();
            this.messageService.showMessage({ text: 'Por favor, revise los datos', type: 'error' });
            return;
        }

        this.authService.register(type, form.value).subscribe({
            next: (response) => {
                if (response.success) {
                    this.messageService.showMessage({ text: '¡Usuario registrado con éxito!', type: 'success' });
                    this.router.navigateByUrl('/iniciar-sesion');
                } else {
                    this.messageService.showMessage({ text: 'Error al hacer el registro. Revise los datos', type: 'error' });
                }
            },
            error: (error) => {
                console.log(error);
                this.messageService.showMessage({ text: 'Error al hacer el registro. Revise los datos', type: 'error' });
            }
        });
    }

}
