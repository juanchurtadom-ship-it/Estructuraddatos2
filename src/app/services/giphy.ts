
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private http = inject(HttpClient);

  private apiUrl = 'https://api.giphy.com/v1/gifs/search';

  buscarGifs(termino: string): Observable<any> {

    const params = {
      api_key: environment.giphyApiKey,
      q: termino,
      limit: '25',
      offset: '0',
      rating: 'g',
      lang: 'en'
    };

    return this.http.get<any>(this.apiUrl, { params });
  }
}
