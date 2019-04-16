import { Component, OnInit, OnDestroy} from '@angular/core';
import { Kindicator } from './kindicator.model';
import { ActivatedRoute } from '@angular/router';
import { KindicatorsService } from './kindicators.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';

@Component ({
  selector: 'app-kindicators-screen',
  templateUrl: './kindicators-screen.component.html',
  styles: [`
  button{
    margin: 5px;
  }

  .slider{
    display: grid;
    grid-template-columns: 0.3fr 0.5fr 0.2fr;
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
  providers: [KindicatorsService]
})

export class KindicatorsScreenComponent implements OnInit, OnDestroy {
  nombre = 'No Name';
  id: string;
  kindicadores: Kindicator[];
  loading = true;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private kindicatorsService: KindicatorsService,
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }
    this.nombre = localStorage.getItem('kname');
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.kindicatorsService
        .getKindicators(params.id)
        .then((kindicators: Kindicator []) => {
          this.kindicadores = kindicators;
          this.loading = false;
          this.kindicatorsService.obtenerIndicaciones().subscribe();
        });
    });

    this.appComponent.socket.on('indicaciones', (data: any) => {
      if (localStorage.kmac === data.kmac) {
        const indicaciones = data.indicaciones;
        console.log(indicaciones);
        for (const key in this.kindicadores) {
          if (this.kindicadores.hasOwnProperty(key)) {
            const cod = this.kindicadores[key].kode;
            const lugar = indicaciones.indexOf(`{${cod}:`);
            if (lugar !== -1) {
              const inicio = indicaciones.indexOf(':', lugar);
              const final = indicaciones.indexOf('}', lugar);
              const indi = indicaciones.substring(inicio + 1, final);
              this.kindicadores[key].value = indi;
            }
          }
        }
      }
    });
  }

  ngOnDestroy() {this.sub.unsubscribe(); }

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
