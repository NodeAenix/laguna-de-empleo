export interface Alumno {
    _id:               string;
    nif:               string;
    email:             string;
    nombre:            string;
    apellidos:         string;
    telefono:          number;
    ciclos_formativos: string[];
    tecnologias:       string[];
    idiomas:           string[];
    estado:            string;
    fecha_registro:    Date;
    cv?:               string;
    img?:              string;
}
