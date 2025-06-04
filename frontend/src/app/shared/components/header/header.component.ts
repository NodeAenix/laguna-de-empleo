import { Component, inject, OnInit, signal } from '@angular/core';
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

    userId = signal<string>('');
    type = signal<'alumno' | 'empresa' | null>(null);

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userId.set(user?._id ?? '');
                this.type.set(this.authService.getUserType(user));
            }
        });
    }

}
