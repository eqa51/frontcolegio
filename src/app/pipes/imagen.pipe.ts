import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string): string {
    return `http://localhost:3000/personas/${img}`;
  }
}
