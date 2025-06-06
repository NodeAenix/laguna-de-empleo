import { Postulacion } from "./postulacion.interface";

export interface Oferta {
    _id:               string;
    titulo:            string;
    descripcion:       string;
    tecnologias:       string[];
    idiomas:           string[];
    modalidad:         string;
    direccion:         string;
    fecha_expiracion:  Date;
    estado:            string;
    candidatos:        Candidato[];
    empresa_id:        string;
    fecha_publicacion: Date;
    postulaciones:     Postulacion[];
}

export interface Candidato {
    _id:       string;
    nombre:    string;
    apellidos: string;
}

export interface OfertaFiltered {
    _id:              string;
    titulo:            string;
    descripcion:       string;
    tecnologias:       string[];
    idiomas:           string[];
    candidatos:        string[];
    modalidad:         string;
    direccion:         string;
    estado:            string;
    empresa_id:        { _id: string, nombre: string };
    fecha_publicacion: Date;
    fecha_expiracion:  Date;
}
