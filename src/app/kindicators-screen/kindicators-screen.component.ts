import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component ({
  selector: 'app-kindicators-screen',
  templateUrl: './kindicators-screen.component.html',
})

export class KindicatorsScreenComponent implements OnInit {
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
