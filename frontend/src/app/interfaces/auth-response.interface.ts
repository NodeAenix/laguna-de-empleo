import { Alumno } from './alumno.interface';
import { Empresa } from './empresa.interface';

export interface AuthResponse {
    user: Alumno | Empresa;
    token: string;
}
