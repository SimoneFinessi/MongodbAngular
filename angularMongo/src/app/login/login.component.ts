import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private userService: UsersService) {}

  // Funzione per inviare i dati dell'utente
  registerUser() {
    this.userService.addUser(this.username, this.password, this.email)
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
  }
}
