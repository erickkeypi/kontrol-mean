import { Component } from '@angular/core';
import { Korder } from './korder.model';

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

export class KordersScreenComponent {
  nombre = 'Arduino';

  kordenes: Korder[] = new Array(9).fill(o);
}
