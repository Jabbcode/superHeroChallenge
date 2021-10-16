import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Heroe } from '../../interfaces/interface';
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

  constructor( 
    private fb:FormBuilder,
    private heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  fieldIsValid( field: string ) {
    return this.BuscarForm.controls[field].errors 
           && this.BuscarForm.controls[field].touched;
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
