import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  http: HttpClient = inject(HttpClient);
  cardsApi:string = "https://www.deckofcardsapi.com/api/deck/new/draw/?count=1";
  


  getCard(){
    return this.http.get(this.cardsApi);
  }
}
