import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Oferta, OfertaFiltered } from '../interfaces/oferta.interface';

@Injectable({providedIn: 'root'})
export class OfertaService {
    
    private readonly BASE_URL = `${environment.baseUrl}/ofertas`;

    private http = inject(HttpClient);
    private authService = inject(AuthService);

    createOferta(payload: {}): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.post<any>(this.BASE_URL, payload, { headers });
    }

    getCurrentEmpresaOfertas(): Observable<Oferta[]> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.get<Oferta[]>(`${this.BASE_URL}/yo`, { headers });
    }

    getFilteredOfertas(): Observable<OfertaFiltered[]> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.get<OfertaFiltered[]>(`${this.BASE_URL}/filtrado`, { headers });
    }

    patchEstadoOferta(payload: { id: string, estado: string }): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.patch<any>(this.BASE_URL, payload, { headers });
    }

    deleteOferta(id: string): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.delete<any>(`${this.BASE_URL}/${id}`, { headers });
    }

}
