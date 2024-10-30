import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiReg = 'https://5000-simonefines-mongodbangu-ytalh0u1z0t.ws-eu116.gitpod.io/api/reg';
  constructor(private http: HttpClient) { }

  // Funzione per aggiungere un nuovo utente
  addUser(username: string, password: string, email: string): Observable<any> {
    const userData = { username, password, email };
    console.log(userData);
    // Invia la richiesta POST con i dati dell'utente
    return this.http.post(this.apiReg, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getUser(mail: string,password:string) {
    const apiLog = `https://5000-simonefines-mongodbangu-ytalh0u1z0t.ws-eu116.gitpod.io/api/login/${mail}&${password}`;
    return this.http.get(apiLog);
  }
}
