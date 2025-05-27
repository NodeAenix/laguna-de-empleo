import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class UserService {

    private readonly BASE_URL = environment.baseUrl;

    private http = inject(HttpClient);
    private authService = inject(AuthService);
    
    updateUser(type: 'alumnos' | 'empresas', payload: any): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.authService.getToken()}`
        }
        return this.http.put<any>(`${this.BASE_URL}/${type}`, payload, { headers });
    }

}
