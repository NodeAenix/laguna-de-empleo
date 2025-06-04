import { Alumno } from "./alumno.interface";
import { Empresa } from "./empresa.interface";

export interface User {
    type: 'alumno' | 'empresa';
    user: Alumno | Empresa;
}
