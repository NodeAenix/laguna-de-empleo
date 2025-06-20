import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Alumno } from '../../../interfaces/alumno.interface';
import { Empresa } from '../../../interfaces/empresa.interface';
import { Candidato, OfertaFiltered } from '../../../interfaces/oferta.interface';
import { OfertaService } from '../../../services/oferta.service';
import { DatePipe } from '@angular/common';
import { PostulacionService } from '../../../services/postulacion.service';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from '../../../services/message.service';

@Component({
    selector: 'app-home-page',
    imports: [DatePipe, RouterLink],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

    private authService = inject(AuthService);
    private ofertaService = inject(OfertaService);
    private postulacionService = inject(PostulacionService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    userType = signal<'alumno' | 'empresa' | null>(null);
    alumnoUser = signal<Alumno | null>(null);
    empresaUser = signal< Empresa | null>(null);
    ofertas = signal<OfertaFiltered[]>([]);
    filteredOfertas = signal<OfertaFiltered[]>([]); // ofertas filtradas por el usuario

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userType.set(this.authService.getUserType(user));
                if (this.userType() === 'alumno') {
                    this.alumnoUser.set(user as Alumno);
                    this.ofertaService.getFilteredOfertas().subscribe({
                        next: (ofertas) => {
                            const now = new Date();
                            const ofertasDisponibles = ofertas.filter(
                                o => new Date(o.fecha_expiracion) >= now
                                && !this.isPostulado(o.candidatos)
                            );
                            this.ofertas.set(ofertasDisponibles);
                            this.filteredOfertas.set(ofertasDisponibles);
                        }
                    });
                } else if (this.userType() === 'empresa') {
                    this.empresaUser.set(user as Empresa);
                }
            }
        });
    }

    searchOfertas(query: string) {
        const filtered = this.ofertas().filter(oferta =>
            oferta.titulo.toLowerCase().includes(query.trim().toLowerCase()) ||
            oferta.descripcion.toLowerCase().includes(query.trim().toLowerCase())
        );
        this.filteredOfertas.set(filtered);
    }

    isPostulado(candidatos: string[]) {
        const alumno = this.alumnoUser();
        if (!alumno) {
            return false;
        }
        return candidatos.some(id => id === alumno._id);
    }

    signUpToOferta(ofertaId: string) {
        this.postulacionService.createPostulacion({ oferta_id: ofertaId }).subscribe({
            next: () => {
                this.messageService.showMessage({ text: '¡Oferta postulada!', type: 'success' });
                this.router.navigateByUrl('/ofertas');
            }
        });
    }

}
