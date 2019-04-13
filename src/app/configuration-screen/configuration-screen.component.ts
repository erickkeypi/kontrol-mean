import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'app-configuration-screen',
  templateUrl: './configuration-screen.component.html',
  styles: [`
    .space{
      flex: 1 1 auto;
    }
  `],
  providers: [ConfigurationService]
})

export class ConfigurationScreenComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }
  }

  buscarDispositivos() {
    this.configurationService.buscarDispositivos()
      .subscribe(() => {}, this.configurationService.handleError);
  }
}
