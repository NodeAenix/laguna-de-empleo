import { Component, inject, OnInit, signal } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../interfaces/oferta.interface';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { PostulacionService } from '../../../services/postulacion.service';
import { MessageService } from '../../../services/message.service';
import { Postulacion } from '../../../interfaces/postulacion.interface';
import { Alumno } from '../../../interfaces/alumno.interface';

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
    private messageService = inject(MessageService);
    private router = inject(Router);
    
    ofertas = signal<Oferta[]>([]);
    filteredOfertas = signal<Oferta[]>([]); // ofertas filtradas por el usuario
    userType = signal<'alumno' | 'empresa' | null>(null);
    alumnoUser = signal<Alumno | null>(null);
    showDeletePopup = signal(false);
    selectedOfertaToDelete = signal<string>('');

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userType.set(this.authService.getUserType(user));

                if (this.userType() === 'empresa') {
                    this.ofertaService.getCurrentEmpresaOfertas().subscribe({
                        next: (ofertas) => {
                            const now = new Date();
                            ofertas.forEach((oferta, index) => {
                                if (new Date(oferta.fecha_expiracion) < now) {
                                    this.ofertaService.patchEstadoOferta({ id: oferta._id, estado: 'expirado' }).subscribe({
                                        next: (updatedOferta) => {
                                            ofertas[index] = updatedOferta;
                                            this.ofertas.set([...ofertas]);
                                            this.filteredOfertas.set([...ofertas]);
                                        },
                                        error: (err) => console.error(err)
                                    });
                                }
                            });
                            this.ofertas.set([...ofertas]);
                            this.filteredOfertas.set([...ofertas]);
                        },
                        error: (error) => console.error(error)
                    });
                } else if (this.userType() === 'alumno') {
                    this.alumnoUser.set(user as Alumno);
                    this.postulacionService.getCurrentAlumnoOfertasPostuladas().subscribe({
                        next: (ofertas) => {
                            const now = new Date();
                            ofertas.forEach((oferta, index) => {
                                if (new Date(oferta.fecha_expiracion) < now) {
                                    this.ofertaService.patchEstadoOferta({ id: oferta._id, estado: 'expirado' }).subscribe({
                                        next: (updatedOferta) => {
                                            ofertas[index] = updatedOferta;
                                            this.ofertas.set([...ofertas]);
                                            this.filteredOfertas.set([...ofertas]);
                                        },
                                        error: (err) => console.error(err)
                                    });
                                }
                            });
                            this.ofertas.set([...ofertas]);
                            this.filteredOfertas.set([...ofertas]);
                        },
                        error: (error) => console.error(error)
                    });
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

    getEstadoPostulacion(postulaciones: Postulacion[], alumnoId: string, ofertaId: string): string {
        const postulacion = postulaciones.find(p =>
            p.alumno_id === alumnoId && p.oferta_id === ofertaId
        );
        return postulacion?.estado || '';
    }

    denyCandidato(idCandidato: string, ofertaId: string) {
        this.postulacionService.patchEstadoPostulacion(
            { alumnoId: idCandidato, ofertaId, estado: 'rechazado' }
        ).subscribe({
            next: () => this.messageService.showMessage({ text: 'Candidato rechazado', type: 'info' }),
            error: () => this.messageService.showMessage({ text: 'Vaya... Ha ocurrido un error', type: 'error' })
        });
    }

    markCandidatoAsRead(idCandidato: string, ofertaId: string) {
        this.postulacionService.patchEstadoPostulacion(
            { alumnoId: idCandidato, ofertaId, estado: 'visto' }
        ).subscribe({
            next: () => this.messageService.showMessage({ text: 'Candidato marcado como visto', type: 'info' }),
            error: () => this.messageService.showMessage({ text: 'Vaya... Ha ocurrido un error', type: 'error' })
        });
    }

    removeSelectedOferta() {
        this.ofertaService.deleteOferta(this.selectedOfertaToDelete()).subscribe({
            next: () => {
                this.showDeletePopup.set(false);
                location.reload();
            }
        });
    }

    selectOfertaAndShowDeletePopup(id: string) {
        this.selectedOfertaToDelete.set(id);
        this.showDeletePopup.set(true);
    }

    redirectToCreateOferta() {
        this.router.navigateByUrl('/crear-oferta');
    }

}
