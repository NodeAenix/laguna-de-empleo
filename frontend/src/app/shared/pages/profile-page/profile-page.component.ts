import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Alumno } from '../../../interfaces/alumno.interface';

@Component({
    selector: 'app-profile-page',
    imports: [],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
    
    private authService = inject(AuthService);

    currentUser = this.authService.user() as Alumno;

}
