import { Component } from '@angular/core';

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

export class HomeKontrolComponent {

}
