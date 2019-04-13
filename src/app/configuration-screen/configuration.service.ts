import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Http, Headers, Response  } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppComponent } from '../app.component';

@Injectable()

export class ConfigurationService {

  private configUrl = urljoin(environment.apiUrl, 'configuration');

  constructor(private http: Http, private appComponent: AppComponent) {}

  buscarDispositivos() {
    const body = JSON.stringify({
      socketId: this.appComponent.socket.id
    });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.configUrl , body, { headers })
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
