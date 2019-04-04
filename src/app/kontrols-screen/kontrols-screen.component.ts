import { Component, OnInit } from '@angular/core';
import { Kontrol } from './kontrol.model';
import { KontrolService } from './kontrol.service';

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
    .atras-div {
      display: block;
      margin: 10px;
    }
  `],
  providers: [KontrolService]
})

export class KontrolsScreenComponent implements OnInit {

  constructor(private kontrolService: KontrolService) {}

  kontroles: Kontrol[];

  ngOnInit() {
    this.kontrolService
      .getKontrols()
      .then((kontrols: Kontrol[]) => {
        this.kontroles = kontrols;
      });
  }
}
