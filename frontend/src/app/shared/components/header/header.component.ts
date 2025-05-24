import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    
    authService = inject(AuthService);

    type: 'alumno' | 'empresa' | null = null;

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.type = this.authService.getUserType(user);
            }
        });
    }

}
