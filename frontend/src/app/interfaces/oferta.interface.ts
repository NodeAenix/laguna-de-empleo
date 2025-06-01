import { Alumno } from './alumno.interface';

export interface Oferta {
    titulo:            string;
    descripcion:       string;
    tecnologias:       string[];
    idiomas:           string[];
    candidatos:        Alumno[];
    modalidad:         string;
    direccion:         string;
    estado:            string;
    empresa_id:        string;
    fecha_publicacion: Date;
    fecha_expiracion:  Date;
}
