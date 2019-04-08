import { Component, OnInit } from '@angular/core';
import { Korder } from './korder.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


const o = new Korder('orden');

@Component({
  selector: 'app-korders-screen',
  templateUrl: './korders-screen.component.html',
  styles: [`
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
  `]
})

export class KordersScreenComponent implements OnInit {
  nombre = 'Arduino';

  kordenes: Korder[] = new Array(9).fill(o);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }
  }
}
