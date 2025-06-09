import { Component, inject, OnInit, signal } from '@angular/core';
import { Alumno } from '../../../interfaces/alumno.interface';
import { Empresa } from '../../../interfaces/empresa.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-profile-page',
    imports: [],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
    
    private route = inject(ActivatedRoute);
    private authService = inject(AuthService);

    alumnoUser = signal<Alumno | null>(null);
    empresaUser = signal<Empresa | null>(null);
    userType = signal<'alumno' | 'empresa' | null>(null);
    cvPath = signal<string>('');

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const userId = params.get('id')!;
            this.authService.getUserById(userId).subscribe({
                next: ({ type, user }) => {
                    this.userType.set(type);
                    if (type === 'alumno') {
                        this.alumnoUser.set(user as Alumno);
                        if (this.alumnoUser()?.cv) {
                            this.cvPath.set(`${environment.baseUrl}/uploads/${this.alumnoUser()!.cv!}`);
                        }
                    } else if (type === 'empresa') {
                        this.empresaUser.set(user as Empresa);
                    }
                }
            });
        });
    }

}
