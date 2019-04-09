import { Component, OnInit, OnDestroy } from '@angular/core';
import { Korder } from './korder.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { KordersService } from './korders.service';

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
    mat-spinner {
    position: absolute;
    bottom: 45%;
    left: 35%;
    }
  `],
  providers: [KordersService]
})

export class KordersScreenComponent implements OnInit, OnDestroy {
  nombre = 'Arduino';

  kordenes: Korder[];
  loading = true;
  sub: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private kordersService: KordersService
  ) {}

  ngOnInit() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }

    this.sub = this.route.params.subscribe(params => {
      this.kordersService
        .getKorders(params.id)
        .then((korders: Korder[]) => {
          this.kordenes = korders;
          this.loading = false;
        });
    });
  }
  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  enviarOrden(kode: string) {
    const kmac = localStorage.getItem('kmac');
    this.kordersService.enviarOrden({kmac, kode})
      .subscribe()
    ;
  }
}
