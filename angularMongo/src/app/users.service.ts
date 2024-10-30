import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:5000/api/utenti';

  constructor(private http: HttpClient) { }

  // Funzione per aggiungere un nuovo utente
  addUser(username: string, password: string, email: string): Observable<any> {
    const userData = { username, password, email };

    // Invia la richiesta POST con i dati dell'utente
    return this.http.post(this.apiUrl, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
