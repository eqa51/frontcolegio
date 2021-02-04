import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad',
})
export class EdadPipe implements PipeTransform {
  transform(fecha: Date): string {
    const fechaactual = new Date();

    const fechanacimiento = new Date(fecha);

    let anio = fechaactual.getFullYear() - fechanacimiento.getFullYear();
    let mes = fechaactual.getMonth() - fechanacimiento.getMonth();

    if (mes < 0) {
      mes = mes + 12;
    }
    if (fechanacimiento.getMonth() > fechaactual.getMonth()) {
      anio--;
    }

    return `${anio} año(s)  ${mes} mese(s)`;
  }
}
