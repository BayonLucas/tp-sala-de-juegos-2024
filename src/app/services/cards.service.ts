import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  http: HttpClient = inject(HttpClient);

  getCard(){
    return this.http.get("https://www.deckofcardsapi.com/api/deck/new/draw/?count=1");
  }
}
