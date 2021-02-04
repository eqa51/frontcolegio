import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grado } from '../interface/grado.interface';
import { Estudiante, Persona } from '../interface/alumno.interface';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  constructor(private http: HttpClient) {}

  deleteEstudiante(id: string) {
    return this.http.delete(`http://localhost:3000/personas/${id}`);
  }

  getGrados(): Observable<Grado[]> {
    return this.http.get<Grado[]>('http://localhost:3000/grados/');
  }

  getEstudiantes(): Observable<Persona[]> {
    return this.http.get<Persona[]>('http://localhost:3000/personas/');
  }
  subirEstudiante(estudiante: Estudiante) {
    const fd = new FormData();

    fd.append('nombres', estudiante.nombres);
    fd.append('ApellidoMaterno', estudiante.ApellidoMaterno);
    fd.append('ApellidoPaterno', estudiante.ApellidoPaterno);
    fd.append('fecha', '' + estudiante.fecha);
    fd.append('grado', estudiante.grado);
    fd.append('imagen', estudiante.imagen);

    return this.http.post('http://localhost:3000/personas/estudiante', fd);
  }
}
