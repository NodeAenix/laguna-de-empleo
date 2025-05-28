import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { MessageService } from '../../../services/message.service';
import { commonDatalist } from '../../../utils/datalist-options';

@Component({
    selector: 'app-create-oferta-page',
    imports: [],
    templateUrl: './create-oferta-page.component.html',
    styleUrl: './create-oferta-page.component.css'
})
export class CreateOfertaPageComponent {

    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);

    formUtils = FormUtils;

    ofertaForm = this.fb.group({
        empresa_id: [''],
        titulo: ['', [Validators.required, FormUtils.notBlank]],
        descripcion: ['', [Validators.required, FormUtils.notBlank]],
        tecnologias: this.fb.array<FormControl<string>>([], [Validators.required]),
        idiomas: this.fb.array<FormControl<string>>([], [Validators.required]),
        modalidad: ['', [Validators.required, FormUtils.notBlank]],
        direccion: ['', [Validators.required, FormUtils.notBlank]],
        fecha_expiracion: ['', [Validators.required, FormUtils.notBlank]],
        candidatos: this.fb.array<FormControl<string>>([], [Validators.required])
    });

    datalistLabels = commonDatalist;

    addElement(key: string, value: string) {
        const formArray = this.ofertaForm.get(key) as FormArray;
        const existingValues = formArray.value as string[];

        if (existingValues.includes(value.trim())) {
            this.messageService.showMessage({ text: 'Valor ya añadido', type: 'error' });
            return;
        }

        if (!this.datalistLabels[key].includes(value.trim())) {
            this.messageService.showMessage({ text: 'Valor no admitido', type: 'error' });
            return;
        }

        formArray.push(new FormControl(value));
    }

    getElementList(key: string): FormArray {
        return this.ofertaForm.get(key) as FormArray;
    }

    removeElement(key: string, index: number) {
        this.getElementList(key).removeAt(index);
    }

    submit() {
        
    }

}
