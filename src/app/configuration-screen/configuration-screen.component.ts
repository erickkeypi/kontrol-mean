import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration-screen',
  templateUrl: './configuration-screen.component.html',
  styles: [`
    .space{
      flex: 1 1 auto;
    }

    div {
      display: flex;
      flex-direction: column;
      margin: 40px auto;
      width: 90%;
    }

    .atras-div {
      display: block;
      margin: 10px;
    }

    div button{
      font-size: 20px;
    }
  `]
})

export class ConfigurationScreenComponent implements OnInit {
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
