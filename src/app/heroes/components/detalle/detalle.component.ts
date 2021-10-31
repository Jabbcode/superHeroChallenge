import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe, Appearance } from '../../interfaces/interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  heroe: any = [];
  apariencia: any = [];
  biografia: any = [];
  trabajo: any = [];
  imagen: any = [];

  constructor(
    private activateRoute: ActivatedRoute, 
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( ({ id }) => {
      this.heroesService.getHeroeId(id).then( ({ data }) => {
        this.heroe = data;
      } );
    })

    this.activateRoute.params.subscribe( ({ id }) => {
      this.heroesService.getHeroeAppearance(id).then( ({ data }) => {
        console.log(data)
        this.apariencia = data;
      } );
    })

    this.activateRoute.params.subscribe( ({ id }) => {
      this.heroesService.getHeroeBiography(id).then( ({ data }) => {
        console.log(data)
        this.biografia = data;
      } );
    })

    this.activateRoute.params.subscribe( ({ id }) => {
      this.heroesService.getHeroeWork(id).then( ({ data }) => {
        console.log(data)
        this.trabajo = data;
      } );
    })

    this.activateRoute.params.subscribe( ({ id }) => {
      this.heroesService.getHeroeImage(id).then( ({ data }) => {
        // console.log(data)
        this.imagen = data;
      } );
    })
  }

}
