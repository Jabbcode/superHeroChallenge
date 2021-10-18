import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  BuscarForm: FormGroup = this.fb.group({
    busqueda: ['', Validators.required]
  })

  heroes:any = [];
  equipo: string[] = [];

  constructor( 
    private fb:FormBuilder,
    private heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  fieldIsValid( field: string ) {
    return this.BuscarForm.controls[field].errors 
           && this.BuscarForm.controls[field].touched;
  }

  agregar( id: string ) {
    console.log(id)
    let equipo: [] = JSON.parse(localStorage.getItem('equipo')!);
    
    if( !equipo ){
      this.equipo.push(id);
      localStorage.setItem('equipo', JSON.stringify(this.equipo));
    }

    if( equipo.length < 6 ) {
      //TODO: Revisar que no se repitan los elementos
      this.equipo.push(id);
      localStorage.setItem('equipo', JSON.stringify(this.equipo));
    }
    
    // return;
  }

  send() {

    if( this.BuscarForm.invalid ) {
      this.BuscarForm.markAllAsTouched();
    
      return;
    }
    this.heroesService.getHeroes( this.BuscarForm.controls.busqueda.value )
        .then( response =>  {
          console.log( response.data.results ) 
          this.heroes = response.data.results
        })
        .catch(function(err) {
          console.log(err)
        })

    this.BuscarForm.reset();
  }

}
