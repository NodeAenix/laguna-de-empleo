import { Component, inject, OnInit, signal } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../interfaces/oferta.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { PostulacionService } from '../../../services/postulacion.service';

@Component({
    selector: 'app-oferta-list-page',
    imports: [RouterLink, DatePipe],
    templateUrl: './oferta-list-page.component.html',
    styleUrl: './oferta-list-page.component.css'
})
export class OfertaListPageComponent implements OnInit {
    
    private ofertaService = inject(OfertaService);
    private postulacionService = inject(PostulacionService);
    private authService = inject(AuthService);
    
    ofertas = signal<Oferta[]>([]);
    userType = signal<'alumno' | 'empresa' | null>(null);

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userType.set(this.authService.getUserType(user));

                if (this.userType() === 'empresa') {
                    this.ofertaService.getCurrentEmpresaOfertas().subscribe({
                        next: (ofertas) => this.ofertas.set(ofertas),
                        error: (error) => console.error(error)
                    });
                } else if (this.userType() === 'alumno') {
                    this.postulacionService.getCurrentAlumnoOfertasPostuladas().subscribe({
                        next: (ofertas) => this.ofertas.set(ofertas),
                        error: (error) => console.error(error)
                    });
                }
            }
        });
    }

}
