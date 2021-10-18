import { Component, OnInit } from '@angular/core';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  menu: MenuItem[] = [
    {
      texto: 'Equipo',
      ruta: './heroes/equipo'
    },
    {
      texto: 'Buscador',
      ruta: './heroes/buscador'
    },
    {
      texto: 'Detalle',
      ruta: './heroes/:id'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
