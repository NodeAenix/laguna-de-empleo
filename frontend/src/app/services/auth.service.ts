import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Alumno } from '../interfaces/alumno.interface';
import { Empresa } from '../interfaces/empresa.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { error } from 'console';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({providedIn: 'root'})
export class AuthService {

    private readonly BASE_URL = 'http://localhost:3000/auth';

    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<Alumno | Empresa | null>(null);
    private _token = signal<string | null>(this.getToken());

    private http = inject(HttpClient);

    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'checking') return 'checking';
        if (this._user()) return 'authenticated';
        return 'not-authenticated';
    });
    user = computed(() => this._user());
    token = computed(() => this._token());

    // ------------------------
    //     Login y registro
    // ------------------------
    login(type: 'alumnos' | 'empresas', email: string, password: string): Observable<boolean> {
        return this.http.post<AuthResponse>(
            `${this.BASE_URL}/login-${type}`, { email, password }
        ).pipe(
            map(resp => this.handleSuccess(resp)),
            catchError(error => this.handleError())
        );
    }

    register(type: 'alumnos' | 'empresas', payload: any): Observable<any> {
        return this.http.post<any>(
            `${this.BASE_URL}/registro-${type}`, payload
        ).pipe(
            map(resp => {
                const token = resp.token;
                return { token, ...resp, success: true }
            }),
            catchError(error => {
                return of({ success: false, error: error.error.errors });
            })
        );
    }

    logout() {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');

        if (this.isBrowser()) {
            localStorage.removeItem('token');
        }
    }

    checkStatus(): Observable<boolean> {
        if (!this.token()) {
            this.logout();
            return of(false);
        }

        return this.http.get<AuthResponse>(`${this.BASE_URL}/check-status`, {
            headers: {
                Authorization: `Bearer ${this.token()}`
            }
        }).pipe(
            map(resp => this.handleSuccess(resp)),
            catchError(err => this.handleError())
        );
    }

    private handleSuccess({ token, user }: AuthResponse) {
        this._user.set(user);
        this._authStatus.set('authenticated');
        this._token.set(token);

        if (this.isBrowser()) {
            localStorage.setItem('token', token);
        }

        return true;
    }

    getToken(): string | null {
        if (this.isBrowser()) {
            const token = localStorage.getItem('token');
            return token;
        }
        return null;
    }

    private handleError() {
        this.logout();
        return of(false);
    }

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }

}
