import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  equipo: any;
  powerstats: any;

  constructor( private heroesService:HeroesService) { }

  ngOnInit(): void {
    let equipo = localStorage.getItem('equipo');

    console.log(equipo);

    this.heroesService.getHeroesId( '20' )
        .then( response =>  {
          console.log( response.data ) 
          this.equipo = response.data
        })
        .catch(function(err) {
          console.log(err)
        });

  }

}
