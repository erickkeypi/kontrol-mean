import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component ({
  selector: 'app-single-kontrol-screen',
  templateUrl: './single-kontrol-screen.component.html',
  styles: [`
    button{
      margin: 5px;
    }
    .div-content-flex{
      margin-top:0;
    }
  `]
})

export class SingleKontrolScreenComponent implements OnInit {
  nombre = localStorage.getItem('kname');
  id: string;
  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
      });
  }
}
