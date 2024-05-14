import { Component, OnInit, inject } from '@angular/core';
import { ScoreService } from '../../../services/score.service';
import { CardsService } from '../../../services/cards.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.scss'
})
export class MayorOMenorComponent implements OnInit{
  scoreService: ScoreService = inject(ScoreService);
  cardService: CardsService = inject(CardsService);
  router: Router = inject(Router);

  puntaje: number = 0;
  puntajeMaximo: number = 0;
  puntajeUltimo: number = 0;
  ronda: number = 0;
  
  currentCard: any;
  imgActual: string = "";
  
  imgCartaAnterior: string = "";
  previousCard: any;
  
  msjMook: string = "";
  
  loading: boolean = false;
  running: boolean = false;
  result: any = -1;
  
  obtenerCarta(op: number){
    this.loading = true;
    this.msjMook = "Barajando...";
    setTimeout( () => {
      this.cardService.getCard().subscribe((data: any)=>{
        this.previousCard = this.currentCard;
        this.imgCartaAnterior = this.imgActual;
        this.currentCard = data.cards[0];
        this.imgActual = this.currentCard.images.png;
        console.log(this.currentCard);
        
        if(this.previousCard != null && this.previousCard != undefined){
          let valorAnterior = this.obtenerValorCarta(this.previousCard);
          let valorActual = this.obtenerValorCarta(this.currentCard);
          if(valorActual > valorAnterior){
            // (op == 1) ? this.puntaje++ : this.puntaje--;
            if (op == 1) {
              this.puntaje++;
              this.result = true;
            } else {
              this.puntaje--;
              this.result = false;
            }
          }
          else if(valorActual < valorAnterior){
            // (op == 1) ? this.puntaje-- : this.puntaje++;
            if (op == 1) {
              this.puntaje--;
              this.result = false;
            } else {
              this.puntaje++;
              this.result = true;
            }
          }
          if(this.ronda == 25){
            this.salir("Es todo por ahora! Juguemos mas tarde");
          }
          else{
            this.ronda++;
          }
        }
        
        this.loading = false;
        this.msjMook = "";
      });
    }, 1000);
  }
  start(){
    this.running = true;
  }

  obtenerValorCarta(card:any): number{
    let valorActual = 0;
    switch(card.value){
      case "JACK": valorActual = 11; break;
      case "QUEEN": valorActual = 12; break;
      case "KING": valorActual = 13; break;
      case "ACE": valorActual = 1; break;
      default: valorActual = Number.parseInt(card.value); break;
    }
    return valorActual;
  }

  salir(mensaje: string){
    this.msjMook = mensaje;
    this.loading = true;
    setTimeout( () => {
      this.scoreService.guardarScore("mayor-menor", this.puntaje);
      this.loading = false;
      this.running = false;
      this.router.navigateByUrl("/home");
    }, 3000);
  }

  ngOnInit(): void {
    this.cardService.getCard().subscribe((data: any)=>{
      this.currentCard = data.cards[0];
      this.imgActual = this.currentCard.images.png;
      console.log(this.currentCard);
    }); 

    this.scoreService.obtenerUltimoScore("mayor-menor")?.subscribe( (res) => {
      this.puntajeUltimo = res.puntaje ?? 0;
    });

    this.scoreService.obtenerMejorScore("mayor-menor")?.subscribe( (res) => {
      this.puntajeMaximo = res.puntaje ?? 0;
    });
  }
}

