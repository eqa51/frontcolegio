import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Persona } from '../../interface/alumno.interface';
import { EstudianteService } from '../../servicios/estudiante.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss'],
})
export class EstudianteComponent implements OnInit, AfterViewInit {
  personas: Persona[] = [];

  constructor(
    private estudianteSvr: EstudianteService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEstudiantes();
  }
  ngAfterViewInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.personas = [];
      this.personas = result;
    });
  }

  borrar(id: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.estudianteSvr.deleteEstudiante(id).subscribe((data) => {
        this.getEstudiantes();
      });
    });
  }

  getEstudiantes() {
    this.estudianteSvr.getEstudiantes().subscribe((data) => {
      this.personas = data;
    });
  }
}
