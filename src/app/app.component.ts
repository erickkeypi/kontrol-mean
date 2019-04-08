import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'kontrol-MEAN';
  nombre = 'HOME KONTROL';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  userName() {
    return this.authService.currentUser.usuario;
  }
}
