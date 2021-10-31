import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/interface';
import Swal from 'sweetalert2';


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

  powerstats = {
    combat: 0,
    durability: 0,
    intelligence: 0,
    power: 0,
    speed: 0,
    strength: 0,
  }

  pesoAltura = {
    peso: 0,
    altura: 0
  };

  constructor(
    private fb: FormBuilder, 
    private heroesService: HeroesService
  ) {}

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
    if (this.arregloVerificacion !== [] && this.arregloVerificacion.length < 6) {
      if (!this.arregloVerificacion.includes(heroe.id)) { // Si no esta repetido entonces lo agrega
        if (this.contadorGood === 3 && heroe.biography.alignment === 'good') {
          this.mensaje('Ya posee 3 heroes buenos', 'warning');
          this.bandera = 1;

        } else if (this.contadorBad === 3 && heroe.biography.alignment === 'bad') {
          this.mensaje('Ya posee 3 heroes malos', 'warning');
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
        this.mensaje('Este Super Heroe ya esta en su equipo', 'warning');
      }
    } else {
      this.mensaje('Su equipo ya posee 6 integrantes', 'warning');
    }
  }

  agregarAlEquipo( heroe: Heroe) {
    this.equipo.push(heroe);
    this.arregloVerificacion.push(heroe.id);

    localStorage.setItem('equipo', JSON.stringify(this.equipo));
    localStorage.setItem('arregloVerificacion', JSON.stringify(this.arregloVerificacion));

    this.mensaje('Heroe agregado al equipo', 'success');

    localStorage.setItem('equipo', JSON.stringify(this.equipo));
    localStorage.setItem('arregloVerificacion', JSON.stringify(this.arregloVerificacion));

    this.calculoEstadisticas(this.equipo);
    this.calculoPesoEstatura();
  }

  calculoEstadisticas( equipo: Heroe[] ) {
    
    this.powerstats.combat = 0;
    this.powerstats.durability = 0;
    this.powerstats.intelligence = 0;
    this.powerstats.power = 0;
    this.powerstats.speed = 0;
    this.powerstats.strength = 0;

    for (let i = 0; i < equipo.length; i++) {

      if(equipo[i].powerstats.combat !== "null") {
        let combat = parseInt(equipo[i].powerstats.combat)
        this.powerstats.combat += combat;
      }

      if(equipo[i].powerstats.durability !== "null") {
        let durability = parseInt(equipo[i].powerstats.durability)
        this.powerstats.durability += durability;
      }

      if(equipo[i].powerstats.intelligence !== "null") {
        let intelligence = parseInt(equipo[i].powerstats.intelligence)
        this.powerstats.intelligence += intelligence;
      }

      if(equipo[i].powerstats.power !== "null") {
        let power = parseInt(equipo[i].powerstats.power)
        this.powerstats.power += power;
      }

      if(equipo[i].powerstats.speed !== "null") {
        let speed = parseInt(equipo[i].powerstats.speed)
        this.powerstats.speed += speed;
      }

      if(equipo[i].powerstats.strength !== "null") {
        let strength = parseInt(equipo[i].powerstats.strength)
        this.powerstats.strength += strength;
      }
    }
    localStorage.setItem('powerstats', JSON.stringify(this.powerstats));
  }

  calculoPesoEstatura() {
    this.pesoAltura.peso = 0;
    this.pesoAltura.altura = 0;
    let altura = 0;
    let peso = 0;

    this.equipo.forEach( ({ id }) => {
      this.heroesService.getHeroeAppearance(id)
        .then( ( response: any ) => {
          altura += parseInt(response.data.height[1].split(' ')[0]);
          peso += parseInt(response.data.weight[1].split(' ')[0]);
          this.pesoAltura.altura = altura;
          this.pesoAltura.peso = peso;
          this.pesoAltura.altura = this.pesoAltura.altura / this.equipo.length;     
          this.pesoAltura.peso = this.pesoAltura.peso / this.equipo.length;     

          
          localStorage.setItem('pesoAltura', JSON.stringify(this.pesoAltura));
          
          
      })
    })
     
  }

  mensaje( mensaje: string, icono: any ) {
    Swal.fire({
      position: 'center',
      icon: icono,
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
        // console.log(response.data.results);
        if(response.data.results === undefined) {
          this.mensaje('No existe heroes con esa descripcion', 'error')
        }
        this.heroes = response.data.results;
      })
      .catch(function (err) {
        console.log(err);
      });

    this.BuscarForm.reset();
  }
}
