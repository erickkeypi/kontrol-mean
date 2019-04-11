import { Injectable } from '@angular/core';
import { Http, Headers, Response  } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Korder } from './korder.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class KordersService {
  private kontrolsUrl: string;

  constructor( private http: Http) {
    this.kontrolsUrl = urljoin(environment.apiUrl, 'kontrols');
  }

  enviarOrden(mensaje) {
    const body = JSON.stringify(mensaje);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const url = urljoin(environment.apiUrl, 'korder');
    return this.http.post(url , body, { headers })
          .pipe(
              map( (response: Response) => {
                response.json();
                return response.json();
              }),
              catchError((error: Response) => Observable.throw(error.json()))
          );
  }

  getKorders(id): Promise<void | Korder[]> {
    const url = urljoin(this.kontrolsUrl, id);
    return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Korder[])
          .catch(this.handleError);
  }
  handleError(error: any) {
  const errMsg = error.message ? error.message :
  error.status ? `${error.status} - ${error.statusText}` : 'server error';
  console.log(errMsg);
  }
}
