import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubidaService {

    private readonly BASE_URL = `${environment.baseUrl}/subidas`;

    private http = inject(HttpClient);
    private authService = inject(AuthService);
    
    subirPDF(pdf: FormData): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.post(`${this.BASE_URL}/subir-pdf`, pdf, { headers });
    }

    subirImg(img: FormData): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.post(`${this.BASE_URL}/subir-img`, img, { headers });
    }
    
}
