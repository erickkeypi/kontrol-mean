import { Component, OnInit } from '@angular/core';
import { Kontrol } from './kontrol.model';
import { KontrolService } from './kontrol.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kontrols-screen',
  templateUrl: './kontrols-screen.component.html',
  styles: [`
    .space{
      flex: auto;
    }

    div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin: 10px;
    }

    div button{
      margin: 5px;
      font-size: 20px;
    }
    .atras-div {
      display: block;
      margin: 10px;
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

  ngOnInit() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }
    this.kontrolService
      .getKontrols()
      .then((kontrols: Kontrol[]) => {
        this.kontroles = kontrols;
      });
  }
  accion(kon) {
    console.log(kon);
  }

}
