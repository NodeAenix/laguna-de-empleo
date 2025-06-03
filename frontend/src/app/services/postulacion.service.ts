import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Postulacion } from '../interfaces/postulacion.interface';
import { Oferta } from '../interfaces/oferta.interface';

@Injectable({providedIn: 'root'})
export class PostulacionService {

    private readonly BASE_URL = `${environment.baseUrl}/postulaciones`;

    private http = inject(HttpClient);
    private authService = inject(AuthService);

    createPostulacion(payload: {}): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.post<any>(this.BASE_URL, payload, { headers });
    }

    getCurrentAlumnoOfertasPostuladas(): Observable<Oferta[]> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.get<Oferta[]>(`${this.BASE_URL}/yo`, { headers });
    }
    
}
