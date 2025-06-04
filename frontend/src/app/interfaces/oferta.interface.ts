export interface Oferta {
    _id:              string;
    titulo:            string;
    descripcion:       string;
    tecnologias:       string[];
    idiomas:           string[];
    candidatos:        [{ _id: string, nombre: string, apellidos: string }];
    modalidad:         string;
    direccion:         string;
    estado:            string;
    empresa_id:        string;
    fecha_publicacion: Date;
    fecha_expiracion:  Date;
}

export interface OfertaFiltered {
    _id:              string;
    titulo:            string;
    descripcion:       string;
    tecnologias:       string[];
    idiomas:           string[];
    candidatos:        [{ _id: string, nombre: string, apellidos: string }];
    modalidad:         string;
    direccion:         string;
    estado:            string;
    empresa_id:        { _id: string, nombre: string };
    fecha_publicacion: Date;
    fecha_expiracion:  Date;
}
