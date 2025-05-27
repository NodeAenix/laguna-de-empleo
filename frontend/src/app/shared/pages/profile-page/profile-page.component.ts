import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Alumno } from '../../../interfaces/alumno.interface';
import { Empresa } from '../../../interfaces/empresa.interface';

@Component({
    selector: 'app-profile-page',
    imports: [],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
    
    private authService = inject(AuthService);

    alumnoUser = signal<Alumno | null>(null);
    empresaUser = signal<Empresa | null>(null);
    userType = signal<'alumno' | 'empresa' | null>(null);

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userType.set(this.authService.getUserType(user));
                if (this.userType() === 'alumno') {
                    this.alumnoUser.set(user as Alumno);
                } else if (this.userType() === 'empresa') {
                    this.empresaUser.set(user as Empresa);
                }
            }
        });
    }

}
