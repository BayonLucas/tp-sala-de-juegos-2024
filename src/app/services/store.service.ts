import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, collection, addDoc } from '@angular/fire/firestore';
import { LogsInterface } from '../models/logs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private db: Firestore = inject(Firestore)
  private logColection: CollectionReference;

  constructor(){
    this.logColection = collection(this.db, 'logs'); 
  }

 guardarLog(email : string){
    if(email){
      let log = <LogsInterface>{
        email: email,
        date: new Date()
      }
      addDoc(this.logColection, log)
        .then((res) => {
        console.log(res);
      })
        .catch( (e) =>{
          console.log(e);
        });
      ;

    }

     
  }
  
}