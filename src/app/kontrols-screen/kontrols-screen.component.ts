import { Component } from '@angular/core';
import { Kontrol } from './kontrol.model';

const c = new Kontrol(
  'arduino',
  '1234'
);

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
  `]
})

export class KontrolsScreenComponent {
  kontroles: Kontrol[] = new Array(9).fill(c);

}
