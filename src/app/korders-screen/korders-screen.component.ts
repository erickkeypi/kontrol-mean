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
    button{
      margin: 5px;
    }

    .slider{
      display: grid;
      grid-template-columns: 0.3fr 0.7fr;
      text-align: center;
      align-items: center;
      font-size: 18px;
    }

    .toogle{
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;
      font-size: 18px;
    }
    mat-spinner {
    position: absolute;
    bottom: .5h;
    left: .5w;
    }
  `],
  providers: [KordersService]
})

export class KordersScreenComponent implements OnInit, OnDestroy {
  nombre = 'No Name';

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
    this.nombre = localStorage.getItem('kname');
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

  enviarOrden(korder: Korder, valor?: any) {
    const kmac = localStorage.getItem('kmac');
    this.authService.snackMensaje('enviando orden');
    this.kordersService.enviarOrden({kmac, korder, valor})
      .subscribe(
        () => {},
        this.kordersService.handleError
      )
    ;
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
