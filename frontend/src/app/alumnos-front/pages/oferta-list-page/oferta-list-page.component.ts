import { Component, inject, OnInit, signal } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../interfaces/oferta.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-oferta-list-page',
    imports: [RouterLink, DatePipe],
    templateUrl: './oferta-list-page.component.html',
    styleUrl: './oferta-list-page.component.css'
})
export class OfertaListPageComponent implements OnInit {
    
    private ofertaService = inject(OfertaService);
    
    ofertas = signal<Oferta[]>([]);

    ngOnInit(): void {
        this.ofertaService.getOfertas().subscribe({
            next: (ofertas) => this.ofertas.set(ofertas),
            error: (error) => console.error(error)
        });
    }

}
