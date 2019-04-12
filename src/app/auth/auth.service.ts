import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Http, Headers, Response } from '@angular/http';
import urljoin from 'url-join';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable()

export class AuthService {
  currentUser?: User;
  apiUrl: string;

  constructor(
    private router: Router,
    private http: Http,
    private sb: MatSnackBar
  ) {
    this.apiUrl = environment.apiUrl;

    if (this.isLoggedIn()) {
      const { userId, usuario } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(usuario, null, userId);
    }
  }
  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/');
    this.sb.open('Sesion Cerrada', 'X', {duration: 2000});
  }
  signin(user: User) {
    // this.login({token: 'lol', userId: '100', usuario: 'kirec'});
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const url = urljoin(this.apiUrl, 'signin');
    return this.http.post(url, body, {headers})
      .pipe(
        map((response: Response) => {
          const json = response.json();
          this.login(json);
          return json;
        }),
        catchError((error: Response) => Observable.throw(error.json()))
    );
  }

  login = ({token, userId, usuario}) => {
    this.currentUser = new User(usuario, null, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({userId, usuario}));
    this.router.navigateByUrl('/home');
    // this.snackMensaje('Sesion Iniciada');
  }
  snackMensaje(mensaje: string) {
    this.sb.open(mensaje, 'X', {duration: 2000});
  }
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
  public handleError = (error: any) => {
    // this.snackMensaje('Usuario y/o Contraseña Incorrecta');
    console.log(error);
    // this.logout();
  }
}
