import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, limit, orderBy, query, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ScoreModel } from '../models/score';
import { UserModel } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private db: Firestore = inject(Firestore);
  private auth: AuthService  = inject(AuthService);
  private scoreColection: CollectionReference;

  constructor() {
    this.scoreColection = collection(this.db, "scores");
  }

  guardarScore(juego: string, puntaje: number){
    if(juego && puntaje){
      this.auth.user$.subscribe( (user) => {
        if(user){
          let score = <ScoreModel>{
            uid: user.uid,
            user: user.email,
            juego: juego,
            puntaje: puntaje,
            date: new Date()
          }
          addDoc(this.scoreColection, score)
            .then((res) => {
            console.log(res);
            }).catch( (e) =>{
              console.log(e);
            });
        }
      })
    }
  }

  obtenerUltimoScore(juego: string){
    let user: UserModel = JSON.parse(localStorage.getItem("userCredential") ?? "");
    try{
      if(user){
        const qry = query(this.scoreColection, 
          where("uid", "==", user.uid),
          where("juego", "==", juego),
          orderBy('date', 'desc'),
          limit(1)
        );
        return collectionData(qry).pipe(
            map(scores => scores[0] as ScoreModel)
          );
      }
      else{
        throw "No hay usuario logeado";
      }
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  obtenerMejorScore(juego: string){
    let user: UserModel = JSON.parse(localStorage.getItem("userCredential") ?? "");
    try{
      if(user){
        const qry = query(this.scoreColection, 
          where("uid", "==", user.uid),
          where("juego", "==", juego),
          orderBy('puntaje', 'desc'),
          limit(1)
        );
        return collectionData(qry).pipe(
            map(scores => scores[0] as ScoreModel)
          );
      }
      else{
        throw "No hay usuario logeado";
      }
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }



}
