import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private http = inject(HttpClient);

    private readonly BASE_URL = 'http://localhost:3000/auth';

    // ------------------------
    //     Login y registro
    // ------------------------
    register(type: 'alumnos' | 'empresas', payload: any): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(
            `${this.BASE_URL}/registro-${type}`, payload
        ).pipe(
            tap(res => this.setToken(res.token))
        );
    }

    // ------------------------
    //      JSON Web Token
    // ------------------------
    private setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }
    
}
