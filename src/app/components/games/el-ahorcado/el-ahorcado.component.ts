import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ScoreService } from '../../../services/score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-el-ahorcado',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './el-ahorcado.component.html',
  styleUrl: './el-ahorcado.component.scss'
})
export class ElhorcadoComponent implements OnInit{
  score: ScoreService = inject(ScoreService);
  router: Router = inject(Router);

  intento: number = 0;
  maxIntentos: number = 5;
  ronda: number = 0;
  
  puntaje: number = 0;
  puntajeMaximo: number = 0; 
  puntajeUltimo: number = 0; 

  jugando: boolean = false;
  cargando:boolean = false;
  msjMook: string = "Estamos cargando tu proxima palabra";

  palabraActual: string = "" ;
  letrasUsadas: string[] = [];
  palabraDescubierta: string[] = [];
  palabras: string[] = [
    "Hola", "Mundo",
    "Perezoso", "Otorrinolaringologo", "Programacion", 'manzana', 'banana', 'cereza', 'durazno', 'frutilla', 'kiwi', 'limón', 'mango', 'naranja', 'papaya'
  ]
  imagenes: string[] = [
    "../../../assets/ahorcado/Inicio.png",
    "../../../assets/ahorcado/intento_1.png",
    "../../../assets/ahorcado/intento_2.png",
    "../../../assets/ahorcado/intento_3.png",
    "../../../assets/ahorcado/intento_4.png",
    "../../../assets/ahorcado/intento_5.png"
  ]
  

  get imagenActual(){
    return this.imagenes[this.intento]
  }

  obtenerPalabraNueva(){
    let indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    return this.palabras.splice(indiceAleatorio, 1)[0].toUpperCase();
  }

  presionarTecla(letra: string){
    this.bloquearPresionadas(letra);
    this.deshabilitarTecla(letra);
    this.descubirPalabra(letra);
  }
  
  bloquearPresionadas(letra: string){
    if(!this.letrasUsadas.includes(letra)){
      this.letrasUsadas.push(letra);
      this.deshabilitarTecla(letra);
    }
  }

  deshabilitarTecla(letra: string){
    const tecla = document.getElementById(letra);
    if(tecla) {
        tecla.setAttribute("disabled", "true");
    }
  } 

  descubirPalabra(letra: string = ""): string[]{
    // debugger;
    if(this.ronda == 10){
      this.salir("¡GENIAL! SOBREVIVISTE A 10 RONDAS.\n Mejorá tu score cuando gustes");
    }
    if(letra == ""){
      this.palabraDescubierta = [];
      for(let i = 0; i < this.palabraActual?.length; i++){
        this.palabraDescubierta.push("_");
      }
    }
    else{
      let exito = false;

      for(let i = 0; i < this.palabraDescubierta?.length; i++){
        if(this.palabraActual[i] == letra){
          this.palabraDescubierta[i] = letra;
          exito = true;
        }
      }
      if(!exito){
        this.intento++;
        if(this.intento == this.maxIntentos){
          this.score.guardarScore("ahorcado", this.puntaje);
          console.log("perdiste")

        }
      }
      if(this.palabraActual == this.palabraDescubierta.join('')){
        this.cargando = true;
        this.puntaje++;
        this.intento--;
        setTimeout( () => {
          this.cargando = false;
          this.reset();
        }, 2500);
      }
    }

    return this.palabraDescubierta;
  }

  loading(msj: string){
    this.msjMook = msj;
    this.cargando = true;
    setTimeout( () => {
      this.cargando = false;
      this.reset();
      this.msjMook = "";
    }, 3000);
  }

  empezarJuego(){
    this.habilitarTeclas(true);
    this.jugando = true;
    this.palabraActual = this.obtenerPalabraNueva() ?? "";
    this.descubirPalabra();
  }

  reset(){
    this.palabraActual = this.obtenerPalabraNueva() ?? "";
    this.descubirPalabra();
    this.habilitarTeclas(true);
  }

  habilitarTeclas(bool: boolean) {
    const botones = document.querySelectorAll('.fila button');
    const next = document.getElementById("next");
    const esc = document.getElementById("Escapar");
    botones.forEach((boton: any) => {
      if (bool) {
        esc?.removeAttribute("disabled");
        next?.removeAttribute("disabled");
        boton.removeAttribute("disabled");
      } 
      else {
        esc?.setAttribute("disabled", "true");
        next?.setAttribute("disabled", "true");
        boton.setAttribute("disabled", "true");
      }
    });
  }

  salir(mensaje: string){
    this.msjMook = mensaje;
    this.cargando = true;
    setTimeout( () => {
      this.cargando = false;
      this.score.guardarScore("ahorcado", this.puntaje);
      this.router.navigateByUrl("/home");
    }, 2000);
  }

  next(){
    this.puntaje--;
    this.ronda++;
    this.msjMook = "Vemos que te está costando eh..."
    this.cargando = true;
    setTimeout( () => {
      this.cargando = false;
      this.reset();
    }, 2000);
  }

  ngOnInit(): void {
    this.habilitarTeclas(false);
    this.msjMook = "Estamos cargando tu proxima palabra";


    this.score.obtenerUltimoScore("ahorcado")?.subscribe( (res) => {
      this.puntajeUltimo = res.puntaje;
    });

    this.score.obtenerMejorScore("ahorcado")?.subscribe( (res) => {
      this.puntajeMaximo = res.puntaje;
    });
  }
}
