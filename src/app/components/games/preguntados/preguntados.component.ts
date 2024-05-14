import { Component, OnInit, inject } from '@angular/core';
import { TriviaService } from '../../../services/trivia.service';
import { ScoreService } from '../../../services/score.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit {
  triviaService: TriviaService = inject(TriviaService);
  scoreService: ScoreService = inject(ScoreService);
  router: Router = inject(Router);

  puntaje: number = 0;
  puntajeMaximo: number = 0;
  puntajeUltimo: number = 0;
  ronda: number = 0;
    
  msjMook: string = "";
  
  loading: boolean = false;
  running: boolean = true;

  data:any = {
    "id": "89",
    "category": "javascript",
    "level": "facil",
    "question": "const person = {name:\"John\", age:31, city:\"New York\"};... ¿cuál es la forma correcta de acceder a los valores?",
    "answers": {
      "answer_a": "person.name",
      "answer_b": "person[\"name\"]",
      "answer_c": "Ambas son correctas"
    },
    "correct_answer": "answer_c"
  }
  imgCategory: string = "";


  start(){
    this.running = true;
  }
  mostrarSpinner(){
    this.loading = true;
    this.msjMook = "Preparando...";
    setTimeout( () => {
      this.loading = false;
      this.msjMook = "";
    }, 800);
  }

  salir(mensaje: string){
    this.msjMook = mensaje;
    this.loading = true;
    setTimeout( () => {
      this.scoreService.guardarScore("preguntados", this.puntaje);
      this.loading = false;
      this.running = false;
      this.router.navigateByUrl("/home");
    }, 3000);
  }


  
  
  ngOnInit(): void {
    this.triviaService.getPhoto().then( (res) => {
      console.log(res);
      // this.imgCategory = res
    })
    // this.scoreService.obtenerUltimoScore("preguntados")?.subscribe( (res) => {
    //   this.puntajeUltimo = res.puntaje ?? 0;
    // });

    // this.scoreService.obtenerMejorScore("preguntados")?.subscribe( (res) => {
    //   this.puntajeMaximo = res.puntaje ?? 0;
    // });  
  }
}
