import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // instancia de forma global
})
export class UsuarioService {

  private url = 'https://reqres.in/api';
  constructor(private httpClient: HttpClient) {

  }

  getUsers() {
    return this.httpClient.get(`${this.url}/users?per_page=6`)
      .pipe(
        map(response => response['data']) // remove extra data from the response;
      );
  }
}
