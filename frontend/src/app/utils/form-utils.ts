import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$';
    static phonePattern = '^(6|7|9)[0-9]{8}$';

    private static getTextError(errors: ValidationErrors): string | null {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es obligatorio';
                case 'minlength':
                    return `Debe ser mínimo ${errors['minlength'].requiredLength} carácteres`;
                case 'min':
                    return `El valor debe ser como mínimo ${errors['min'].min}`;
                case 'email':
                    return 'El valor ingresado no es correcto';
                case 'pattern':
                    switch (errors['pattern'].requiredPattern) {
                        case FormUtils.emailPattern:
                            return 'Formato de email no válido';
                        case FormUtils.passwordPattern:
                            return 'La contraseña debe tener mínimo 8 carácteres incluyendo mayúsculas, minúsculas y números'
                        case FormUtils.phonePattern:
                            return 'Formato de número no válido';
                        default:
                            return 'Error de formato';
                    }
                case 'notBlank':
                    return 'No se admiten solo espacios';
                default:
                    return null;
            }
        }
        return null;
    }

    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if (!form.controls[fieldName]) return null;

        const errors = form.controls[fieldName].errors ?? {};
        return this.getTextError(errors);
    }

    static isValidFormArray(formArray: FormArray, index: number): boolean | null {
        return formArray.controls[index].errors && formArray.controls[index].touched;
    }

    static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
        if (formArray.controls.length === 0) return null;

        const errors = formArray.controls[index].errors ?? {};
        return this.getTextError(errors);
    }

    static notBlank(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        return (value && value.trim().length > 0 ? null : { notBlank: true });
    }

}
