import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home.component.html',
  styles: [`
    p {
      display: flex;
      text-align: center;
    }

    .space{
      flex: 1 1 auto;
    }

    div {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: 40px auto;
    }

    div button{
      margin-top: 20px;
      font-size: 20px;
    }
  `]
})

export class HomeKontrolComponent implements OnInit {

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
