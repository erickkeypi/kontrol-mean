import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Http, Headers, Response } from '@angular/http';
import urljoin from 'url-join';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()

export class AuthService {
  currentUser?: User;
  apiUrl: string;

  constructor(private router: Router, private http: Http) {
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
  }

  signin(user: User) {
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
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
  public handleError = (error: any) => {
    const { error: { name }, message } = error;

    if (name === 'TokenExpiredError') {
      console.log('Tu sesion ha expirado');
    } else if (name === 'JsonWebTokenError') {
      console.log('Ha habido un problema con tu sesion');
    } else {
      console.log(message || 'Ha ocurrido un error. Intentalo nuevamente');
    }
    this.logout();
  }
}
