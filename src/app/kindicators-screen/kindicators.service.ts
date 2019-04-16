import { Injectable } from '@angular/core';
import { Kindicator } from './kindicator.model';
import { Http, Headers, Response  } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()

export class KindicatorsService {
  private kontrolsUrl: string;

  constructor( private http: Http) {
    this.kontrolsUrl = urljoin(environment.apiUrl, 'kindicators');
  }

  getKindicators(id): Promise<void | Kindicator[]> {
    const url = urljoin(this.kontrolsUrl, id);
    return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Kindicator[])
          .catch(this.handleError);
  }

  obtenerIndicaciones() {
    const body = {
      kmac: localStorage.getItem('kmac')
    };

    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.kontrolsUrl , body, { headers })
          .pipe(
              map( (response: Response) => {
                response.json();
                return response.json();
              }),
              catchError((error: Response) => Observable.throw(error.json()))
          );
  }

  handleError(error: any) {
  const errMsg = error.message ? error.message :
  error.status ? `${error.status} - ${error.statusText}` : 'server error';
  console.log(errMsg);
  }
}
