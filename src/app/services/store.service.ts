import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, collection, addDoc, collectionData, query, collectionGroup, orderBy } from '@angular/fire/firestore';
import { LogsInterface } from '../models/logs';
import { MensajeModel } from '../models/mensaje';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private db: Firestore = inject(Firestore)
  private logColection: CollectionReference;
  private msjColection: CollectionReference;

  constructor(){
    this.logColection = collection(this.db, 'logs'); 
    this.msjColection = collection(this.db, 'messages'); 
  
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
    }
  }
  saveMessages(message: MensajeModel){
    if(message){
      addDoc(this.msjColection, message)
        .then((res) => {
        console.log(res);
        }).catch( (e) =>{
          console.log(e);
        });
    }
  }

  loadMessages(): Observable<MensajeModel[]> {
    return collectionData(this.msjColection) as Observable<MensajeModel[]>;
  }
  
}