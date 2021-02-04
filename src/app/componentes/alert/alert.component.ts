import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../servicios/estudiante.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  id: string;
  constructor(
    private estudianteSvr: EstudianteService,
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {}

  cerrarAlert() {
    this.dialogRef.close();
  }

  borrar() {
    this.dialogRef.close('si');
  }
}
