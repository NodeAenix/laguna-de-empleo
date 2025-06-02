import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { MessageService } from '../../../services/message.service';
import { commonDatalist } from '../../../utils/datalist-options';
import { OfertaService } from '../../../services/oferta.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-create-oferta-page',
    imports: [ReactiveFormsModule],
    templateUrl: './create-oferta-page.component.html',
    styleUrl: './create-oferta-page.component.css'
})
export class CreateOfertaPageComponent implements OnInit {

    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);
    private ofertaService = inject(OfertaService);
    private router = inject(Router);
    private authService = inject(AuthService);

    formUtils = FormUtils;

    ofertaForm = this.fb.group({
        titulo: ['', [Validators.required, Validators.maxLength(50), FormUtils.notBlank]],
        descripcion: ['', [Validators.required, FormUtils.notBlank]],
        tecnologias: this.fb.array<FormControl<string>>([], [Validators.required]),
        idiomas: this.fb.array<FormControl<string>>([]),
        modalidad: ['', [Validators.required, FormUtils.notBlank]],
        direccion: ['', [Validators.required, FormUtils.notBlank]],
        fecha_expiracion: ['', [Validators.required, FormUtils.notFutureDate]],
    });

    title = signal<string>('');
    datalistLabels = commonDatalist;

    selectedTecnologias = new Set<string>();
    selectedIdiomas = new Set<string>();

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                const userType = this.authService.getUserType(user);
                if (userType === 'alumno') {
                    this.router.navigateByUrl('/');
                }
            }
        });
    }

    updateTitle(inputTitle: HTMLInputElement) {
        this.title.set(inputTitle.value);
    }

    toggleSelectedTecnologia(tecnologia: string) {
        this.selectedTecnologias.has(tecnologia)
            ? this.selectedTecnologias.delete(tecnologia)
            : this.selectedTecnologias.add(tecnologia);
    }

    isSelectedTecnologia(tecnologia: string): boolean {
        return this.selectedTecnologias.has(tecnologia);
    }

    toggleSelectedIdioma(idioma: string) {
        this.selectedIdiomas.has(idioma)
            ? this.selectedIdiomas.delete(idioma)
            : this.selectedIdiomas.add(idioma);
    }

    isSelectedIdioma(idioma: string): boolean {
        return this.selectedIdiomas.has(idioma);
    }

    submit() {
        if (this.selectedTecnologias.size === 0) {
            this.messageService.showMessage({ text: 'Selecciona alguna tecnología', type: 'info' });
            return;
        }

        const tecnologiasArray = this.ofertaForm.get('tecnologias') as FormArray;
        const idiomasArray = this.ofertaForm.get('idiomas') as FormArray;

        this.selectedTecnologias.forEach(tecnologia => {
            tecnologiasArray.push(this.fb.control(tecnologia));
        });
        this.selectedIdiomas.forEach(idioma => {
            idiomasArray.push(this.fb.control(idioma));
        });

        if (this.ofertaForm.invalid) {
            this.ofertaForm.markAllAsTouched();
            console.log(this.ofertaForm.value);
            this.messageService.showMessage({ text: 'Por favor, revise los datos', type: 'error' });
            return;
        }

        // En caso de que no haya habido ningún error
        this.ofertaService.createOferta(this.ofertaForm.value).subscribe({
            next: () => {
                this.messageService.showMessage({ text: 'Oferta creada con éxito', type: 'success' });
                this.router.navigateByUrl('/ofertas');
            },
            error: () => {
                this.messageService.showMessage({ text: 'Ha ocurrido un error', type: 'error' });
            }
        });
    }

}
