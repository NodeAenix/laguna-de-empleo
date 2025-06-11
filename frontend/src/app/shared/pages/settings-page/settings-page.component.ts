import { Component, computed, ElementRef, inject, OnInit, Renderer2, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Alumno } from '../../../interfaces/alumno.interface';
import { Empresa } from '../../../interfaces/empresa.interface';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from '../../../utils/form-utils';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import { commonDatalist } from '../../../utils/datalist-options';
import { SubidaService } from '../../../services/subida.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-settings-page',
    imports: [ReactiveFormsModule],
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent implements OnInit {

    private renderer = inject(Renderer2);
    private authService = inject(AuthService);
    private userService = inject(UserService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private messageService = inject(MessageService);
    private subidaService = inject(SubidaService);

    isDarkMode = false;
    alumnoUser = signal<Alumno | null>(null);
    empresaUser = signal<Empresa | null>(null);
    userType = signal<'alumno' | 'empresa' | null>(null);
    cvFile = signal<File | null>(null);
    profilePic = signal<File | null>(null);
    imageSrc = computed(() => {
        if (this.profilePic()) {
            return URL.createObjectURL(this.profilePic()!);
        }

        const user = this.alumnoUser() ? this.alumnoUser() : this.empresaUser();
        if (user?.img) {
            return `${environment.baseUrl}/uploads/${user.img}`
        }

        return 'assets/images/profile-picture.jpeg';
    });
    formUtils = FormUtils;

    // Formulario del alumno
    alumnoForm = this.fb.group({
        nif: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
        nombre: ['', [Validators.required, FormUtils.notBlank]],
        apellidos: ['', [Validators.required, FormUtils.notBlank]],
        telefono: [0, [Validators.required, Validators.pattern(FormUtils.phonePattern)]],
        ciclos_formativos: this.fb.array<FormControl<string>>([], Validators.required),
        tecnologias: this.fb.array<FormControl<string>>([], Validators.required),
        idiomas: this.fb.array<FormControl<string>>([], Validators.required),
        cv: ['']
    });

    alumnoFieldKeys = Object.keys(this.alumnoForm.controls);

    alumnoLabels: Record<string, string> = {
        nif: 'NIF',
        email: 'Email',
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
        email: ['', Validators.required],
        nombre: ['', Validators.required],
        razon_social: ['', Validators.required],
        direccion_fiscal: ['', Validators.required],
        persona_contacto: ['', Validators.required],
        telefono: [0, Validators.required],
        descripcion: ['', Validators.required]
    });

    empresaFieldKeys = Object.keys(this.empresaForm.controls);

    empresaLabels: Record<string, string> = {
        cif: 'CIF',
        email: 'Email',
        nombre: 'Nombre',
        razon_social: 'Razón Social',
        direccion_fiscal: 'Dirección Fiscal',
        persona_contacto: 'Persona de Contacto',
        telefono: 'Teléfono',
        descripcion: 'Descripción',
    };

    // Formulario de contraseña
    passwordForm = this.fb.group({
        password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]]
    });

    ngOnInit(): void {
        if (this.isBrowser()) {
            const theme = this.authService.getTheme();
            if (theme === 'dark') {
                this.renderer.addClass(document.body, 'theme-dark');
                this.isDarkMode = true;
            }
        }
        
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userType.set(this.authService.getUserType(user));
                if (this.userType() === 'alumno') {
                    this.alumnoUser.set(user as Alumno);
                    this.alumnoForm.patchValue(user as Alumno);
                    
                    const ciclos_formativos = this.alumnoForm.get('ciclos_formativos') as FormArray;
                    const tecnologias = this.alumnoForm.get('tecnologias') as FormArray;
                    const idiomas = this.alumnoForm.get('idiomas') as FormArray;
                    this.alumnoUser()?.ciclos_formativos.forEach(value => ciclos_formativos.push(this.fb.control(value)));
                    this.alumnoUser()?.tecnologias.forEach(value => tecnologias.push(this.fb.control(value)));
                    this.alumnoUser()?.idiomas.forEach(value => idiomas.push(this.fb.control(value)));
                } else if (this.userType() === 'empresa') {
                    this.empresaUser.set(user as Empresa);
                    this.empresaForm.patchValue(user as Empresa);
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

    onFileSelected(event: Event) {
        const element = event.target as HTMLInputElement;

        if (!element.files || element.files.length === 0) {
            return;
        }

        const file = element.files[0];

        if (file.type !== 'application/pdf') {
            this.messageService.showMessage({ text: 'El archivo CV tiene debe ser PDF', type: 'info' });
            return;
        }

        if (element.files?.length > 1) {
            this.messageService.showMessage({ text: 'Solo se admite un archivo CV', type: 'error' });
            return;
        }

        this.cvFile.set(file);
    }

    // Actualizar foto de perfil
    triggerImgInput(input: HTMLInputElement) {
        input.click();
    }

    handleImgInputChange(input: HTMLInputElement) {
        if (!input.files || input.files.length === 0) {
            return;
        }

        const file = input.files[0];

        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            this.messageService.showMessage({ text: 'Formato de imagen no válido', type: 'info' });
            return;
        }

        if (input.files?.length > 1) {
            this.messageService.showMessage({ text: 'Solo se admite un archivo', type: 'error' });
            return;
        }

        this.profilePic.set(file);
    }

    submit() {
        const type = this.userType();
        const form = type === 'alumno' ? this.alumnoForm : this.empresaForm;
        const password = this.passwordForm.value.password;

        if (form.invalid) {
            form.markAllAsTouched();
            this.messageService.showMessage({ text: 'Por favor, revise los datos', type: 'error' });
            return;
        }

        if (!password || this.passwordForm.invalid) {
            this.messageService.showMessage({ text: 'Comprueba la contraseña', type: 'error' });
            return;
        }

        // Payload FormData
        const formData = new FormData();
        Object.entries(form.value).forEach(([key, value]) => {
            if (key === 'cv') return;

            if (Array.isArray(value)) {
                value.forEach(v => formData.append(key, v));
            } else {
                formData.append(key, value as string);
            }
        });
        formData.append('password', password);

        // Actualizar CV
        if (this.cvFile()) {
            // CV form data
            const cvFormData = new FormData();
            cvFormData.append('pdfFile', this.cvFile()!);
            this.subidaService.subirPDF(cvFormData).subscribe({
                next: () => {},
                error: () => {
                    this.messageService.showMessage({ text: 'Error al subir el CV', type: 'error' });
                }
            });
        }

        // Actualizar imagen
        if (this.profilePic()) {
            // Profile pic form data
            const profilePicFormData = new FormData();
            profilePicFormData.append('imgFile', this.profilePic()!);
            this.subidaService.subirImg(profilePicFormData).subscribe({
                next: () => {},
                error: () => {
                    this.messageService.showMessage({ text: 'Error al subir la imagen', type: 'error' });
                }
            });
        }

        formData.forEach(v => console.log(v));

        // Actualizar datos
        this.userService.updateUser(type === 'alumno' ? 'alumnos' : 'empresas', formData).subscribe({
            next: () => {
                this.messageService.showMessage({ text: 'Datos actualizados con éxito', type: 'success' });
                this.router.navigate(['/perfil', this.userType() === 'alumno' ? this.alumnoUser()?._id : this.empresaUser()?._id]);
            },
            error: (err) => {
                this.messageService.showMessage({ text: 'Error: compruebe los datos y/o la contraseña', type: 'error' });
                console.error(err);
            }
        });
    }

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }
    
}
