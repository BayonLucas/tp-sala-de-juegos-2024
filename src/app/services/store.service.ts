import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, collection, addDoc, collectionData, query, collectionGroup, orderBy, getDoc, getDocs } from '@angular/fire/firestore';
import { LogsModel } from '../models/logs';
import { MensajeModel } from '../models/mensaje';
import { Observable, from} from 'rxjs';

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
      let log = <LogsModel>{
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
  
  guardarMensajes(message: MensajeModel){
    if(message){
      addDoc(this.msjColection, message)
        .then((res) => {
        console.log(res);
        }).catch( (e) =>{
          console.log(e);
        });
    }
  }

  cargarMensajes(): Observable<MensajeModel[]> {
    const qry = query(this.msjColection, orderBy('date', 'asc'));
    return collectionData(qry) as Observable<MensajeModel[]>;
  }
  
}