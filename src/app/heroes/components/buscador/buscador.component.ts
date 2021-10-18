import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Heroe } from '../../interfaces/interface';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  BuscarForm: FormGroup = this.fb.group({
    busqueda: ['', Validators.required],
  });

  heroes: Heroe[] = [];
  equipo: Heroe[] = [];
  arregloVerificacion: string[] = [];
  unValor: boolean = false;
  contadorGood: number = 0;
  contadorBad: number = 0;
  bandera = 0;
  bandera2 = 0;

  constructor(private fb: FormBuilder, private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.equipo = JSON.parse(localStorage.getItem('equipo') || '[]');
    this.arregloVerificacion = JSON.parse(
      localStorage.getItem('arregloVerificacion') || '[]'
    );

    console.log(this.equipo);
    console.log(this.arregloVerificacion);
  }

  campoEsValido(field: string) {
    return (
      this.BuscarForm.controls[field].errors &&
      this.BuscarForm.controls[field].touched
    );
  }

  agregar(heroe: Heroe) {
    if (
      this.arregloVerificacion !== [] &&
      this.arregloVerificacion.length < 6
    ) {
      if (!this.arregloVerificacion.includes(heroe.id)) {

        if (this.contadorGood === 3 && heroe.biography.alignment === 'good') {
          this.mensaje('Ya tiene 3 heroes buenos');
          this.bandera = 1;

        } else if (this.contadorBad === 3 && heroe.biography.alignment === 'bad') {
          this.mensaje('Ya tiene 3 heroes malos');
          this.bandera2 = 1;
        }

        if (heroe.biography.alignment === 'good' && this.bandera !== 1) {
          this.agregarAlEquipo(heroe);
          this.contadorGood++;

        } else if((heroe.biography.alignment === 'bad' && this.bandera2 !== 1)) {
          this.agregarAlEquipo(heroe);
          this.contadorBad++;

        } else if(heroe.biography.alignment !== 'good' && heroe.biography.alignment !== 'bad') {
          this.agregarAlEquipo(heroe);
        }

      } else {
        this.mensaje('Este Super Heroe ya esta en su equipo');
      }
    } else {
      this.mensaje('Su equipo ya posee 6 integrantes');
    }
  }

  agregarAlEquipo( heroe: Heroe) {
    this.equipo.push(heroe);
    this.arregloVerificacion.push(heroe.id);
    localStorage.setItem('equipo', JSON.stringify(this.equipo));
    localStorage.setItem('arregloVerificacion', JSON.stringify(this.arregloVerificacion));
  }

  mensaje( mensaje: string ) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  send() {
    if (this.BuscarForm.invalid) {
      this.BuscarForm.markAllAsTouched();

      return;
    }
    this.heroesService
      .getHeroes(this.BuscarForm.controls.busqueda.value)
      .then((response) => {
        console.log(response.data.results);
        this.heroes = response.data.results;
      })
      .catch(function (err) {
        console.log(err);
      });

    this.BuscarForm.reset();
  }
}
