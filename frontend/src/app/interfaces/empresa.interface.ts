export interface Empresa {
    _id:              string;
    cif:              string;
    email:            string;
    password:         string;
    nombre:           string;
    razon_social:     string;
    direccion_fiscal: string;
    persona_contacto: string;
    telefono:         number;
    descripcion:      string;
    estado:           string;
    fecha_registro:   Date;
    img?:             string;
}
