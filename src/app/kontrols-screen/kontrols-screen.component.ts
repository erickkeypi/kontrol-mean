import { Component, OnInit } from '@angular/core';
import { Kontrol } from './kontrol.model';
import { KontrolService } from './kontrol.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kontrols-screen',
  templateUrl: './kontrols-screen.component.html',
  styles: [`
    button{
      margin: 5px;
    }
    mat-spinner {
    position: absolute;
    bottom: .5h;
    left: .5w;
    }
  `],
  providers: [KontrolService]
})

export class KontrolsScreenComponent implements OnInit {

  constructor(
    private kontrolService: KontrolService,
    private router: Router,
    private authService: AuthService
  ) {}

  kontroles: Kontrol[];
  loading = true;

  ngOnInit() {
    localStorage.removeItem('kmac');
    localStorage.removeItem('kname');

    if ( !this.authService.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }
    this.kontrolService
      .getKontrols()
      .then((kontrols: Kontrol[]) => {
        this.kontroles = kontrols;
        this.loading = false;
      });
  }
  setKmac(k) {
    localStorage.setItem('kmac', k.kmac);
    localStorage.setItem('kname', k.kname);
  }

}
