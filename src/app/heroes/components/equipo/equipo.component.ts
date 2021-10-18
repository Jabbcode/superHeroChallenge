import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/interface';
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  equipo: Heroe[] = [];
  powerstats: any;

  constructor() { }

  ngOnInit(): void {

    this.equipo = JSON.parse(localStorage.getItem('equipo') || '{}');
    console.log(this.equipo)
  }

}
