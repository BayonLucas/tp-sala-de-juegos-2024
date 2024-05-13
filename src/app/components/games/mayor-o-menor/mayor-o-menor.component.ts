import { Component } from '@angular/core';

@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.scss'
})
export class MayorOMenorComponent {
  puntaje: number = 0;
  puntajeMaximo: number = 0;
  puntajeUltimo: number = 0;
  intento: number = 0;

  imgActual: string = "";
  msjMook: string = "";

  loading: boolean = false;
  running: boolean = false;

}
