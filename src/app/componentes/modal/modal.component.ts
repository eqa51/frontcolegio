import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Estudiante } from '../../interface/alumno.interface';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { EstudianteService } from '../../servicios/estudiante.service';
import { Grado } from '../../interface/grado.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  imagen: File;

  estuiante: Estudiante;

  grados: Grado[];

  forma: FormGroup;

  aniosdelestudiante = 'año(s)  mese(s)';

  constructor(
    private estudianteSvr: EstudianteService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.crearFormulario();
  }
  crearFormulario() {
    this.forma = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoPaterno: ['', [Validators.required, Validators.minLength(5)]],
      ApellidoMaterno: ['', [Validators.required, Validators.minLength(5)]],
      grado: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.estudianteSvr.getGrados().subscribe((data) => {
      this.grados = data;
    });
  }

  onNoClick(hola: string) {
    this.dialogRef.close('hola');
  }

  guardar() {
    if (!this.forma.valid) {
      return;
    }
    this.estuiante = this.forma.value;

    this.estuiante.imagen = this.imagen;

    this.estudianteSvr.subirEstudiante(this.estuiante).subscribe((data) => {
      this.estudianteSvr.getEstudiantes().subscribe((estudiantes) => {
        this.dialogRef.close(estudiantes);
      });
    });
  }

  capturarArchivo(evento) {
    this.imagen = evento.target.files[0];
  }

  getPersonas() {
    this.estudianteSvr.getEstudiantes().subscribe((data) => {});
  }

  calcularEdad(event) {
    const fechaactual = new Date();

    const fechanacimiento = new Date(event.target.value);

    let anio = fechaactual.getFullYear() - fechanacimiento.getFullYear();
    let mes = fechaactual.getMonth() - fechanacimiento.getMonth();

    if (mes < 0) {
      mes = mes + 12;
    }
    if (fechanacimiento.getMonth() > fechaactual.getMonth()) {
      anio--;
    }
    this.aniosdelestudiante = `${anio} año(s)  ${mes} mese(s)`;
  }
}
