import { Component } from '@angular/core';

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

export class ConfigurationScreenComponent {

}
