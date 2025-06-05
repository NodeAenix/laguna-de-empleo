import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Router, RouterLink } from '@angular/router';
import { FormUtils } from '../../../utils/form-utils';

@Component({
    selector: 'app-login-page',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
    
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    activeTab = signal<'alumnos' | 'empresas'>('alumnos');
    formUtils = FormUtils;

    form = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
        password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
    });

    submit() {
        const type = this.activeTab();

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageService.showMessage({ text: 'Por favor, revise los datos', type: 'error' });
            return;
        }

        this.authService.login(type, this.form.value.email ?? '', this.form.value.password ?? '').subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.router.navigate(['/']);
                return;
            }
            if (this.activeTab() === 'alumnos') {
                this.messageService.showMessage({ text: 'Alumno error - Revise los datos', type: 'error' });
            } else {
                this.messageService.showMessage({ text: 'Empresa error - Revise los datos', type: 'error' });
            }
        });
    }
    
}
