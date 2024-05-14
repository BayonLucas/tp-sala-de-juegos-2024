import { Component, OnInit, inject } from '@angular/core';
import { ScoreService } from '../../../services/score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transiciones',
  standalone: true,
  imports: [],
  templateUrl: './transiciones.component.html',
  styleUrl: './transiciones.component.scss'
})
export class TransicionesComponent implements OnInit{
  scoreService: ScoreService = inject(ScoreService);
  router: Router = inject(Router);

  puntaje: number = 0;
  puntajeMaximo: number = 0;
  puntajeUltimo: number = 0;
  ronda: number = 3;
    
  msjMook: string = "";
  
  loading: boolean = false;
  running: boolean = false;
  showSecuense: boolean = false;
  result: any = -1;

  colors = ['red', 'blue', 'green', '#ffc107', '#0dcaf0', 'white', '#8800FF', '#ff00ff'];
  colorBase = 'black';
  currentSecuense: string[] = [];
  currentColor:string = "";
  respuestaSecuencia: string[] = [];


  start(){
    this.running = true;
    this.comenzar();
  }

  comenzar(){
    this.respuestaSecuencia = [];
    this.mostrarSpinner();
    this.obtenerSecuencia(this.ronda);
    this.mostrarSecuenciaAReplicar();
  }

  obtenerSecuencia(cant: number){
    while(this.currentSecuense.length != cant){
      this.currentSecuense.push(this.randomColor());
    }
  }

  mostrarSecuenciaAReplicar(){
    if(this.currentSecuense.length != 0){
      this.showSecuense = true;
      for(let i = 0; i < this.currentSecuense.length +1; i++ ){

        ((i) => {
          setTimeout( () => {
            this.currentColor = this.currentSecuense[i];
            console.log(this.currentColor);
          }, 1500 * i  + 1000); 
          setTimeout( () => {
            this.currentColor = this.colorBase;
          }, 1500 * i);
        })(i);
      }
      setTimeout(() => {
        this.showSecuense = false;
      }, 2000 * this.currentSecuense.length);
    }
  }

  mostrarSpinner(){
    this.loading = true;
    this.msjMook = "Preparando...";
    setTimeout( () => {
      this.loading = false;
      this.msjMook = "";
    }, 800);
  }

  elegirColor(color: string){
    if(this.respuestaSecuencia.length < this.currentSecuense.length){
      this.respuestaSecuencia.push(color);
      console.log(this.respuestaSecuencia);
    }
    // debugger;
    if(this.respuestaSecuencia.length == this.currentSecuense.length){
      if(this.respuestaSecuencia.every((v, i) => v === this.currentSecuense[i])){
        console.log("Ganaste");

        this.puntaje += 10;
        this.ronda++;
        this.comenzar();
      }
      else{
        this.puntaje -= 10;   
        this.respuestaSecuencia = [];
      }
    }
  }

  salir(mensaje: string){
    this.msjMook = mensaje;
    this.loading = true;
    setTimeout( () => {
      this.scoreService.guardarScore("secuencia", this.puntaje);
      this.loading = false;
      this.running = false;
      this.router.navigateByUrl("/home");
    }, 3000);
  }

  randomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  ngOnInit(): void {

    this.scoreService.obtenerUltimoScore("secuencia")?.subscribe( (res) => {
      this.puntajeUltimo = res.puntaje ?? 0;
    });

    this.scoreService.obtenerMejorScore("secuencia")?.subscribe( (res) => {
      this.puntajeMaximo = res.puntaje ?? 0;
    });
  }
}
