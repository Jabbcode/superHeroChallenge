import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  texto: string,
  ruta: string
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['./auth/login']);
  }

}
