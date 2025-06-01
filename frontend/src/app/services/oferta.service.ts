import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';
import { Oferta } from '../interfaces/oferta.interface';

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

    getOfertas(): Observable<Oferta[]> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.get<Oferta[]>(`${this.BASE_URL}/yo`, { headers });
    }

}
