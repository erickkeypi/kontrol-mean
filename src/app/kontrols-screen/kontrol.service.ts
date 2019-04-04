import { Injectable } from '@angular/core';
import { Kontrol } from './kontrol.model';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';

@Injectable()

export class KontrolService {

  private kontrolsUrl: string;

  constructor( private http: Http) {
    this.kontrolsUrl = urljoin(environment.apiUrl, 'kontrols');
  }

  getKontrols(): Promise<void | Kontrol[]> {
    return this.http.get(this.kontrolsUrl)
          .toPromise()
          .then(response => response.json() as Kontrol[])
          .catch(this.handleError);
  }
  getKontrol(id): Promise<void | Kontrol> {
    const url = urljoin(this.kontrolsUrl, id);
    return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Kontrol)
          .catch(this.handleError);
  }

  handleError(error: any) {
  const errMsg = error.message ? error.message :
  error.status ? `${error.status} - ${error.statusText}` : 'server error';
  console.log(errMsg);
  }
}
