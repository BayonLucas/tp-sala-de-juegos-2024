import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  http: HttpClient = inject(HttpClient);
  categories: string[] = ["csharp", "javascript", "php", "java", "sql", "css", "html", "python", "typescript"];  
  
  randomCategory() {
    const randomIndex = Math.floor(Math.random() * this.categories.length);
    return this.categories[randomIndex];
  }
  
  async getPhoto(){
    this.http.get('https://api.pexels.com/v1/search', {
      params: {
        query: 'javascript',
        per_page: 1,
        orientation: 'landscape'
      },
      headers: {
        Authorization: 'YOUR_PEXELS_API_KEY'
      }
    })
  }


  async getPregunta(){
    let triviaApi:string = "https://www.preguntapi.dev/api/categories/" + this.randomCategory() + "?level=aleatorio&limit=1";
    return await this.http.get(triviaApi).toPromise();
  }


}
