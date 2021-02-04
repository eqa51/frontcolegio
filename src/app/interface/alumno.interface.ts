export interface Estudiante {
  nombres: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
  fecha: Date;
  grado: string;
  imagen: File;
}

export interface Persona {
  nidPersona: number;
  nomPersona: string;
  apePatePers: string;
  foto: string;
  fechaNaci: Date;
  apeMatePers: string;
  nidGrado: number;
  descGrado: string;
  nivel: string;
}
