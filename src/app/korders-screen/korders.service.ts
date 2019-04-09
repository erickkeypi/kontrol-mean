import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Korder } from './korder.model';


@Injectable()

export class KordersService {
  private kontrolsUrl: string;

  constructor( private http: Http) {
    this.kontrolsUrl = urljoin(environment.apiUrl, 'kontrols');
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
