import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { environment } from '../environments/environment.prod';


const urlEnv = environment.socketUrl;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'kontrol-MEAN';
  nombre = 'HOME KONTROL';
  socket: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.socket = io.connect(urlEnv, {forceNew: true });
    this.socket.on('message', (data: any) => {
      this.authService.snackMensaje(data);
    });

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
  logout() {
    this.authService.logout();
  }
}
